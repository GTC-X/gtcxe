"use client";

import React from "react";
import Image from "next/image";
import MobileAppDownloadBanner from "./MobileAppDownloadBanner";
import { useTranslations } from "next-intl";

const GtcHero = () => {
  const t = useTranslations("gtcGoApp.hero");

  return (
    <section className="bg-white" id="hero">
      <div className="container py-12 md:py-16 lg:py-20 grid md:gap-10 lg:grid-cols-2 items-center">
        {/* RIGHT SIDE (APP MOCKUP) – MOBILE FIRST */}
        <div className="relative flex justify-center lg:justify-end order-1 lg:order-2">
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
              src="/app/new-2.png"
              alt={t("appImageAlt")}
              fill
              className="object-contain"
            />
          </div>
        </div>

        {/* LEFT CONTENT */}
        <div className=" space-y-4 md:space-y- order-2 lg:order-1 flex flex-col items-center lg:items-start text-center ltr:lg:text-left rtl:lg:text-right">
          {/* Eyebrow text */}
          <p className="text-sm md:text-base font-medium text-secondary uppercase max-w-[300px] md:max-w-full">
            {t("eyebrow")}
          </p>

          {/* Heading */}
          <h1 className="uppercase ltr:text-3xl ltr:md:text-4xl ltr:lg:text-[55px] rtl:text-3xl rtl:md:text-[40px] rtl:lg:text-[45px] font-black bg-gradient-to-r from-[#293794] via-[#000021] to-[#000021] text-transparent bg-clip-text">
            <span className="md:leading-[55px] block">{t("title1")}</span>
            <span className="md:leading-[55px] block">
              {t("title2")}
            </span>
          </h1>

          {/* Description */}
          <p className="text-sm sm:text-base xl:text-lg max-w-lg">
            {t("description")}
          </p>

          {/* QR CODE */}
          <div className="w-[160px] h-[160px] relative hidden md:block">
            <Image
              src="/app/qrcode.webp"
              alt={t("qrCodeAlt")}
              fill
              className="object-contain"
            />
          </div>

          {/* iOS / Android label */}
          <div className="flex items-center justify-center lg:justify-start gap-4 mt-3 hidden md:block">
            <span className="px-4 py-1 text-sm lg:text-base text-primary border border-primary/30 rounded-full">
              {t("availableOn")}
            </span>
          </div>
           <MobileAppDownloadBanner
              androidLink="https://play.google.com/store/search?q=GTC%20Go&c=apps&hl=en"
              iosLink="https://apps.apple.com/ae/app/gtc-go/id6753007277"
            />
        </div>
      </div>
    </section>
  );
};

export default GtcHero;
