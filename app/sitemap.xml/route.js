import { fetchAPI } from "@/app/[locale]/components/utilities/fetch-api";
export const dynamic = "force-dynamic";

export async function GET() {
  const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://www.gtcxe.com";

  /* ------------------------------------------
     1. Static English URLs ONLY
  ------------------------------------------- */
  const staticPaths = [
    "/", "/about-us", "/why-gtc-group", "/global-presence",
    "/awards", "/contact-us", "/free-demo-account",
    "/deposit", "/account-types", "/forex", "/cfd-energy",
    "/precious-metals", "/commodities", "/indices",
    "/mt5-platform", "/mt4-platform", "/download-app", "/market-overview",
    "/vps-hosting-services", "/copy-trading",
    "/introductory-broker", "/economic-calendar", "/glossary-faqs", "/liquidity-technology",
    "/client-agreement-MU", "/client-agreement-VU",
    "/liquidity-providers", "/pamm-account", "/mam-account", "/privacy-policy",
    "/withdrawal-policy", "/kyc-compliance-policy",
    "/deposit-and-refund-policy", "/customer-due-diligence-policy"
  ];

  const staticUrls = staticPaths.map((path) => {
    return `
      <url>
        <loc>${baseUrl}${path}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
      </url>
    `;
  });

  /* ------------------------------------------
     2. BLOG URLs — English ONLY  
     No translation, no duplicates
  ------------------------------------------- */
  let blogUrls = [];

  try {
    const urlParamsObject = {
      sort: { createdAt: "desc" },
      populate: {
        imageUrl: { populate: ["url"] },
        category: { only: ["name"] },
        author: { populate: "*" },
      },
      locale: "en",
      filters: { category: 6 },
      pagination: { start: 0, limit: 500 },
    };

    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const blogRes = await fetchAPI("/blogs", urlParamsObject, options);

    if (blogRes?.data?.length > 0) {
      blogUrls = blogRes.data
        .map((entry) => {
          const slug = entry?.attributes?.slug;
          const categorySlug = entry?.attributes?.category?.data?.attributes?.slug;

          if (!slug || !categorySlug) return null;

          return `
            <url>
              <loc>${baseUrl}/${categorySlug}/${slug}</loc>
              <lastmod>${new Date(entry.attributes.updatedAt).toISOString()}</lastmod>
            </url>
          `;
        })
        .filter(Boolean); // remove nulls
    }
  } catch (error) {
    console.error("Error fetching blog URLs for sitemap:", error);
  }

  /* ------------------------------------------
     3. FINAL XML
  ------------------------------------------- */
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${staticUrls.join("\n")}
  ${blogUrls.join("\n")}
</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
