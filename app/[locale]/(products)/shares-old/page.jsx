import { createTranslator } from "next-intl";
import { Suspense } from "react";
import SharesPage from "../../pages/(products)/Share";
import { getCanonicalUrl } from "@/helpers/canonicalUrl";

export async function generateMetadata({ params: { locale } }) {
  const messages = (await import(`../../../../messages/${locale}.json`))
    .default;
  const t = createTranslator({ locale, messages });
  const url = getCanonicalUrl(locale, "shares");

  return {
    title: t("metaData.shares.title"),
    description: t("metaData.shares.des"),
    alternates: {
      canonical: url,
    },
  };
}

const Page = () => {
  return <SharesPage />;
};

export default Page;
