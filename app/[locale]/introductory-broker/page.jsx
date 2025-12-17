import { createTranslator } from "next-intl";
import React from "react";
import IntroductoryBrokerPage from "../pages/IBProgram";
import { getCanonicalUrl } from "@/helpers/canonicalUrl";

export async function generateMetadata({ params: { locale } }) {
  const messages = (await import(`../../../messages/${locale}.json`)).default;
  const t = createTranslator({ locale, messages });
  const url = getCanonicalUrl(locale, "introductory-broker");

  return {
    title: t("metaData.introductoryBroker.title"),
    description: t("metaData.introductoryBroker.des"),
    alternates: {
      canonical: url,
    },
  };
}
const Page = () => {
  return <IntroductoryBrokerPage />
};

export default Page;

