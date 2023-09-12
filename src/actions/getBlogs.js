import useFetch from "../hooks/useFetch";
const blogsApi = import.meta.env.VITE_BLOGS_API;

export default function getBlogs () {
    const blogs = useFetch(blogsApi);
    return blogs;
}