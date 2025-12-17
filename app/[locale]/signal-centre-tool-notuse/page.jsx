import { createTranslator } from "next-intl";
import React from "react";
import SignalCentreToolPage from "../pages/SignalCentreTool";
import { getCanonicalUrl } from "@/helpers/canonicalUrl";

export async function generateMetadata({ params: { locale } }) {
  const messages = (await import(`../../../messages/${locale}.json`)).default;
  const t = createTranslator({ locale, messages });
  const url = getCanonicalUrl(locale, "signal-centre-tool");

  return {
    title: t("metaData.signalCenter.title"),
    description: t("metaData.signalCenter.des"),
    alternates: {
      canonical: url, 
    },
  };
}
const Page = () => {
  return <SignalCentreToolPage />;
};

export default Page;
