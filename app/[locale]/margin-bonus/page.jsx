import { createTranslator } from "next-intl";
import React from "react";
import MarginBonusPage from "../pages/MarginBonus";
import { getCanonicalUrl } from "@/helpers/canonicalUrl";

export async function generateMetadata({ params: { locale } }) {
  const messages = (await import(`../../../messages/${locale}.json`)).default;
  const t = createTranslator({ locale, messages });
  const url = getCanonicalUrl(locale, "margin-bonus");

  return {
    title: "Margin Bonus Offer | Boost Your Trading Power with GTCFX",
    description: "Our Margin Bonus is a special trading credit added to your account upon making a qualifying deposit. It is designed to increase your available margin and support your trading activity under defined terms.",
    alternates: {
      canonical: url,
    },
  };
}
const Page = () => {
  return <MarginBonusPage />;
};

export default Page;
