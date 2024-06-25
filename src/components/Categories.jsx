import { Link } from "react-router-dom";
import useData from "../hooks/use-data";
import EmptyState from "./ui/empty-state";
import { twMerge } from "tailwind-merge";

export default function Categories () {

    const {categories, isLoadingCategories, errorCategories} = useData()

    if(isLoadingCategories) {
        return (
            <div>Loading ...</div>
        )
    }

    if(errorCategories) {
        return <EmptyState
            title={'Uh no! Error accured when loading categories'}
            subtitle={'Check your connection!'}
        />
    }

    return (
        <div className="grid grid-cols-3 grid-rows-3 gap-4">
            {categories?.map((category, i) => (
                <Link key={category.id} to={'/products?category=' + category.name?.toLowerCase()} className={twMerge("group", i === 0 && "row-span-3 col-span-3", i === 1 && "row-span-2")}>
                    <div className="relative rounded-xl h-40 md:h-80 shadow-xl cursor-pointer overflow-hidden">
                        <img className="group-hover:scale-125 object-cover h-full w-full transition duration-250" src={category.image?.[0]} alt="" />
                        <div className="absolute left-0 bottom-0 m-2 bg-white rounded-2xl px-6 py-2">
                            <div className="text-sm lg:text-lg font-bold uppercase">Shop {category.name}</div>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    )
}