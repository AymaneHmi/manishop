import { Link, useLocation } from "react-router-dom";
import Container from "./ui/Container";

import HeaderLinks from "./HeaderLinks";
import HeaderActions from "./HeaderActions";

export default function Header() {

    const location = useLocation();
    // const [showSearchBar , setShowSearchBar] = useState(false)
    
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
        {/* <div className={`w-full bg-secondary dark:bg-slate-800 flex flex-col items-center ${showSearchBar ? 'max-h-[20vh]' :'max-h-0'} overflow-hidden transition-all duration-150`}>
            <div className="w-1/2 py-4 flex space-x-2">
                <input className="w-full py-2 px-4 rounded border border-primary text-black focus:outline-0 focus:border-2" type="text" placeholder="Search products .." />
                <button className="bg-primary py-2 px-4 rounded">Search</button>
            </div>
        </div> */}
      </>
    )
  }