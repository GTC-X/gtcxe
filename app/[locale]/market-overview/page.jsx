import { createTranslator } from "next-intl";
import React from "react";
import MarketOverviewPage from "../pages/MarketOverview";
import { getCanonicalUrl } from "@/helpers/canonicalUrl";

export async function generateMetadata({ params: { locale } }) {
  const messages = (await import(`../../../messages/${locale}.json`)).default;
  const t = createTranslator({ locale, messages });
  const url = getCanonicalUrl(locale, "market-overview");

  return {
    title: t("metaData.marketOverview.title"),
    description: t("metaData.marketOverview.des"),
    alternates: {
      canonical: url,
    },
  };
}
const Page = () => {
  return <MarketOverviewPage />;
};

export default Page;