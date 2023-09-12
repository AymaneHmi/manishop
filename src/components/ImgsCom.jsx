import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
// import { imgsURL } from "./elements/config";

const imgsURL = import.meta.env.VITE_PRODUCTS_IMAGES
const imgsBlogs = import.meta.env.VITE_BLOGS_IMAGES

export default function ImgsCom ({ images , imagesShow, showDots, blogs }) {

    const showImages = imagesShow ? imagesShow : false;

    const [currentIndex, setCurrentIndex] = useState(0);
  
    const goToPrevious = (e) => {
      e.preventDefault();
      const isFirstImg = currentIndex === 0;
      const newIndex = isFirstImg ? images?.length - 1 : currentIndex - 1;
      setCurrentIndex(newIndex);
    };
  
    const goToNext = (e) => {
        e.preventDefault();
        const isLastImg = currentIndex === images?.length - 1;
        const newIndex = isLastImg ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    };
    
    return (
        <>
        <div className="w-full h-full flex flex-col">
            <div className="relative h-full w-full group overflow-hidden">
                <img className="rounded h-full w-full object-cover" src={(blogs ? imgsBlogs : imgsURL) + images?.[currentIndex]} alt="product images" />
                {images?.length > 1 && 
                <div className="absolute opacity-0 group-hover:opacity-100 px-4 flex flex-row justify-between w-full top-1/2 translate -translate-y-1/2 transition-all duration-150">
                    <button className="bg-primary hover:bg-secondary transition duration-150 text-white p-[1%] rounded text-sm" onClick={goToPrevious}>
                        <ChevronLeft size={20} />
                    </button>
                    <button className="bg-primary hover:bg-secondary transition duration-150 text-white p-[1%] rounded text-sm right-0" onClick={goToNext}>
                        <ChevronRight size={20} />
                    </button>
                </div>}
                {showDots && 
                <>
                    <div className="absolute bottom-0 left-0 h-[25%] w-full z-[1] bg-gradient-to-t from-black/60 hidden group-hover:block"></div>
                    <div className="absolute translate-y-10 z-[2] group-hover:translate-y-0 flex flex-row justify-center space-x-2 my-2 left-1/2 -translate-x-[50%] bottom-0 transition-all duration-150">
                        {images?.map((img , index) => {
                            return <span key={index} className={`w-2 h-2 cursor-pointer rounded-full ${currentIndex === index ? 'bg-white/100' : 'bg-white/50 scale-75'} transition duration-150`} onClick={() => setCurrentIndex(index)}></span>
                        })}
                    </div> 
                </>
                }
            </div>
            {showImages &&
            <div className="flex flex-row justify-center space-x-2 my-2">
                {images?.map((img , index) => {
                    return (
                    <img key={index} className={`rounded w-10 h-10 md:w-20 md:h-20 object-cover cursor-pointer ${currentIndex === index ? 'opacity-100 border border-primary' : 'opacity-50'} hover:opacity-75`} src={`${imgsURL}/${img}`} onClick={() => setCurrentIndex(index)} alt="" />
                    )
                })}
            </div>}
        </div>
        </>
    )
}