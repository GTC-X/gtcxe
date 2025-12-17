import { createTranslator } from "next-intl";
import React from "react";
import TechnicalToolPage from "../pages/TechnicalTools";
import { getCanonicalUrl } from "@/helpers/canonicalUrl";

export async function generateMetadata({ params: { locale } }) {
  const messages = (await import(`../../../messages/${locale}.json`)).default;
  const t = createTranslator({ locale, messages });
  const url = getCanonicalUrl(locale, "technical-tools");


  return {
    title: t("metaData.expertAnalysis.title"),
    description: t("metaData.expertAnalysis.des"),
    alternates: {
      canonical: url,
    },
  };
}
const Page = () => {
  return <TechnicalToolPage />; 
};

export default Page;
