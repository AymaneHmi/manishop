import { toast } from "react-hot-toast";
import getUser from "../actions/getUser";
import { useRequest } from "../hooks/useRequest";
import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {

    const user = getUser();

    const [cartProducts, setCartProducts] = useState([]) 
    const [reloadCart , setReloadCart] = useState(false)
    const [totalPrice , setTotalPrice] = useState(0)

    const cartNum = cartProducts.length;

    const handleReloadCart = () => {
        setReloadCart(prev => !prev)
    }
    
    useEffect(() => {
        if(!user) {
            return;
        }
        const fetchCartProducts = async () => {
            const data = {
                user_id: user?.id
            }
            const responseData = await useRequest.get('/user/cart.php', data);
            if(responseData.error){
                setCartProducts([]) 
                return;
            }
            setCartProducts(responseData)
        }
        fetchCartProducts();
    },[user, reloadCart])

    useEffect(() => {
        const totalPrice = () => {
            let totalValue = 0;
            for (let i = 0 ; i < cartProducts?.length ; i++ ) {
              totalValue += cartProducts[i].price * (cartProducts[i].quantity) ;
            }
            setTotalPrice(totalValue)
        }
        totalPrice()
    } , [cartProducts])

    const handleCart = async (productId, selectedSize) => {
        const data = {
            user_id: user?.id,
            product_id: productId,
            quantity: 1,
            size: selectedSize ? selectedSize : null
        }
        const responseData = await useRequest.post(data, '/user/cart.php');
        console.log(responseData)
        if(responseData?.error){
            toast.error(responseData.error)
            return;
        }
        handleReloadCart()
        toast.success('item added to cart successfuly.')
    }

    const handleRemoveCart = async (cartId) => {
        const data = {
            cart_id: cartId
        }
        const responseData = await useRequest.delete(data, '/user/cart.php');
        if(responseData?.error){
            return;
        }
        handleReloadCart()
        toast.success('item removed from cart successfuly.')
    }

    const handleQty = async (cartId, qty) => {
        const data = {
            cart_id: cartId,
            quantity: qty
        }
        const responseData = await useRequest.patch(data, '/user/cart.php');
        if(responseData.error) return;
        handleReloadCart()
    } 

    const resetCart = async () => {
        const data = {
            user_id: user?.id
        }
        const responseData = await useRequest.post(data, '/user/reset_cart.php');
        console.log(responseData)
        if(responseData.error){
            return;
        }
        handleReloadCart();
    }

    return (
        <CartContext.Provider value={{ 
            cartProducts, 
            handleCart, 
            handleRemoveCart, 
            cartNum, 
            totalPrice,
            handleReloadCart,
            handleQty,
            resetCart
        }}>
          {children}
        </CartContext.Provider>
    );
}

const useCart = () => {
    return useContext(CartContext);
};

export default useCart;