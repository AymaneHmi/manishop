import { Link } from "react-router-dom";
import Button from "./ui/button";

export default function Banner () {

    return (
        <section className="
            h-[85dvh] w-full
            flex flex-col items-center justify-center gap-2
            relative
        ">
            <div className="absolute w-full h-full bg-gradient-radial from-primary/70 to-black to-40% z-[1] mix-blend-screen pointer-events-none"></div>
            <div className="flex flex-col items-center gap-2 w-full">
                <h1 className="font-bold text-4xl lg:text-7xl capitalize text-center font-[Inter]">Unleash your style with Manishop</h1>
                <h2 className="font-bold text-md capitalize text-center">Explore our custom and High Quality merch.</h2>
                <Link to={'/products'} className="w-1/2">
                    <Button>
                        Shop Now
                    </Button>
                </Link>
            </div>
        </section>
    )
}