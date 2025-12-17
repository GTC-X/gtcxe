import { createTranslator } from "next-intl";
import React from "react";
import PreciousMetalsPage from "../../pages/(products)/PreciousMetals";
import { getCanonicalUrl } from "@/helpers/canonicalUrl";

export async function generateMetadata({ params: { locale } }) {
  const messages = (await import(`../../../../messages/${locale}.json`)).default;
  const t = createTranslator({ locale, messages });
  const url = getCanonicalUrl(locale, "precious-metals");

  return {
    title: t("metaData.metals.title"),
    description: t("metaData.metals.des"),
    alternates: {
      canonical: url,
    },
  };
}
const Page = () => {
  return <PreciousMetalsPage />;
};

export default Page;