"use client";
import React, { useEffect, useState, useCallback } from "react";
import { useLocale } from "next-intl";
import dynamic from "next/dynamic";
import FallbackLoader from "../components/LoadingSpinner";
import { fetchAPI } from "../components/utilities/fetch-api";
import { useRouter } from "next/navigation";

const BlogList = dynamic(
    () => import("../components/trendingTools/latestNews/blogList"),
    { loading: () => <FallbackLoader /> }
);

// ---- helper to normalize locale for Strapi
const normLocale = (l) => l == "zh" ? "zh-Hans" : l;

export default function ResearchPage() {
    const locale = useLocale();
    const router = useRouter();

    // separate lists
    const [tech, setTech] = useState([]);
    const [fund, setFund] = useState([]);
    const [forecasts, setForecasts] = useState([]);

    const [loading, setLoading] = useState(false);
    const limit = Number(process.env.NEXT_PUBLIC_PAGE_LIMIT || 6);

    const commonPopulate = {
        imageUrl: { populate: ["url"] },
        category: { fields: ["name", "slug"] },
        author: { populate: "*" },
    };

    const fetchBySlug = useCallback(
        async (slug, { start = 0, limit = 6 } = {}) => {
            const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
            const path = `/blogs`;
            const urlParamsObject = {
                sort: { createdAt: "desc" },
                populate: commonPopulate,
                locale: normLocale(locale),
                filters: {
                    category: slug,
                },
                pagination: { start, limit },
            };
            const options = { headers: { Authorization: `Bearer ${token}` } };
            return fetchAPI(path, urlParamsObject, options);
        },
        [locale]
    );

    const loadAll = useCallback(async () => {
        setLoading(true);
        try {
            const [rTech, rFund, rFc] = await Promise.all([
                fetchBySlug(8, { start: 0, limit }),
                fetchBySlug(9, { start: 0, limit }),
                fetchBySlug(10, { start: 0, limit }),
            ]);

            setTech(rTech?.data || []);
            setFund(rFund?.data || []);
            setForecasts(rFc?.data || []);
        } catch (e) {
            console.error("Strapi fetch error:", e);
        } finally {
            setLoading(false);
        }
    }, [fetchBySlug, limit]);

    useEffect(() => {
        loadAll();
    }, [loadAll]);

    

    return (
        <div className="bg-white py-10">
            {/* Technical */}
            {tech?.length > 0 &&
                <div className="container mb-10">
                    <h2 className="inline-block text-secondary text-2xl md:text-3xl xl:text-4xl font-medium">
                        Technical
                    </h2>
                    <div className="h-full" id="scrollableDiv">
                        <BlogList posts={tech} index={0} page="technical-analysis" />
                    </div>
                    <div className="mt-8 text-center">
                        <p
                            className="bg-gradient-to-b cursor-pointer w-fit mx-auto from-primary via-primary from-10% to-primary to-90% text-white text-sm 3xl:text-xl px-8 py-3 text-center rounded-md transition-colors duration-900 hover:bg-gradient-to-r hover:from-secondary hover:to-[#b68756] duration-500"
                            onClick={() => router.push("/research/technical-analysis")}
                        >
                            View More
                        </p>
                    </div>
                </div>
            }

            {/* Fundamental */}
            {fund?.length > 0 &&

                <div className="container mb-10">
                    <h2 className="inline-block text-secondary text-2xl md:text-3xl xl:text-4xl font-medium">
                        Fundamental
                    </h2>
                    <div className="h-full" id="scrollableDiv">
                        <BlogList posts={fund} index={0} page="fundamental-analysis" />
                    </div>
                    <div className="mt-8 text-center">
                        <p
                            className="bg-gradient-to-b cursor-pointer w-fit mx-auto from-primary via-primary from-10% to-primary to-90% text-white text-sm 3xl:text-xl px-8 py-3 text-center rounded-md transition-colors duration-900 hover:bg-gradient-to-r hover:from-secondary hover:to-[#b68756] duration-500"
                            onClick={() => router.push("/research/fundamental-analysis")}
                        >
                            View More
                        </p>
                    </div>
                </div>
            }

            {/* Forecasts */}
            {forecasts?.length > 0 &&
                <div className="container">
                    <h2 className="inline-block text-secondary text-2xl md:text-3xl xl:text-4xl font-medium">
                        Forecasts
                    </h2>
                    <div className="h-full" id="scrollableDiv">
                        <BlogList posts={forecasts} index={0} page="weekly-forecasts" />
                    </div>
                    <div className="mt-8 text-center">
                        <p
                            className="bg-gradient-to-b cursor-pointer w-fit mx-auto from-primary via-primary from-10% to-primary to-90% text-white text-sm 3xl:text-xl px-8 py-3 text-center rounded-md transition-colors duration-900 hover:bg-gradient-to-r hover:from-secondary hover:to-[#b68756] duration-500"
                            onClick={() => router.push("/research/weekly-forecasts")}
                        >
                            View More
                        </p>
                    </div>
                </div>
            }
        </div>
    );
}
