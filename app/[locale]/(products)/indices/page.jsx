import { createTranslator } from "next-intl";
import React from "react";
import IndicesPage from "../../pages/(products)/Indices";
import { getCanonicalUrl } from "@/helpers/canonicalUrl";

export async function generateMetadata({ params: { locale } }) {
  const messages = (await import(`../../../../messages/${locale}.json`)).default;

  const t = createTranslator({ locale, messages });
  const url = getCanonicalUrl(locale, "indices");

  return {
    title: t("metaData.indices.title"),
    description: t("metaData.indices.des"),
    alternates: {
      canonical: url,
    },
  };
}
const Indices = () => {
  return <IndicesPage />;
};

export default Indices;
