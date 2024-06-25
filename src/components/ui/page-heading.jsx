import { twMerge } from "tailwind-merge";

export default function PageHeading({
    title,
    subtitle,
    varient,
    className
}) {

    let pageHeading;

    switch (varient) {
        case "small":
            pageHeading = "text-lg";
            break;
        case "large":
            pageHeading = "text-xl";
            break;
        default:
            pageHeading = "text-3xl"
    }

    return (
        <div className={twMerge("flex flex-col my-4", className)}>
            <h2 className={twMerge("font-bold", pageHeading)}>{title}</h2>
            <p className="text-sm font-light opacity-70">{subtitle}</p>
        </div>
    )
}