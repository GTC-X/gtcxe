import { createTranslator } from "next-intl";
import React from "react";
import SwapFreeNewPage from "../pages/SwapFreeNew";
import { getCanonicalUrl } from "@/helpers/canonicalUrl";

export async function generateMetadata({ params: { locale } }) {
    const messages = (await import(`../../../messages/${locale}.json`)).default;
    const t = createTranslator({ locale, messages });
    const url = getCanonicalUrl(locale, "swap-free-trading");
  
    return {
      title: "Swap-Free Trading at GTCFX - Interest-Free Trading for Eligible Traders",
      description: "Trade with GTCFX under interest-free conditions. No overnight swap charges on selected instruments. Designed for eligible traders seeking Islamic or swap-free trading.",
      alternates: {
        canonical: url,
      },
    };
  }

const page = ()=>{
    return <SwapFreeNewPage/>
} 

export default page;