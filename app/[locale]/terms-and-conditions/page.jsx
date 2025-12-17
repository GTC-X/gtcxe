import { createTranslator } from "next-intl";
import React from "react";
import TermsConditionPage from "../pages/TermsCondition";
import { getCanonicalUrl } from "@/helpers/canonicalUrl";

export async function generateMetadata({ params: { locale } }) {
  const messages = (await import(`../../../messages/${locale}.json`)).default;
  const t = createTranslator({ locale, messages });
  const url = getCanonicalUrl(locale, "terms-and-conditions");

  return {
    title: t("footerPage.termsCondition.metaData.title"),
    description: t("footerPage.termsCondition.metaData.des"),
    alternates: {
      canonical: url,
    },
  };
}
const Page = () => {
  return <TermsConditionPage />;
};

export default Page;