import { createTranslator } from "next-intl";
import React from "react";
import MarginRequirmentsPage from "../pages/MarginRequirments";
import { getCanonicalUrl } from "@/helpers/canonicalUrl";

export async function generateMetadata({ params: { locale } }) {
  const messages = (await import(`../../../messages/${locale}.json`)).default;
  const t = createTranslator({ locale, messages });
  const url = getCanonicalUrl(locale, "margin-requirments");

  return {
    title: t("metaData.marginRequirments.title"),
    description: t("metaData.marginRequirments.des"),
    alternates: {
      canonical: url,
    },
  };
}
const Page = () => {
  return <MarginRequirmentsPage />;
};

export default Page;
