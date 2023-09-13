import { useNavigate, useParams } from "react-router-dom"
import ImgsCom from "../../components/ImgsCom";
import ProductsCom from "../../components/ProductsCom";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import EmptyState from "../../components/ui/EmptyState";
import Container from "../../components/ui/Container";
import { DollarSign } from "lucide-react";
import {FaStar} from 'react-icons/fa6'
import { useRequest } from "../../hooks/useRequest";
import Favorite from "../../components/ui/Favorite";
import { useFavorites } from "../../hooks/use-favorites";

import {FaCartPlus, FaCartArrowDown} from 'react-icons/fa6';
import Button from "../../components/ui/Button";
import PageHeading from "../../components/ui/PageHeading";
import useCart from "../../providers/cart-provider";
import getUser from "../../actions/getUser";

export default function Product () {

    const {isFavorite, handleFavorite} = useFavorites();
    const user = getUser();
    const {handleCart} = useCart();
    
    const navigate = useNavigate();
    const {productSlug} = useParams();

    const [productData , setProductData] = useState({});
    const [loading , setLoading] = useState(false)
    const [noProduct , setNoProduct] = useState(false)
    const [selectedSize , setSelectedSize] = useState(null)
    
    const product = productData?.product;

    useEffect(() => {
        const fetchProduct = async () => {
            setLoading(true)
            const data = {
                product_slug: productSlug,
            }
            const responseData = await useRequest.post(data,'/products/get_product.php');
            setLoading(false)
            if(responseData?.error){
                setProductData({});
                setNoProduct(true);
                return;
            }
            setProductData(responseData)
        };

        fetchProduct();
    },[productSlug])

    const handleSelectSize = (e) => {
        setSelectedSize(e.target.value)
    }

    const handleClickAddToCart = (btn) => {
        if(!user) {
            toast.error('login or register to add items to cart!');
            return;
        }
        if(product?.sizes){
            if(selectedSize){
                handleCart(product?.id, selectedSize)
                btn === 'order' && navigate('/cart');
            } else {
                toast.error('Please select a size!')
            }
            
        } else {
            handleCart(product?.id, selectedSize)
            btn === 'order' && navigate('/cart');
        }
    }

    if(noProduct) {
        return (
            <Container>
                <EmptyState 
                    title="No product found!" 
                    subtitle="Looks like this page is not available any more." 
                />
            </Container>
        )
    }

    if(loading) {
        return (
            <Container>
                <section className="my-4 grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                    <div className="col-span-2 animate-pulse bg-gradient-to-r from-gray-300 via-gray-400/50 via-0% to-gray-300 h-[60vh] md:h-screen rounded-lg"></div>
                    <div className="space-y-2 flex flex-col">
                        <div className="animate-pulse bg-gradient-to-r from-gray-300 via-gray-400/50 via-0% to-gray-300 h-10 rounded-lg"></div>
                        <div className="animate-pulse bg-gradient-to-r from-gray-300 via-gray-400/50 via-0% to-gray-300 h-32 rounded-lg"></div>
                        <div className="animate-pulse bg-gradient-to-r from-gray-300 via-gray-400/50 via-0% to-gray-300 h-10 rounded-lg w-3/5"></div>
                        <div className="animate-pulse bg-gradient-to-r from-gray-300 via-gray-400/50 via-0% to-gray-300 h-10 rounded-lg w-2/5"></div>
                        <div className="animate-pulse bg-gradient-to-r from-gray-300 via-gray-400/50 via-0% to-gray-300 h-10 rounded-lg"></div>
                        <div className="animate-pulse bg-gradient-to-r from-gray-300 via-gray-400/50 via-0% to-gray-300 h-10 rounded-lg"></div>
                    </div>
                </section> 
                <section className="my-4  space-y-6">
                    <div className="animate-pulse bg-gradient-to-r from-gray-300 via-gray-400/50 via-0% to-gray-300 h-10 rounded-lg w-1/5"></div>
                    <ProductsCom products={null} />
                </section>
            </Container>
        )
    }


    return (
        <Container>
            <PageHeading
                title={"Product"}
                subtitle={"More info about this product."}
            />

            <section className="grid grid-cols-1 md:grid-cols-3 md:gap-6 items-start justify-center text-center md:text-left">
                <div className="relative col-span-2 h-[60vh] md:h-[120vh]">
                    <Favorite
                        handleFavorite={(e) => handleFavorite(e,productData?.product?.id)}
                        isFavorite={isFavorite(productData?.product?.id)}
                    />
                    <ImgsCom 
                        images={productData?.product?.images} 
                        imagesShow 
                    />
                </div>
                <div className="space-y-2 md:my-0 flex flex-col">
                    <h2 className="font-bold text-3xl capitalize">{productData?.product?.title}</h2>
                    <div className="text-xs text-left" dangerouslySetInnerHTML={{ __html: productData?.product?.description }}></div>
                    <div className="flex flex-row items-center gap-0.5">
                        <FaStar className="text-amber-400 text-lg" />
                        <FaStar className="text-amber-400 text-lg" />
                        <FaStar className="text-amber-400 text-lg" />
                        <FaStar className="text-amber-400 text-lg" />
                        <FaStar className="text-gray-300 text-lg" />
                        <span>(15)</span>
                    </div>
                    {productData?.product?.sizes && 
                    <div className="flex flex-row justify-between items-center">
                        <select 
                            onChange={handleSelectSize} 
                            className="border-2 border-primary w-full px-4 py-2 font-bold rounded dark:bg-slate-700"
                            defaultValue=""
                        >
                            <option value="" disabled>Select a size</option>
                            {productData?.product?.sizes?.map((size , index) => {
                                return <option key={index} value={size}>{size}</option>
                            })}
                        </select> 
                    </div>}
                    <h1 className="font-bold text-2xl flex flex-row items-center gap-1"><DollarSign /> {productData?.product?.price}</h1>
                    <Button
                        onClick={() => handleClickAddToCart('add')}
                        uppercase
                        className="flex flex-row items-center justify-between"
                    >
                        Add to cart 
                        <FaCartPlus 
                            size={20}
                        />
                    </Button>
                    <Button
                        onClick={() => handleClickAddToCart('order')}
                        uppercase
                        className="flex flex-row items-center justify-between"
                    >
                        order now 
                        <FaCartArrowDown 
                            size={20}
                        />
                    </Button>
                </div>
            </section>

            {productData?.related_products && 
            <section>
                <h2 className="my-2 text-3xl font-bold">
                Related products
                </h2>
                <section className="my-4">
                    <ProductsCom products={productData?.related_products} />
                </section>
            </section>}

        </Container>
    )
}