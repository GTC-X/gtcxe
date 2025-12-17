import { createTranslator } from "next-intl";
import React from "react";

export async function generateMetadata({ params: { locale } }) {
  const messages = (await import(`../../../messages/${locale}.json`)).default;
  const t = createTranslator({ locale, messages });

  const url =
    locale != "en"
      ? `${process.env.NEXT_PUBLIC_BASE_URL}/${locale}/urgent-announcement`
      : `${process.env.NEXT_PUBLIC_BASE_URL}/urgent-announcement`;

  return {
    title: "GTC Official Statement on the Abnormal Market Event of November 28, 2025",
    description:
      "On November 28, 2025, the US CME (Chicago Mercantile Exchange) experienced a cooling system failure at its data center during Thanksgiving, leading to abnormal quotes and delays across major global trading channels.",
    alternates: {
      canonical: url,
    },
  };
}

const Page = () => {
  return (
    <main className="bg-slate-50 py-10 md:py-16"> 
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb / Tag */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#0F143A] px-4 py-1.5">
            <span className="h-2 w-2 rounded-full bg-[#b68756]" />
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-white">
              Official Statement
            </span>
          </div>
          <p className="text-xs md:text-sm text-slate-500">
            GTC Group · December 3, 2025
          </p>
        </div>

        {/* Title Block */}
        <header className="mb-8 md:mb-10">
          <h1 className="text-2xl md:text-3xl font-bold text-[#192055] leading-snug">
            GTC Official Statement on the Abnormal Market Event of November 28, 2025
          </h1>
          <p className="mt-3 text-sm md:text-base text-slate-600">
            Dear users and partners,
          </p>
        </header>

        {/* Highlight / Context Card */}
        <section className="mb-8 rounded-2xl border border-slate-200 bg-white/80 shadow-sm">
          <div className="border-b border-slate-100 px-5 md:px-6 py-4 flex items-center gap-2">
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#fff3e0] text-[#b68756] text-xs font-bold">
              !
            </span>
            <p className="text-sm md:text-base font-semibold text-[#192055]">
              Summary of the Market Incident
            </p>
          </div>
          <div className="px-5 md:px-6 py-5 space-y-3 text-sm md:text-base text-slate-700 leading-relaxed">
            <p>
              On November 28, 2025, the US CME (Chicago Mercantile Exchange) experienced a
              cooling system failure at its data center during Thanksgiving. This resulted in
              widespread abnormal price quotes and delays across major global trading channels,
              including Globex and EBS. The incident has been confirmed by multiple
              international media outlets and institutions, affecting many trading platforms
              and millions of traders worldwide.
            </p>
            <p>The GTC platform was also impacted by this global outage.</p>
            <p>
              During the one-hour window of the event, some users took advantage of abnormal
              quotes and liquidity mismatches to execute high-frequency order operations,
              resulting in unusually large profits that were inconsistent with normal market
              behavior. (For example: one user used $100 to rapidly exploit abnormal quotes,
              generating 1000x profit; after a withdrawal of 15,000, an adjustment of 85,000
              was applied.)
            </p>
            <p>
              Following joint verification by our internal team and upstream liquidity
              providers (LPs), these high-frequency trades executed within the abnormal quote
              window were identified as Abnormal Transactions.
            </p>
          </div>
        </section>

        {/* Section I */}
        <section className="mb-8 md:mb-10">
          <h2 className="text-lg md:text-xl font-semibold text-[#192055] mb-3 flex items-center gap-2">
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#0F143A] text-xs font-bold text-white">
              I
            </span>
            <span>Regarding User Profit Adjustments</span>
          </h2>
          <div className="rounded-2xl border border-slate-200 bg-white/90 px-5 md:px-6 py-5 shadow-sm text-sm md:text-base text-slate-700 leading-relaxed">
            <p className="mb-3">
              We understand our users’ expectations regarding account profitability. However,
              it is important to emphasize that during systemic global market abnormalities,
              all trading platforms must follow the same international principles for handling
              market exceptions, including but not limited to:
            </p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>Off-market quotes</li>
              <li>Invalid fills</li>
              <li>Pricing or liquidity errors</li>
              <li>Upstream clearing house rollbacks (LP trade reversal)</li>
            </ul>
          </div>
        </section>

        {/* Section II */}
        <section className="mb-8 md:mb-10">
          <h2 className="text-lg md:text-xl font-semibold text-[#192055] mb-3 flex items-center gap-2">
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#0F143A] text-xs font-bold text-white">
              II
            </span>
            <span>GTC’s Position: Supporting Our Clients and Fulfilling Our Responsibilities</span>
          </h2>

          {/* Intro sentence */}
          <div className="mb-4 text-sm md:text-base text-slate-700 leading-relaxed">
            <p>
              Although this incident did not originate from the GTC platform, we always
              prioritize our clients’ interests and will take the following measures:
            </p>
          </div>

          <div className="space-y-5">
            {/* 1. Compensation */}
            <div className="rounded-2xl border border-slate-200 bg-white/90 px-5 md:px-6 py-5 shadow-sm">
              <h3 className="text-sm md:text-base font-semibold text-[#192055] mb-2">
                1. Special Project Compensation for Affected Clients
              </h3>
              <ul className="list-disc pl-5 space-y-1.5 text-sm md:text-base text-slate-700 leading-relaxed">
                <li>
                  For accounts adjusted due to confirmed abnormalities, GTC will provide
                  reasonable compensation or refund handling fees based on the order details.
                </li>
                <li>
                  Users who incurred losses may submit a ticket for individual review by the
                  risk control team.
                </li>
              </ul>
            </div>

            {/* 2. Transparent reports */}
            <div className="rounded-2xl border border-slate-200 bg-white/90 px-5 md:px-6 py-5 shadow-sm">
              <h3 className="text-sm md:text-base font-semibold text-[#192055] mb-2">
                2. Transparent Reports for Abnormal Transactions
              </h3>
              <p className="text-sm md:text-base text-slate-700 leading-relaxed mb-2">
                We will provide users with:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-sm md:text-base text-slate-700 leading-relaxed">
                <li>Transaction comparison records</li>
                <li>Abnormal quotation time-node reports</li>
              </ul>
              <p className="mt-3 text-sm md:text-base text-slate-700 leading-relaxed">
                Ensuring that every adjustment has a clear and traceable basis.
              </p>
            </div>

            {/* 3. System upgrades */}
            <div className="rounded-2xl border border-slate-200 bg-white/90 px-5 md:px-6 py-5 shadow-sm">
              <h3 className="text-sm md:text-base font-semibold text-[#192055] mb-2">
                3. Comprehensive System Stability Upgrade
              </h3>
              <p className="text-sm md:text-base text-slate-700 leading-relaxed mb-2">
                Following the event, GTC has implemented enhancements including:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-sm md:text-base text-slate-700 leading-relaxed">
                <li>Risk control model upgrades</li>
                <li>Improved abnormal transaction monitoring</li>
                <li>Strengthened multi-line backup mechanisms with upstream LPs</li>
              </ul>
              <p className="mt-3 text-sm md:text-base text-slate-700 leading-relaxed">
                These measures aim to prevent similar incidents in the future.
              </p>
            </div>
          </div>
        </section>

        {/* Section III */}
        <section className="mb-8 md:mb-10">
          <h2 className="text-lg md:text-xl font-semibold text-[#192055] mb-3 flex items-center gap-2">
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#0F143A] text-xs font-bold text-white">
              III
            </span>
            <span>Our Commitment to Our Customers</span>
          </h2>
          <div className="rounded-2xl border border-slate-200 bg-white/90 px-5 md:px-6 py-5 shadow-sm space-y-3 text-sm md:text-base text-slate-700 leading-relaxed">
            <p>
              For more than ten years, GTC has adhered to principles of transparency, fairness,
              and responsibility. We hold multiple international financial regulatory licenses
              and have maintained a strong industry reputation.
            </p>
            <p>We do not avoid problems, nor do we shift responsibility.</p>
            <p>
              In a global anomaly affecting multiple platforms and institutions, GTC will
              continue to cooperate with users professionally to resolve the incident and
              safeguard clients’ long-term interests and financial security.
            </p>
          </div>
        </section>

        {/* Contact / Footer Card */}
        <section className="mb-4 md:mb-6">
          <div className="rounded-2xl border border-[#e5d2b9] bg-[#fffaf3] px-5 md:px-6 py-5 shadow-sm">
            <h3 className="text-sm md:text-base font-semibold text-[#192055] mb-2">
              If you are an affected user, please contact our dedicated support team:
            </h3>
            <ul className="space-y-1.5 text-sm md:text-base text-slate-700">
              <li>
                <span className="font-semibold text-[#192055]">Email:&nbsp;</span>
                <a
                  href="mailto:support@gtcxe.com"
                  className="text-[#b68756] hover:underline"
                >
                  support@gtcxe.com
                </a>
              </li>
              <li>
                <span className="font-semibold text-[#192055]">Ticket Center:&nbsp;</span>
                Submit via CRM
              </li>
            </ul>
          </div>
        </section>

        {/* Signature */}
        <section className="mt-4 md:mt-6 text-sm md:text-base text-slate-700">
          <p className="font-semibold text-[#192055]">GTC Group</p>
          <p>December 3, 2025</p>
        </section>
      </div>
    </main>
  );
};

export default Page;
