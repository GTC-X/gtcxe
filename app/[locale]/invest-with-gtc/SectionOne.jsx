// LiquidityFeaturesSection.jsx
"use client";

export default function LiquidityFeaturesSection() {
  return (
    <section className="bg-white py-16 md:py-20">
      <div className="max-w-6xl mx-auto px-4 text-center">
        {/* ===== Features Wrapper ===== */}
        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {/* ITEM 1 */}
          <div className="bg-[#0F0F0F] text-white p-6 rounded-[14px] flex items-center gap-5 shadow-[0_0_20px_rgba(0,0,0,0.4)]">
            <div className="w-[4px] h-[50px] bg-gradient-to-b from-[#4C74FF] to-[#D1D5FD] rounded-full"></div>
            <p className="text-[17px] font-medium leading-snug">
              Spreads are 0 on popular assets.
            </p>
          </div>

          {/* ITEM 2 */}
          <div className="bg-[#0F0F0F] text-white p-6 rounded-[14px] flex items-center gap-5 shadow-[0_0_20px_rgba(0,0,0,0.4)]">
            <div className="w-[4px] h-[50px] bg-gradient-to-b from-[#4C74FF] to-[#D1D5FD] rounded-full"></div>
            <p className="text-[17px] font-medium leading-snug">
              2100+ instruments
            </p>
          </div>

          {/* ITEM 3 */}
          <div className="bg-[#0F0F0F] text-white p-6 rounded-[14px] flex items-center gap-5 shadow-[0_0_20px_rgba(0,0,0,0.4)]">
            <div className="w-[4px] h-[50px] bg-gradient-to-b from-[#4C74FF] to-[#D1D5FD] rounded-full"></div>
            <p className="text-[17px] font-medium leading-snug">No fees</p>
          </div>

          {/* ITEM 4 */}
          <div className="bg-[#0F0F0F] text-white p-6 rounded-[14px] flex items-center gap-5 shadow-[0_0_20px_rgba(0,0,0,0.4)]">
            <div className="w-[4px] h-[50px] bg-gradient-to-b from-[#4C74FF] to-[#D1D5FD] rounded-full"></div>
            <p className="text-[17px] font-medium leading-snug">
              Invest anywhere with the FxPro app
            </p>
          </div>

          {/* ITEM 5 */}
          <div className="bg-[#0F0F0F] text-white p-6 rounded-[14px] flex items-center gap-5 shadow-[0_0_20px_rgba(0,0,0,0.4)]">
            <div className="w-[4px] h-[50px] bg-gradient-to-b from-[#4C74FF] to-[#D1D5FD] rounded-full"></div>
            <p className="text-[17px] font-medium leading-snug">
              Recommend a friend and receive $50 both
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
