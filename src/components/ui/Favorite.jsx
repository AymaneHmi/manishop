import { Heart } from "lucide-react";
import {AiFillHeart} from 'react-icons/ai'

export default function Favorite({
    handleFavorite,
    isFavorite
}) {

    const handleFavorites = (e) => {
        e.preventDefault();
        handleFavorite()
    }
    return (
        <div onClick={handleFavorites} className="absolute z-[4] top-3 right-3 w-8 h-8 flex flex-col items-center justify-center bg-white rounded-full shadow-xl cursor-pointer hover:scale-125 transition duration-150">
            <Heart 
            className="absolute unsit-0 z-[6] text-primary"/>
            {!!isFavorite && <AiFillHeart 
            className="absolute unsit-0 z-[5] text-2xl text-primary" />}
        </div>
    )
}