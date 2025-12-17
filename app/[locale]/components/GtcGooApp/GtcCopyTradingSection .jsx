'use client'
import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";

const GtcCopyTradingSection = () => {
  const t = useTranslations("gtcGoApp.copyTrading");

  return (
    <section className="relative py-12 md:py-14 bg-[#f8f8f8] overflow-hidden border-t border-slate-200 border-b" id="copy">
      <div className="container grid gap-10 lg:grid-cols-2 items-center">
        {/* LEFT: Text */}
        <div className="order-2 lg:order-1 text-center ltr:lg:text-left rtl:lg:text-right space-y-5 lg:space-y-3 max-w-xl">
          <p className="text-sm md:text-lg font-semibold text-secondary uppercase tracking-wide">
            {t("eyebrow")}
          </p>

          <h2 className="text-2xl md:text-4xl font-semibold bg-gradient-to-r from-[#293794] via-[#000021] to-[#000021] text-transparent bg-clip-text capitalize max-w-xl">
            {t("title1")}
            <span className="block">{t("title2")}</span>
          </h2>

          <p className="text ltr:sm:text-left rtl:sm:text-right">
            {t("description")}
          </p>

          {/* Bullet points */}
          <ul className="space-y-3 text-sm sm:text-base text-slate-600">
            <li className="flex items-start gap-2">
              <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[#293794]" />
              <span>{t("features.privateDomain")}</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[#293794]" />
              <span>{t("features.socialSignals")}</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[#293794]" />
              <span>{t("features.signalType")}</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[#293794]" />
              <span>
                {t("features.customCycles")}
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[#293794]" />
              <span>{t("features.extraFunds")}</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[#293794]" />
              <span>
                {t("features.withdrawals")}
              </span>
            </li>
          </ul>

          {/* CTA */}
        <div className="pt-2">
  <button
    onClick={() => {
      document.getElementById("hero")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }}
    className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-[#293794] to-[#000021] text-white text-sm font-semibold shadow-lg shadow-blue-200/40 hover:opacity-90 transition"
  >
    {t("downloadButton")}
  </button>
</div>

        </div>

        {/* RIGHT: Phone mockup */}
        <div className="relative flex justify-center lg:justify-end order-1 lg:order-2">
          {/* Gradient card background */}
           {/* Background Gradient Circle (desktop / tablet only) */}
                   <div
                     className="
                       absolute 
                       right-0 
                       top-10 
                       h-[520px] w-[520px] 
                       rounded-full 
                       bg-gradient-to-br 
                       from-[#e8eefc] via-[#b8c6e0] to-[#9aa7c0] 
                       opacity-60 
                       blur-[50px] 
                       hidden sm:block
                     "
                   />
         
                   {/* Phone Image */}
                   <div className="relative w-full h-[320px] sm:h-[480px] lg:h-[600px]">
                     <Image
                       src="/app/capy.webp"
                       alt={t("appImageAlt")}
                       fill
                       className="object-contain"
                     />
                   </div>
        </div>
      </div>
    </section>
  );
};

export default GtcCopyTradingSection;
