import { createTranslator } from "next-intl";
import React from "react";
import SwapTermsConditions from "../pages/SwapTermsConditions";
import { getCanonicalUrl } from "@/helpers/canonicalUrl";

export async function generateMetadata({ params: { locale } }) {
  const messages = (await import(`../../../messages/${locale}.json`)).default;
  const t = createTranslator({ locale, messages });
  const url = getCanonicalUrl(locale, "swap-free-terms-and-conditions");

  return {
    title: t("metaData.swapTermsCondition.title"),
    description: t("metaData.swapTermsCondition.des"), 
    alternates: {
      canonical: url,
    },
    
  };
}
const Page = () => {
  return <SwapTermsConditions />;
};

export default Page;