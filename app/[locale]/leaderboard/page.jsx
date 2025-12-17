import { createTranslator } from "next-intl";
import React from "react";
import LeaderBoard from "../pages/Leaderboard";
import { getCanonicalUrl } from "@/helpers/canonicalUrl";

export async function generateMetadata({ params: { locale } }) {
    const messages = (await import(`../../../messages/${locale}.json`)).default;
    const t = createTranslator({ locale, messages });
    const url = getCanonicalUrl(locale, "leaderboard");

    return {
        title: t("prime-tech.socialTranding.metaData.title"),
    description: t("prime-tech.socialTranding.metaData.des"),
        alternates: {
            canonical: url,
        },
    };
}
const Page = () => {
    return <LeaderBoard />;
};

export default Page;