import { createTranslator } from "next-intl";
import React from "react";
import EconomicNewspage from "../pages/EconomicNews";
import { getCanonicalUrl } from "@/helpers/canonicalUrl";

export async function generateMetadata({ params: { locale } }) {
  const messages = (await import(`../../../messages/${locale}.json`)).default;
  const t = createTranslator({ locale, messages });
  const url = getCanonicalUrl(locale, "economic-news-feed");

  return {
    title: t("tradingTools.ecoNews.metaData.title"),
    description: t("tradingTools.ecoNews.metaData.des"),
    alternates: {
      canonical: url,
    },
  };
}
const Page = () => {
  return <EconomicNewspage />;
};

export default Page;