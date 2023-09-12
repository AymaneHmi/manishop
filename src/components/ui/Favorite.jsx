import { Heart } from "lucide-react";
import {AiFillHeart} from 'react-icons/ai'

export default function ({
    handleFavorite,
    isFavorite
}) {
    return (
        // <div onClick={handleFavorite} className="relative absolute top-3 right-3 z-[4] cursor-pointer drop-shadow-lg bg-primary hover:scale-95 border">
        //     <Heart 
        //     className="absolute top-0 right-0 z-[6] text-white"/>
        //     {isFavorite && <AiFillHeart 
        //     className="absolute top-0 right-0 z-[5] text-2xl text-white" />}
        // </div>
        <div onClick={handleFavorite} className="absolute z-[4] top-3 right-3 w-5 h-5 hover:scale-125 transition duration-150">
            <Heart 
            className="absolute top-0 right-0 z-[6] text-white"/>
            {isFavorite && <AiFillHeart 
            className="absolute top-0 right-0 z-[5] text-2xl text-white" />}
        </div>
    )
}