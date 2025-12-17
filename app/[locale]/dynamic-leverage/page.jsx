import { createTranslator } from "next-intl";
import React from "react";
import DynamicLervagePage from "../pages/DynamicLervage";
import { getCanonicalUrl } from "@/helpers/canonicalUrl";

export async function generateMetadata({ params: { locale } }) {
  const messages = (await import(`../../../messages/${locale}.json`)).default;
  const t = createTranslator({ locale, messages });
  const url = getCanonicalUrl(locale, "dynamic-leverage");


  return {
    title: t("metaData.dynamicLeverage.title"),
    description: t("metaData.dynamicLeverage.des"),
    alternates: {
      canonical: url,
    },
  };
}
const Page = () => {
  return <DynamicLervagePage />;
};

export default Page;


