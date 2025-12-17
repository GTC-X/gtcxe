// WhySeptemberMattersSection.tsx
"use client";

import React from "react";
import { useTranslations } from "next-intl";

export default function WhySeptemberMattersSection() {
  const t = useTranslations("investTradeGold.sectionThree");

  return (
    <section className="bg-[#E7F5FF] py-16 md:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
          {/* LEFT SIDE CONTENT */}
          <div className="w-full lg:w-1/2">
            <h2 className="text-[30px] md:text-[38px] leading-tight font-semibold text-[#111827] mb-4">
              {t("title").split('\n').map((line, i) => (
                <React.Fragment key={i}>
                  {line}
                  {i < t("title").split('\n').length - 1 && <br />}
                </React.Fragment>
              ))}
            </h2>

            <p className="text-[14px] md:text-[15px] text-[#4B5563] leading-relaxed mb-6 max-w-xl">
              {t("description")}
            </p>

            {/* TWO CARDS */}
            <div className="flex flex-col sm:flex-row gap-4 mb-5">
              {/* Card 1 - Green */}
              <div className="flex-1 border border-[#16A34A] bg-[#E6FBEF] rounded-[18px] px-5 py-4 shadow-[0_0_0_1px_rgba(0,0,0,0.02)]">
                <p className="text-[14px] font-semibold text-[#111827] mb-1">
                  {t("card1.title").split('\n').map((line, i) => (
                    <React.Fragment key={i}>
                      {line}
                      {i < t("card1.title").split('\n').length - 1 && <br />}
                    </React.Fragment>
                  ))}
                </p>
                <p className="text-[13px] text-[#4B5563] leading-snug mb-2">
                  {t("card1.description").split('\n').map((line, i) => (
                    <React.Fragment key={i}>
                      {line}
                      {i < t("card1.description").split('\n').length - 1 && <br />}
                    </React.Fragment>
                  ))}
                </p>
                <div className="flex justify-end">
                  <span className="text-[18px] text-[#16A34A] leading-none">{t("card1.arrow")}</span>
                </div>
              </div>

              {/* Card 2 - Red */}
              <div className="flex-1 border border-[#F97373] bg-[#FFECEC] rounded-[18px] px-5 py-4 shadow-[0_0_0_1px_rgba(0,0,0,0.02)]">
                <p className="text-[14px] font-semibold text-[#111827] mb-1">
                  {t("card2.title").split('\n').map((line, i) => (
                    <React.Fragment key={i}>
                      {line}
                      {i < t("card2.title").split('\n').length - 1 && <br />}
                    </React.Fragment>
                  ))}
                </p>
                <p className="text-[13px] text-[#4B5563] leading-snug mb-2">
                  {t("card2.description").split('\n').map((line, i) => (
                    <React.Fragment key={i}>
                      {line}
                      {i < t("card2.description").split('\n').length - 1 && <br />}
                    </React.Fragment>
                  ))}
                </p>
                <div className="flex justify-end">
                  <span className="text-[18px] text-[#F97373] leading-none">{t("card2.arrow")}</span>
                </div>
              </div>
            </div>

            <p className="text-[13px] md:text-[14px] text-[#4B5563] leading-relaxed max-w-xl">
              {t("conclusion")}
            </p>
          </div>

          {/* RIGHT SIDE IMAGE */}
          <div className="w-full lg:w-1/2 flex flex-col items-center">
            <div className="w-full max-w-[520px] bg-white rounded-[30px] shadow-[0_18px_40px_rgba(15,23,42,0.06)] overflow-hidden">
              <img
                src="https://www.mitradeforex.com/landing/dl-fedm-fscr-iv-250901/images/img_qushi-1757413152950-bafad43c.webp"
                alt={t("chartAlt")}
                className="w-full h-auto block"
              />
            </div>

            <p className="mt-4 text-[10px] md:text-[11px] text-[#9CA3AF] text-center">
              {t("footnote")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
