import { User } from "lucide-react";
import { twMerge } from "tailwind-merge";

export default function Avatar ({imageSrc, isClickable=false}) {
    return (
        <>
            <div className="w-full h-full flex flex-col items-center justify-center overflow-hidden bg-primary rounded-full shadow-xl">
                {imageSrc ? 
                    <img src={imageSrc} alt="user image" className="w-full h-full object-cover" />
                :
                <User className={twMerge("text-white", isClickable && "hover:text-black ")} />
                }
            </div>
        </>
    )
}