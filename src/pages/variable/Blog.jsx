import { useParams } from "react-router-dom";
import Container from "../../components/ui/Container";
import PageHeading from "../../components/ui/PageHeading";
import { useEffect, useState } from "react";
import { useRequest } from "../../hooks/useRequest";
import ImgsCom from "../../components/ImgsCom";

export default function Blog () {
    const {blogSlug} = useParams();

    const [blog, setBlog] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const [noBlog, setNoBlog] = useState(false)

    const fetchBlog = async () => {
        setIsLoading(true)
        const data = {
            slug: blogSlug
        }
        const responseData = await useRequest.get('/blogs/blog.php', data);
        setIsLoading(false);
        if(responseData.error){
            setNoBlog(true)
            return;
        }
        setBlog(responseData)
    }

    useEffect(() => {
        fetchBlog();
    },[blogSlug])

    return (
        <Container>
            <PageHeading
                title={"Blog"}
                subtitle={"explore more about this blog."}
            />
            <section className="flex flex-col gap-4 w-full mx-auto">
                <h2 className="font-bold text-5xl">{blog?.title}</h2>
                <div className="flex flex-row gap-2">
                    {blog.tags?.map(tag => (
                        <div className="text-xs border py-1 px-2 rounded-xl">{tag}</div>
                    ))}
                </div>
                <div className="flex flex-row gap-2 text-xs">
                    <p>{blog.author}</p>
                    <span>•</span>
                    <p>{blog.createdAt}</p>
                </div>
                <div className="w-full">
                    <ImgsCom
                        images={blog?.image}
                        blogs
                    />
                </div>
                <div className="text-xs" dangerouslySetInnerHTML={{ __html: blog.description }}></div>
            </section>
        </Container>
    )
}