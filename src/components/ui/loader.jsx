
import { Loader2 } from "lucide-react";
import { twMerge } from "tailwind-merge";


const Loader = ({isLoading = false, size, className}) => {

    if(!isLoading) return null;

    return (
        <Loader2
            className={twMerge("animate-spin text-current", className)}
            size={size ? size : 20}
        />
    )
}

export default Loader