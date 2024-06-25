import { Copyright} from "lucide-react";
import {FaTwitter,FaPinterest, FaTiktok} from 'react-icons/fa6'
import Container from "./ui/container";
import { Link, useLocation } from "react-router-dom";
import Input from "./ui/input";
import Button from "./ui/button";
import useUser from "../hooks/use-user";

export default function Footer () {

    const {user} = useUser();
    const location = useLocation();

    if(location.pathname === '/login' || location.pathname === '/register'){
        return null;
    }
    
    return (
        <>
            {user === null && <div className="bg-gray-100 flex flex-col items-center justify-center py-10">
                 <div className="flex flex-col gap-2 w-4/5 lg:w-1/3 text-center">
                    <h2 className="font-bold text-2xl">Register Now</h2>
                    <p className="text-xs">With your subscribtion, you will get exclusive discounts, product updates, and special offers, be notified when product released, and make your shopping better.</p>
                    <form className="flex flex-col lg:flex-row gap-2">
                        <Input 
                            type={"text"}
                            placeholder={"Enter your Email .."}
                        />
                        <Button
                            className={'w-full lg:w-1/4'}
                        >
                            Sign in
                        </Button>
                    </form>
                </div>
            </div>}
            <div className="bg-secondary dark:bg-dark-200 py-6">
                <Container>
                    <div className="text-white flex flex-col items-center gap-4 my-2">
                        <div className="flex flex-col items-center gap-2">
                            <div className="flex flex-row items-center gap-1">
                                <img src="/MS.svg" alt="logo" className="w-10" />
                                <div>
                                    <h2 className="font-bold">MANISHOP</h2>
                                    <p className="text-xs">ONLINE STORE</p>
                                </div>
                            </div>
                            <div className="flex flex-row items-center gap-4">
                                <Link to={'https://twitter.com/manishop02'} target="_blank">
                                    <FaTwitter />
                                </Link>
                                <Link to={'https://www.pinterest.com/manishop02/'} target="_blank">
                                    <FaPinterest />
                                </Link>
                                <Link to={'https://www.tiktok.com/@manishop02'} target="_blank">
                                    <FaTiktok />
                                </Link>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2 items-center justify-center">
                            {user && <div className="flex flex-wrap gap-3 items-center text-white justify-center">
                                <Link to={'/favorites'} className="text-sm font-medium hover:underline">Favorites</Link>
                                <Link to={'/cart'} className="text-sm font-medium hover:underline">My Cart</Link>
                                <Link to={'/profile'} className="text-sm font-medium hover:underline">My profile</Link>
                                <Link to={'/orders'} className="text-sm font-medium hover:underline">My orders</Link>
                            </div>}
                            <div className="flex flex-wrap gap-3 items-center text-white justify-center">
                                <Link to={'/products?filter=most-popular'} className="text-sm font-medium hover:underline">Most popular</Link>
                                <Link to={'/products?filter=new'} className="text-sm font-medium hover:underline">New products</Link>
                                <Link to={'/products'} className="text-sm font-medium hover:underline">Categories</Link>
                            </div>
                            <div className="flex flex-wrap gap-3 items-center text-white justify-center">
                                <Link to={'/'} className="text-sm font-medium hover:underline">Home</Link>
                                <Link to={'/products'} className="text-sm font-medium hover:underline">Products</Link>
                                <Link to={'/about'} className="text-sm font-medium hover:underline">About Us</Link>
                                <Link to={'/contact'} className="text-sm font-medium hover:underline">Contact Us</Link>
                                <Link to={'/blog'} className="text-sm font-medium hover:underline">Blog</Link>
                            </div>
                        </div>
                    </div>
                    <hr className="col-span-6" />
                    <div className="flex flex-wrap gap-2 lg:gap-3 items-center text-white justify-center">
                        <h2 className="text-sm text-white flex flex-row items-center gap-1 my-2"><Copyright size={15} /> All Right Reserved 2024</h2>
                        <Link to={'/faq'} className="text-sm font-medium hover:underline">FAQ</Link>
                        <Link to={'/privacy-policy'} className="text-sm font-medium hover:underline">Privacy Policy</Link>
                        <Link to={'/return-policy'} className="text-sm font-medium hover:underline">Return Policy</Link>
                        <Link to={'/shipping-policy'} className="text-sm font-medium hover:underline">Shipping Policy</Link>
                        <Link to={'/terms-of-service'} className="text-sm font-medium hover:underline">Terms of Service</Link>
                    </div>
                </Container>
            </div>
        </>
    )
}