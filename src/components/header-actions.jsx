import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, LucideHeart } from "lucide-react";
import Avatar from "./ui/avatar";
import useCart from "../hooks/use-cart";
import useUser from "../hooks/use-user";

export default function HeaderActions () {

    const {user} = useUser();

    const {cartProducts} = useCart()
    
    const navigate = useNavigate();

    const handleLogOut = () => {
        document.cookie = 'ms_user_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        navigate(0)
    }

    return (
        <div className="flex flex-row gap-3 items-center cursor-pointer">

            <Link to={'/cart'} className="relative text-primary">
                <div>
                    <div className={`absolute text-sm flex items-center justify-center -top-2 -right-1.5 bg-primary ring-2 ring-white text-white rounded-full p-1 w-5 h-5 ${cartProducts?.length > 0 ? 'scale-100' : 'scale-0'} transition duration-150`}>{cartProducts?.length}</div>
                    <ShoppingCart className="hover:text-black" />
                </div>
            </Link>

            <Link to={'/favorites'} className="relative text-primary">
                <LucideHeart className="hover:text-black" />
            </Link>
            
            <div className="relative group">
                <div className="w-10 h-10">
                    <Avatar imageSrc={user?.imageSrc} />
                </div>
                <div className="absolute z-[20] max-h-0 bg-white group-hover:max-h-[300px] flex flex-col items-left text-black rounded group-hover:border shadow-xl min-w-[130px] translate-y-2 -translate-x-[2.5rem] transition-all duration-150 overflow-hidden">
                    {user?.id ? (<>
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
                    </>) : (<>
                        <Link to={'/register'}>
                            <div className="text-sm py-2 px-4 hover:bg-gray-50">Sign up</div>
                        </Link>
                        <hr />
                        <Link to={'/login'}>
                            <div className="text-sm py-2 px-4 hover:bg-gray-50">Login</div>
                        </Link>
                    </>)}
                </div>
            </div>

        </div>
    )
}