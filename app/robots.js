const nonEnglishLocales = [
  "ar",
  "zh",
  "zh-tw",
  "ms",
  "tr",
  "ur",
  "hi",
  "id",
  "fr",
  "es",
  "pt",
  "vi",
  "fa",
  "tl",
  "th",
  "ru",
  "ja",
  "ko",
  "ps",
  "it",
];

// Build disallow paths for all unwanted locale folders
const disallowedLocalePaths = nonEnglishLocales.flatMap((locale) => [
  `/${locale}`,
  `/${locale}/*`,
]);

export default function robots() {
  return {
    rules: {
      userAgent: "*",

      // Only allow English URLs (root + /en/)
      allow: ["/", "/en", "/en/*"],

      // Everything we want to keep out of index
      disallow: [
        // Block query-parameter URLs (those long tracking / stock URLs)
        "/*?",
        "/*&",
        "/*=",
        "/*utm_",
        "/faq",
        "/economic-news-feed",
        "/risk-warning",
        "/trade-to-win",
        "/ctrader",

        // Block duplicate news listings if you don’t want them indexed
        "/latest-news/",
        "/latest-news/*",
      ],
    },

    // Your main sitemap
    sitemap: "https://www.gtcfx.com/sitemap.xml",
  };
}
