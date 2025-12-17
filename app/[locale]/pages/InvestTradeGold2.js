import Image from "next/image";
import FedMeetingsSection from "../invest-trade-gold/SectionOne";
import FedHistorySection from "../invest-trade-gold/SectionTwo";
import InvestingForm from "../invest-trade-gold/components/InvestingFor";
import GtcVipMobileHeader from "../components/GtcVipMobileHeader";
import AwardCarousel from "../components/partner/ibBroker/AwardCarousel";

const InvestTradeGold2Page = () => {

    return (
        <div className="min-h-screen text-white font-sans">
            <GtcVipMobileHeader  showNav={false}  />
            <main>
                {/* HERO SECTION */}
                <section className="relative pt-8 pb-12 md:pt-12 md:pb-16 overflow-hidden">
                    {/* Background Image */}
                    <div className="absolute inset-0 z-0">
                        <Image
                            src="/invest2.jpg"
                            alt="Background"
                            fill
                            className="object-cover object-center"
                            priority
                            unoptimized
                        />
                        {/* Overlay for better text readability */}
                        {/* <div className="absolute inset-0 bg-[#050816]/70"></div> */}
                    </div>

                    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        {/* Badge */}

                        <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:gap-12 items-center">
                            {/* Left: Headline + copy */}
                            <div className="space-y-6">
                                <div className="space-y-4">
                                    <div
                                        className="inline-flex items-center px-6 py-2 text-sm md:text-base text-white font-semibold rounded-none shadow-lg"
                                        style={{
                                            background:
                                                "linear-gradient(90deg, #1a1aff99 0, #1a1aff00 100%)",
                                        }}
                                    >
                                        <span className="tracking-wide">
                                            Trade
                                            With GTC
                                        </span>
                                    </div>

                                    <h2 className="uppercase text-3xl md:text-4xl lg:text-[45px] md:leading-[55px] font-black bg-gradient-to-r from-[#fff] via-secondary to-secondary text-transparent bg-clip-text">
                                        Trade the Fed’s Next Move.


                                    </h2>

                                    <p className="text-base md:text-lg text-white/90 max-w-2xl">
                                        Join thousands of traders who are preparing for the Federal Reserve’s (Fed) next big move. React instantly to market volatility with GTC’s multi-regulated platform.                                    </p>
                                </div>
                            </div>

                            {/* Right: Registration Card */}
                            <div className="lg:justify-self-end w-full max-w-md mx-auto lg:mx-0">
                                <InvestingForm
                                    zapierUrl="https://hooks.zapier.com/hooks/catch/16420445/u52nrpg/"
                                    successPath="/invest-trade-gold/success"
                                    page="investing"
                                    btnText={"Register Now"}
                                />
                            </div>
                        </div>
                    </div>
                </section>

                <FedMeetingsSection />
                <FedHistorySection />
                <AwardCarousel />
            </main>

        </div>
    );
}

export default InvestTradeGold2Page;