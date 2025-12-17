import { createTranslator } from "next-intl";
import React from "react";
import LeaderBoardDetail from "../../pages/leaderBoardDetail";
import { getCanonicalUrl } from "@/helpers/canonicalUrl";

export async function generateMetadata({ params: { locale } }) {
    const messages = (await import(`../../../../messages/${locale}.json`)).default;
    const t = createTranslator({ locale, messages });
    const url = getCanonicalUrl(locale, "latest-news");

    return {
        title: t("prime-tech.socialTranding.metaData.title"),
        description: t("prime-tech.socialTranding.metaData.des"),
        alternates: {
            canonical: url,
        },
    };
}
const Page = () => {
    return <LeaderBoardDetail />;
};

export default Page;