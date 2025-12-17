import { createTranslator } from "next-intl";
import React from "react";
import MamAccountPage from "../pages/MamAccount";
import { getCanonicalUrl } from "@/helpers/canonicalUrl";

export async function generateMetadata({ params: { locale } }) {
  const messages = (await import(`../../../messages/${locale}.json`)).default;
  const t = createTranslator({ locale, messages });
  const url = getCanonicalUrl(locale, "mam-account");


  return {
    title: t("metaData.mamAccount.title"),
    description: t("metaData.mamAccount.des"),
    alternates: {
      canonical: url,
    },
  };
}
const Page = () => {
  return <MamAccountPage />;
};

export default Page;