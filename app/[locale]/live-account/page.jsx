import { createTranslator } from "next-intl";
import React from "react";
import LiveAccountPage from "../pages/LiveAccount";
import { getCanonicalUrl } from "@/helpers/canonicalUrl";

export async function generateMetadata({ params: { locale } }) {
  const messages = (await import(`../../../messages/${locale}.json`)).default;
  const t = createTranslator({ locale, messages });
  const url = getCanonicalUrl(locale, "live-account");

  return {
    title: t("accounts.live-account.metaData.title"),
    description: t("accounts.live-account.metaData.des"),
    alternates: {
      canonical: url,
    },
  };
}
const Page = () => {
  return <LiveAccountPage />;
};

export default Page;