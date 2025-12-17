"use client";

import WhyChooseIcon from "./SectionThree";

export default function WhyFxProSection() {
  return (
    <section className="bg-white py-16 md:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Phones + background */}
        <div className="relative flex justify-center mb-10 md:mb-16">
          {/* Candlestick-ish background – optional */}
          <div className=" inset-x-0 -top-4 flex justify-center gap-3">
            <img
              src="/invest3.webp"
              alt="Trading app screen 1"
              className="h-64 md:h-96 object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.35)]"
            />
          </div>


        </div>

        {/* Title */}
        <h2 className="text-center text-[22px] md:text-[24px] font-semibold text-[#111827] mb-8">
          Why FxPro?
        </h2>

       <WhyChooseIcon />

        {/* CTA button */}
        <div className="flex flex-col items-center gap-2 mt-8">
          <button className="px-10 py-2.5 rounded-full bg-[#005BFF] hover:bg-[#0046C4] text-white text-[14px] font-medium shadow-[0_15px_30px_rgba(37,99,235,0.5)] transition">
            register
          </button>
          <p className="text-[11px] md:text-[12px] text-[#6B7280]">
            With the world&apos;s #1 broker
          </p>
        </div>
      </div>
    </section>
  );
}
