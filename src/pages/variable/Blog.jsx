import { useParams } from "react-router-dom";
import Container from "../../components/ui/container";
import { useEffect, useState } from "react";
import axios from "axios";
import EmptyState from "../../components/ui/empty-state";
import MediaReader from "../../components/media-reader";
import { format } from "date-fns";

const api = import.meta.env.VITE_API;

export default function Blog () {
    const {blogSlug} = useParams();

    const [blogFetch, setBlogFetch] = useState({
        data: {},
        isLoading: false,
        error: false,
        empty: false
    })

    const blog = blogFetch?.data

    const fetchBlog = async () => {
        setBlogFetch(e => ({...e, isLoading: true}))
        axios.get(api + '/blogs/blog?slug=' + blogSlug)
        .then(res => {
            if(res.data?.status === 200) {
                setBlogFetch(e => ({...e, data: res.data?.data}))
            } else {
                setBlogFetch(e => ({...e, empty: true}))
            }
        })
        .catch(err => {
            setBlogFetch(e => ({...e, error: err}))
        })
        .finally(() => {
            setBlogFetch(e => ({...e, isLoading: false}))
        })
    }
    
    useEffect(() => {
        fetchBlog()
    },[blogSlug])

    if(blogFetch.error) {
        return (
            <Container>
                <EmptyState 
                    title="Uh, something went wrong!" 
                    subtitle="Check your connection, and try again." 
                />
            </Container>
        )
    }

    if(blogFetch.empty) {
        return (
            <Container>
                <EmptyState 
                    title="No blog found!" 
                    subtitle="Looks like this page is not available any more." 
                />
            </Container>
        )
    }
        
    if(blogFetch.isLoading) {
        return (
            <Container>
                <div className="w-5/6 flex flex-col mx-auto gap-4">
                    <div className="animate-pulse bg-gray-400 h-10 rounded-lg h-4 rounded w-2/3"></div>
                    <div className="animate-pulse bg-gray-400 h-10 rounded-lg h-[50vh] rounded w-full"></div>
                    <div className="animate-pulse bg-gray-400 h-10 rounded-lg h-4 rounded w-4/5"></div>
                    <div className="animate-pulse bg-gray-400 h-10 rounded-lg h-5 rounded w-1/2"></div>
                </div>
            </Container>
        )
    }

    return (
        <Container className={'my-4'}>
            <section className="flex flex-col gap-4 w-11/12 lg:w-5/6 mx-auto">
                <h1 className="font-bold text-2xl lg:text-5xl">{blog?.title}</h1>
                <div className="flex flex-row gap-2">
                    {blog.tags?.map((tag, index) => (
                        <div key={index} className="text-xs border py-1 px-2 rounded-xl">{tag}</div>
                    ))}
                </div>
                <div className="flex flex-row gap-2 text-xs">
                    <p>{blog.author}</p>
                    <span>•</span>
                    <p>{blog?.createdAt && format(new Date(blog?.createdAt), "PPP")}</p>
                </div>
                <div className="w-full">
                <MediaReader
                    media={blog.image}
                    className={"rounded"}
                />
                </div>
                <div className="blog-container text-sm" dangerouslySetInnerHTML={{ __html: blog.description }}></div>
            </section>
        </Container>
    )
}