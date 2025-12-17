"use client";

import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";

const GtcFeatureSection = () => {
  const t = useTranslations("gtcGoApp.featureSection");
  const numberBox = "flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#293794] to-[#000021] text-white font-semibold shadow-md shadow-blue-200/30"
                   
  return (
    <section className="bg-white py-12 md:py-5" id="trading">
      <div className="container grid gap-10 lg:grid-cols-2 items-center">
        {/* LEFT: Phone over gradient card */}
        <div className="relative flex justify-center lg:justify-start order-1 lg:order-1">
          {/* Gradient card background */}
           {/* Background Gradient Circle (desktop / tablet only) */}
                 <div
                   className="
                     absolute 
                     left-0 
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
                     src="/app/02.png"
                     alt={t("appImageAlt")}
                     fill
                     className="object-contain"
                   />
                 </div>
        </div>

        {/* RIGHT: Text content */}
        <div className="order-2 lg:order-2 text-center ltr:lg:text-left rtl:lg:text-right space-y-5 lg:space-y-2">
          <p className="text-sm md:text-lg font-semibold text-secondary uppercase tracking-wide">
            {t("eyebrow")}
          </p>

          <h2 className="text-2xl md:text-4xl font-semibold bg-gradient-to-r from-[#293794] via-[#000021] to-[#000021] text-transparent bg-clip-text capitalize max-w-md">
            {t("title")}
          </h2>

          <p className="text ltr:md:text-left rtl:md:text-right max-w-lg mx-auto lg:mx-0 pb-5">
            {t("description")}
          </p>

         <div className="space-y-3 max-w-xl mx-auto lg:mx-0">

  {/* Item 1 */}
  <div className="flex items-start gap-4">
    <div className={numberBox}>01</div>

    <div className="ltr:text-left rtl:text-right space-y-2">
      <p className="text-sm sm:text-base font-semibold text-slate-900">
        {t("items.item1.title")}
      </p>
      <p className="text-xs sm:text-sm text-slate-600">
        {t("items.item1.description")}
      </p>
    </div>
  </div>

  {/* Item 2 */}
  <div className="flex items-start gap-4">
    <div className={numberBox}>02</div>

    <div className="ltr:text-left rtl:text-right space-y-2">
      <p className="text-sm sm:text-base font-semibold text-slate-900">
        {t("items.item2.title")}
      </p>
      <p className="text-xs sm:text-sm text-slate-600">
        {t("items.item2.description")}
      </p>
    </div>
  </div>

  {/* Item 3 */}
  <div className="flex items-start gap-4">
    <div className={numberBox}>03</div>

    <div className="ltr:text-left rtl:text-right space-y-2">
      <p className="text-sm sm:text-base font-semibold text-slate-900">
        {t("items.item3.title")}
      </p>
      <p className="text-xs sm:text-sm text-slate-600">
        {t("items.item3.description")}
      </p>
    </div>
  </div>


</div>


        </div>
      </div>
    </section>
  );
};

export default GtcFeatureSection;
