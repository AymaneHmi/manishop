import { Star } from "lucide-react";
import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa6";
import { twMerge } from "tailwind-merge";

export default function ReviewRate ({rate=null, viewOnly=false, handleRate, size=20, className}) {

    const [reviewRate, setReviewRate] = useState(0);

    useEffect(() => {
        if(rate === null) return;
        setReviewRate(rate);
    },[rate])

    useEffect(() => {
        if(viewOnly) return;
        if(reviewRate === 0) return;
        handleRate?.(reviewRate)
    },[reviewRate])

    let starsArray = new Array(5).fill(null);

    return (
        <div className={twMerge("flex flex-row gap-1 items-center", className)}>
            {starsArray.map((_, i) => 
                ((reviewRate >= i+1) ? 
                    <FaStar key={i} size={size} className={twMerge("text-primary", !viewOnly && "cursor-pointer")} onClick={() => !viewOnly && setReviewRate(i + 1)} />
                    :
                    <Star key={i} size={size} className={twMerge("text-gray-600", !viewOnly && "cursor-pointer hover:text-gray-800")} onClick={() => !viewOnly && setReviewRate(i + 1)} />
                )
            )}
        </div>
    )
}