import { Link, useNavigate } from "react-router-dom";
import { Menu, ShoppingCart, Moon, Sun, Search } from "lucide-react";
import Avatar from "./ui/Avatar";
import getUser from '../actions/getUser';
import useCart from '../providers/cart-provider';
import { useNav } from "../providers/use-nav";
import { useTheme } from "../providers/theme-provider";

export default function HeaderActions () {

    const user = getUser();
    const {theme, toggleTheme} = useTheme();
    const {cartNum} = useCart(); 
    const nav = useNav();   

    const navigate = useNavigate();

    const handleLogOut = () => {
        document.cookie = 'ms_user_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        navigate(0)
    }

    return (
        <div className="flex flex-row space-x-3 items-center cursor-pointer text-xl">
            <div>
                {theme === "dark" ? 
                    <Sun className="hover:text-black transition duration-150" onClick={toggleTheme} /> : 
                    <Moon className="hover:text-black transition duration-150" onClick={toggleTheme} /> 
                }
            </div>
            
            <Link to={'/cart'} className="relative">
                <div>
                    <div className={`absolute text-sm flex items-center justify-center -top-2 -right-1.5 bg-primary rounded-full p-1 w-5 h-5 ${cartNum > 0 ? 'scale-100' : 'scale-0'} transition duration-150`}>{cartNum}</div>
                    <ShoppingCart className="hover:text-black" />
                </div>
            </Link>
            <div className="relative group">
                <div className="w-8 h-8">
                    <Avatar imageSrc={user?.imageSrc} />
                </div>
                <div className="absolute z-[20] max-h-0 bg-white group-hover:max-h-[300px] flex flex-col items-left text-black rounded group-hover:border shadow-xl min-w-[130px] translate-y-2 -translate-x-[2.5rem] transition-all duration-150 overflow-hidden">
                    {!user ? 
                    <>
                        <Link to={'/login'}>
                            <div className="text-sm py-2 px-4 hover:bg-gray-50">Login</div>
                        </Link>
                        <hr />
                        <Link to={'/register'}>
                            <div className="text-sm py-2 px-4 hover:bg-gray-50">Sign in</div>
                        </Link>

                    </> :
                    <>
                        <div className="text-sm font-bold py-2 px-4">My account</div>
                        <hr />
                        <Link to={'/favorites'}>
                            <div className="text-sm py-2 px-4 hover:bg-gray-50">Favorites</div>
                        </Link>
                        <Link to={'/cart'}>
                            <div className="text-sm py-2 px-4 hover:bg-gray-50">My cart</div>
                        </Link>
                        <Link to={'/orders'}>
                            <div className="text-sm py-2 px-4 hover:bg-gray-50">My orders</div>
                        </Link>
                        <Link to={'/profile'}>
                            <div className="text-sm py-2 px-4 hover:bg-gray-50">Profile</div>
                        </Link>
                        <hr />
                        <div onClick={handleLogOut} className="text-sm py-2 px-4 hover:bg-gray-50">Log out</div>
                    
                    </>
                    }
                </div>
            </div>
            <span onClick={() => nav.onOpen()} className="md:hidden hover:text-black cursor-pointer p-2">
                <Menu />
            </span>
        </div>
    )
}