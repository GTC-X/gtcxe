import { createTranslator } from "next-intl";
import React from "react";
import PrivacyPolicyPage from "../pages/PrivacyPolicy";
import { getCanonicalUrl } from "@/helpers/canonicalUrl";

export async function generateMetadata({ params: { locale } }) {
  const messages = (await import(`../../../messages/${locale}.json`)).default;
  const t = createTranslator({ locale, messages });
  const url = getCanonicalUrl(locale, "privacy-policy");


  return {
    title: t("footerPage.privacyPolicy.metaData.title"),
    description: t("footerPage.privacyPolicy.metaData.des"),
    alternates: {
      canonical: url,
    },
  };
}
const Page = () => {
  return <PrivacyPolicyPage />;
};

export default Page;
