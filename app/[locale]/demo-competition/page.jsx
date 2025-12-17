import React from 'react'
import DemoCompetition from '../pages/DemoCompetition';
import { createTranslator } from "next-intl";
import { getCanonicalUrl } from "@/helpers/canonicalUrl";

export async function generateMetadata({ params: { locale } }) {
  const messages = (await import(`../../../messages/${locale}.json`)).default;
  const t = createTranslator({ locale, messages });
  const url = getCanonicalUrl(locale, "demo-competition");

  return {
    title: t("partner.demoCompetition.metaData.title"),
    description: t("partner.demoCompetition.metaData.des"),
    alternates: {
      canonical: url,
    },
  };
}

const page = () => {
  return (
    <DemoCompetition/>
  )
}

export default page;