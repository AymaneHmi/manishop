import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, X } from "lucide-react";
import { useNav } from "../providers/use-nav";
import getCategories from "../actions/getCategories";

export default function HeaderLinks () {

    const categories = getCategories();
    const nav = useNav(); 

    const [showLinks , setShowLinks] = useState(false)

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 800) {
                setShowLinks(true);
            } else {
                setShowLinks(false);
            }
        };

        if (window.innerWidth < 800) {
            setShowLinks(true);
        } else {
            setShowLinks(false);
        }
    
        // Add event listener to handle window resize
        window.addEventListener('resize', handleResize);
    
        // Cleanup the event listener on component unmount
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);


    return (
        <div className={showLinks ? `relarive z-20 overflow-hidden fixed ${nav.isOpen ? 'w-5/6' : 'w-0'} top-0 right-0 shadow-xl h-screen flex flex-col items-center justify-center bg-secondary dark:bg-slate-800 text-white transition-all duration-150` : ''}>
            <ul className="flex flex-col items-center gap-2 md:flex-row cursor-pointer list-none md:space-x-4 font-bold relative capitalize">
                {
                    [
                        ['Home','/'],
                        ['Products','/products'],
                        [<>
                            <div className="flex flex-row items-center gap-1 justify-center">
                                Categories
                                <ChevronDown size={15} />
                            </div>
                            <div className={`flex ${showLinks ? "flex-col items-center" : "absolute z-[20] bg-white  flex-col items-left text-black rounded group-hover:border shadow-xl min-w-[130px] translate-y-2 -translate-x-[.5rem]"} max-h-0 group-hover:max-h-[300px] transition-all duration-150 overflow-hidden`}>
                                {categories?.map(category => {
                                return (
                                    <Link
                                    key={category.id}
                                    to={`/${category.name}`}
                                    >
                                    <div className="hover:text-black md:hover:bg-gray-50 underline underline-offset-4 md:no-underline transition duration-150 capitalize py-2 px-4 w-full">{category.name}</div>
                                    </Link>
                                );
                                })}
                            </div>
                        </>,''],
                        ['Blogs','/blogs'],
                        ['About Us','/about'],
                        ['Contact us','/contact']
                    ].map(([title,url],index) => (
                        <div key={index}>
                            {url ? 
                            <Link className={location.pathname === url ? 'text-white' : 'text-white/60'} to={url}>
                                <li className="hover:underline transition duration-150">{title}</li>
                            </Link>
                            : 
                            <li className="relative group transition duration-150 text-white/60 ">{title}</li>
                            }
                        </div>
                    ))
                }
            </ul>
            <span onClick={() => nav.onClose()} className="md:hidden absolute top-5 right-5 text-white hover:text-black cursor-pointer">
                <X />
            </span>
        </div>
    )
}