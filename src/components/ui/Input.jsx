import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

const Input = forwardRef(
    ({
        className,
        varient,
        onToggleIcon,
        Icon,
        ...props
    }, ref) => {
    
        return (
            <div className="flex relative items-center w-full">
                <input 
                    className={twMerge('flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50', varient === "outline" && "bg-transparent border-none text-secondary placeholder:text-primary", className)}
                    ref={ref}
                    {...props}
                />
            </div>
        )
    }
)

export default Input;