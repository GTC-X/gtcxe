"use client";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useEffect, useState } from "react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import OtpInput from "react-otp-input";
import { countryList } from "../../../../context/countriesList";
import { useLocationDetail } from "../../../../context/useLocationDetail";
import { toast } from "react-toastify";
import {   useRouter } from "next/navigation";
import Select from "react-select";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl"; // make sure this is imported

const InvestingForm = ({
  zapierUrl,
  successPath,
  page = "",
  btnText,
  isBlue = false,
}) => {
  const { countryData } = useLocationDetail();
  const [otpLoading, setOtpLoading] = useState(false);
  const [showOtp, setShowOtp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [storedOtp, setStoredOtp] = useState("");
  const [isDisable, setIsDisable] = useState(true);
  const router = useRouter();

  const t = useTranslations("partner.form");
  const locale = useLocale(); // inside your component
  const options = countryList.map((item) => ({
    value: item.en_short_name,
    label: (
      <div className="flex items-center gap-2">
        <img
          src={`https://flagcdn.com/w40/${item.alpha_2_code.toLowerCase()}.png`}
          alt={item.en_short_name}
          className="w-5 h-4 object-cover"
        />
        <span>{item.en_short_name}</span>
      </div>
    ),
  }));

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    formik.setFieldValue("utm_source", params.get("utm_source") || "");
    formik.setFieldValue("utm_medium", params.get("utm_medium") || "");
    formik.setFieldValue("utm_campaign", params.get("utm_campaign") || "");
    formik.setFieldValue("utm_id", params.get("utm_id") || "");
    formik.setFieldValue("utm_term", params.get("utm_term") || "");
    formik.setFieldValue("utm_content", params.get("utm_content") || "");
    formik.setFieldValue("fbclid", params.get("fbclid") || "");
    formik.setFieldValue("gclid", params.get("gclid") || "");
  }, []);

  useEffect(() => {
    if (countryData?.country) {
      const filterData = countryList.find(
        (item) => item?.alpha_2_code == countryData.country
      );
      formik.setFieldValue(
        "country",
        filterData ? filterData?.en_short_name : ""
      );
    }
  }, [countryData?.country, countryList]);

  const sendVerificationCode = async () => {
    // First validate email
    if (!formik?.values?.email) {
      toast.error(t("email") + " " + (t("required") || "is required"));
      return;
    }

    setOtpLoading(true);
    
    try {
      // Validate email first
      const validationResponse = await axios.post(`/api/validate-email`, {
        email: formik?.values?.email,
      });

      if (!validationResponse.data.valid) {
        toast.error(t("invalidEmail") || "Invalid email address. Please use a valid email.");
        setOtpLoading(false);
        return;
      }

      // If email is valid, send OTP
      const res = await axios.post(`/api/trade-otp`, {
        email: formik?.values?.email,
        first_name: formik?.values?.nickname,
        type: "0",
        locale: locale,
      });
      
      if (res?.data?.message) {
        setShowOtp(true);
        setStoredOtp(res?.data?.message?.slice(4, -3));
        toast.success(t("otpSent"));
      } else {
        toast.error(res?.data?.message);
        setShowOtp(false);
      }
    } catch (err) {
      setShowOtp(false);
      if (err.response?.data?.reason) {
        toast.error(t("invalidEmail") || "Invalid email address");
      } else {
        toast.error(t("error") || "An error occurred");
      }
    } finally {
      setOtpLoading(false);
    }
  };

  const generatePassword = (length = 12) => {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";
    return Array.from(
      { length },
      () => chars[Math.floor(Math.random() * chars.length)]
    ).join("");
  };

  const sendDataToDb = async (data) => {
    const emailData = axios
      .post(
        `/api/trade-gold`,
        JSON.stringify({
          ...data,
          locale: locale,
        })
      )
      .then((res) => {
        toast.success(t("thankYou1"));
        formik.resetForm();
        setLoading(false);
        localStorage.setItem("user", JSON.stringify(data));
        // Redirect based on locale
        const targetLocale =
          locale === "es" ? `/es${successPath}` : successPath;
        router.push(targetLocale);
        formik.resetForm();
        setShowOtp(false);
      })
      .catch((err) => {
        toast.error("Error inserting data: " + result.error);
        setLoading(false);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const sendDataPostBack = async (data) => {
    setLoading(true);
    try {
      const res = await fetch("/api/investing-postback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: data?.email }),
      });

      if (!res.ok) throw new Error(await res.text());
      await axios
        .post(
          `/api/trade-gold`,
          JSON.stringify({
            ...data,
            locale: locale,
            fist_name: data?.nickname,
          })
        )
        .then((res) => {
          toast.success(t("thankYou1"));
          formik.resetForm();
          localStorage.setItem("user", JSON.stringify(data));

          const targetLocale =
            locale === "es" ? `/es${successPath}` : successPath;
          router.push(targetLocale);
          setShowOtp(false);
        })
        .catch((err) => {
          toast.error("Error inserting data: " + result.error);
          setLoading(false);
        })
        .finally(() => {
          setLoading(false);
        });
    } catch (err) {
      toast.error("Error inserting data: " + (err?.message || "Unknown error"));
    } finally {
      setLoading(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      nickname: "",
      email: "",
      last_name: "",
      phone: "",
      password: generatePassword(),
      country: "",
      otp: "",
      terms: false,
      utm_source: "",
      utm_medium: "",
      utm_campaign: "",
      utm_id: "",
      utm_term: "",
      utm_content: "",
      fbclid: "",
      gclid: "",
    },
    validationSchema: Yup.object({
      nickname: Yup.string()
        .matches(/^[^\d]+$/, t("errors.fullNameFormat"))
        .required(t("errors.firstNameRequired")),
      last_name: Yup.string()
        .matches(/^[^\d]+$/, t("errors.lastNameFormat"))
        .required(t("errors.lastNameRequired")),

      email: Yup.string()
        .email(t("errors.emailInvalid"))
        .required(t("errors.emailRequired")),

      phone: Yup.string().required(t("errors.phoneRequired")),

      country: Yup.string().required(t("errors.countryRequired")),

      otp: Yup.string()
        .length(6, t("errors.otpLength"))
        .required(t("errors.otpRequired")),

      terms: Yup.bool().oneOf([true], t("errors.termsRequired")),
    }),

    onSubmit: async (values) => {
      // Check if OTP is verified before submitting
      if (showOtp && isDisable) {
        toast.error(t("otpFail") || "Please verify OTP before submitting");
        return;
      }

      try {
        setLoading(true);
        await axios.post(zapierUrl, JSON.stringify(values));
      } catch (error) {
      } finally {
        sendDataPostBack(values, formik, setLoading);
      }
    },
  });

  const verifyOtpCode = async (otp) => {
    if (otp == storedOtp) {
      toast.success(t("otpSuccess"));
      setShowOtp(false);
      setIsDisable(false);
    } else {
      toast.error(t("otpFail"));
    }
  };

  //console.log({ countryList, countryData, formik })

  return (
    <div
      className=" max-w-xl mx-auto p-6"
      style={{
        borderRadius: "16px",
        background: "#fff",
        boxShadow: "1px 6px 16px 0 rgba(0, 0, 0, 0.10)",
      }}
    >
      <form
        onSubmit={formik.handleSubmit}
        className=" text-sm rounded-3xl md:p-0 mx-auto form-setting ltr:text-left rtl:text-right text-white"
      >
        <h2 className="text-[#04417B] text-[24px]  text-center font-semibold pb-4">
          Register Now
        </h2>
        {/* Full Name & Email */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
          <input
            type="hidden"
            name="utm_source"
            value={formik.values.utm_source}
          />
          <input
            type="hidden"
            name="utm_medium"
            value={formik.values.utm_medium}
          />
          <input
            type="hidden"
            name="utm_campaign"
            value={formik.values.utm_campaign}
          />
          <input type="hidden" name="utm_id" value={formik.values.utm_id} />
          <input type="hidden" name="utm_term" value={formik.values.utm_term} />
          <input type="hidden" name="fbclid" value={formik.values.fbclid} />
          <input type="hidden" name="gclid" value={formik.values.gclid} />
          <input
            type="hidden"
            name="utm_content"
            value={formik.values.utm_content}
          />
          <div className="relative text-[#666684]">
            <div className="text-sm mb-2 ">
              <label>{t("firstName")}</label>
            </div>

            <input
              type="text"
              inputMode="text"
              autoComplete="off"
              placeholder={t("firstName")}
              className={`w-full px-4 bg-[#FFF] py-3 pl-3 text-base border rounded-md  ${
                formik.touched.nickname && formik.errors.nickname
                  ? "border-red-500"
                  : " border-[#CCCCD6] "
              } focus:outline-none`}
              {...formik.getFieldProps("nickname")}
            />
            {formik.touched.nickname && formik.errors.nickname && (
              <p className="text-red-500 ltr:text-left rtl:text-right pt-1">
                {formik.errors.nickname}
              </p>
            )}
          </div>
          <div className="relative text-[#666684]">
            <div className="text-sm mb-2 ">
              <label>{t("lastName")}</label>
            </div>

            <input
              type="text"
              inputMode="text"
              autoComplete="off"
              placeholder={t("lastName")}
              className={`w-full px-4 bg-[#FFF] text-base py-3 pl-3 border-[.5px] rounded-md  ${
                formik.touched.last_name && formik.errors.last_name
                  ? "border-red-500"
                  : " border-[#CCCCD6] "
              } focus:outline-none`}
              {...formik.getFieldProps("last_name")}
            />
            {formik.touched.last_name && formik.errors.last_name && (
              <p className="text-red-500  pt-1 ltr:text-left rtl:text-right">
                {formik.errors.last_name}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3 mb-3">
          <div className="relative">
            <div className="relative text-[#666684]">
              <div className="text-sm mb-2 ">
                <label>{t("email")}</label>
              </div>

              <input
                type="email"
                placeholder={t("email")}
                className={`w-full bg-[#FFF] px-4 py-3 pl-3 text-base border rounded-md ${
                  formik.touched.email && formik.errors.email
                    ? "border-red-500"
                    : "border-[#CCCCD6]"
                } focus:outline-none focus:bg-none`}
                {...formik.getFieldProps("email")}
              />
              {formik.touched.email && formik.errors.email && (
                <p className="text-red-500 pt-1 ltr:text-left rtl:text-right">
                  {formik.errors.email}
                </p>
              )}
              <div
                className="absolute top-9 bg-[#000032] ltr:right-3 rtl:left-3 rounded-md cursor-pointer text-white  py-1.5 px-2"
                onClick={() => {
                  sendVerificationCode();
                }}
              >
                {otpLoading ? t("sending") : t("getCode")}
              </div>
            </div>
            {showOtp && (
              <div className="grid grid-cols-1 gap-2">
                <div>
                  <p className="my-2 ltr:text-left rtl:text-right pt-1">
                    {t("otp")}
                  </p>
                  <OtpInput
                    value={formik.values.otp}
                    onChange={(otp) => {
                      formik.setFieldValue("otp", otp);
                      if (otp?.length == 6) {
                        verifyOtpCode(otp);
                      }
                    }}
                    numInputs={6}
                    containerStyle={{
                      justifyContent: "space-around",
                      alignItems: "center",
                      gap: "10px",
                    }}
                    renderInput={(props) => (
                      <input
                        {...props}
                        type="tel" // Triggers number pad
                        inputMode="numeric" // Helps mobile keyboard detect numeric input
                        pattern="[0-9]*" // Optional: enforce numeric
                      />
                    )}
                    isInputNum
                    inputStyle={{
                      fontSize: "16px", // ✅ critical to stop iOS zoom
                      borderRadius: "5px",
                      paddingBottom: "10px",
                      paddingTop: "10px",
                      width: "20%",
                      backgroundColor: "#fff",
                      color: "#1A1A47",
                      fontWeight: "700",
                      outlineColor: "#f9c617",
                      border:
                        formik.touched.otp && formik.errors.otp
                          ? "1px solid red"
                          : "1px solid #CCCCD6",
                    }}
                  />
                  {formik.touched.otp && formik.errors.otp && (
                    <p className="text-red-500 text-sm mt-2">
                      {formik.errors.otp}
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
          <div className="relative text-[#666684] investing-form">
            <div className="text-sm mb-2 text-[#666684]">
              <label htmlFor="phone">{t("phone")}</label>
            </div>
            <PhoneInput
              id="phone"
              name="phone"
              international
              countryCallingCodeEditable={false}
              defaultCountry={countryData?.country || "AE"}
              value={formik.values.phone}
              onChange={(phone) => formik.setFieldValue("phone", phone)}
              className={`flex w-full overflow-hidden rounded-md text-base border border-[#CCCCD6] bg-[#FFF] phone-setting text-white focus:outline-none
    ${formik.touched.phone && formik.errors.phone ? "border-red-500" : ""}
  `}
              style={{
                display: "flex",
                width: "100%",
                backgroundColor: "#FFF",
                borderRadius: "0.5rem",
                border: "1px solid #CCCCD6",
                padding: "0.75rem",
                color: "#1A1A47",
              }}
            />

            {formik.touched.phone && formik.errors.phone && (
              <p className="text-red-500 text-sm ltr:text-left rtl:text-right mt-1">
                {formik.errors.phone}
              </p>
            )}
          </div>
        </div>

        <div className="relative mb-3">
          <div className="text-sm mb-2 text-[#666684]">
            <label>{t("country")}</label>
          </div>

          <Select
            name="country"
            options={options}
            classNamePrefix="react-select"
            onChange={(selectedOption) =>
              formik.setFieldValue("country", selectedOption?.value)
            }
            onBlur={() => formik.setFieldTouched("country", true)}
            value={options.find((opt) => opt.value === formik.values.country)} // ✅ ADD THIS LINE
            className="text-white cpountry"
            styles={{
              control: (base, state) => ({
                ...base,
                backgroundColor: "#fff",
                borderColor:
                  formik.touched.country && formik.errors.country
                    ? "red"
                    : "#ccccd679",
                color: "#1A1A47",
              }),
              singleValue: (base) => ({
                ...base,
                color: "#1A1A47",
              }),
              menu: (base) => ({
                ...base,
                backgroundColor: "#fff",
                color: "#1A1A47",
              }),
              option: (base, state) => ({
                ...base,
                backgroundColor: state.isFocused ? "#b68756" : "#fff", // gold on hover
                color: state.isFocused ? "#1A1A47" : "#1A1A47", // dark blue text on hover
                cursor: "pointer",
              }),
            }}
          />

          {formik.touched.country && formik.errors.country && (
            <p className="text-red-500 text-sm">{formik.errors.country}</p>
          )}
        </div>

        <div className="mb-5 text-[#666684]">
          <label
            className={`block text-[#666684] text-sm pb-2 ${
              formik.touched.terms && formik.errors.terms ? "text-red-500" : ""
            }`}
            htmlFor="terms"
          >
            {formik.touched.terms && formik.errors.terms
              ? formik.errors.terms
              : t("termsLabel")}
          </label>
          <div className="flex items-start gap-1">
            <input
              type="checkbox"
              name="terms"
              id="terms"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value="checked"
              className="h-5 w-5"
            />
            <p className="inline text-xs md:text-[13px] leading-normal">
              {t("termsText")}
              <a
                className="text-secondary underline"
                href="https://gtcfx-bucket.s3.ap-southeast-1.amazonaws.com/pdf-files/Vanuatu.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                {t("clientAgreement")}
              </a>{" "}
              & the{" "}
              <a
                href={
                  {
                    ar: "/ar/privacy-policy",
                    ru: "/ru/privacy-policy",
                    cn: "/cn/privacy-policy",
                    vi: "/vi/privacy-policy",
                    es: "/es/privacy-policy",
                    pt: "/pt/privacy-policy",
                  }[locale] || "/privacy-policy"
                }
                target="_blank"
                rel="noopener noreferrer"
                className="text-secondary underline ml-1"
              >
                {t("privacyPolicy")}
              </a>
              , {t("conset")}.
            </p>
          </div>
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            disabled={isDisable}
            type="submit"
            className={`bg-gradient-to-b w-full justify-center mt-8 ${isBlue ? "from-[#293794]  to-[#000021]  hover:from-[#000021] hover:to-[#293794]" : "from-[#E1CFBB]  to-[#956D42]  hover:from-[#956D42] hover:to-[#E1CFBB]"}cursor-pointer text-sm md:text-base xl:text-lg text-white font-bold px-8 py-3 rounded-xl transition-all duration-300 flex items-center gap-2`}
          >
            {loading ? t("submitting") : btnText || t("submit")}
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              className="translate-x-[1px]"
              fill="none"
            >
              <path
                d="M9 6l6 6l-6 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
};

export default InvestingForm;
