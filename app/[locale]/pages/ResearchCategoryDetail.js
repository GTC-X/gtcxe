"use client";
import React, { useCallback, useEffect, useState } from "react";
import Hero from "../components/common/Hero";
import { useLocale, useTranslations } from "next-intl";
import { fetchAPI } from "../components/utilities/fetch-api";
import dynamic from "next/dynamic";
import FallbackLoader from "../components/LoadingSpinner";
import { useParams } from "next/navigation";

const BlogList = dynamic(
  () => import("../components/trendingTools/latestNews/blogList"),
  {
    loading: () => <FallbackLoader />,
  }
);
const SingleMainBlog = dynamic(
  () => import("../components/trendingTools/latestNews/singleMainBlog"),
  {
    loading: () => <FallbackLoader />,
  }
);

const ResearchPageDetail = () => {
  const t = useTranslations("about.blog.bannerText");
  const { slug } = useParams();
  const locale = useLocale();
  const [data, setData] = useState([]);
  const [start, setStart] = useState(0);
  const limit = Number(process.env.NEXT_PUBLIC_PAGE_LIMIT);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const location = useParams();

  const fetchData = async () => {
    setLoading(true);
    try {
      const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
      const path = `/blogs`;
      const urlParamsObject = {
        sort: { createdAt: "desc" },
        populate: {
          imageUrl: { populate: ["url"] },
          category: {
            only: ["name"],
          },
          author: {
            populate: "*",
          },
        },
        locale: locale == "zh" ? "zh-Hans" : locale,
        filters: {
          category:
            slug == "technical-analysis"
              ? 8
              : slug == "fundamental-analysis"
                ? 9
                : 10,
        },
        pagination: {
          start: start,
          limit: limit,
        },
      };
      const options = { headers: { Authorization: `Bearer ${token}` } };
      const responseData = await fetchAPI(path, urlParamsObject, options);

      if (responseData?.meta?.pagination?.total == data?.length) {
        setHasMore(false);
        setLoading(false);
      } else {
        setHasMore(true);
      }
      if (start === 0) {
        setData(responseData?.data);
      } else {
        setData((prevData) => [...prevData, ...responseData.data]);
      }
      setStart(start + limit); // Update start for next fetch
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(); // Initial fetch
  }, []);

  const loadMoreData = () => {
    fetchData(); // Load more data on infinite scroll
  };

  return (
    <>
      <div className="bg-white py-10">
        <div className="container mb-10">
          <h2 class="inline-block text-secondary  text-2xl  md:text-3xl xl:text-4xl font-medium">
            {location?.slug?.includes("technical")
              ? "Technical Analysis"
              : location?.slug?.includes("fundamental")
                ? "Fundamental Analysis"
                : "Forecasts"}
          </h2>
          <div className=" h-full " id="scrollableDiv">
            <BlogList posts={data || []} index={0} page={location?.slug} />
          </div>
        </div>
      </div>
    </>
  );
};

export default ResearchPageDetail;
