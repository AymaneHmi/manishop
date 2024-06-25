import { Link } from "react-router-dom";
import Gallery from "./gallery";
import MediaReader from "./media-reader";
import { format } from "date-fns";

export default function BlogCom ({blog}) {
    return (
        <Link to={`/blog/${blog.slug}`}>
            <div className="flex flex-col gap-2 hover:scale-95 transition duration-150">
                <div className="flex flex-col gap-1 rounded">
                    <div className="h-52">
                        <MediaReader
                            media={blog.image}
                            className={"rounded"}
                        />
                    </div>
                    <div className="flex flex-row gap-2 text-xs">
                        <p>@{blog.author}</p>
                        <span>•</span>
                        <p>{format(new Date(blog.createdAt), "PPP")}</p>
                    </div>
                </div>
                <div className="flex flex-col gap-1">
                    <h2 className="font-bold text-2xl">{blog.title}</h2>
                    <div className="text-xs line-clamp-2" dangerouslySetInnerHTML={{ __html: blog.description }}></div>
                </div>
                <div className="flex flex-wrap gap-2">
                    {blog.tags?.map(tag => (
                        <div className="text-xs border py-1 px-2 rounded-xl">{tag}</div>
                    ))}
                </div>
            </div>
        </Link>
    )
}