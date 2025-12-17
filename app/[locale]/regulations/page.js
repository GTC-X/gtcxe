import { createTranslator } from "next-intl";
import React from "react";
import RegulationPage from "../pages/Regulations";
import { getCanonicalUrl } from "@/helpers/canonicalUrl";

export async function generateMetadata({ params: { locale } }) {
  const messages = (await import(`../../../messages/${locale}.json`)).default;
  const t = createTranslator({ locale, messages });
  const url = getCanonicalUrl(locale, "regulations");

  return {
    title: t("metaData.regulations.title"),
    description: t("metaData.regulations.des"),
    alternates: {
      canonical: url,
    },
    
  };
}
const Page = () => {
  return <RegulationPage />;
};

export default Page;