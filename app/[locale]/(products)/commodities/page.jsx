import {createTranslator} from "next-intl";
import {Suspense} from "react";
import CommoditiesPage from "../../pages/(products)/Commodiries";
import { getCanonicalUrl } from "@/helpers/canonicalUrl";

export async function generateMetadata({params: {locale}}) {
    const messages = (await import(`../../../../messages/${locale}.json`)).default;
    const t = createTranslator({locale, messages});
    const url = getCanonicalUrl(locale, "commodities");


    return {
        title: t("metaData.commodities.title"),
        description: t("metaData.commodities.des"),
        alternates: {
            canonical: url,
        },
    };
}

const Page = () => {
    return <CommoditiesPage/>;

};

export default Page;