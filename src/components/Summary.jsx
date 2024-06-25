
import Button from "./ui/button";
import { useState } from "react";
import useUser from "../hooks/use-user";
import { Loader2 } from "lucide-react";
import { useMinimize } from "../hooks/use-minimize";
import useCart from "../hooks/use-cart";
import { useStripeClientSecret } from "../hooks/stripe-client-secret";
import Label from "./ui/label";
import Input from "./ui/input";
import useDiscount from "../hooks/use-discount";
import axios from "axios";
import { useForm } from "react-hook-form";
import { usernamePattern } from "../hooks/patterns";

const api = import.meta.env.VITE_API;

export default function Summary () {
    
    const {user} = useUser();
    const {cartProducts, totalPrice} = useCart();
    const {clientSecret, handleClientSecret} = useStripeClientSecret();

    const [isLoading, setIsLoading] = useState(false)
    const [checkoutError, setCheckoutError] = useState(false)

    const [isLoadingCoupon, setIsLoadingCoupon] = useState(false)
    const [errorCoupon, setErrorCoupon] = useState('')
    const [couponDiscountAmount, setCouponDiscountAmount] = useState(0)

    const {
        register,
        formState: {errors},
        handleSubmit,
        watch
    } = useForm();

    const onSubmit = async (data) => {
        setIsLoadingCoupon(true)
        axios.get(api + "/promocodes/promocode?coupon=" + data.coupon?.toUpperCase())
        .then(res => {
            setErrorCoupon('')
            setCouponDiscountAmount(res.data)
        })
        .catch(err => {
            setCouponDiscountAmount(0)
            setErrorCoupon(err?.response?.data?.error)
        })
        .finally(() => {
            setIsLoadingCoupon(false)
        })
    }

    const handleCheckout = async () => {
        setIsLoading(true);
        const orderProductsIds = cartProducts.map(product => (
            product.productId
        ))

        const orderProductsArray = cartProducts.map(product => (
            product.quantity > 1 ? product.quantity + ' ' : '' + useMinimize(product.title, 30) + ', ' + product.size + ', ' + product.color
        ))
    
        const orderProducts = orderProductsArray.join(', ')

        const totalPriceWithCoupon = useDiscount(totalPrice, couponDiscountAmount);

        const data = {
            customerName: user?.username ? user.username : null,
            customerNumber: user?.number ? user.number : null,
            customerEmail: user?.email ? user.email : null,
            cartProducts,
            orderProducts,
            orderProductsIds,
            totalPrice: totalPriceWithCoupon,
            user_id: user?.id ? user.id : null,
        }
        axios.post(api + '/checkout', data)
        .then(res => {
            handleClientSecret(res.data.clientSecret)
        })
        .catch(err => {
            setCheckoutError(true)
        })
        .finally(() => {
            setIsLoading(false);
        })
    };

    return (
        <div className="bg-light text-dark-800 dark:bg-dark-200 dark:text-light rounded-lg shadow-lg py-2 px-4 border flex flex-col gap-4">
            <h1 className="font-bold text-2xl">Order Summary</h1>
            <hr />
                {cartProducts.map((product, i) => (
                    <div key={i} className="flex flex-row items-center justify-between text-sm">
                        <h2>{product.quantity} {useMinimize(product.title, 10)}, {product.size}, {product.color}</h2>
                        <h1 className="flex flex-row items-center gap-1">{product.discountAmount > 0 && <p className="text-xs line-through">${product.price}</p>} ${(useDiscount(product.price, product.discountAmount) * product.quantity).toFixed(2)}</h1>
                    </div>
                ))}
            <hr />
            <div className="flex flex-row items-center justify-between font-bold">
                <h2>Total Price</h2>
                <div className="flex flex-row items-center gap-1">{couponDiscountAmount > 0 && <p className="text-xs line-through">${totalPrice.toFixed(2)}</p>} ${useDiscount(totalPrice, couponDiscountAmount)}</div>
            </div>
            <hr />
            <div className="flex flex-col gap-2">
                <Label className={'font-semibold'}>Do You Have a Coupon?</Label>
                <p className="text-xs">Coupon should be only letters and numbers.</p>
                {(!!errors?.coupon || errorCoupon) && <Label className={"text-red-500"}>{errorCoupon ? errorCoupon : "This Field is required"}</Label>}
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col md:flex-row gap-2 w-full">
                    <Input
                        type={'text'}
                        className={"w-full"}
                        value={watch("coupon")?.toUpperCase()}
                        {...register("coupon", {required: true, pattern: usernamePattern})}
                    />
                    <Button
                        className={"w-full md:w-1/3 text-black"}
                        varient={"secondary"}
                        disabled={cartProducts.length === 0 || isLoadingCoupon || isLoading || clientSecret}
                        type={"submit"}
                    >
                        Apply
                        {isLoadingCoupon && <Loader2
                            className="animate-spin"
                        />}
                    </Button>
                </form>
            </div>
            <hr />
            {checkoutError && <Label className={'text-red-500 text-xs'}>Something went wrong, check your connection and try agian.</Label>}
            <Button
                disabled={cartProducts.length === 0 || isLoading || clientSecret}
                onClick={handleCheckout}
                className={'flex flex-row gap-2 justify-center'}
            >
                Checkout
                {isLoading && <Loader2
                    className="animate-spin"
                />}
            </Button>
        </div>
    )
}