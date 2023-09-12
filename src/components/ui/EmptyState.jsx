
export default function EmptyState ({title, subtitle}) {
    return (
        <div className="w-full h-[80vh] flex flex-col items-center justify-center">
            <h2 className="font-bold text-3xl">{title}</h2>
            <p className="font-light text-sm opacity-70">{subtitle}</p>
        </div>
    )
}