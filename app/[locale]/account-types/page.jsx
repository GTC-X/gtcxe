import { createTranslator } from "next-intl";
import React from "react";
import AccountTypePage from "../pages/AccountType";
import { getCanonicalUrl } from "@/helpers/canonicalUrl";

export async function generateMetadata({ params: { locale } }) {
  const messages = (await import(`../../../messages/${locale}.json`)).default;
  const t = createTranslator({ locale, messages });
  const url = getCanonicalUrl(locale, "account-types");

  return {
    title: t("metaData.accountTypes.title"),
    description: t("metaData.accountTypes.des"),
    alternates: {
      canonical: url,
    },
  };
}
const Page = () => {
  return <AccountTypePage />;
};

export default Page;
