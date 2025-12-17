import { createTranslator } from "next-intl";
import React from "react";
import PammAccountPage from "../pages/PammAccount";
import { getCanonicalUrl } from "@/helpers/canonicalUrl";

export async function generateMetadata({ params: { locale } }) {
  const messages = (await import(`../../../messages/${locale}.json`)).default;
  const t = createTranslator({ locale, messages });
  const url = getCanonicalUrl(locale, "pamm-account");


  return {
    title: t("metaData.pammAccount.title"),
    description: t("metaData.pammAccount.des"),
    alternates: {
      canonical: url,
    },
  };
}
const Page = () => {
  return <PammAccountPage />;
};

export default Page;