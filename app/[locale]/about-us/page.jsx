import { createTranslator } from "next-intl";
import React from "react";
import AboutUsPage from "../pages/AboutUs";
import { getCanonicalUrl } from "@/helpers/canonicalUrl";

export async function generateMetadata({ params: { locale } }) {
  const messages = (await import(`../../../messages/${locale}.json`)).default;
  const t = createTranslator({ locale, messages });
  const url = getCanonicalUrl(locale, "about-us");

  return {
    title: t("metaData.aboutUs.title"),
    description: t("metaData.aboutUs.des"),
    alternates: {
      canonical: url,
    },
  };
}
const Page = () => {
  return <AboutUsPage />;
};

export default Page;
