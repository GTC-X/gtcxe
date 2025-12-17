import Awards from "../pages/Awards";
import { createTranslator } from "next-intl";
import React from "react";
import { getCanonicalUrl } from "@/helpers/canonicalUrl";

export async function generateMetadata({ params: { locale } }) {
  const messages = (await import(`../../../messages/${locale}.json`)).default;
  const t = createTranslator({ locale, messages });
  const url = getCanonicalUrl(locale, "awards");

  return {
    title: t("metaData.awards.title"),
    description: t("metaData.awards.des"),
    alternates: {
      canonical: url,
    },
  };
}
const Page = () => {
  return <Awards />;
};

export default Page;
