import { createTranslator } from "next-intl";
import React from "react";
import ResearchPageDetail from "../../pages/ResearchCategoryDetail";
import { getCanonicalUrl } from "@/helpers/canonicalUrl";

export async function generateMetadata({ params: { locale } }) {
    const messages = (await import(`../../../../messages/${locale}.json`)).default;
    const t = createTranslator({ locale, messages });
    const url = getCanonicalUrl(locale, "blogs");

    return {
        title: t("metaData.blogs.title"),
        description: t("metaData.blogs.des"),
        alternates: {
            canonical: url,
        },
    };
}
const Page = () => {
    return <ResearchPageDetail />;
};

export default Page;