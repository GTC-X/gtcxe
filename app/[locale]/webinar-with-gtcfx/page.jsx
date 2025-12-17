import { createTranslator } from "next-intl";
import React from "react";
import WebinarAdvPage from "../pages/WebinarAdv";
import { getCanonicalUrl } from "@/helpers/canonicalUrl";

export async function generateMetadata({ params: { locale } }) {
  const messages = (await import(`../../../messages/${locale}.json`)).default;
  const t = createTranslator({ locale, messages });
  const url = getCanonicalUrl(locale, "webinar-with-gtcfx");

  return {
    title: t("metaData.weeklyWebinar.title"),
    description: t("metaData.weeklyWebinar.des"),
    alternates: {
      canonical: url,
    },
    
  };
}
const Page = () => {
  return <WebinarAdvPage />;
};

export default Page;