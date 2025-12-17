import { createTranslator } from "next-intl";
import React from "react";
import IndicesDividendPage from "../pages/IndicesDividendPage";
import { getCanonicalUrl } from "@/helpers/canonicalUrl";




export async function generateMetadata({ params: { locale } }) {
  const messages = (await import(`../../../messages/${locale}.json`)).default;
  const t = createTranslator({ locale, messages });
  const url = getCanonicalUrl(locale, "indices-dividend");

  return {
    title: t("metaData.indicesDividend.title"),
    description: t("metaData.indicesDividend.des"),
    alternates: {
      canonical: url,
    },
  };
}
const Page = () => {
  return <IndicesDividendPage />
};

export default Page;

