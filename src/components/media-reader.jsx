import { PlayCircle } from "lucide-react";
import { twMerge } from "tailwind-merge";

const MediaReader = ({
    media,
    className,
    videoControls = false,
    videoIcon = false,
    ...props
}) => {
    const fileExtension = typeof media === "string" ? media.split('.').pop() : media?.[0].split('.').pop();
    return (
        <>
            {fileExtension === 'mp4' 
                ? 
                <div className={twMerge("w-full h-full relative flex flex-col items-center justify-center", className)}>
                    {videoIcon && <PlayCircle className="absolute" />}
                    <video 
                        className={"w-full h-full object-cover"} 
                        controls={videoControls}
                        {...props}
                    >
                        <source src={typeof media === "string" ? media : media?.[0]} type="video/mp4" />
                    </video>
                </div>
                :
                <img
                    className={twMerge("w-full h-full object-cover", className)}
                    src={typeof media === "string" ? media : media?.[0]}
                    alt="aymane hammi project images"
                    loading="lazy"
                    {...props}
                /> 
            }
        </>
    )
}

export default MediaReader