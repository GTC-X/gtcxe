import { createTranslator } from "next-intl";
import React from "react";
import DayCourse from "../pages/DayCourse";
import { getCanonicalUrl } from "@/helpers/canonicalUrl";

export async function generateMetadata({ params: { locale } }) {
  const messages = (await import(`../../../messages/${locale}.json`)).default;
  const t = createTranslator({ locale, messages });
  const url = getCanonicalUrl(locale, "day-trading-intensive-course");

  return {
    title: t("compaign.dayCourse.metaData.title"),
    description: t("compaign.dayCourse.metaData.des"),
    alternates: {
      canonical: url,
    },
    
  };
}
const Page = () => {
  return <DayCourse />;
};

export default Page;