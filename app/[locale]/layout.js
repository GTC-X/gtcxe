import "../globals.css";
import "aos/dist/aos.css";
import { createTranslator } from "next-intl";
import { notFound } from "next/navigation";
import localFont from "@next/font/local";
import "react-toastify/dist/ReactToastify.css";
import Script from "next/script";
import { supportedLanguages } from "@/helpers/localization";
import { setCookie } from "cookies-next";
import LayoutWrapper from "./LayoutWrapper";
import { headers } from "next/headers";

const roboto = localFont({
  src: [
    { path: "../../public/fonts/Roboto/Roboto-Regular.ttf", weight: "400" },
    { path: "../../public/fonts/Roboto/Roboto-Medium.ttf", weight: "500" },
    { path: "../../public/fonts/Roboto/Roboto-Bold.ttf", weight: "700" },
    { path: "../../public/fonts/Roboto/Roboto-Black.ttf", weight: "900" },
  ],
  variable: "--font-roboto",
});

const kufi = localFont({
  src: [
    { path: "../../public/fonts/Kufi/NotoKufiArabic-Regular.ttf", weight: "400" },
    { path: "../../public/fonts/Kufi/NotoKufiArabic-Medium.ttf", weight: "500" },
    { path: "../../public/fonts/Kufi/NotoKufiArabic-Bold.ttf", weight: "700" },
    { path: "../../public/fonts/Kufi/NotoKufiArabic-Black.ttf", weight: "900" },
  ],
  variable: "--font-kufi",
});

export function generateStaticParams() {
  return [
    { locale: "en" }, { locale: "zh" }, { locale: "ar" }, { locale: "ms" },
    { locale: "hi" }, { locale: "id" }, { locale: "fr" }, { locale: "es" },
    { locale: "vi" }, { locale: "fa" }, { locale: "ja" },
  ];
}

export default async function LocaleLayout({ children, params }) {
  setCookie("gtcfx", "true", { maxAge: 60 * 6 * 24 });
  const { locale } = params;

  let messages;
  try {
    messages = (await import(`../../messages/${locale}.json`)).default;
  } catch {
    notFound();
  }

  const currentLanguage = supportedLanguages[locale];

  /* ---------- SEO/Social variables (MUST exist before return) ---------- */
  const t = createTranslator({ locale, messages });
  const siteName = "GTCFX";
  const baseUrl = "https://www.gtcfx.com";
  
  // Get current pathname from headers (set by middleware)
  const headersList = headers();
  const pathname = headersList.get("x-pathname") || "";
  
  // Extract path without locale prefix
  let cleanPath = "";
  if (pathname) {
    // Remove locale prefix from path if present
    const pathWithoutLocale = pathname.replace(new RegExp(`^/${locale}(/|$)`), "/") || "/";
    // Remove leading slash if not root, or keep root as is
    cleanPath = pathWithoutLocale === "/" ? "" : pathWithoutLocale.replace(/^\/+/, "");
  }
  
  const pageUrl = locale !== "en" 
    ? (cleanPath ? `${baseUrl}/${locale}/${cleanPath}` : `${baseUrl}/${locale}`)
    : (cleanPath ? `${baseUrl}/${cleanPath}` : baseUrl);
    
  const baseTitle =
    t("metaData.home.title") || "GTCFX | Trade CFDs with Low Spreads & Lightning Execution";
  const baseDesc =
    t("metaData.home.des") ||
    "Experience fast, secure, and low-spread CFD trading with GTCFX. Trade global markets confidently with lightning execution and trusted support.";
  const ogImage = `${baseUrl}/og/gtcfx-default.jpg`; // put 1200x630 image here
  const ogLocale = currentLanguage?.ogLocale || "en_US";

  // hreflang alternates from supportedLanguages - preserve current path
  const locales = Object.keys(supportedLanguages || {});
  const altLinks = locales.map((lc) => {
    // Generate URL with same path but different locale
    const href = lc === "en" 
      ? (cleanPath ? `${baseUrl}/${cleanPath}` : baseUrl)
      : (cleanPath ? `${baseUrl}/${lc}/${cleanPath}` : `${baseUrl}/${lc}`);
    const hrefLang = supportedLanguages[lc]?.hreflang || lc;
    return { hrefLang, href };
  });

  return (
    <html
      lang={currentLanguage?.locale || locale}
      dir={currentLanguage?.direction}
      className={`${currentLanguage?.font == "font-kufi"
          ? `${kufi.variable} font-kufi`
          : `${roboto.variable} font-sans`
        } `}
    >
      <head>
        {/* Social meta tags */}
        <meta name="author" content="GTCFX" />
        <meta name="copyright" content="GTC Global SA (Pty) Ltd" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={siteName} />
        <meta property="og:title" content={baseTitle} />
        <meta property="og:description" content={baseDesc} />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content={ogLocale} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={baseTitle} />
        <meta name="twitter:description" content={baseDesc} />
        <meta name="twitter:image" content={ogImage} />

        {/* Hreflang - Canonical is handled by Next.js metadata API */}
        {altLinks.map(({ hrefLang, href }) => (
          <link key={hrefLang} rel="alternate" hrefLang={hrefLang} href={href} />
        ))}
        <link rel="alternate" hrefLang="x-default" href={cleanPath ? `${baseUrl}/${cleanPath}` : baseUrl} />

        <meta name="robots" content="index, follow" />
        <meta
          name="facebook-domain-verification"
          content="60dqaxv53ub77e10r0xc6bmbl9y2b3"
        />

        {/* Scripts */}
        <Script async src="https://www.googletagmanager.com/gtag/js?id=AW-10835048699" />
        <Script
          id="aw-gtag"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'AW-10835048699');
            `,
          }}
        />
        <Script
          id="finteza-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(a,e,f,g,b,c,d){a[b]||(a.FintezaCoreObject=b,a[b]=a[b]||function(){(a[b].q=a[b].q||[]).push(arguments)},a[b].l=1*new Date,c=e.createElement(f),d=e.getElementsByTagName(f)[0],c.async=!0,c.defer=!0,c.src=g,d&&d.parentNode&&d.parentNode.insertBefore(c,d))})
              (window,document,"script","https://content.mql5.com/core.js","fz");
              fz("register","website",{id:"dzwzfjftdagmxioapjzjratbyxemivrdqi",trackLinks:true,timeOnPage:true});
            `,
          }}
        />
        <Script
          src="https://cloud.umami.is/script.js"
          data-website-id="6e6d0916-5871-41f5-8ef5-1f89b83e611b"
          defer
        />
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer', "GTM-PSWH9QF");
            `,
          }}
        />
        <Script
          id="aw-conv"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              function gtag_report_conversion(url) {
                var callback = function () {
                  if (typeof(url) != 'undefined') window.location = url;
                };
                gtag('event', 'conversion', {
                  'send_to': 'AW-10835048699/LUb0CNmY5OsYEPvxxq4o',
                  'event_callback': callback
                });
                return false;
              }
              document.addEventListener("wpcf7submit", function(){
                gtag_report_conversion();
              }, false);
            `,
          }}
        />
        <noscript
          dangerouslySetInnerHTML={{
            __html: `
              <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-PSWH9QF"
                height="0" width="0" style="display:none;visibility:hidden"></iframe>
            `,
          }}
        />
        {/* Replace raw <script> with Next <Script> */}
        <Script
          defer
          id="convrs-webchat"
          src="https://webchat.conv.rs/0bc7dfc471ae1a9e19e6a0418f9b6fd3724bfbcf.js"
        />
      </head>

      <body className="bg-white">
        <LayoutWrapper
          children={children}
          currentLanguage={currentLanguage}
          locale={locale}
          messages={messages}
        />
      </body>
    </html>
  );
}
