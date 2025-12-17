import { createTranslator } from "next-intl";
import React from "react";
import SwapUpdatePage from "../pages/SwapUpdate";
import { getCanonicalUrl } from "@/helpers/canonicalUrl";

export async function generateMetadata({ params: { locale } }) {
    const messages = (await import(`../../../messages/${locale}.json`)).default;
    const t = createTranslator({ locale, messages });
    const url = getCanonicalUrl(locale, "swap-update");
  
    return {
      title: t("swapUpdate.metaData.title"),
      description: t("swapUpdate.metaData.des"),
      alternates: {
        canonical: url,
      },
    };
  }

const page = ()=>{
    return <SwapUpdatePage/>
} 

export default page;