import { createTranslator } from "next-intl";
import React from "react";
import InvestTradeGoldPage2 from "../pages/InvestTradeGold2";

export async function generateMetadata({ params: { locale } }) {
  const messages = (await import(`../../../messages/${locale}.json`)).default;
  const t = createTranslator({ locale, messages });
  const url =
    locale != "en"
      ? `${process.env.NEXT_PUBLIC_BASE_URL}/${locale}/invest-trade-gold`
      : `${process.env.NEXT_PUBLIC_BASE_URL}/invest-trade-gold`;

  return {
    title:
      "Maximize your profits with tight spreads and fast execution on every gold trade",
    description:
      "Trade gold with tight spreads, fast execution, and top-tier conditions built for serious traders. Take advantage of powerful platforms and pro-level tools. Stay ahead with reliable insights designed for gold trading success.",
    alternates: {
      canonical: url,
    },
  };
}
const Page = () => {
  return <InvestTradeGoldPage2 />;
};

export default Page;
