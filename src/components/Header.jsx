import { Link, useLocation } from "react-router-dom";
import Container from "./ui/container";

import HeaderActions from "./header-actions";
import SearchComp from "./ui/search-component";
import HeaderNavigationMobile from "./header-navigation-mobile";

export default function Header() {
    const location = useLocation();
    
    if(location.pathname === '/login' || location.pathname === '/register'){
        return null;
    }

    if(location.pathname === '/') {
        return (
            <div className="relative w-full bg-white text-secondary dark:bg-dark-200">
                <Container>
                    <div className="py-4 flex flex-row items-center justify-between gap-4 md:gap-10 text-white">
                        <Link to={'/'} className="hidden lg:block">
                            <img className="w-10" src='/MS.svg' alt="" />
                        </Link>
                        <HeaderNavigationMobile />
                        <HeaderActions />
                    </div>
                </Container>
            </div>
        )
    }

    return (
    <div className="relative w-full sticky top-0 bg-white text-secondary dark:bg-dark-200 shadow-lg z-[20]">
        <Container>
            <div className="py-4 flex flex-row items-center justify-between gap-4 md:gap-10 text-white">
                <Link to={'/'} className="hidden lg:block">
                    <img className="w-10" src='/MS.svg' alt="" />
                </Link>
                <HeaderNavigationMobile />
                <div className="hidden lg:block lg:w-1/3">
                    <SearchComp />
                </div>
                <HeaderActions />
            </div>
        </Container>
    </div>
    )
  }