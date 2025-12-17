import {createTranslator} from "next-intl";
import {Suspense} from "react";
import ForexPage from "../../pages/(products)/Forex";
import { getCanonicalUrl } from "@/helpers/canonicalUrl";

export async function generateMetadata({params: {locale}}) {
    const messages = (await import(`../../../../messages/${locale}.json`)).default;
    const t = createTranslator({locale, messages});
    const url = getCanonicalUrl(locale, "forex");


    return {
        title: t("metaData.forex.title"),
        description: t("metaData.forex.des"),
        alternates: {
            canonical: url,
        },
    };
}

const Page = () => {
    return <ForexPage/>;

};

export default Page;