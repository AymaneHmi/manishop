import { Link } from "react-router-dom";

import useUser from "../hooks/use-user";
import useFavorite from "../hooks/use-favorite";
import Gallery from "./gallery";
import Favorite from "./ui/favorite";
import ProductPrice from "./product-price";
import ReviewRate from "./review-rate";

export default function ProductCom ({ product }) {

    const {user} = useUser();
    const {isFavorite, handleFavorite} = useFavorite();

    const productCreatedDateString = product.createdAt;
    const productCreatedDate = new Date(Date.parse(productCreatedDateString));
    const currentDate = new Date();

    const oneWeekInMilliseconds = 4 * 7 * 24 * 60 * 60 * 1000;

    const isOneWeekOld = currentDate.getTime() - productCreatedDate.getTime() <= oneWeekInMilliseconds;


    return (
        <>
            <Link to={`/products/${product.slug}`}>
                <div className="relative rounded text-center flex flex-col items-center gap-2 hover:scale-95 transition-all duration-150">
                    <div className="relative h-[30vh] lg:h-[45vh] w-full">
                        <Favorite 
                            isFavorite={isFavorite({item: !user?.id ? product : {}, productId:product.id})}
                            handleFavorite={() => handleFavorite({item: !user?.id ? product : {}, productId:product.id, user})}
                        />
                        <Gallery 
                            media={product.media}
                        />
                    </div>
                    {isOneWeekOld && <div className="shadow-md rounded-r-lg absolute bg-primary text-white py-2 px-4 top-6 left-0 uppercase text-sm">New</div>}
                    <h2 className="text-sm lg:text-base font-bold capitalize text-gray-800 line-clamp-2">{product.title}</h2>
                    {product.reviews && <div className="flex flex-row gap-2 items-center">
                        <ReviewRate
                            rate={product.reviews?.averageRate}
                            className={"gap-.5"}
                            size={15}
                            viewOnly
                        />
                        <span className="text-xs">({product.reviews?.totalReviews})</span>
                    </div>}
                    <ProductPrice
                        price={product.price}
                        discountAmount={product.discountAmount}
                    />
                </div>
            </Link>
        </>
    )
}