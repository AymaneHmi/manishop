import { twMerge } from "tailwind-merge"
import useDiscount from "../hooks/use-discount"

export default function ProductPrice ({price, discountAmount = null, className}) {

    if(discountAmount === null) {
        return (
            <h2 className="font-bold text-lg md:text-2xl">${price}</h2>
        )
    }

    return (
        <div className={twMerge("flex flex-col gap-.5", className)}>
            <h2 className="font-bold text-lg md:text-2xl text-secondary">${useDiscount(price, discountAmount)}</h2>
            <div className="flex flex-row gap-1 items-center">
                <h2 className="text-xs line-through">${price}</h2>
                <p className="text-xs">({discountAmount}% off)</p>
            </div>
        </div>
    )
}