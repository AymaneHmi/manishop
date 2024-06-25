import { useParams } from "react-router-dom"
import ProductsCom from "../../components/products-component";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import Container from "../../components/ui/container";
import { Check } from "lucide-react";
import axios from "axios";

import {FaCartPlus} from 'react-icons/fa6';
import Button from "../../components/ui/button";
import PageHeading from "../../components/ui/page-heading";
import useUser from "../../hooks/use-user";
import useCart from "../../hooks/use-cart";
import useFavorite from "../../hooks/use-favorite";
import Gallery from "../../components/gallery";
import Badge from "../../components/ui/badge";
import Label from "../../components/ui/label";
import { twMerge } from "tailwind-merge";
import { useQuery } from "react-query";
import EmptyState from "../../components/ui/empty-state";
import ProductPrice from "../../components/product-price";
import Reviews from "../../components/reviews";
import RelatedProducts from "../../components/related-products";
import Favorite from "../../components/ui/favorite";

const api = import.meta.env.VITE_API;

export default function Product () {
    const {productSlug} = useParams();
    
    const {user} = useUser();
    const {isFavorite, handleFavorite} = useFavorite();
    const {handleCart} = useCart();  
    
    const [selectedSize , setSelectedSize] = useState({})
    const [selectedColor , setSelectedColor] = useState({})

    const fetchProduct = async (productSlug) => {
        const res = await axios.get(api + '/products/product?slug=' + productSlug);
        return res.data;
    }

    const {data:product, isLoading:isLoadingProduct, error:errorProduct, refetch:refetchProduct} = useQuery({
        queryKey: ['product', productSlug],
        queryFn: () => fetchProduct(productSlug),
        initialData: null,
    })

    useEffect(() => {
        refetchProduct();
    },[productSlug])

    useEffect(() => {
        setSelectedSize(product?.sizes?.[0])
        setSelectedColor(product?.colors?.[0])
    },[product])

    const handleSelectSize = (size) => {
        setSelectedSize(size)
    }
    
    const handleSelectColor = (color) => {
        setSelectedColor(color)
    }

    const handleClickAddToCart = () => {
        if(selectedSize && selectedColor){
            handleCart({item: !user?.id ? product : {}, productId: product?.id, selectedSize, selectedColor, user})
        } else {
            toast.error('Please select a size and a color')
        }
    }

    const cartCount = (cartCount) => {
        if(cartCount > 5 && cartCount < 10) return '+5';
        if(10 < cartCount) return '+10';
        if(cartCount < 5) return null;
    }
    
    if(errorProduct?.response.status === 500) {
        return (
            <Container>
                <EmptyState 
                    title="Uh, something went wrong!" 
                    subtitle="Check your connection, and try again." 
                />
            </Container>
        )
    }

    if(errorProduct?.response.status === 404) {
        return (
            <Container>
                <EmptyState 
                    title="No product found!" 
                    subtitle="Looks like this page is not available any more." 
                    varient="notfound"
                />
            </Container>
        )
    }
        
    if(isLoadingProduct) {
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

            <section className="grid grid-cols-1 md:grid-cols-3 md:gap-6 my-4 items-start justify-center text-left">
                <div className="md:sticky top-0 relative col-span-2 h-[60vh] md:h-[130vh]">
                    <Favorite
                        isFavorite={isFavorite({item: !user?.id ? product : {}, productId: product.id})}
                        handleFavorite={() => handleFavorite({item: !user?.id ? product : {}, productId:product.id, user})}
                    />
                    <Gallery 
                        media={product?.media} 
                        navigationImages
                    />
                </div>
                <div className="md:my-0 flex flex-col gap-4">
                    {cartCount(product?.cartCount) !== null && <h3 className="bg-lime-200 text-lime-800 w-fit px-2 rounded">{cartCount(product?.cartCount)} in cart</h3>}
                    <h2 className="font-bold text-lg lg:text-2xl capitalize">{product?.title}</h2>
                    <ProductPrice
                        price={product?.price}
                        discountAmount={product?.discountAmount}
                    />
                    <div className="w-full flex flex-col gap-4">
                        <Label>Size</Label>
                        <div className="flex flex-wrap gap-2">
                            {product?.sizes?.map((size, index) => (
                                <Badge 
                                    key={index} 
                                    onClick={() => handleSelectSize(size)} 
                                    className={twMerge('py-2 px-3 cursor-pointer hover:bg-gray-100', selectedSize?.id === size.id && 'border-primary')}
                                >{size.value}</Badge>
                            ))}
                        </div>
                    </div>
                    <div className="w-full flex flex-col gap-4">
                        <Label>Color</Label>
                        <div className="flex flex-wrap gap-2">
                            {product?.colors?.map((color, index) => (
                                <Badge 
                                    key={index} 
                                    onClick={() => handleSelectColor(color)} 
                                    className={twMerge('w-6 h-6 rounded-full border border-gray-400 cursor-pointer flex flex-col items-center justify-center text-primary', selectedColor?.id === color.id && 'border-primary opacity-80')}
                                    style={{backgroundColor: color.value}}
                                >
                                    {selectedColor?.id === color.id && <Check size={15} />}
                                </Badge>
                            ))}
                        </div>
                    </div>
                    <Button
                        onClick={handleClickAddToCart}
                        disabled={!selectedColor?.id || !selectedSize?.id}
                        className="flex flex-row items-center gap-4"
                    >
                        <FaCartPlus 
                            size={20}
                        />
                        Add to cart 
                    </Button>
                    <div className="product-description text-xs text-left" dangerouslySetInnerHTML={{ __html: product?.description }}></div>
                    <div className="flex flex-wrap gap-2">
                        {product?.tags?.map((tag, index) => (
                            <Badge key={index}>
                                {tag}
                            </Badge>
                        ))}
                    </div>
                </div>
            </section>

            <RelatedProducts />

            <Reviews />

        </Container>
    )
}