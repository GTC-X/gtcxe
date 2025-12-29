import { createTranslator } from "next-intl";
import React from "react";
import RiskWarningPage from "../pages/RiskWarning";
import { getCanonicalUrl } from "@/helpers/canonicalUrl";

export async function generateMetadata({ params: { locale } }) {
  const messages = (await import(`../../../messages/${locale}.json`)).default;
  const t = createTranslator({ locale, messages });
  const url = getCanonicalUrl(locale, "legal-policies-client-agreements");


  return {
    title: "GTCFX Legal Policies & Client Agreements",
    description: "Access all legal documents, client onboarding forms, privacy policies, risk disclosures, and regulatory information for GTC Financial Consultancy, GTC Global LTD (Mauritius), and GTC Global Trade Capital Co. Ltd (Vanuatu).",
    alternates: {
      canonical: url,
    },
  };
}
const Page = () => {
  return <RiskWarningPage />;
};

export default Page;