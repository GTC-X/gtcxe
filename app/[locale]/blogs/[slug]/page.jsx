import { fetchAPI } from "../../components/utilities/fetch-api";
import SingleBlog from "../../pages/SingleBlog";
import { getCanonicalUrl } from "@/helpers/canonicalUrl";

export async function generateMetadata({ params, searchParams }, parent) {
  const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
  const path = `/blogs`;

  // Define the 'locale' variable based on the condition
  const locale = params?.locale;

  const urlParamsObject = {
    sort: { createdAt: "desc" },
    populate: {
      imageUrl: { populate: ["url"] },
      category: { populate: "*" },
      author: {
        populate: "*",
      },
    },
    locale: locale == "zh" ? "zh-Hans" : locale, // Use the defined 'locale' variable
    filters: {
      slug: decodeURIComponent(params?.slug),
    },
  };
  const options = { headers: { Authorization: `Bearer ${token}` } };
  const product = await fetchAPI(path, urlParamsObject, options);
  const url = getCanonicalUrl(locale, `blogs/${params?.slug}`);

  const metaTitle =
    product?.data?.[0]?.attributes?.metaTitle ||
    product?.data?.[0]?.attributes?.title;
  const metaDescription =
    product?.data?.[0]?.attributes?.metaDescreption ||
    product?.data?.[0]?.attributes?.short_descreption;

  return {
    title: metaTitle,
    description: metaDescription,
    metadataBase: new URL("https://www.gtcfx.com"),
    openGraph: {
      images: [
        {
          url: `${process.env.NEXT_PUBLIC_STRAPI_API_URL}${product?.data?.[0]?.attributes?.imageUrl?.data?.attributes?.url}`, // Must be an absolute URL
        },
      ],
      title: metaTitle,
      description: metaDescription,
      url: url,
    },
    alternates: {
      canonical: url,
    },
  };
}

const Page = () => {
  return (
    <div>
      <SingleBlog url="blogs" />
    </div>
  );
};

export default Page;
