import { createTranslator } from "next-intl";
import React from "react";
import VPSHostingPage from "../pages/VpsHostingServices";
import { getCanonicalUrl } from "@/helpers/canonicalUrl";

export async function generateMetadata({ params: { locale } }) {
  const messages = (await import(`../../../messages/${locale}.json`)).default;
  const t = createTranslator({ locale, messages });
  const url = getCanonicalUrl(locale, "vps-hosting-services");


  return {
    title: t("metaData.vpsHosting.title"),
    description: t("metaData.vpsHosting.des"),
    alternates: {
      canonical: url,
    },
  };
}
const Page = () => {
  return <VPSHostingPage />;
}; 

export default Page;
