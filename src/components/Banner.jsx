import { Link } from "react-router-dom";
import Container from "./ui/Container";
import Button from "./ui/Button";

export default function Banner () {
    return (
        <section className="h-[89vh] bg-[url('/bg.jpg')] text-light overflow-hidden">
            <Container className={'h-full'}>
                <div className="h-full flex flex-row justify-center items-center">
                    <div>
                        <div className="w-full md:w-2/3 space-y-4">
                            <h1 className="text-xl md:text-5xl font-bold uppercase">Discover the Best Deals at Manishop!</h1>
                            <p className="text-xs">Welcome to ManiShop, your go-to destination for all your shopping needs! From trendy clothes to high-tech electronics and stylish accessories, we've got it all covered. With a wide range of products and competitive prices, we offer a hassle-free shopping experience that you won't find anywhere else. So why wait? Browse our collections today and shop to your heart's content!</p>
                            <div>
                                <Link to={'/products'}>
                                {/* <button className="uppercase text-xs md:text-base bg-primary px-4 py-2 hover:bg-secondary transition duration-150 shadow-xl rounded">DISCOVER ALL PRODUCTS</button> */}
                                <Button
                                    className={'w-60 shadow-xl border'}
                                >
                                    DISCOVER ALL PRODUCTS
                                </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <img className="w-1/3 drop-shadow-2xl hidden md:block" src="/shirts.png" alt="" />
                </div>
            </Container>
        </section>
    )
}