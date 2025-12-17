import { createTranslator } from "next-intl";
import React from "react";
import LiquidityPage from "../pages/Liquidity";
import { getCanonicalUrl } from "@/helpers/canonicalUrl";

export async function generateMetadata({ params: { locale } }) {
  const messages = (await import(`../../../messages/${locale}.json`)).default;
  const t = createTranslator({ locale, messages });
  const url = getCanonicalUrl(locale, "liquidity-technology");

  return {
    title: t("metaData.liquidityTechnology.title"),
    description: t("metaData.liquidityTechnology.des"),
    alternates: {
      canonical: url, 
    },
  };
}
const Page = () => {
  return <LiquidityPage />;
};

export default Page;
