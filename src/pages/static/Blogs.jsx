import Container from "../../components/ui/Container";
import PageHeading from "../../components/ui/PageHeading";

import getBlogs from '../../actions/getBlogs';
import BlogCom from "../../components/BlogCom";

export default function Blogs () {
    const blogs = getBlogs();
    return (
        <Container>
            <PageHeading
                title="Blogs"
                subtitle="Discover all blogs we write."
            />
            <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {blogs?.map(blog => (
                    <BlogCom blog={blog} />
                ))}
            </section>
        </Container>
    )
}