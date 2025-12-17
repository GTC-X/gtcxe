import { createTranslator } from "next-intl";
import React from "react";
import AffiliateProgramPage from "../pages/AffiliateProgram";
import { getCanonicalUrl } from "@/helpers/canonicalUrl";

export async function generateMetadata({ params: { locale } }) {
  const messages = (await import(`../../../messages/${locale}.json`)).default;
  const t = createTranslator({ locale, messages });
  const url = getCanonicalUrl(locale, "affiliate-program");

  return {
    title: t("metaData.affiliateProgram.title"),
    description: t("metaData.affiliateProgram.des"),
    alternates: {
      canonical: url,
    },
  };
}
const Page = () => {
  return <AffiliateProgramPage />;
};

export default Page;
