import { createTranslator } from "next-intl";
import React from "react";
import ResearchPage from "../pages/ResearchPage";
import { getCanonicalUrl } from "@/helpers/canonicalUrl";

export async function generateMetadata({ params: { locale } }) {
    const messages = (await import(`../../../messages/${locale}.json`)).default;
    const t = createTranslator({ locale, messages });
    const url = getCanonicalUrl(locale, "research");

    return {
        title: t("metaData.blogs.title"),
        description: t("metaData.blogs.des"),
        alternates: {
            canonical: url,
        },
    };
}
const Page = () => {
    return <ResearchPage />;
};

export default Page;