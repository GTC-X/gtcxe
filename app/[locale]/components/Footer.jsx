"use client";
import React from "react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import SocialIcon from "./SocialIcon";
import CopyRight from "./CopyRight";
import Link from "next-intl/link";
import { BsTelephoneFill } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import { FaEnvelopeOpenText } from "react-icons/fa";
import { AiFillClockCircle } from "react-icons/ai";
import { usePathname } from "next/navigation";
import { useRouter } from "next-intl/client";
import TradeInvest from "./about/TradeInvest";

const Footer = () => {
  const t = useTranslations("footerLink");
  const pathname = usePathname();
  const router = useRouter();
  const locale = useLocale();
  const pathnameWithoutLocale = pathname.replace(`/${locale}`, "");

  const emailLink =
    locale === "fa" ? "support.tr@gtcfx.com" : "support@gtcxe.com";

  const footerLinks = [
    {
      title: t("link.label"),
      links: [
        {
          name: t("link.menu1"),
          link: "/about-us",
        },
        {
          name: t("link.menu6"),
          link: "/why-gtc-group",
        },
        {
          name: t("link.menu5"),
          link: "/global-presence",
        },
        {
          name: t("link.menu3"),
          link: "/awards",
        },

        {
          name: t("link.menu10"),
          link: "/glossary-faqs",
        },
       
        {
          name: t("link.menu9"),
          link: "/contact-us",
        },
      ],
    },
    {
      title: t("rules.label"),
      links: [
        {
          name: t("rules.menu1"),
          link: "/forex",
        },
        {
          name: t("rules.menu2"),
          link: "/precious-metals",
        },
        {
          name: t("rules.menu3"),
          link: "/stock",
        },
        {
          name: t("rules.menu4"),
          link: "/cfd-energy",
        },
        {
          name: t("rules.menu5"),
          link: "/commodities",
        },
        {
          name: t("rules.menu6"),
          link: "/mt4-platform",
        },
        {
          name: t("rules.menu7"),
          link: "/mt5-platform",
        },
     
        {
          name: t("rules.menu9"),
          link: "/download-app",
        },
      ],
    },
    {
      title: t("update.label"),
      links: [
        {
          name: t("update.menu1"),
          link: "/liquidity-technology",
        },
        {
          name: t("update.menu2"),
          link: "/copy-trading",
        },
        {
          name: t("update.menu3"),
          link: "/pamm-account",
        },
        {
          name: t("update.menu4"),
          link: "/mam-account",
        },
        {
          name: t("update.menu9"),
          link: "/vps-hosting-services",
        },
        {
          name: t("update.menu10"),
          link: "/legal-policies-client-agreements",
        },
      
      ],
    },

  ];
  const contact = [
    {
      title: t("contact.label"),
      links: [
        {
          text: emailLink,
          label: t("contact.menu2"),
          icon: MdEmail,
        },
        {
          text: "24/7",
          label: t("contact.menu4"),
          icon: AiFillClockCircle,
        },
      ],
    },
  ];
  // Add a check to see if the pathname is not the home page
  const isNotHomePage = pathname !== `/${locale}` && pathname !== "/";
  return (
    <>
     
        <div
      className={`bg-primary pb-10 z-30 py-12 md:py-14 xl:py-16 ${
        isNotHomePage ? 'mt-16' : ''
      }`}
    >
        <div className="container grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 px-3">
          {footerLinks.map((footerlink) => (
            <div key={footerlink.title}>
              <h4 className="font-regular pb-2 text-secondary text-base underline-offset-1 ">
                {footerlink.title}
              </h4>
              <hr className="w-8 h-[1px] bg-white border-0"></hr>
              <ul className="list-none mt-4">
                {footerlink.links.map((link, index) => {
                  const activeClass =
                    pathnameWithoutLocale == link?.link
                      ? "text-secondary"
                      : "text-white";
                  if (
                    locale == "zh" &&
                    (link?.name == t("update.menu1") ||
                      link?.name == t("update.menu5"))
                  ) {
                    return null;
                  }
                  return (
                    <li
                      key={link.name}
                      className={`${activeClass} text-sm font-normal leading-6 hover:text-secondary cursor-pointer flex justify-start items-center gap-2`}
                      onClick={() => {
                        router.push(link.link, { locale: locale });
                      }}
                    >
                      {link.name}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
          <div className="contact group">
            <h4 className="font-regular pb-2 text-secondary text-base underline-offset-1">
              {contact[0].title}
            </h4>
            <hr className="w-8 h-[1px] bg-white border-0" />

            <ul className="list-none mt-4">
              {contact[0].links.map((link, index) => (
                <li
                  key={index}
                  className={`text-xs font-normal leading-7 text-white hover:text-secondary cursor-pointer flex justify-start items-center gap-2`}
                >
                  <link.icon size={18} className=" text-secondary" />
                  <b>{link.label}</b>
                  <p>{link.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="container lg:flex justify-start items-center mt-8 pt-8 border-t border-y-cyan-50 border-opacity-40 px-2 ">
          <div className="lg:basis-3/12 lg:flex flex-wrap items-center justify-center md:pr-10">
           <Link href="/" locale="en" aria-label="GTCFX">
              <Image
                src="/GTCXE-footer.png"
                width={250}
                height={93}
                alt="GTCFX official logo"
                className="mx-auto md:m-0"
                priority
              />
            </Link>

        
        
          </div>
          <div className="lg:basis-9/12 text-xs text-white text-opacity-70 space-y-3 leading-5">
        

            <p>{t("footerNotice.gtc_multi_trading_para")}</p>
         
         
          </div>
        </div>
      </div>
      <CopyRight />
    </>
  );
};

export default Footer;
