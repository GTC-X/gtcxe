
import { createTranslator } from "next-intl";
import React from "react";
import DemoAccountPage from "../../pages/DemoAccount";
import { getCanonicalUrl } from "@/helpers/canonicalUrl";

export async function generateMetadata({ params: { locale } }) {
  const messages = (await import(`../../../../messages/${locale}.json`)).default;
  const t = createTranslator({ locale, messages });
  const url = getCanonicalUrl(locale, "free-demo-account");


  return {
    title: t("accounts.demoAccount.metaData.title"),
    description: t("accounts.demoAccount.metaData.des"),
    alternates: {
      canonical: url,
    },
  };
}
const Page = () => {
  return (
    <div className="mb-20">
      
      <DemoAccountPage />
    </div>
  )
}

export default Page;