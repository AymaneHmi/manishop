import { User } from "lucide-react";

const imgUrl = import.meta.env.VITE_USER_IMAGES;

export default function Avatar ({imageSrc}) {
    return (
        <>
            <div className="w-full h-full flex flex-col items-center justify-center overflow-hidden bg-white rounded-full shadow-xl">
                {imageSrc ? 
                    <img src={imgUrl + imageSrc} alt="user image" className="w-full h-full object-cover" />
                :
                <User className="hover:text-black text-primary" />
                }
            </div>
        </>
    )
}