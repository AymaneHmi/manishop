
// import { Link } from "react-router-dom";
import useCart from "../providers/cart-provider"
import Button from "./ui/Button";
import { useRequest } from "../hooks/useRequest";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import getUser from "../actions/getUser";
import { Loader2 } from "lucide-react";

export default function Summary () {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const user = getUser();
    const navigate = useNavigate();
    
    const {
        cartProducts,
        totalPrice, 
        cartNum,
        handleReloadCart
    } = useCart();

    const [isLoading, setIsLoading] = useState(false)

    const handleCheckout = async () => {
        setIsLoading(true);
        const productsIds = cartProducts.map(product => (
            product.id
        ))

        const orderProductArray = cartProducts.map(product => (
            `${product.quantity > 1 ? product.quantity : ''}${product.title}${product.size ? '/' + product.size : ''}`
        ))
    
        const orderProduct = orderProductArray.join(', ')
        const address = user.address && user.city ? `${user.address}, ${user.city}` : '';

        const data = {
            name: user.username,
            phone: user.number,
            address: address,
            products: cartProducts,
            order_products: orderProduct,
            products_ids: productsIds,
            price: totalPrice,
            user_id: user.id,
        }
        const responseData = await useRequest.post(data, '/checkout.php');
        setIsLoading(false);
        if(responseData.error) {
            toast.error('something went wrong, try again later.')
            return;
        };
        window.location.href = responseData.url;
    };
    
    useEffect(() => {
        if(queryParams.get('success')){
            handleReloadCart();
            toast.success('Payment done successfuly.')
            navigate('/orders')            
        } 
        if(queryParams.get('canceled')) {
            toast.error('Something went wrong')
            navigate('/cart')            
        }
    },[])

    return (
        <div className="bg-light text-dark-800 dark:bg-dark-200 dark:text-light rounded-lg shadow-lg py-2 px-4 border flex flex-col gap-4">
            <h1 className="font-bold text-2xl">Order Summary</h1>
            <hr />
                {cartProducts.map((product, i) => (
                    <div key={i} className="flex flex-row items-center justify-between text-sm">
                        <h2>{product.quantity} {product.title} / {product.size ? product.size : ''}</h2>
                        <h1>${(product.price * product.quantity).toFixed(2)}</h1>
                    </div>
                ))}
            <hr />
            <div className="flex flex-row items-center justify-between font-bold">
                <h2>Total Price</h2>
                <h1>${totalPrice.toFixed(2)}</h1>
            </div>
            <hr />
            <Button
                disabled={cartNum === 0 || isLoading}
                onClick={handleCheckout}
                className={'flex flex-row gap-2 justify-center'}
            >
                CheckOut
                {isLoading && <Loader2
                    className="animate-spin"
                />}
            </Button>
            {/* <Link to={'/checkout'}>
                <Button
                    disabled={cartNum === 0}
                >
                    CheckOut
                </Button>
            </Link> */}
        </div>
    )
}