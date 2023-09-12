import { Link } from "react-router-dom";
import ImgsCom from "./ImgsCom"

import {FaStar} from 'react-icons/fa6'
import { useFavorites } from "../hooks/use-favorites";
import Favorite from "./ui/Favorite";

export default function ProductCom ({ product }) {

    const {isFavorite, handleFavorite} = useFavorites();

    const productCreatedDateString = product.createdAt;
    const productCreatedDate = new Date(Date.parse(productCreatedDateString));
    const currentDate = new Date();

    const oneWeekInMilliseconds = 7 * 24 * 60 * 60 * 1000;

    const isOneWeekOld = currentDate.getTime() - productCreatedDate.getTime() <= oneWeekInMilliseconds;


    return (
        <>
            <Link to={`/products/${product.slug}`}>
                <div className="relative rounded text-center hover:scale-95 flex flex-col items-center transition-all duration-150">
                    <div className="relative h-[60vh] w-full">
                        <Favorite 
                            handleFavorite={(e) => handleFavorite(e,product.id)}
                            isFavorite={isFavorite(product.id)}
                        />
                        <ImgsCom 
                            images={product.images}
                            showDots
                        />
                    </div>
                    {isOneWeekOld && <div className="shadow-md rounded-r-lg absolute bg-primary text-white py-2 px-4 top-6 left-0 uppercase text-sm">New</div>}
                    <h2 className="font-bold text-base capitalize">{product.title}</h2>
                    <div className="flex flex-row items-center gap-0.5">
                        <FaStar className="text-amber-400 text-lg" />
                        <FaStar className="text-amber-400 text-lg" />
                        <FaStar className="text-amber-400 text-lg" />
                        <FaStar className="text-amber-400 text-lg" />
                        <FaStar className="text-gray-300 text-lg" />
                        <span>(15)</span>
                    </div>
                    <h2 className="font-bold text-xl md:text-2xl my-2">${product.price}</h2>
                </div>
            </Link>
        </>
    )
}