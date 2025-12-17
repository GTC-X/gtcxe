// FedDecisionReadySection.tsx
"use client";

import { useTranslations } from "next-intl";

export default function FedDecisionReadySection() {
  const t = useTranslations("investTradeGold.sectionFour");

  return (
    <section className="bg-black py-16 md:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <h2 className="text-center text-white font-semibold text-[26px] md:text-[32px] leading-tight mb-10">
          {t("title")}
        </h2>

        {/* Cards */}
        <div className="grid gap-6 md:grid-cols-3">
          {/* Card 1 */}
          <div className="bg-white rounded-[24px] px-8 py-10 shadow-[0_16px_40px_rgba(0,0,0,0.12)]">
            {/* Icon */}
            <div className="mb-6 text-black">
              <span className="inline-flex items-center justify-center w-8 h-8 border border-gray-400 rounded-lg text-[18px]">
                {t("card1.icon")}
              </span>
            </div>

            <h3 className="text-[18px] font-semibold text-[#111827] mb-3">
              {t("card1.title")}
            </h3>
            <p className="text-[14px] text-[#4B5563] leading-relaxed">
              {t("card1.description")}
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-[24px] px-8 py-10 shadow-[0_16px_40px_rgba(0,0,0,0.12)]">
            <div className="mb-6 text-black">
              <span className="inline-flex items-center justify-center w-8 h-8 border border-gray-400 rounded-lg text-[18px]">
                {t("card2.icon")}
              </span>
            </div>

            <h3 className="text-[18px] font-semibold text-[#111827] mb-3">
              {t("card2.title")}
            </h3>
            <p className="text-[14px] text-[#4B5563] leading-relaxed">
              {t("card2.description")}
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-[24px] px-8 py-10 shadow-[0_16px_40px_rgba(0,0,0,0.12)]">
            <div className="mb-6 text-black">
              <span className="inline-flex items-center justify-center w-8 h-8 border border-gray-400 rounded-lg text-[18px]">
                {t("card3.icon")}
              </span>
            </div>

            <h3 className="text-[18px] font-semibold text-[#111827] mb-3">
              {t("card3.title")}
            </h3>
            <p className="text-[14px] text-[#4B5563] leading-relaxed">
              {t("card3.description")}
            </p>
          </div>
        </div>

        {/* Footnote */}
        <p className="mt-6 text-center text-[11px] text-[#9CA3AF]">
          {t("footnote")}
        </p>
      </div>
    </section>
  );
}
