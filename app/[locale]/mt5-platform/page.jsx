import { createTranslator } from "next-intl";
import React from "react";
import MT5PlatformPage from "../pages/MT5Platform";
import { getCanonicalUrl } from "@/helpers/canonicalUrl";

export async function generateMetadata({ params: { locale } }) {
    const messages = (await import(`../../../messages/${locale}.json`)).default;
    const t = createTranslator({ locale, messages });
    const url = getCanonicalUrl(locale, "mt5-platform");
  
    return {
      title: t("metaData.mt5Platform.title"),
      description: t("metaData.mt5Platform.des"),
      alternates: {
        canonical: url,
      },
    };
  }

const page = ()=>{
    return <MT5PlatformPage/>
} 

export default page;