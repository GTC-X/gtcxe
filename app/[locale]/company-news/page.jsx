import { createTranslator } from "next-intl";
import React from "react";
import CompanyNewPage from "../pages/CompanyNews";
import { getCanonicalUrl } from "@/helpers/canonicalUrl";

export async function generateMetadata({ params: { locale } }) {
  const messages = (await import(`../../../messages/${locale}.json`)).default;
  const t = createTranslator({ locale, messages });
  const url = getCanonicalUrl(locale, "company-news");

  return {
    title: t("metaData.campanyNews.title"),
    description: t("metaData.campanyNews.des"),
    alternates: {
      canonical: url,
    },
  };
}
const Page = () => {
  return <CompanyNewPage />;
};

export default Page;