// OpenAccountStepsSection.tsx
"use client";

import { useTranslations } from "next-intl";

export default function OpenAccountStepsSection() {
  const t = useTranslations("investTradeGold.sectionFive");

  return (
    <section className="bg-[#E7F5FF] py-16 md:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <h2 className="text-center text-[#111827] font-semibold text-[26px] md:text-[32px] leading-tight mb-12">
          {t("title")}
        </h2>

        {/* Steps row */}
        <div className="flex flex-col items-center gap-10 md:flex-row md:justify-center md:gap-20">
          {/* Step 1 */}
          <div className="flex flex-col items-center text-center">
            <img
              src="/invest-icon-1.png"
              alt={t("step1.alt")}
              className="w-[110px] md:w-[130px] h-auto mb-4"
            />
            <p className="text-[15px] md:text-[16px] font-medium text-[#111827]">
              {t("step1.title")}
            </p>
          </div>

          {/* Dotted line 1 */}
          <span className="hidden md:inline-block w-20 border-t border-dashed border-[#111827]" />

          {/* Step 2 */}
          <div className="flex flex-col items-center text-center">
            <img
              src="/invest-icon-2.png"
              alt={t("step2.alt")}
              className="w-[110px] md:w-[130px] h-auto mb-4"
            />
            <p className="text-[15px] md:text-[16px] font-medium text-[#111827]">
              {t("step2.title")}
            </p>
          </div>

          {/* Dotted line 2 */}
          <span className="hidden md:inline-block w-20 border-t border-dashed border-[#111827]" />

          {/* Step 3 */}
          <div className="flex flex-col items-center text-center">
            <img
              src="/invest-icon-3.png"
              alt={t("step3.alt")}
              className="w-[110px] md:w-[130px] h-auto mb-4"
            />
            <p className="text-[15px] md:text-[16px] font-medium text-[#111827]">
              {t("step3.title")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
