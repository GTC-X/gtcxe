import { createTranslator } from "next-intl";
import React from "react";
import AccountTutorialPage from "../pages/AccountTutorial";
import Hero from "../components/common/Hero";
import { getCanonicalUrl } from "@/helpers/canonicalUrl";

export async function generateMetadata({ params: { locale } }) {
  const messages = (await import(`../../../messages/${locale}.json`)).default;
  const t = createTranslator({ locale, messages });
  const url = getCanonicalUrl(locale, "tutorial-videos");

  return {
    title: t("metaData.tutorialVideo.title"),
    description: t("metaData.tutorialVideo.des"),
    alternates: {
      canonical: url,
    },
  };
}
const Page = () => {
  return (
    <>
   
  <AccountTutorialPage />
    </>

)
};

export default Page;
