// FedHistorySection.tsx
"use client";

import React from "react";
import { useTranslations } from "next-intl";

export default function FedHistorySection() {
  const t = useTranslations("investTradeGold.sectionTwo");

  return (
    <section className="bg-[#F4F6FB] py-16 md:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center md:items-center gap-10 md:gap-16">
          {/* Left – cards image */}
          <div className="w-full md:w-1/2 flex justify-center md:justify-start">
            <img
              src="https://www.mitradeforex.com/landing/dl-fedm-fscr-iv-250901/images/img_xinwen-1757413152950-a30ce838.webp"
              alt={t("imageAlt")}
              className="w-full max-w-[420px] h-auto"
            />
          </div>

          {/* Right – text content */}
          <div className="w-full md:w-1/2 text-left">
            <h2 className="text-[28px] md:text-[34px] leading-tight font-semibold text-[#111827] mb-4">
              {t("title").split('\n').map((line, i) => (
                <React.Fragment key={i}>
                  {line}
                  {i < t("title").split('\n').length - 1 && <br />}
                </React.Fragment>
              ))}
            </h2>

            <p className="text-[14px] md:text-[15px] text-[#6B7280] leading-relaxed mb-3">
              {t("paragraph1")}
            </p>

            <p className="text-[14px] md:text-[15px] text-[#6B7280] leading-relaxed">
              {t("paragraph2")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
