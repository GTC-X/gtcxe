'use client'
import React from 'react'
import Hero from '../components/common/Hero';
import Image from 'next/image';
import { useTranslations } from 'next-intl';


const SwapFreeNewPage = () => {
  const t = useTranslations('swapFreePage');

  const faqs = [
    {
      question: t('faq.questions.q1'),
      answer: t('faq.questions.a1'),
    },
    {
      question: t('faq.questions.q2'),
      answer: t('faq.questions.a2'),
    },
    {
      question: t('faq.questions.q3'),
      answer: t('faq.questions.a3'),
    },
    {
      question: t('faq.questions.q4'),
      answer: t('faq.questions.a4'),
    },
  ];

  const nonSwapFreeInstruments = {
    forexPairs: t('instruments.nonSwapFree.forexPairs.pairs').split(','),
    commoditiesEnergies: t('instruments.nonSwapFree.commodities.items').split(','),
    cryptoUsdt: t('instruments.nonSwapFree.crypto.items').split(','),
  };

  return (
    <>
       <Hero
     title={t('hero.title')}
        description={t('hero.description1')}
    />
     <main className="bg-gray-50 text-slate-900">
      {/* HERO – similar to screenshot layout */}
      <section className="bg-white border-b border-gray-200">
        <div className="container px-4 py-12 md:py-16 lg:py-20 grid gap-10 md:grid-cols-2 md:items-center">
          {/* Left content */}
          <div>
            <p className="text-xs font-semibold tracking-[0.15em] text-primary mb-2 uppercase">
              {t('hero.badge')}
            </p>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold leading-tight mb-4 text-primary capitalize">
              {t('hero.title')}
            </h1>
            <p className="text-sm md:text-base text-slate-700 mb-3 max-w-xl">
              {t('hero.description1')}
            </p>
            <p className="text-sm md:text-base text-slate-700 mb-3 max-w-xl">
              {t('hero.description2')}
            </p>

         
          </div>

          {/* Right visual block (placeholder for image/graphic) */}
          <div className="relative">
            <Image src="/Swap-free.webp" alt="Swap-Free Trading" width={600} height={400} className="w-full h-auto "/>
          </div>
        </div>
      </section>

      {/* BENEFITS – 3 cards, using your Why-Choose bullets */}
     {/* WHY CHOOSE – Pill Style Features */}
<section className="container px-4 py-10 md:py-14">
  <div className="mb-8 text-center">

    <h2 className="text-2xl md:text-3xl font-semibold text-slate-900 mb-2">
      {t('whyChoose.title')}
    </h2>
    <p className="text-sm md:text-base text-slate-700">
      {t('whyChoose.subtitle')}
    </p>
  </div>

  <div className="space-y-4">

    {/* TOP ROW – 3 items */}
    <div className="grid md:grid-cols-3 gap-4">

      {/* ITEM 1 */}
      <div className="px-6 py-4 rounded-2xl bg-gradient-to-r from-primary to-primary/80 text-white shadow-sm">
        <div className="flex items-center gap-3 mb-1">
          <span className="text-secondary text-xl">{t('whyChoose.features.noSwapCharges.icon')}</span>
          <h3 className="text-sm font-semibold">{t('whyChoose.features.noSwapCharges.title')}</h3>
        </div>
        <p className="text-xs text-white/90">
          {t('whyChoose.features.noSwapCharges.description')}
        </p>
      </div>

      {/* ITEM 2 */}
      <div className="px-6 py-4 rounded-2xl bg-gradient-to-r from-primary to-primary/80 text-white shadow-sm">
        <div className="flex items-center gap-3 mb-1">
          <span className="text-secondary text-xl">{t('whyChoose.features.regionBased.icon')}</span>
          <h3 className="text-sm font-semibold">{t('whyChoose.features.regionBased.title')}</h3>
        </div>
        <p className="text-xs text-white/90">
          {t('whyChoose.features.regionBased.description')}
        </p>
      </div>

      {/* ITEM 3 */}
      <div className="px-6 py-4 rounded-2xl bg-gradient-to-r from-primary to-primary/80 text-white shadow-sm">
        <div className="flex items-center gap-3 mb-1">
          <span className="text-secondary text-xl">{t('whyChoose.features.transparent.icon')}</span>
          <h3 className="text-sm font-semibold">{t('whyChoose.features.transparent.title')}</h3>
        </div>
        <p className="text-xs text-white/90">
          {t('whyChoose.features.transparent.description')}
        </p>
      </div>

    </div>

    {/* BOTTOM ROW – 2 items */}
    <div className="grid md:grid-cols-2 gap-4">

      {/* ITEM 4 */}
      <div className="px-6 py-4 rounded-2xl bg-gradient-to-r from-primary to-primary/80 text-white shadow-sm">
        <div className="flex items-center gap-3 mb-1">
          <span className="text-secondary text-xl">{t('whyChoose.features.fastActivation.icon')}</span>
          <h3 className="text-sm font-semibold">{t('whyChoose.features.fastActivation.title')}</h3>
        </div>
        <p className="text-xs text-white/90">
          {t('whyChoose.features.fastActivation.description')}
        </p>
      </div>

      {/* ITEM 5 */}
      <div className="px-6 py-4 rounded-2xl bg-gradient-to-r from-primary to-primary/80 text-white shadow-sm">
        <div className="flex items-center gap-3 mb-1">
          <span className="text-secondary text-xl">{t('whyChoose.features.longTerm.icon')}</span>
          <h3 className="text-sm font-semibold">{t('whyChoose.features.longTerm.title')}</h3>
        </div>
        <p className="text-xs text-white/90">
          {t('whyChoose.features.longTerm.description')}
        </p>
      </div>

    </div>

  </div>
</section>



    {/* SWAP-FREE WORKS + ELIGIBILITY – 2 CARD COMPARE STYLE */}
<section className="bg-gray-50">
  <div className="container px-4 pb-12 md:pb-16 space-y-8">

    {/* Section Heading */}
    <div className="text-center max-w-2xl mx-auto">
  
      <h2 className="text-2xl md:text-3xl font-semibold text-slate-900 mb-2">
        {t('howItWorks.title')}
      </h2>
      <p className="text-sm md:text-base text-slate-700">
        {t('howItWorks.subtitle')}
      </p>
    </div>

    {/* 2 Cards Grid */}
    <div className="grid gap-6 md:grid-cols-2">

      {/* LEFT CARD — HOW IT WORKS */}
      <div className="rounded-2xl bg-white border border-gray-200 p-6 md:p-8 shadow-sm flex flex-col">
        <h3 className="text-lg font-semibold text-secondary mb-2">
         {t('howItWorks.onceActivated.title')}
        </h3>

      

        <ul className="space-y-2 text-xs md:text-sm text-slate-700 flex-1">
          <li>• {t('howItWorks.onceActivated.points.point1')}</li>
          <li>• {t('howItWorks.onceActivated.points.point2')}</li>
          <li>• {t('howItWorks.onceActivated.points.point3')}</li>
          <li>• {t('howItWorks.onceActivated.points.point4')}</li>
        </ul>
      </div>

      {/* RIGHT CARD — ELIGIBILITY CRITERIA */}
      <div className="rounded-2xl bg-white border border-gray-200 p-6 md:p-8 shadow-sm flex flex-col">
        <h3 className="text-lg font-semibold text-secondary mb-2">
          {t('howItWorks.eligibility.title')}
        </h3>

        <p className="text-xs md:text-sm text-slate-700 mb-4">
          {t('howItWorks.eligibility.description')}
        </p>

        <ul className="space-y-3 text-xs md:text-sm text-slate-700 flex-1">
          <li>
            <strong className="text-secondary">{t('howItWorks.eligibility.criteria.country.title')}</strong><br />
            {t('howItWorks.eligibility.criteria.country.description')}
          </li>

          <li>
            <strong className="text-secondary">{t('howItWorks.eligibility.criteria.trading.title')}</strong><br />
            {t('howItWorks.eligibility.criteria.trading.description')}
          </li>
          <li> {t('howItWorks.eligibility.criteria.trading.note')}</li>
        </ul>
      </div>

    </div>
  </div>
</section>


      {/* DETAIL BLOCKS – exactly your content */}
  
    </main>

        <section
        id="details"
        className="container px-4 pb-12 md:pb-16"
      >
   

        {/* Instruments covered + non-swap-free full lists */}
        <section
          id="non-swap-free"
          className="rounded-2xl border border-gray-200 bg-gray-50 p-6 md:p-8 shadow-sm space-y-6 mt-16"
        >
          <div>
            <h2 className="text-2xl font-semibold mb-2 text-primary">
              {t('instruments.title')}
            </h2>
            <p className="text-sm md:text-base text-slate-700 mb-2">
              {t('instruments.description1')}
            </p>
            <p className="text-sm md:text-base text-slate-700 mb-2">
              {t('instruments.description2')}
            </p>
            <ul className="space-y-2 text-sm md:text-base text-slate-700 pl-5">
              <li>• {t('instruments.categories.majorFx')}</li>
              <li>• {t('instruments.categories.preciousMetals')}</li>
              <li>• {t('instruments.categories.minorsExotics')}</li>
              <li>• {t('instruments.categories.indicesEnergies')}</li>
              <li>• {t('instruments.categories.cryptocurrencies')}</li>
            </ul>
            <p className="mt-3 text-xs md:text-sm text-slate-500">
              {t('instruments.note')}
            </p>

            <h2 className="text-2xl font-semibold mb-2 text-primary mt-6">
              {t('instruments.nonSwapFree.title')}
            </h2>
            <p className="mt-3 text-xs md:text-sm text-slate-500">
              {t('instruments.nonSwapFree.description')}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 text-sm md:text-base text-slate-700">
            <div>
              <h3 className="font-semibold mb-2 text-secondary">
                {t('instruments.nonSwapFree.forexPairs.title')}
              </h3>
              <ul className="space-y-1">
                {nonSwapFreeInstruments.forexPairs.map((pair, index) => (
                  <li key={index}>• {pair}</li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-2 text-secondary">
                {t('instruments.nonSwapFree.commodities.title')}
              </h3>
              <ul className="space-y-1">
                {nonSwapFreeInstruments.commoditiesEnergies.map((item, index) => (
                  <li key={index}>• {item}</li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-2 text-secondary">
                {t('instruments.nonSwapFree.crypto.title')}
              </h3>
              <ul className="space-y-1">
                {nonSwapFreeInstruments.cryptoUsdt.map((item, index) => (
                  <li key={index}>• {item}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* How to Enable + Terms & Conditions + FAQ */}
        <section
          id="how-to-enable"
          className="rounded-2xl border border-gray-200 bg-gray-50 p-6 md:p-8 shadow-sm space-y-6 mt-16"
        >
          <div>
            <h2 className="text-2xl font-semibold mb-2 text-primary">
              {t('howToEnable.title')}
            </h2>
            <p className="text-sm md:text-base text-slate-700 mb-3">
              {t('howToEnable.description')}
            </p>
            <ul className="space-y-2 text-sm md:text-base text-slate-700 mb-4">
              <li>{t('howToEnable.contact')}{" "} <a
                  href={`mailto:${t('howToEnable.email')}`}
                  className="text-primary underline underline-offset-2 decoration-primary/60 hover:text-primary/80"
                >
                  {t('howToEnable.email')}
                </a>
            
              </li>
            </ul>
            <p className="text-sm md:text-base text-slate-700">
              {t('howToEnable.confirmation')}
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2 text-secondary">
              {t('terms.title')}
            </h3>
            <ul className="space-y-2 text-sm md:text-base text-slate-700 mb-3">
              <li>
                • {t('terms.points.point1')}
              </li>
              <li>• {t('terms.points.point2')}</li>
              <li>• {t('terms.points.point3')}</li>
              <li>• {t('terms.points.point4')}</li>
              <li>
                • {t('terms.points.point5')}
              </li>
            </ul>
            <p className="text-xs md:text-sm text-slate-500">
              {t('terms.note')}
            </p>
          </div>

          <div id="faq">
            <h3 className="text-lg font-semibold mb-3 text-secondary">
              {t('faq.title')}
            </h3>
            <div className="space-y-3">
              {faqs.map((item) => (
                <details
                  key={item.question}
                  className="group rounded-xl border border-gray-200 bg-gray-50 px-4 py-3"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-3">
                    <span className="text-sm md:text-base font-medium text-slate-900">
                      {item.question}
                    </span>
                    <span className="text-slate-500 group-open:hidden text-lg">
                      +
                    </span>
                    <span className="text-slate-500 hidden group-open:block text-lg">
                      −
                    </span>
                  </summary>
                  <p className="mt-2 text-xs md:text-sm text-slate-700">
                    {item.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </section>
    </>
 
  )
}

export default SwapFreeNewPage