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
  const siteName = "GTCXE";
  const baseUrl = "https://www.gtcxe.com";
  
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
        <meta name="author" content="GTCXE" />
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
