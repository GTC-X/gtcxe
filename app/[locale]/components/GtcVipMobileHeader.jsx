"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";

export default function GtcVipMobileHeader({
  navItems,
  showNav = true, // <- control to hide menu items
}) {
  const t = useTranslations("gtcGoApp.header");
  
  const DEFAULT_NAV_ITEMS = [
    { href: "#hero", label: t("navItems.hero") },
    { href: "#trading", label: t("navItems.trading") },
    { href: "#copy", label: t("navItems.copy") },
    { href: "#reviews", label: t("navItems.reviews") },
    { href: "#works", label: t("navItems.works") },
  ];
  
  const finalNavItems = navItems || DEFAULT_NAV_ITEMS;
  const [open, setOpen] = useState(false);

  const headerOffset = 90;

  const smoothScroll = (e, href) => {
    if (!href.startsWith("#")) return; // external links skip scroll

    e.preventDefault();
    setOpen(false);

    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (!el) return;

    const elementPosition = el.getBoundingClientRect().top + window.scrollY;
    const offsetPosition = elementPosition - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  };

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="container py-3 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="https://gtcfx-bucket.s3.ap-southeast-1.amazonaws.com/img/logo-2024-new.webp"
            width={200}
            height={72}
            alt="GTCFX"
            className="lg:w-[200px] lg:h-[72px] md:w-[120px] md:h-[53px] w-[130px] h-[47px]"
          />
        </Link>

        {/* Desktop Nav (hideable) */}
        {showNav && finalNavItems?.length > 0 && (
          <nav className="hidden lg:flex items-center gap-6 text-base font-medium text-primary">
            {finalNavItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="hover:text-secondary transition cursor-pointer"
                onClick={(e) => smoothScroll(e, item.href)}
              >
                {item.label}
              </a>
            ))}
          </nav>
        )}

        {/* Desktop CTAs (always visible) */}
        <div className="hidden sm:flex items-center gap-3">
          {/* Open Account */}
          <a
            href="https://mygtcfx.com/getview?view=register&token=exhowww.z8owwwww"
            target="_blank"
            className="inline-flex items-center bg-[#29a643] rounded-full px-4 py-1.5 text-base font-semibold text-white hover:opacity-90 transition"
          >
            {t("openAccount")}
          </a>

          {/* Join VIP */}
          <a
            href="https://my.gtcvip.com/v2/app/register"
            target="_blank"
            className="inline-flex items-center rounded-full bg-gradient-to-r from-[#293794] via-[#000021] to-[#000021] px-4 py-1.5 text-base font-semibold text-white hover:bg-[#b89338] transition shadow-md shadow-yellow-500/30"
          >
            {t("joinVip")}
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-300 text-slate-700"
          onClick={() => setOpen(!open)}
        >
          <span className="text-lg">{open ? "✕" : "☰"}</span>
        </button>
      </div>

      {/* Mobile Nav */}
      {open && (
        <div className="lg:hidden border-t border-slate-800 bg-primary">
          <nav className="max-w-6xl mx-auto px-4 py-3 flex flex-col gap-3 text-sm text-slate-100">
            {/* Mobile menu items (only if showNav=true) */}
            {showNav &&
              finalNavItems?.length > 0 &&
              finalNavItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="py-1 hover:text-secondary transition cursor-pointer"
                  onClick={(e) => smoothScroll(e, item.href)}
                >
                  {item.label}
                </a>
              ))}

            {/* MOBILE CTAs – always visible */}
            <div className="mt-2 flex flex-col gap-2">
              {/* Open Account */}
              <a
                href="https://mygtcfx.com/getview?view=register&token=exhowww.z8owwwww"
                target="_blank"
                className="w-full inline-flex items-center justify-center bg-[#29a643] rounded-full px-3 py-2 text-xs font-semibold text-white hover:opacity-80 transition"
              >
                {t("openAccount")}
              </a>

              {/* Join VIP */}
              <a
                href="https://my.gtcvip.com/v2/app/register"
                target="_blank"
                className="w-full inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#293794] via-[#000021] to-[#000021] px-3 py-2 text-xs font-semibold text-white hover:bg-[#b89338] transition"
              >
                {t("joinVip")}
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
