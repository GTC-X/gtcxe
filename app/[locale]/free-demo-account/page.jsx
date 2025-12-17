import { createTranslator } from "next-intl";
import React from "react";
import DemoAccountPage from "../pages/DemoAccount";
import { getCanonicalUrl } from "@/helpers/canonicalUrl";

export async function generateMetadata({ params: { locale } }) {
  const messages = (await import(`../../../messages/${locale}.json`)).default;
  const t = createTranslator({ locale, messages });
  const url = getCanonicalUrl(locale, "free-demo-account");


  return {
    title: t("metaData.demoAccount.title"),
    description: t("metaData.demoAccount.des"),
    alternates: {
      canonical: url,
    },
  };
}
const Page = () => {
  return <DemoAccountPage />;
};

export default Page;