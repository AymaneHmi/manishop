
export default function PageHeading({
    title,
    subtitle
}) {
    return (
        <div className="flex flex-col my-4">
            <h2 className="font-bold text-3xl">{title}</h2>
            <p className="text-sm font-light opacity-70">{subtitle}</p>
        </div>
    )
}