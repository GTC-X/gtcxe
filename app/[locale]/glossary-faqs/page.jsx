import { createTranslator } from "next-intl";
import React from "react";
import GlossaryFaqs from "../pages/GlossaryFaqs";
import { getCanonicalUrl } from "@/helpers/canonicalUrl";

export async function generateMetadata({ params: { locale } }) {
  const messages = (await import(`../../../messages/${locale}.json`)).default;
  const t = createTranslator({ locale, messages });
  const url = getCanonicalUrl(locale, "glossary-faqs");

  return {
    title: t("metaData.glossary.title"),
    description: t("metaData.glossary.des"),
    alternates: {
      canonical: url,
    },
  };
}
const Page = () => {
  return <GlossaryFaqs />;
};

export default Page;
