
import AutoChartist from "../pages/AutoChartist";
import { createTranslator } from "next-intl";
import { getCanonicalUrl } from "@/helpers/canonicalUrl";

export async function generateMetadata({ params: { locale } }) {
    const messages = (await import(`../../../messages/${locale}.json`)).default;
    const t = createTranslator({ locale, messages });
    const url = getCanonicalUrl(locale, "autochartist");
  
    return {
      title: t("metaData.autoChartist.title"),
    description: t("metaData.autoChartist.des"),
      alternates: {
        canonical: url,
      },
    };
  }
const Page = () => {
  return <AutoChartist />;
};

export default Page;
