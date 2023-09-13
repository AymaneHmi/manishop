
export default function Button (
    {
        children,
        onClick,
        outline,
        type,
        disabled,
        uppercase,
        className,
        shadow
    }) {

    return (
        <button 
            onClick={onClick} 
            type={type}
            disabled={disabled}
            className={`
            w-full rounded py-2 px-3
            disabled:opacity-70
            transition-all duration-150
            ${outline ? 'text-black bg-gray-200 hover:bg-gray-100 border border-black' : 'text-white bg-primary hover:bg-secondary'}
            ${uppercase ? "uppercase" : "normal-case"}
            ${className}
            `}
        >
            {children}
        </button>
    )
}