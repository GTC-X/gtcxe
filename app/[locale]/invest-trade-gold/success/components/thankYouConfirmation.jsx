'use client';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

const ConfirmationThankYou = ({ user }) => {
  const t = useTranslations('partner.form');
  const [dir, setDir] = useState('ltr');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setDir(document.documentElement.dir || 'ltr');
    }
  }, []);

  const isRTL = dir === 'rtl';

  return (
    <section className="bg-gradient-to-r from-[#293794] to-[#000021] text-[#E5E5EA] py-8 md:py-20 relative overflow-hidden">
      <div className="absolute bottom-0 right-0 w-1/2 h-full z-0 pointer-events-none opacity-50 hidden md:block">
        <div className="relative w-full sm:h-96 xl:h-[500px] 2xl:h-[450px] 3xl:h-[600px] scale-[1.9] origin-center">
          <Image
            src="/bottom-overlay.webp"
            alt="Decorative background"
            fill
            className="object-contain"
          />
        </div>
      </div>

      <div className="relative container">
        <div className={`grid md:grid-cols-2 items-center gap-10 mb-8 ${isRTL ? 'text-right' : 'text-left'}`}>
          <div className={isRTL ? 'order-1 md:order-1' : 'order-1 md:order-2'}>
            <img
              className={`w-full max-w-[120px] md:max-w-[250px] mx-auto ${isRTL ? 'pr-10' : 'pl-10'}`}
              src="/thank-you.svg"
              alt="Thank You"
            />
          </div>

          <div className={isRTL ? 'order-2 md:order-2 text-right' : 'order-2 md:order-1 text-left'}>
            <h2 className="text-2xl md:text-4xl 2xl:text-5xl font-bold mb-5">
              {t('thankYou')}, <span className="text-white">{user?.nickname}</span>!
            </h2>
            <h4 className="text-lg md:text-xl 2xl:text-2xl font-semibold text-gray-200 mb-5">
              {t('almostThere')}
            </h4>
            <div className="max-w-xl">
              <p className="text-sm md:text-base mb-5 leading-relaxed">
                {t('emailSent', { email: user?.email })}
              </p>
              <p className="text-sm md:text-base mb-5 leading-relaxed">
                {t('checkSpam')}
              </p>
              <p className="text-lg md:text-2xl mb-5 text-secondary font-semibold">
                {t('seeYou')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConfirmationThankYou;
