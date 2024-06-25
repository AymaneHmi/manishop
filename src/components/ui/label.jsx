import { twMerge } from "tailwind-merge";

export default function Label ({children, className, ...props}) {
    return (
        <label 
            className={twMerge('text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70', className)}
            {...props}
        >
            {children}
        </label>
    )
}