import { Link, useLocation } from "react-router-dom";
import Container from "./ui/Container";

import HeaderLinks from "./HeaderLinks";
import HeaderActions from "./HeaderActions";

export default function Header() {
    const location = useLocation();
    
    if(location.pathname === '/login' || location.pathname === '/register'){
        return null;
    }

    return (
      <>
        <div className="relative w-full bg-secondary dark:bg-dark-200">
            <Container>
                <div className="py-4 flex flex-row items-center justify-between text-white">
                    <Link to={'/'}>
                        <img className="w-10" src='/MS.svg' alt="" />
                    </Link>
                    <HeaderLinks />
                    <HeaderActions />
                </div>
            </Container>
        </div>
      </>
    )
  }