"use client"
import { useParams } from "next/navigation";
import { fetchAPI } from "../../../components/utilities/fetch-api";
import SingleBlog from "../../../pages/SingleBlog";
const Page = () => {
    const { slug } = useParams()
    return <div>
        <SingleBlog url={slug} page="sub" />
    </div>
};

export default Page;
