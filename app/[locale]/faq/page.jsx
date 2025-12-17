import { createTranslator } from "next-intl";
import React from "react";
import FAQPage from "../pages/FAQS";
import { getCanonicalUrl } from "@/helpers/canonicalUrl";

export async function generateMetadata({ params: { locale } }) {
  const messages = (await import(`../../../messages/${locale}.json`)).default;
  const t = createTranslator({ locale, messages });
  const url = getCanonicalUrl(locale, "faq");

  return {
    title: t("faq.metaData.title"),
    description: t("faq.metaData.des"), 
    alternates: {
      canonical: url,
    },
  };
}
const Page = () => {
  return <FAQPage />;
};

export default Page;