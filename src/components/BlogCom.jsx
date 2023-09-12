import { Link } from "react-router-dom";
import ImgsCom from "./ImgsCom";

export default function BlogCom ({blog}) {
    return (
        <Link to={`/blogs/${blog.slug}`}>
            <div className="flex flex-col gap-2 hover:scale-95 transition duration-150">
                <div className="flex flex-col gap-2 rounded">
                    <ImgsCom
                        images={blog.image}
                        blogs
                    />
                    <div className="flex flex-row gap-2 text-xs">
                        <p>{blog.author}</p>
                        <span>•</span>
                        <p>{blog.createdAt}</p>
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <h2 className="font-bold text-xl">{blog.title}</h2>
                    <div className="text-xs" dangerouslySetInnerHTML={{ __html: blog.description }}></div>
                </div>
                <div className="flex flex-row gap-2">
                    {blog.tags?.map(tag => (
                        <div className="text-xs border py-1 px-2 rounded-xl">{tag}</div>
                    ))}
                </div>
            </div>
        </Link>
    )
}