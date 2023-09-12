import { Link } from "react-router-dom";
import getCategories from "../actions/getCategories";

const categoriesImages = import.meta.env.VITE_CATEGORIES_IMAGES;


export default function Categories () {

    const categories = getCategories();

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {categories?.map(category => (
                <div className="relative rounded-xl h-40 md:h-80 shadow-xl cursor-pointer overflow-hidden">
                    <img className="object-cover h-full w-full" src={categoriesImages + category.image} alt="" />
                    <div className="absolute top-0 left-0 w-full bottom-0 flex flex-col items-center justify-center bg-black/80 text-white gap-2">
                        <div className="text-3xl font-bold">{category.name}</div>
                        <Link key={category.id} to={`/${category.name}`}>
                            <div className="border rounded-xl py-1 px-3 hover:bg-white hover:text-black trnsition duration-150">Shop Now</div>
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    )
}