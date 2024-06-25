
export default function Container(
    {
        children,
        className
    }) {
    return (
        <div className={`w-11/12 md:w-5/6 mx-auto h-full ${className}`}>
            {children}
        </div>
    )
}