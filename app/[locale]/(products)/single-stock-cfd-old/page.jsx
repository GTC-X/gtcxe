import { createTranslator } from "next-intl";
import React from "react";
import StockPage from "../../pages/(products)/Stock";
import { getCanonicalUrl } from "@/helpers/canonicalUrl";

export async function generateMetadata({ params: { locale } }) {
  const messages = (await import(`../../../../messages/${locale}.json`)).default;
  const t = createTranslator({ locale, messages });
  const url = getCanonicalUrl(locale, "stock");

  return {
    title: t("metaData.stock.title"),
    description: t("metaData.stock.des"),
    alternates: {
      canonical: url,
    },
  };
}
const Stock = () => {
  return <StockPage />;
};

export default Stock;
