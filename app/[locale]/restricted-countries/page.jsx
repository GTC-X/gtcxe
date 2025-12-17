import { createTranslator } from "next-intl";
import React from "react";
import RestrictedCountriesPage from "../pages/RestrictedCountries";
import { getCanonicalUrl } from "@/helpers/canonicalUrl";

export async function generateMetadata({ params: { locale } }) {
  const messages = (await import(`../../../messages/${locale}.json`)).default;
  const t = createTranslator({ locale, messages });
  const url = getCanonicalUrl(locale, "restricted-countries");


  return {
    title: t("metaData.restrictedCountries.title"),
    description: t("metaData.restrictedCountries.des"),
    alternates: {
      canonical: url,
    },
  };
}
const Page = () => {
  return <RestrictedCountriesPage />;
};

export default Page;