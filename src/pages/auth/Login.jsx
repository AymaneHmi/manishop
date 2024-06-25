import { ArrowLeft } from "lucide-react";
import LoginComp from "../../components/login-component";
import { Link } from "react-router-dom";

export default function Login () {
    return (
        <div className="w-screen h-screen flex flex-row">
            <div className="hidden lg:block w-7/12 h-full overflow-hidden relative">
                <div className="absolute top-5 left-5 text-white z-[1]">
                    <Link to={'/'}>
                        <ArrowLeft size={30} />
                    </Link>
                </div>
                <div className="absolute inset-0 bg-black/80"></div>
                <img src="/bg.jpg" alt="" className="h-full w-full object-cover" />
            </div>
            <div className="w-full lg:w-5/12 h-full flex flex-col justify-center items-center bg-gray-50">
                <div className="w-full px-10 lg:px-20 flex flex-col gap-4">
                    <LoginComp />
                </div>
            </div>
        </div>
    )
}