"use client";
import React, { useCallback, useEffect, useState, useMemo } from "react";
import { useParams } from "next/navigation";
import { useLocale } from "next-intl";
import Link from "next-intl/link";
import Image from "next/image";
import SocialBanner from "../components/common/SocialBanner";
import MorePosts from "../components/common/MorePosts";
import CommentForm from "../components/common/CommentForm";
import AOS from "aos";
import FallbackLoader from "../components/LoadingSpinner";
import { fetchAPI } from "../components/utilities/fetch-api";
import { formatDate } from "../components/utilities/api-helper";
import NotFound from "../[404]/page";

const SingleBlog = ({ url, page }) => {
  useEffect(() => {
    AOS.init({ disable: "mobile" });
  }, []);
  const params = useParams();
  const locale = useLocale();
  const [data, setData] = useState(null);
  const [recentData, setRecentData] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [recentLoading, setRecentLoading] = useState(false);
   const getCategory = () => {
    switch (url) {
      case "highlights":
        return 2;
      case "latest-news":
        return 1;
      case "company-news":
        return 7;
      case "market-overview":
        return 5;
      case "blogs":
        return 6;
      case "technical-analysis":
        return 8;
      case "fundamental-analysis":
        return 9;
      case "weekly-forecasts":
        return 10;
    }
  };
  const fetchData = useCallback(async () => {
    setLoading(true);
    const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
    const path = `/blogs`;
    const urlParamsObject = {
      sort: { createdAt: "desc" },
      populate: {
        imageUrl: { populate: ["url"] },
        category: { populate: "*" },
        author: {
          populate: "*",
        },
      },
      filters: {
        // category: getCategory(),
        slug: decodeURIComponent(
          page == "sub" ? params?.subslug : params?.slug
        ),
      },
      locale: params?.locale == "zh" ? "zh-Hans" : params?.locale,
    };
    const options = { headers: { Authorization: `Bearer ${token}` } };
    fetchAPI(path, urlParamsObject, options)
      .then((res) => {
        setLoading(false);
        if (res?.data?.length == 0) {
          setNotFound(true);
        }
        console.log("res?.data?.[0]",res?.data?.[0]);
        setData(res?.data?.[0] || null);
      })
      .catch((err) => {
        setLoading(false);
        setData(null);
      });
  }, []);

  const fetchRecentData = useCallback(async (start, limit) => {
    setRecentLoading(true);
    const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
    const path = `/blogs`;
    const urlParamsObject = {
      sort: { createdAt: "desc" },
      populate: {
        imageUrl: { populate: ["url"] },
        category: { populate: "*" },
        author: {
          populate: "*",
        },
      },
      filters: {
        category: getCategory(),
      },
      pagination: {
        start: start,
        limit: limit,
      },
      locale: params?.locale == "zh" ? "zh-Hans" : params?.locale,
    };
    const options = { headers: { Authorization: `Bearer ${token}` } };
    fetchAPI(path, urlParamsObject, options)
      .then((res) => {
        setRecentLoading(false);
        setRecentData(
          res?.data?.filter((x) => x?.id != decodeURIComponent(params?.slug))
        );
      })
      .catch((err) => {
        setRecentLoading(false);
        setRecentData([]);
      });
  }, []);

  useEffect(() => {
    fetchData();
    fetchRecentData(0, Number(process.env.NEXT_PUBLIC_PAGE_LIMIT));
  }, []);

 

  // Calculate reading time
  const readingTime = useMemo(() => {
    if (!data?.attributes?.descreption) return 0;
    const text = data.attributes.descreption.replace(/<[^>]*>/g, ""); // Remove HTML tags
    const words = text.split(/\s+/).length;
    const minutes = Math.ceil(words / 200); // Average reading speed: 200 words per minute
    return minutes;
  }, [data?.attributes?.descreption]);

  // Format dates
  const publishedDate = useMemo(() => {
    if (!data?.attributes?.createdAt) return null;
    return formatDate(data.attributes.createdAt);
  }, [data?.attributes?.createdAt]);

  const updatedDate = useMemo(() => {
    if (!data?.attributes?.updatedAt) return null;
    return formatDate(data.attributes.updatedAt);
  }, [data?.attributes?.updatedAt]);


  // Get author data
  const author = data?.attributes?.author || null;
  const authorName = data?.attributes?.author?.name || "GTCFX Team";
  const authorImage = author?.authorImg?.data?.attributes?.url
    ? `${process.env.NEXT_PUBLIC_STRAPI_API_URL}${author?.authorImg?.data?.attributes?.url}`
    : null;


  return (
    <>
     
      {notFound ? (
        <NotFound />
      ) : (
        <>
          {isLoading ? (
            <FallbackLoader />
          ) : (
            <section className="bg-gradient-to-r from-[#24358b] via-[#242c75] to-[#141b43] border-y border-gray-200 py-8 md:py-12">
              <div className="container">


                {/* Main Title */}
                <h1 className="text-white text-xl md:text-2xl lg:text-3xl font-bold mb-8 leading-tight">
                  {data?.attributes?.title}
                </h1>

                {/* Metadata Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-6 text-white">
                  {/* Published By - Only show if author exists */}
                  {author && (
                    <div className="flex items-center gap-3">
                      <div className="flex-shrink-0 h-[40px] w-[40px] relative">
                        {authorImage ? (
                          <Image
                            src={authorImage}
                            alt={authorName}
                            fill
                            className="rounded-full object-cover bg-white"
                            unoptimized
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white font-semibold">
                            {authorName.charAt(0).toUpperCase()}
                          </div>
                        )}
                      </div>
                      <div>
                        <p className="text-xs text-white/70">Published By</p>
                        <p className="text-sm font-semibold">{authorName}</p>
                      </div>
                    </div>
                  )}

                  {/* Published On */}
                  <div>
                    <p className="text-xs text-white/70 mb-1">Published On</p>
                    <p className="text-sm font-semibold">{publishedDate || "N/A"}</p>
                  </div>

                  {/* Updated On */}
                  <div>
                    <p className="text-xs text-white/70 mb-1">Updated On</p>
                    <p className="text-sm font-semibold">{updatedDate || "N/A"}</p>
                  </div>

                  {/* Min Reading */}
                  <div>
                    <p className="text-xs text-white/70 mb-1">Min Reading</p>
                    <p className="text-sm font-semibold">{readingTime || 0}</p>
                  </div>
                </div>
              </div>
            </section>
          )}
          {/* Featured Image Hero */}
       
          <section className="flex flex-col md:flex-row container pb-12 gap-8 lg:gap-12 mt-12 py-2">
            <div className={page == "sub" ? "flex-[90%]" : "flex-[70%]"}>
              {/* Author Info Card - Only show if author exists */}
            
              {/* Blog Content */}
              <article className="bg-white rounded-2xl shadow-lg border border-gray-100 mb-8">
                <div
                  className="single-blog-descreption prose prose-lg max-w-none prose-headings:font-bold prose-headings:text-gray-900 prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-6 prose-a:text-secondary prose-a:no-underline hover:prose-a:underline prose-strong:text-gray-900 prose-img:rounded-xl prose-img:shadow-lg prose-img:my-8 prose-blockquote:border-l-4 prose-blockquote:border-secondary prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:text-gray-600 prose-ul:list-disc prose-ol:list-decimal prose-li:marker:text-secondary"
                  dangerouslySetInnerHTML={{
                    __html: data?.attributes?.descreption,
                  }}
                />
              </article>

              {/* Divider */}
              <div className="flex items-center justify-center my-10">
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
                <div className="mx-4 w-2 h-2 rounded-full bg-secondary"></div>
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
              </div>

              {/* Author Details Section */}
              {author && (
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 mb-8 p-4 md:p-5">
                  <div className="flex flex-col md:flex-row items-center gap-6">
                    {/* Author Image */}
                    <div className="flex-shrink-0">
                      <div className="relative h-12 w-12 md:h-20 md:w-20">
                        {authorImage ? (
                          <Image
                            src={authorImage}
                            alt={authorName}
                            fill
                            className="rounded-full object-cover border-2 border-primary"
                            unoptimized
                          />
                        ) : (
                          <div className="w-full h-full rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-2xl md:text-3xl font-bold border-2 border-red-500">
                            {authorName.charAt(0).toUpperCase()}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Author Info */}
                    <div className="flex-1">
                      <h3 className="text-xl md:text-base font-semibold text-primary mb-3">
                        {authorName}
                      </h3>
                      {author?.designation && (
                        <p className="text-gray-600 text-sm md:text-sm mb-4 font-medium">
                          {author.designation}
                        </p>
                      )}
                      {author?.bio && (
                        <p className="text-gray-700 text-sm md:text-sm leading-relaxed mb-4">
                          {author.bio}
                        </p>
                      )}
                      {(!author?.bio && author?.description) && (
                        <p className="text-gray-700 text-sm md:text-base leading-relaxed mb-4">
                          {author.description}
                        </p>
                      )}

                    <SocialBanner showBackground={false} />
                    </div>
                  </div>
                </div>
              )}

              {/* Comment Form */}
              {data && (
                <CommentForm
                  blogSlug={data?.attributes?.slug}
                  blogId={data?.id}
                />
              )}
            </div>

            {page != "sub" && (
              <div className="flex-[30%] self-start sticky top-24 space-y-6">
                {/* Share Section */}
                <div className="bg-gradient-to-br from-primary via-[#1a1a3e] to-primary rounded-2xl p-6 shadow-xl">
                  <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <svg className="w-5 h-5 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                    </svg>
                    Share Article
                  </h3>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                    <SocialBanner />
                  </div>
                </div>

                {/* Related Posts */}
                {!isLoading && recentLoading ? (
                  <FallbackLoader />
                ) : (
                  recentData?.length > 0 && (
                    <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                      <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <svg className="w-5 h-5 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                        Related Articles
                      </h3>
                      <MorePosts recentData={recentData} />
                    </div>
                  )
                )}
              </div>
            )}
          </section>
        </>
      )}
    </>
  );
};

export default SingleBlog;
