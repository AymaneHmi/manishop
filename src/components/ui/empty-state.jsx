import { CloudOff, SearchX } from "lucide-react";
import { twMerge } from "tailwind-merge";

export default function EmptyState ({title, subtitle, varient="error", iconSize=null, className}) {
    return (
        <div className={twMerge("w-full h-[80vh] flex flex-col items-center justify-center", className)}>
            {varient === "notfound" && <SearchX size={iconSize ? iconSize : 40} className="mb-4" />}
            {varient === "error" && <CloudOff size={iconSize ? iconSize : 40} className="mb-4" />}
            <h2 className="font-bold text-3xl">{title}</h2>
            <p className="font-light text-sm opacity-70">{subtitle}</p>
        </div>
    )
}