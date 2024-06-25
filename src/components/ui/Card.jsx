
export default function Card({ 
    children,
    border,
    shadow,
    className,
 }){
    return (
        <div 
            className={`
            flex flex-col 
            gap-4 
            bg-white 
            rounded-xl 
            w-11/12 md:w-1/3 
            py-8 px-6 
            border 
            shadow-2xl 
            text-black 
            dark:bg-dark-200 dark:text-white 
            text-sm
            `}
        >
            {children}
        </div>
    )
}