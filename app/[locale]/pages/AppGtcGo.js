import React from "react";
import GtcVipMobileHeader from "../components/GtcVipMobileHeader";
import GtcHero from "../components/GtcGooApp/GtcHero";
import GtcFeatures from "../components/GtcGooApp/GtcFeatures";
import GtcFeatureSection from "../components/GtcGooApp/GtcFeatureSection";
import GtcCopyTradingSection from "../components/GtcGooApp/GtcCopyTradingSection ";
import GtcTestimonials from "../components/GtcGooApp/GtcTestimonials";
import HowItWorksSection from "../components/GtcGooApp/HowItWorksSection";
import GtcGoFooter from "../components/GtcGooApp/GtcGoFooter";

const AppGtcGoPage = () => {
  return (
    <>
      <GtcVipMobileHeader />
      <GtcHero />
      <GtcFeatures />
      <GtcFeatureSection />
      <GtcCopyTradingSection/>
      <GtcTestimonials />
      <HowItWorksSection />
   
    </>
  );
};

export default AppGtcGoPage;
