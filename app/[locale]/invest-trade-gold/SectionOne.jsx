// FedMeetingsSection.tsx
"use client";

import { useTranslations } from "next-intl";

export default function FedMeetingsSection() {
  const t = useTranslations("investTradeGold.sectionOne");

  return (
    <section className="bg-white py-16 md:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Heading */}
        <h2 className="text-[28px] md:text-[32px] font-semibold text-[#111827] mb-3">
          {t("title")}
        </h2>

        {/* Subheading */}
        <p className="text-[13px] md:text-[14px] text-[#6B7280] max-w-2xl mx-auto mb-10 md:mb-12 leading-relaxed">
          {t("subtitle")}
        </p>

        {/* Main container */}
        <div className="">
          <div className="grid gap-8 md:grid-cols-2">
            {/* LEFT COLUMN */}
            <div className="space-y-6 bg-gradient-to-b from-[#F0E8DE] to-[#B48755] rounded-[24px] px-4 sm:px-6 md:px-10 py-8 md:py-10">
              <p className="text-[12px] md:text-[13px] text-[#6B7280] text-left leading-snug">
                {t("leftColumn.description")}
              </p>

              {/* Card 1 – Gold (Bearish) */}
              <div className="bg-[#FEE2E2] rounded-[20px]  shadow-[0_0_0_1px_rgba(0,0,0,0.02)]">
                <div className="w-full overflow-hidden rounded-[16px] bg-white/40">
                  <img
                    src="https://www.mitradeforex.com/landing/dl-fedm-fscr-iv-250901/images/gold_down_1920_EN-1757413152950-0a60bb6d.webp"
                    alt={t("leftColumn.card1Alt")}
                    className="w-full h-auto block"
                  />
                </div>
              </div>

              {/* Card 2 – USD/JPY (Bullish) */}
              <div className="bg-[#DCFCE7] rounded-[20px]  shadow-[0_0_0_1px_rgba(0,0,0,0.02)]">
                <div className="w-full overflow-hidden rounded-[16px] bg-white/40">
                  <img
                    src="https://www.mitradeforex.com/landing/dl-fedm-fscr-iv-250901/images/gold_up_1920_EN-1757413152950-5dc5289b.webp"
                    alt={t("leftColumn.card2Alt")}
                    className="w-full h-auto block"
                  />
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN */}
            <div className="space-y-6 bg-gradient-to-b from-[#F0E8DE] to-[#B48755] rounded-[24px] px-4 sm:px-6 md:px-10 py-8 md:py-10">
              <p className="text-[12px] md:text-[13px] text-[#6B7280] text-left leading-snug">
                {t("rightColumn.description")}
              </p>

              {/* Card 3 – Gold (Bullish) */}
              <div className="bg-[#DCFCE7] rounded-[20px]  shadow-[0_0_0_1px_rgba(0,0,0,0.02)]">
                <div className="w-full overflow-hidden rounded-[16px] bg-white/40">
                  <img
                    src="https://www.mitradeforex.com/landing/dl-fedm-fscr-iv-250901/images/dollar_up_1920_EN-1757413152950-b575932e.webp"
                    alt={t("rightColumn.card3Alt")}
                    className="w-full h-auto block"
                  />
                </div>
              </div>

              {/* Card 4 – USD/JPY (Bearish) */}
              <div className="bg-[#FEE2E2] rounded-[20px]  shadow-[0,0,0,1px_rgba(0,0,0,0.02)]">
                <div className="w-full overflow-hidden rounded-[16px] bg-white/40">
                  <img
                    src="https://www.mitradeforex.com/landing/dl-fedm-fscr-iv-250901/images/dollar_down_1920_EN-1757413152950-feac1c48.webp"
                    alt={t("rightColumn.card4Alt")}
                    className="w-full h-auto block"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Small note under cards */}
          <p className="mt-6 md:mt-8 text-[10px] md:text-[11px] text-[#9CA3AF] text-center">
            {t("footnote")}
          </p>
        </div>
      </div>
    </section>
  );
}
