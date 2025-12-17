import { createTranslator } from "next-intl";
import React from "react";
import WhyGtcGroup from '../pages/WhyGtcGroup'
import { getCanonicalUrl } from "@/helpers/canonicalUrl";

export async function generateMetadata({ params: { locale } }) {
  const messages = (await import(`../../../messages/${locale}.json`)).default;
  const t = createTranslator({ locale, messages });
  const url = getCanonicalUrl(locale, "why-gtc-group");

  return {
    title: t("metaData.whyGtcGroup.title"),
    description: t("metaData.whyGtcGroup.des"),
    alternates: {
      canonical: url,
    },
  };
}
const Page = () => {
  return <WhyGtcGroup />;
};

export default Page;
