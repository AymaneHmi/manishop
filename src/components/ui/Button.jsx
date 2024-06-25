import { Loader2 } from "lucide-react";
import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

const Button = forwardRef(
    ({
        children,
        varient,
        type,
        className,
        isLoading,
        ...props
    }, ref) => {

        let buttonVarients;

        switch (varient) {
            case "secondary":
                buttonVarients = "text-black bg-white border hover:bg-gray-100";
                break;
            case "outline":
                buttonVarients = "text-black bg-transparent hover:bg-gray-100 border border-gray-600";
                break;
            case "destructive": 
                buttonVarients = "text-white bg-red-500 hover:bg-red-600";
                break;
            case "ghost":
                buttonVarients = "bg-transparent hover:bg-gray-100";
                break;
            default :
                buttonVarients = "bg-primary text-primary-foreground hover:bg-secondary/90 text-white"
        }
    
        return (
            <button 
                type={type}
                ref={ref}
                className={twMerge('inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 w-full py-2 px-4 cursor-pointer', buttonVarients, className)}
                {...props}
            >
                {isLoading ? <Loader2
                    className="animate-spin"
                /> :
                children
                }
            </button>
        )
    }
)

export default Button;