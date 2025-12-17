"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next-intl/link";
import { useLocale, useTranslations } from "next-intl";
import MobileMenu from "./MobileMenu";
import { useRouter } from "next-intl/client";
import { useParams, usePathname } from "next/navigation";
import { LiaBoxesSolid } from "react-icons/lia";
import { RiStockLine, RiGlobalLine } from "react-icons/ri";
import { IoMdLaptop } from "react-icons/io";
import { BsBarChart } from "react-icons/bs";
import { IoHomeOutline } from "react-icons/io5";
import { MdOutlineWbSunny, MdOutlineManageAccounts } from "react-icons/md";
import { FiBriefcase, FiGitPullRequest } from "react-icons/fi";
import { BiAnalyse, BiSpeaker } from "react-icons/bi";
import { useDetectClickOutside } from "react-detect-click-outside";
import LanguageMobile from "./LanguageMobile";
import TopBar from "./Topbar";

const NavItem = ({
  title,
  links,
  href,
  locale,
  description,
  id,
  show,
  setShow,
}) => {
  const [arrow, setArrow] = useState("down");
  const router = useRouter();
  const urlLocale = useLocale();
  const pathname = usePathname();
  const isAr = pathname.includes("/ar");
  const pathnameWithoutLocale = pathname.replace(`/${urlLocale}`, "");
  const innerActive = links?.some((single) => {
    return single?.items?.some((x) => x?.href === pathnameWithoutLocale);
  });
  const activeClass =
    pathnameWithoutLocale == href || innerActive
      ? "text-secondary"
      : "text-primary";
      
  const isExternal = (href = "") => /^https?:\/\//i.test(href);
  return (
    <li className={`${activeClass} clickable hover:text-secondary `}>
      <div
        className="flex justify-center items-center"
        // onMouseEnter={() => {
        //   setShowMenu("!block");
        //   setArrow("up");
        // }}
        // onMouseLeave={() => {
        //   setShowMenu("hidden");
        //   setArrow("down");
        // }}
        onClick={() => {
          setShow(show == id ? "" : id);
          setArrow("up");
          // router.push(href, { locale: locale });
        }}
      >
        <button
          className={`block cursor-pointer py-6  ${
            isAr ? "pr-2 lg:pr-5 pl-2 lg:pl-5" : "pl-2 lg:pl-4 lg:pr-4"
          }  lg:py-5 text-[sm] lg:text-[16px] 3xl:text-xl`}
        >
          {title}
        </button>
      </div>
      {show == id && (
        <div
          className={`mega-menu mb-16 sm:mb-0 shadow-xl border-t border-gray-200 h-[400px] z-50 bg-white rounded-b-none !block mt-2`}
        >
          <div className="container w-full flex flex-wrap py-5">
            <div className=" basis-3/12 flex justify-end">
              <div
                className={`content-sidebar text-primary border-gray-100 mt-8 lg:text-[11.5px] 2xl:text-[15px] ltr:text-left ltr:pr-8 rtl:text-right rtl:pl-8`}
              >
                <p className="mb-4 leading-5 ">{description}</p>
              </div>
            </div>

            {links.map((linkGroup, index) => (
              <div className=" basis-3/12 flex justify-between">
                <ul key={index} className={`px-4 w-full  pb-6 pt-6 lg:pt-3`}>
                  <h3
                    className={`flex gap-2 items-center underline text-[15px] 2xl:text-[19px] 3xl:text-xl text-secondary mb-2 ${
                      isAr ? "text-right" : "text-left"
                    }`}
                  >
                    <p className="text-primary text-2xl">{linkGroup.icon}</p>
                    {linkGroup.title}
                  </h3>
               {linkGroup.items?.map((item, itemIndex) => {
                    const activeClassList =
                      pathnameWithoutLocale === item.href ? "text-secondary" : "text-primary";
                    if (!item?.locale?.includes(locale)) return null;

                    const cls = `block ${activeClassList} hover:text-secondary`;

                    return (
                      <li
                        key={itemIndex}
                        className="py-2 text-sm md:text-base 2xl:text-lg 3xl:text-xl border-b border-gray-200 border-opacity-40 last:border-0 rtl:text-right"
                      >
                        {isExternal(item.href) ? (
                          // external → open in a new tab
                          <a
                            href={item.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={cls}
                            onClick={() => setShow("")}
                          >
                            {item.label}
                          </a>
                        ) : (
                          // internal → normal localized Link
                          <Link
                            href={item.href}
                            locale={locale}
                            className={cls}
                            onClick={() => setShow("")}
                          >
                            {item.label}
                          </Link>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
    </li>
  );
};

const Header = ({currentLanguage}) => {
  const t = useTranslations("navigation");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const [show, setShow] = useState("");
  const pathnameWithoutLocale = pathname.replace(`/${locale}`, "");
  const [href, setHref] = useState([
    {
      href: "/",
      locale: "en,ar,zh,zh-tw,it,tr,fr,es,pt,ur,hi,vi,id,fa,tl,th,ko,,ja,ms,ru,ps",
    },
  ]);
  const isAr = pathname.includes("/ar");
  const navigationData = [
    {
      title: t("about.lable"),
      locale: "en,ar,zh,zh-tw,it,tr,fr,es,pt,ur,hi,vi,id,fa,tl,th,ko,,ja,ms,ru,ps",
      description: t("about.des"),
      id: 1,
      links: [
        {
          icon: <IoHomeOutline />,
          title: t("about.firstcolumn.heading"),
          items: [
            {
              href: "/about-us",
              label: t("about.firstcolumn.option1"),
              locale: "en,ar,zh,zh-tw,it,tr,fr,es,pt,ur,hi,vi,id,fa,tl,th,ko,,ja,ms,ru,ps",
            },
            {
              href: "/why-gtc-group",
              label: t("about.firstcolumn.option2"),
              locale: "en,ar,zh,zh-tw,it,tr,fr,es,pt,ur,hi,vi,id,fa,tl,th,ko,,ja,ms,ru,ps",
            },
            {
              href: "/regulations",
              label: t("about.firstcolumn.option3"),
              locale: "en,ar,zh,zh-tw,it,tr,fr,es,pt,ur,hi,vi,id,fa,tl,th,ko,,ja,ms,ru,ps",
            },
           {
              href: "/careers",
              label: t("about.thirdcolumn.option2"),
              locale: "en,ar,zh,zh-tw,it,tr,fr,es,pt,ur,hi,vi,id,fa,tl,th,ko,,ja,ms,ru,ps",
            },
            {
              href: "/contact-us",
              label: t("about.thirdcolumn.option3"),
              locale: "en,ar,zh,zh-tw,it,tr,fr,es,pt,ur,hi,vi,id,fa,tl,th,ko,,ja,ms,ru,ps",
            },
          ],
        },
        {
          icon: <RiGlobalLine />,
          title: t("about.secondcolumn.heading"),
          items: [
            {
              href: "/global-presence",
              label: t("about.secondcolumn.option1"),
              locale: "en,ar,zh,zh-tw,it,tr,fr,es,pt,ur,hi,vi,id,fa,tl,th,ko,,ja,ms,ru,ps",
            },
            {
              href: "/awards",
              label: t("about.secondcolumn.option2"),
              locale: "en,ar,zh,zh-tw,it,tr,fr,es,pt,ur,hi,vi,id,fa,tl,th,ko,,ja,ms,ru,ps",
            },
            {
              href: "/compensation-fund",
              label: t("about.secondcolumn.option3"),
              locale: "en,ar,zh,zh,ms,tr,fr,es,pt,ur,hi,vi,id,fa,tl,th,ko",
            },
          ],
        },
        {
          icon: <MdOutlineWbSunny />,
          title: t("about.thirdcolumn.heading"),
          items: [
             {
              href: "/blogs",
              label: t("about.thirdcolumn.option4"),
              locale: "en,zh",
            },
            {
              href: "/company-news",
              label: t("about.thirdcolumn.option1"),
              locale: "en,zh",
            },
             {
              href: "/earnings-calendar",
              label: t("about.thirdcolumn.option5"),
              locale: "en,zh",
            },
               {
              href: "/economic-calendar",
              label: t("trading.thirdcolumn.option2"),
              locale: "en,ar,zh,zh,it,tr,fr,es,pt,ur,hi,vi,id,tl,th,ko,,ja,ms,ru,ps",
            },
            {
              href: "/market-overview",
              label: t("trading.thirdcolumn.option3"),
              locale: "en,ar,zh,zh,it,tr,fr,es,pt,ur,hi,vi,id,tl,th,ko,,ja,ms,ru,ps",
            },           
          ],
        },
      ],
    },
    {
      title: t("account.lable"),
      href: "#",
      locale: "en,ar,zh,zh-tw,it,tr,fr,es,pt,ur,hi,vi,id,fa,tl,th,ko,,ja,ms,ru,ps",
      description: t("account.des"),
      id: 2,
      links: [
        {
          icon: <MdOutlineManageAccounts />,
          title: t("account.firstcolumn.heading"),
          items: [
            {
              href: "https://mygtcfx.com/getview?view=register&token=exhowww.z8owwwww",
              label: t("account.firstcolumn.option1"),
              locale: "en,ar,zh,zh-tw,it,tr,fr,es,pt,ur,hi,vi,id,fa,tl,th,ko,,ja,ms,ru,ps",
            },
            {
              href: "/free-demo-account",
              label: t("account.firstcolumn.option3"),
              locale: "en,ar,zh,zh-tw,it,tr,fr,es,pt,ur,hi,vi,id,fa,tl,th,ko,,ja,ms,ru,ps",
            },
            {
              href: "/deposit",
              label: t("account.firstcolumn.option2"),
              locale: "en,ar,zh,zh-tw,it,tr,fr,es,pt,ur,hi,vi,id,fa,tl,th,ko,,ja,ms,ru,ps",
            },
          ],
        },
        {
          icon: <LiaBoxesSolid />,
          title: t("account.secondcolumn.heading"),
          items: [
            {
              href: "/account-types",
              label: t("account.secondcolumn.option1"),
              locale: "en,ar,zh,zh-tw,it,tr,fr,es,pt,ur,hi,vi,id,fa,tl,th,ko,,ja,ms,ru,ps",
            },
          ],
        },
   
      ],
    }, 
    {
      title: t("trading.lable"),
      href: "#",
      locale: "en,ar,zh,zh,it,tr,fr,es,pt,ur,hi,vi,id,fa,fa,tl,th,ko,,ja,ms,ru,ps",
      description: t("trading.des"),
      id: 3,
      links: [
        {
          icon: <RiStockLine />,
          title: t("trading.firstcolumn.heading"),
          items: [
            {
              href: "/forex",
              label: t("trading.firstcolumn.option1"),
              locale: "en,ar,zh,zh-tw,it,tr,fr,es,pt,ur,hi,vi,id,fa,tl,th,ko,,ja,ms,ru,ps",
            },
            {
              href: "/cfd-energy",
              label: t("trading.firstcolumn.option6"),
              locale: "en,ar,zh,zh-tw,it,tr,fr,es,pt,ur,hi,vi,id,fa,tl,th,ko,,ja,ms,ru,ps",
            },
            {
              href: "/commodities",
              label: t("trading.firstcolumn.option4"),
              locale: "en,ar,zh,zh-tw,it,tr,fr,es,pt,ur,hi,vi,id,fa,tl,th,ko,,ja,ms,ru,ps",
            },
            {
              href: "/indices",
              label: t("trading.firstcolumn.option5"),
              locale: "en,ar,zh,zh-tw,it,tr,fr,es,pt,ur,hi,vi,id,fa,tl,th,ko,,ja,ms,ru,ps",
            },
            {
              href: "/precious-metals",
              label: t("trading.firstcolumn.option2"),
              locale: "en,ar,zh,zh-tw,it,tr,fr,es,pt,ur,hi,vi,id,fa,tl,th,ko,,ja,ms,ru,ps",
            },
            
           
          ],
        },
        {
          icon: <IoMdLaptop />,
          title: t("trading.secondcolumn.heading"),
          items: [
            {
              href: "/mt4-platform",
              label: t("trading.secondcolumn.option1"),
              locale: "en,ar,zh,zh-tw,it,tr,fr,es,pt,ur,hi,vi,id,fa,tl,th,ko,,ja,ms,ru,ps",
            },
            {
              href: "/mt5-platform",
              label: t("trading.secondcolumn.option2"),
              locale: "en,ar,zh,zh-tw,it,tr,fr,es,pt,ur,hi,vi,id,fa,tl,th,ko,,ja,ms,ru,ps",
            },
            {
              href: "/download-app",
              label: t("trading.secondcolumn.option3"),
              locale: "en,ar,zh,zh-tw,it,tr,fr,es,pt,ur,hi,vi,id,fa,tl,th,ko,,ja,ms,ru,ps",
            },
          ],
        },
        {
          icon: <BsBarChart />,
          title: t("trading.thirdcolumn.heading"), 
          items: [
         
            {
              href: "/tutorial-videos",
              label: t("account.secondcolumn.option2"),
              locale: "en,ar,zh,zh,it,tr,fr,es,pt,ur,hi,vi,id,tl,th,ko,,ja,ms,ru,ps",
            },
            {
              href: "/glossary-faqs",
              label: t("trading.thirdcolumn.option4"),
              locale: "en,ar,zh,zh,it,tr,fr,es,pt,ur,hi,vi,id,tl,th,ko,,ja,ms,ru,ps",
            },
            {
              href: "/dynamic-leverage",
              label: t("trading.thirdcolumn.option5"),
              locale: "en",
            },
            {
              href: "/swap-update",
              label: t("trading.thirdcolumn.option6"),
              locale: "en",
            },
             {
              href: "/swap-free-trading",
              label: t("trading.thirdcolumn.option7"),
              locale: "en",
            },
          ],
        },
      ],
    },
    {
      title: t("partner.lable"),
      href: "#",
      locale: "en,ar,zh,th,ko,,ja,ms,ru,ps,pt,tr,",
      description: t("partner.des"),
      id: 4,
      links: [
        {
          items: [
            {
              href: "/introductory-broker",
              label: t("partner.firstcolumn.option1"),
              locale: "en,ar,zh,zh-tw,it,tr,fr,es,pt,ur,hi,vi,id,fa,tl,th,ko,,ja,ms,ru,ps",
            },
          ],
        },
        {
          items: [
            {
              href: "https://www.gtcaffiliates.com/",
              label: t("partner.thirdcolumn.option1"),
              locale: "en,ar,zh,zh-tw,it,tr,fr,es,pt,ur,hi,vi,id,fa,tl,th,ko,,ja,ms,ru,ps",
            },
          ],
        },
      ],
    },
    {
      title: t("technology.lable"),
      href: "#",
      locale: "en,ar,zh,zh-tw,it,tr,fr,es,pt,ur,hi,vi,id,fa,tl,th,ko,,ja,ms,ru,ps",
      description: t("technology.des"),
      id: 5,
      links: [
        {
          icon: <FiBriefcase />,
          title: t("technology.firstcolumn.heading"),
          items: [
            {
              href: "/liquidity-technology",
              label: t("technology.firstcolumn.option1"),
              locale: "en,ar,zh,zh-tw,it,tr,fr,es,pt,ur,hi,vi,id,fa,tl,th,ko,,ja,ms,ru,ps",
            },
            {
              href: "/copy-trading",
              label: t("technology.firstcolumn.option2"),
              locale: "en,ar,zh,zh-tw,it,tr,fr,es,pt,ur,hi,vi,id,fa,tl,th,ko,,ja,ms,ru,ps",
            },
          ],
        },
        {
          icon: <FiGitPullRequest />,
          title: t("technology.secondcolumn.heading"),
          items: [
            {
              href: "/pamm-account",
              label: t("technology.secondcolumn.option1"),
              locale: "en,ar,zh,zh-tw,it,tr,fr,es,pt,ur,hi,vi,id,fa,tl,th,ko,,ja,ms,ru,ps",
            },
            {
              href: "/mam-account",
              label: t("technology.secondcolumn.option2"),
              locale: "en,ar,zh,zh-tw,it,tr,fr,es,pt,ur,hi,vi,id,fa,tl,th,ko,,ja,ms,ru,ps",
            },
            {
              href: "/vps-hosting-services",
              label: t("technology.secondcolumn.option4"),
              locale: "en,ar,zh,zh-tw,it,tr,fr,es,pt,ur,hi,vi,id,fa,tl,th,ko,,ja,ms,ru,ps",
            },
          ],
        },
        {
          icon: <BiAnalyse />,
          title: t("technology.thirdcolumn.heading"),
          items: [
            {
              href: "/technical-tools",
              label: t("technology.thirdcolumn.option1"),
              locale: "en,ar,zh,zh-tw,it,tr,fr,es,pt,ur,hi,vi,id,fa,tl,th,ko,,ja,ms,ru,ps",
            },
            {
              href: "/autochartist",
              label: t("technology.thirdcolumn.option2"),
              locale: "en,ar,zh,zh-tw,it,tr,fr,es,pt,ur,hi,vi,id,fa,tl,th,ko,,ja,ms,ru,ps",
            },
          ],
        },
      ],
    },
  ];
  const extractHrefsAndLocales = (data) => {
    if (data?.length > 0 && pathnameWithoutLocale != "/") {
      const extractedData = [];
      data.forEach((item) => {
        const { href, locale, links } = item;

        if (href && locale) {
          extractedData.push({ href, locale });
        } else if (href) {
          extractedData.push({ href, locale: null });
        }

        links.forEach((link) => {
          link.items.forEach((subItem) => {
            const { href, locale } = subItem;
            if (href && locale) {
              extractedData.push({ href, locale });
            } else if (href) {
              extractedData.push({ href, locale: null });
            }
          });
        });
      });
      setHref(extractedData?.filter((x) => x?.href == pathnameWithoutLocale));
      return extractedData;
    }
  };

  useEffect(() => {
    if (pathname == "/") {
      setHref([
        {
          href: "/",
          locale: "en,ar,zh,it,tr,fr,es,hi,vi,id,fa",
        },
      ]);
      return;
    }
    if (params?.slug) {
      setHref([
        {
          href: `${params?.slug?.[0]}/${params?.slug?.[1]}/${params?.slug?.[2]}`,
          locale: "en,ar",
        },
      ]);
      return;
    }
    if (navigationData) {
      extractHrefsAndLocales(navigationData);
    }
  }, [pathname]);

  const ref = useDetectClickOutside({
    onTriggered: () => {
      setShow("");
    },
  });

  return (
    <>
    <TopBar currentLanguage={currentLanguage} /> {/* Use the TopBar component */}

      <div className="header py-2 sticky top-0 z-[40] bg-white border-b border-gray-200">
        <nav className="container">
          <div className="flex justify-between items-center ">
            <Image
              src="/gtcxe-logo.png"
              width={200}
              height={72}
              alt="GTCFX"
              className="lg:w-[200px] lg:h-[72px] md:w-[120px] md:h-[53px] w-[130px] h-[47px] cursor-pointer"
              onClick={() => {
                router.push("/", { locale: locale });
              }}
            />
            <div className="lg:flex justify-end items-center hidden" ref={ref}>
              <ul className="hidden lg:flex">
                {navigationData.map((item, index) => (
                  <NavItem
                    key={index}
                    id={item?.id}
                    title={item.title}
                    href={item.href}
                    locale={locale}
                    links={item.links}
                    description={item.description}
                    sideImage={item.sideImage}
                    show={show}
                    setShow={setShow}
                  />
                ))}
              </ul>
              <div
                className={`flex items-center gap-2 ${
                  isAr ? "md:mr-4" : "md:ml-4"
                }`}
              ></div>
            </div>
            <div className="lg:hidden flex gap-2 items-center">
              {/* <Language href={href} /> */}
              <LanguageMobile  href={href}/>
              <MobileMenu navigationData={navigationData} href={href} />
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Header;
