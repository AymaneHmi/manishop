import { Copyright} from "lucide-react";
import {FaTwitter,FaInstagram,FaSquareFacebook} from 'react-icons/fa6'
import Container from "./ui/Container";
import { useLocation } from "react-router-dom";
import getUser from "../actions/getUser";

export default function Footer () {

    const user = getUser();
    const location = useLocation();

    if(location.pathname === '/login' || location.pathname === '/register'){
        return null;
    }
    
    return (
        <>
            <div className="mt-2 bg-secondary dark:bg-dark-200 py-6">
                <Container>
                    <div className="text-white flex flex-col md:flex-row items-start md:justify-between gap-2 my-2">
                        <div className="flex flex-col gap-2">
                            <div className="flex flex-row items-center gap-1">
                                <img src="/MS.svg" alt="logo" className="w-10" />
                                <div>
                                    <h2 className="font-bold">MANISHOP</h2>
                                    <p className="text-xs">ONLINE STORE</p>
                                </div>
                            </div>
                            <div className="flex flex-row items-center gap-2">
                                <FaSquareFacebook />
                                <FaTwitter />
                                <FaInstagram />
                            </div>
                        </div>
                        {!user && <div className="space-y-2 w-1/3">
                            <form action="" className="space-x-2">
                                <input className="border border-primary shadow-lg py-1 px-2 rounded dark:bg-slate-700" type="text" placeholder="Enter your Email .." />
                                <input className="bg-primary px-2 py-1 rounded hover:bg-white hover:text-primary transition duration-150 cursor-pointer shadow-lg" type="button" value="Sign In" />
                            </form>
                            <p className="text-xs">With your subscribtion, you will get exclusive discounts, product updates, and special offers, be notified when product released, and make your shopping better.</p>
                        </div>}
                        <ul className="flex flex-col w-fit text-gray-200/70 dark:text-gray-400">
                            <h2 className="font-bold text-lg text-white">Company info</h2>
                            <li className="space-x-2 flex flex-row"><span >Address:</span><p>address</p></li>
                            <li><span >Email:</span> <a className="text-white hover:underline" href="mailto:emial">??????@???.???</a></li>
                            <li><span >Number:</span> <a className="text-white hover:underline" href="tel:+number">+000 000000000</a></li>
                        </ul>
                        {user && <ul className="flex flex-col gap-1 w-fit text-gray-200/70 dark:text-gray-400">
                            <h2 className="font-bold text-lg text-white">My Account</h2>
                            <li className="cursor-pointer hover:underline">Favorites</li>
                            <li className="cursor-pointer hover:underline">My Cart</li>
                            <li className="cursor-pointer hover:underline">My profile</li>
                        </ul>}
                        <ul className="flex flex-col gap-1 w-fit text-gray-200/70 dark:text-gray-400">
                            <h2 className="font-bold text-lg text-white">Products</h2>
                            <li className="cursor-pointer hover:underline">Most popular</li>
                            <li className="cursor-pointer hover:underline">New products</li>
                            <li className="cursor-pointer hover:underline">Categories</li>
                        </ul>
                        <ul className="flex flex-col gap-1 w-fit text-gray-200/70 dark:text-gray-400">
                            <h2 className="font-bold text-lg text-white">Company</h2>
                            <li className="cursor-pointer hover:underline">About Us</li>
                            <li className="cursor-pointer hover:underline">Contact Us</li>
                            <li className="cursor-pointer hover:underline">Blogs</li>
                            <li className="cursor-pointer hover:underline">FAQ</li>
                            <li className="cursor-pointer hover:underline">Shipping & Returns</li>
                            <li className="cursor-pointer hover:underline">Terms of Service</li>
                        </ul>
                    </div>
                    <hr className="col-span-6" />
                    <h2 className="text-sm text-white flex flex-row items-center gap-1 my-2"><Copyright size={15} /> All Right Reserved 2023</h2>
                </Container>
            </div>
        </>
    )
}