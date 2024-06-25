import { useEffect, useRef } from "react";
import useData from "../hooks/use-data";
import ReviewRate from "./review-rate";
import Avatar from "./ui/avatar";

import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrollTrigger);

export default function Testimonials () {
    const {reviews} = useData();
    const containerRef = useRef(null);
    const wrapperRef = useRef(null);

    useGSAP(() => {
        if (!reviews || reviews.length === 0) return;
        const totalWidth = wrapperRef.current.scrollWidth;
        const viewportWidth = containerRef.current.offsetWidth;
    
        const tween = gsap.to(wrapperRef.current, {
            x: `-${totalWidth - viewportWidth}px`,
            duration: totalWidth / 50,
            ease: "none",
            repeat: -1,
            paused: true,
            modifiers: {
                x: gsap.utils.unitize(x => parseFloat(x) % totalWidth) 
            }
        });
    
        ScrollTrigger.create({
            trigger: containerRef.current,
            start: "top 80%", 
            onEnter: () => tween.play(),
            onLeaveBack: () => tween.pause(),
            onLeave: () => tween.pause(),
            onEnterBack: () => tween.play(),
        });
    }, [reviews])

    return (
        <div className="overflow-hidden relative" ref={containerRef}>
            <div className="flex flex-row w-fit gap-4" ref={wrapperRef}>
                {reviews && reviews.concat(reviews)?.map(review => (
                    <div key={review.id} className="w-[80vw] lg:w-[30vw] bg-white flex flex-col text-left gap-4 rounded-xl border text-black shadow-lg px-6 py-8 capitalize">
                        <ReviewRate
                            rate={review.rating}
                            viewOnly
                        />
                        {review.comment && <p className="font-bold text-xs">"{review.comment}"</p>}
                        <div className="w-full flex flex-row items-center gap-2">
                            <div className="w-10 h-10">
                                <Avatar imageSrc={review.userImage} />
                            </div>
                            <div className="flex flex-col text-left">
                                <h3 className="font-bold text-sm">{review.fullName}</h3>
                                <p className="text-xs">@{review.username}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}