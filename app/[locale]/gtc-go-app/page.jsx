import { createTranslator } from "next-intl";
import React from "react";
import AppGtcGoPage from "../pages/AppGtcGo";

export async function generateMetadata({ params: { locale } }) {
  const messages = (await import(`../../../messages/${locale}.json`)).default;
  const t = createTranslator({ locale, messages });
  const url =
    locale != "en"
      ? `${process.env.NEXT_PUBLIC_BASE_URL}/${locale}/gtc-go-app`
      : `${process.env.NEXT_PUBLIC_BASE_URL}/gtc-go-app`;

  return {
    title: "GTCFX & GTC VIP Mobile App – Loyalty Rewards & Smart Trading | GTCFX",
    description: "Experience the  GTCFX and GTC VIP Mobile App earn real rewards, access intelligent copy trading, enjoy faster performance, and experience seamless deposits for a premium mobile trading journey.",
    alternates: {
      canonical: url,
    },
  };
}
const Page = () => {
  return <AppGtcGoPage />;
};

export default Page;
