import { createTranslator } from "next-intl";
import React from "react";
import BrokerView from "../pages/BrokerView";
import { getCanonicalUrl } from "@/helpers/canonicalUrl";

export async function generateMetadata({ params: { locale } }) {
  const messages = (await import(`../../../messages/${locale}.json`)).default;
  const t = createTranslator({ locale, messages });
  const url = getCanonicalUrl(locale, "wiki-expo");

  return {
    title: 'Unlock exciting trading opportunities with GTCFX at Forex Expo Dubai 2025!',
    description: 'Join us at Booth No. 36 and connect with industry leaders. Gain exclusive insights, explore advanced trading platforms, and discover how to boost your trading strategies.',
    alternates: {
      canonical: url,
    },
  };
}
const Page = () => {
  return <BrokerView />;
};

export default Page;
