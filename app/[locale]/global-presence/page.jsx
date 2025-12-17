import GlobalPresence from "../pages/GlobalPresence"
import { createTranslator } from "next-intl";
import React from "react";
import { getCanonicalUrl } from "@/helpers/canonicalUrl";

export async function generateMetadata({ params: { locale } }) {
  const messages = (await import(`../../../messages/${locale}.json`)).default;
  const t = createTranslator({ locale, messages });
  const url = getCanonicalUrl(locale, "global-presence");

  return {
    title: t("metaData.globalPresence.title"),
    description: t("metaData.globalPresence.des"),
    alternates: {
      canonical: url,
    },
  };
}
const Page = () => {
  return <GlobalPresence />;
};

export default Page;
