"use client";

import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { useLocale } from "next-intl";
import { RiUserLocationLine } from "react-icons/ri";
import { CiMail } from "react-icons/ci";
import OtpInput from "react-otp-input";
import { toast } from "react-toastify";


// PHONE INPUT
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { useLocationDetail } from "@/context/useLocationDetail";

export default function DeleteForm() {
  const locale = useLocale();
  const { countryData } = useLocationDetail();

  const [showOtp, setShowOtp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingOTP, setLoadingOTP] = useState(false);
  const [otpCooldown, setOtpCooldown] = useState(0);
  const [storedOtp, setStoredOtp] = useState("");
  const [verified, setVerified] = useState(false);

  // cooldown timer for "Get Code"
  useEffect(() => {
    if (otpCooldown <= 0) return;
    const id = setInterval(() => setOtpCooldown((s) => s - 1), 1000);
    return () => clearInterval(id);
  }, [otpCooldown]);

  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      phone: countryData?.country,                 // <- phone (PhoneInput)
      platform: "",             // "mt4" | "mt5" | "both"
      accounts: "",             // "502131, 502145"
      reason: "",
      otp: "",
      c1: false,
      c2: false,
      c3: false,
      signature: "",
      dob: "",                  // <- Date of birth
    },
    validationSchema: Yup.object({
      fullName: Yup.string().trim().required("Full name is required"),
      email: Yup.string().email("Enter a valid email").required("Email is required"),
      phone: Yup.string().nullable(), // optional
      platform: Yup.string().oneOf(["mt4", "mt5", "both"], "Select a platform").required("Platform is required"),
      accounts: Yup.string()
        .matches(/^\s*\d+(\s*,\s*\d+)*\s*$/, "Use numbers separated by commas (e.g. 502131, 502145)")
        .required("Enter at least one account number"),
      reason: Yup.string().max(1000, "Keep reason under 1000 chars").nullable(),
      otp: Yup.string().length(6, "OTP must be 6 digits").required("OTP is required"),
      c1: Yup.bool().oneOf([true], "Please confirm ownership"),
      c2: Yup.bool().oneOf([true], "Please acknowledge data removal"),
      c3: Yup.bool().oneOf([true], "Please confirm positions will be closed"),
      signature: Yup.string().trim().required("Signature is required"),
      dob: Yup.string().required("Date of birth is required"), // date input returns string
    }),
    onSubmit: async (values) => {
      if (!verified) {
        toast.error("Please verify the OTP first.");
        return;
      }
      try {
        setLoading(true);

        const payload = {
          fullName: values.fullName.trim(),
          email: values.email.trim(),
          phone: values.phone || null,
          platform: values.platform,
          accounts: values.accounts.split(",").map((s) => s.trim()).filter(Boolean),
          reason: values.reason?.trim() || null,
          confirmations: {
            ownerConfirm: values.c1,
            dataRemovalAcknowledge: values.c2,
            positionsClosedConfirm: values.c3,
          },
          signature: values.signature.trim(),
          dob: values.dob, // ISO yyyy-mm-dd
        };

        await axios.post("/api/delete-account", payload);
        toast.success("Your deletion request has been submitted.");
        window.location.href = `/${locale}/thank-you`;
      } catch (err) {
        toast.error(err?.response?.data?.message || "Request failed");
      } finally {
        setLoading(false);
      }
    },
  });

  const sendVerificationCode = async () => {
    if (!formik.values.email) {
      toast.error("Please enter your email first");
      return;
    }
    if (otpCooldown > 0) return;

    try {
      setLoadingOTP(true);
      
      // Validate email first
      const validationResponse = await axios.post(`/api/validate-email`, {
        email: formik.values.email,
      });

      if (!validationResponse.data.valid) {
        toast.error("Invalid email address. Please use a valid email.");
        setLoadingOTP(false);
        return;
      }

      // If email is valid, send OTP
      const res = await axios.post("/api/otp-smtp", { email: formik.values.email });
      setStoredOtp(res?.data?.message || "");
      setShowOtp(true);
      setVerified(false);
      formik.setFieldValue("otp", "");
      toast.success("OTP sent");
      setOtpCooldown(60);
    } catch (err) {
      setShowOtp(false);
      if (err.response?.data?.reason) {
        toast.error("Invalid email address");
      } else {
        toast.error("Failed to send OTP. Try again.");
      }
    } finally {
      setLoadingOTP(false);
    }
  };

  // Auto-verify when 6 digits entered
  const handleOtpChange = (otp) => {
    formik.setFieldValue("otp", otp);
    if (otp && otp.length === 6) {
      if (otp === storedOtp) {
        setVerified(true);
        toast.success("Email verified");
      } else {
        setVerified(false);
        toast.error("Invalid OTP");
      }
    } else {
      setVerified(false);
    }
  };

  const boxStyle = useMemo(
    () => ({
      background: "linear-gradient(to bottom, rgba(182,135,86,.65) 40%, rgba(5,3,49,1) 60%)",
      borderRadius: "12px",
    }),
    []
  );

  const inputBase =
    "w-full bg-white px-4 py-3 pl-11 rounded-xl border transition " +
    "outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 " +
    "hover:border-blue-400";

  const labelCls = "block text-sm font-medium mb-1 text-gray-700";
  const errCls = "text-red-600 text-xs mt-1";

  return (
    <section className="w-full px-4 py-6">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="relative py-[1px] px-[1px] shadow-sm" style={boxStyle}>
          <div className="rounded-xl overflow-hidden">
            <h2 className="text-center py-4 bg-gradient-to-b from-[#202d7bdb] via-[#050331] to-[#050331] text-lg text-white">
              Trading Account Deletion Request Form
            </h2>
          </div>
        </div>

        {/* Card */}
        <div className="relative -mt-2">
          <form
            onSubmit={formik.handleSubmit}
            className="bg-white rounded-xl shadow-md p-5 md:p-6 mx-auto border border-gray-100 space-y-5"
          >
            {/* Full Name */}
            <div>
              <label className={labelCls}>Full Name:</label>
              <div className="relative">
                <RiUserLocationLine className="absolute top-3.5 left-3 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  {...formik.getFieldProps("fullName")}
                  placeholder="Enter Full Name"
                  className={`${inputBase} ${formik.touched.fullName && formik.errors.fullName ? "border-red-500 focus:border-red-500 focus:ring-red-200" : "border-gray-300"}`}
                />
              </div>
              {formik.touched.fullName && formik.errors.fullName && <p className={errCls}>{formik.errors.fullName}</p>}
            </div>

            {/* Email + Get Code */}
            <div>
              <label className={labelCls}>Registered Email Address:</label>
              <div className="relative">
                <CiMail className="absolute top-3.5 left-3 text-gray-400 h-5 w-5" />
                <input
                  type="email"
                  placeholder="Enter Email Address"
                  {...formik.getFieldProps("email")}
                  className={`${inputBase} ${formik.touched.email && formik.errors.email ? "border-red-500 focus:border-red-500 focus:ring-red-200" : "border-gray-300"}`}
                />
                <button
                  type="button"
                  onClick={sendVerificationCode}
                  disabled={loadingOTP || otpCooldown > 0}
                  className={`absolute top-1.5 right-1.5 rounded-lg text-white py-2 px-3 text-sm bg-[#0d3f8a] shadow hover:opacity-95 transition ${loadingOTP || otpCooldown > 0 ? "opacity-70 cursor-not-allowed" : ""}`}
                >
                  {loadingOTP ? "Sending" : otpCooldown > 0 ? `${otpCooldown}s` : "Get Code"}
                </button>
              </div>
              {formik.touched.email && formik.errors.email && <p className={errCls}>{formik.errors.email}</p>}
            </div>

            {/* OTP */}
            {showOtp && (
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <p className="text-sm">Enter OTP sent to your email</p>
                  {verified && (
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Verified</span>
                  )}
                </div>
                <OtpInput
                  value={formik.values.otp}
                  onChange={handleOtpChange}
                  numInputs={6}
                  containerStyle={{ justifyContent: "flex-start", alignItems: "center", gap: "8px" }}
                  renderInput={(props) => <input {...props} />}
                  isInputNum
                  inputStyle={{
                    borderRadius: "10px",
                    padding: "12px",
                    width: "16.6%",
                    backgroundColor: "#f3f4f6",
                    color: "#111827",
                    fontWeight: 600,
                    outlineColor: "#0d3f8a",
                    border: formik.touched.otp && formik.errors.otp ? "1px solid #ef4444" : "1px solid #d1d5db",
                  }}
                />
                {formik.touched.otp && formik.errors.otp && <p className="text-red-600 text-xs mt-2">{formik.errors.otp}</p>}
              </div>
            )}


            {/* Phone (PhoneInput) */}
            <div>
              <label className={labelCls}>Phone Number (optional):</label>
              <div
                className={`rounded-xl border ${formik.touched.phone && formik.errors.phone ? "border-red-500" : "border-gray-300"} px-3 py-1`}
              >
                <PhoneInput
                  international
                  countryCallingCodeEditable={false}
                  defaultCountry={countryData?.country || "AE"}
                  value={formik.values.phone}
                  onChange={(val) => formik.setFieldValue("phone", val)}
                  className="w-full [&_.PhoneInputInput]:w-full [&_.PhoneInputInput]:py-2.5 [&_.PhoneInputInput]:outline-none"
                />
              </div>
              {formik.touched.phone && formik.errors.phone && <p className={errCls}>{formik.errors.phone}</p>}
            </div>

            {/* Platform */}
            <div>
              <p className="block text-sm font-medium text-gray-700 mb-1">Platform:</p>
              <div className="space-y-2">
                <label className="flex items-center gap-2">
                  <input type="radio" name="platform" value="mt4" checked={formik.values.platform === "mt4"} onChange={formik.handleChange} />
                  <span>MT4</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="radio" name="platform" value="mt5" checked={formik.values.platform === "mt5"} onChange={formik.handleChange} />
                  <span>MT5</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="radio" name="platform" value="both" checked={formik.values.platform === "both"} onChange={formik.handleChange} />
                  <span>Both</span>
                </label>
              </div>
              {formik.touched.platform && formik.errors.platform && <p className={errCls}>{formik.errors.platform}</p>}
            </div>

            {/* Accounts */}
            <div>
              <label className={labelCls}>Accounts to Delete:</label>
              <input
                type="text"
                placeholder="e.g. 502131, 502145, 503201"
                {...formik.getFieldProps("accounts")}
                className={`w-full bg-white px-4 py-3 rounded-xl border outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 ${formik.touched.accounts && formik.errors.accounts ? "border-red-500" : "border-gray-300"}`}
              />
              {formik.touched.accounts && formik.errors.accounts && <p className={errCls}>{formik.errors.accounts}</p>}
            </div>

            {/* Reason */}
            <div>
              <label className={labelCls}>Reason for Deletion (optional):</label>
              <textarea
                rows={4}
                {...formik.getFieldProps("reason")}
                className="w-full bg-white px-4 py-3 rounded-xl border border-gray-300 outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
              />
            </div>


            {/* Confirmations */}
            <div className="space-y-3">
              <label className="flex items-start gap-2">
                <input type="checkbox" name="c1" checked={formik.values.c1} onChange={formik.handleChange} />
                <span className="text-sm">I confirm that I am the rightful owner of the above trading accounts and wish to permanently delete them.</span>
              </label>
              {formik.touched.c1 && formik.errors.c1 && <p className={errCls}>{formik.errors.c1}</p>}

              <label className="flex items-start gap-2">
                <input type="checkbox" name="c2" checked={formik.values.c2} onChange={formik.handleChange} />
                <span className="text-sm">I understand that once deleted, all account data, balances, and history will no longer be accessible.</span>
              </label>
              {formik.touched.c2 && formik.errors.c2 && <p className={errCls}>{formik.errors.c2}</p>}

              <label className="flex items-start gap-2">
                <input type="checkbox" name="c3" checked={formik.values.c3} onChange={formik.handleChange} />
                <span className="text-sm">I understand that any pending positions must be closed prior to deletion.</span>
              </label>
              {formik.touched.c3 && formik.errors.c3 && <p className={errCls}>{formik.errors.c3}</p>}
            </div>

            {/* Signature */}
            <div>
              <label className={labelCls}>Signature:</label>
              <input
                type="text"
                placeholder="Type Your Full Name"
                {...formik.getFieldProps("signature")}
                className={`w-full bg-white px-4 py-3 rounded-xl border outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 ${formik.touched.signature && formik.errors.signature ? "border-red-500" : "border-gray-300"}`}
              />
              {formik.touched.signature && formik.errors.signature && <p className={errCls}>{formik.errors.signature}</p>}
            </div>

            {/* Date of Birth (calendar picker) */}
            {/* Date of Birth (native calendar) */}
            <div>
              <label className={labelCls}>Date of Birth:</label>
              <input
                type="date"
                {...formik.getFieldProps("dob")}
                // Opens the calendar on mouse/touch click
                onClick={(e) => e.currentTarget.showPicker?.()}
                // Accessible: Space/Enter also open it
                onKeyDown={(e) => {
                  if (e.key === " " || e.key === "Enter") {
                    e.preventDefault();
                    e.currentTarget.showPicker?.();
                  }
                }}
                placeholder="DD/MM/YYYY"
                className={`w-full bg-white px-4 py-3 rounded-xl border outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 ${formik.touched.dob && formik.errors.dob ? "border-red-500" : "border-gray-300"
                  }`}
              />
              {formik.touched.dob && formik.errors.dob && (
                <p className={errCls}>{formik.errors.dob}</p>
              )}
            </div>


            {/* Submit */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={loading || !verified}
                className={`w-full md:w-auto bg-[#0d3f8a] hover:bg-[#0b3573] text-white font-medium px-6 py-2.5 rounded-md shadow-sm transition ${loading || !verified ? "opacity-60 cursor-not-allowed" : ""}`}
              >
                {loading ? "Submitting..." : "Submit Request"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}