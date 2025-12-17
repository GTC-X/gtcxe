import { createTranslator } from "next-intl";
import React from "react";
import MT4PlatformPage from "../pages/MT4Platform";
import { getCanonicalUrl } from "@/helpers/canonicalUrl";

export async function generateMetadata({ params: { locale } }) {
  const messages = (await import(`../../../messages/${locale}.json`)).default;
  const t = createTranslator({ locale, messages });
  const url = getCanonicalUrl(locale, "mt4-platform");

  return {
    title: t("metaData.mt4Platform.title"),
    description: t("metaData.mt4Platform.des"),
    alternates: {
      canonical: url,
    },
  };
}
const Page = () => {
  return <MT4PlatformPage />;
};

export default Page;
