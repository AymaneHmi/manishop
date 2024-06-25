import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import MediaReader from "./media-reader";
import { twMerge } from "tailwind-merge";

export default function Gallery ({ media , navigationImages = false, navigationDots = true}) {

    const [currentIndex, setCurrentIndex] = useState(0);
  
    const goToPrevious = (e) => {
      e.preventDefault();
      const isFirstImg = currentIndex === 0;
      const newIndex = isFirstImg ? media?.length - 1 : currentIndex - 1;
      setCurrentIndex(newIndex);
    };
  
    const goToNext = (e) => {
        e.preventDefault();
        const isLastImg = currentIndex === media?.length - 1;
        const newIndex = isLastImg ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    };
    
    return (
        <div className="w-full h-full flex flex-col">
            <div className="relative h-full w-full group overflow-hidden">
                <MediaReader
                    media={media?.[currentIndex]}
                    className={'rounded object-cover'}
                    videoControls
                />
                {media?.length > 1 && 
                <div className="absolute opacity-0 group-hover:opacity-100 px-4 flex flex-row justify-between w-full top-1/2 translate -translate-y-1/2 transition-all duration-150">
                    <button className="bg-primary hover:bg-secondary transition duration-150 text-white p-[1%] rounded text-sm" onClick={goToPrevious}>
                        <ChevronLeft size={20} />
                    </button>
                    <button className="bg-primary hover:bg-secondary transition duration-150 text-white p-[1%] rounded text-sm right-0" onClick={goToNext}>
                        <ChevronRight size={20} />
                    </button>
                </div>}
                {navigationDots && 
                <>
                    <div className="absolute bottom-0 left-0 h-[25%] w-full z-[1] bg-gradient-to-t from-black/60 hidden group-hover:block"></div>
                    <div className="absolute translate-y-10 z-[2] group-hover:translate-y-0 flex flex-row justify-center space-x-2 my-2 left-1/2 -translate-x-[50%] bottom-0 transition-all duration-150">
                        {media?.map((_ , index) => {
                            return <span key={index} className={`w-2 h-2 cursor-pointer rounded-full ${currentIndex === index ? 'bg-white/100' : 'bg-white/50 scale-75'} transition duration-150`} onClick={() => setCurrentIndex(index)}></span>
                        })}
                    </div> 
                </>
                }
            </div>
            {navigationImages &&
            <div className="flex flex-row justify-center gap-2 my-2 w-full h-24 overflow-x-auto overflow-y-hidden">
                {media?.map((file , index) => (
                    <MediaReader
                        key={index}
                        media={file}
                        className={twMerge('rounded w-10 h-10 md:w-20 md:h-20 object-cover cursor-pointer opacity-50 hover:opacity-75', currentIndex === index && 'opacity-100 border border-primary')}
                        onClick={() => setCurrentIndex(index)}
                        videoIcon
                    />
                ))}
            </div>}
        </div>
    )
}