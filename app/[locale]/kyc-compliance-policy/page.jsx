import { createTranslator } from "next-intl";
import React from "react";
import CompliancePolicyPage from "../pages/CompliancePolicy";
import { getCanonicalUrl } from "@/helpers/canonicalUrl";

export async function generateMetadata({ params: { locale } }) {
  const messages = (await import(`../../../messages/${locale}.json`)).default;
  const t = createTranslator({ locale, messages });
  const url = getCanonicalUrl(locale, "kyc-compliance-policy");

  return {
    title: t("footerPage.CompliancePolicy.metaData.title"),
    description: t("footerPage.CompliancePolicy.metaData.des"),
    alternates: {
      canonical: url,
    },
  };
}
const Page = () => {
  return <CompliancePolicyPage />;
};

export default Page;