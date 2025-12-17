import { createTranslator } from "next-intl";
import React from "react";
import LatestNewsPage from "../pages/LatestNews";
import { getCanonicalUrl } from "@/helpers/canonicalUrl";

export async function generateMetadata({ params: { locale } }) {
  const messages = (await import(`../../../messages/${locale}.json`)).default;
  const t = createTranslator({ locale, messages });
  const url = getCanonicalUrl(locale, "latest-news");

  return {
    title: t("tradingTools.latestNews.metaData.title"),
    description: t("tradingTools.latestNews.metaData.des"),
    alternates: {
      canonical: url,
    },
  };
}
const Page = () => {
  return <LatestNewsPage />;
};

export default Page;