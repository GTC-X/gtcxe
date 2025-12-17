import { createTranslator } from "next-intl";
import React from "react";
import ClientAgreementPage from "../pages/ClientAgreement-VU";
import { getCanonicalUrl } from "@/helpers/canonicalUrl";

export async function generateMetadata({ params: { locale } }) {
  const messages = (await import(`../../../messages/${locale}.json`)).default;
  const t = createTranslator({ locale, messages });
  const url = getCanonicalUrl(locale, "client-agreement-VU");

  return {
    title: t("footerPage.clientAgreement.metaData.title"),
    description: t("footerPage.clientAgreement.metaData.des"),
    alternates: {
      canonical: url,
    },
  };
}
const Page = () => {
  return <ClientAgreementPage  />;
};

export default Page;
