import { createTranslator } from "next-intl";
import React from "react";
import WithDrawalPolicyPages from "../pages/WithDrawalPolicy";
import { getCanonicalUrl } from "@/helpers/canonicalUrl";

export async function generateMetadata({ params: { locale } }) {
  const messages = (await import(`../../../messages/${locale}.json`)).default;
  const t = createTranslator({ locale, messages });
  const url = getCanonicalUrl(locale, "withdrawal-policy");

  return {
    title: t("footerPage.withDrawal.metaData.title"),
    description: t("footerPage.withDrawal.metaData.des"),
    alternates: {
      canonical: url,
    },
  };
}
const Page = () => {
  return <WithDrawalPolicyPages />;
};

export default Page;