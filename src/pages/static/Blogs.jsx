import Container from "../../components/ui/container";
import PageHeading from "../../components/ui/page-heading";

import BlogCom from "../../components/blog-component";
import useData from "../../hooks/use-data";

export default function Blogs () {
    const {blogs, isLoadingBlogs, errorBlogs} = useData();

    if(isLoadingBlogs) {
        return (
            <Container>
                <PageHeading
                    title="Blogs"
                    subtitle="Discover all blogs we write."
                />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-4">
                    {new Array(6).fill(null).map((_,index) => (
                        <div key={index} className="space-y-4 rounded flex flex-col">
                            <div className="animate-pulse bg-gray-400 h-10 rounded-lg h-52 rounded w-full"></div>
                            <div className="animate-pulse bg-gray-400 h-10 rounded-lg h-4 rounded w-2/3"></div>
                            <div className="animate-pulse bg-gray-400 h-10 rounded-lg h-4 rounded w-4/5"></div>
                            <div className="animate-pulse bg-gray-400 h-10 rounded-lg h-5 rounded w-1/2"></div>
                        </div>
                    ))}
                </div>
            </Container>
        )
    }

    return (
        <Container>
            <PageHeading
                title="Blogs"
                subtitle="Discover all blogs we write."
            />
            <section className="grid grid-cols-1 md:grid-cols-3 gap-4 my-4">
                {blogs?.map(blog => (
                    <BlogCom key={blog.id} blog={blog} />
                ))}
            </section>
        </Container>
    )
}