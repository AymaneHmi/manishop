import { Navigate, useNavigate } from "react-router-dom";
import Container from "../../components/ui/Container";
import PageHeading from "../../components/ui/PageHeading";
import useCart from "../../providers/cart-provider";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import { useForm } from "../../hooks/useForm";
import getUser from "../../actions/getUser";
import { useEffect } from "react";
import { useRequest } from "../../hooks/useRequest";
import { toast } from "react-hot-toast";
// import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";

const initialState = {
    name: '',
    number: '',
    address: '',
    city: ''
}

export default function CheckOut () {

    // const stripe = useStripe();
    // const elements = useElements();

    const navigate = useNavigate();
    const user = getUser();
    const {cartProducts, totalPrice, resetCart} = useCart();

    const { formData: order, handleChange: handleChange, resetForm: resetForm } = useForm(
        initialState
    );

    useEffect(() => {
        if(!user) return;
        handleChange('name', user.username);
        handleChange('number', user.number ? user.number : '');
        handleChange('address', user.address ? user.address : '');
        handleChange('city', user.city ? user.city : '');
    },[user])

    const handleSubmit = async () => {
        if(!order.name || !order.number || !order.address || !order.city) return;
        
        const productsIds = cartProducts.map(product => (
            product.id
        ))

        const orderProductArray = cartProducts.map(product => (
            `${product.quantity > 1 ? product.quantity : ''}${product.title}${product.size ? '/' + product.size : ''}`
        ))
    
        const orderProduct = orderProductArray.join(', ')

        const address = `${order.address}, ${order.city}`

        const data = {
            name: order.name,
            phone: order.number,
            address: address,
            products: orderProduct,
            products_ids: productsIds,
            price: totalPrice,
            user_id: user.id,
            status: 'Stocked up',
            isPaid: false
        }
        const responseData = await useRequest.post(data, '/orders/create.php');
        console.log(responseData)
        if(responseData?.error){
            toast.error('An error accured when placing your order!')
            return;
        }
        resetCart();
        toast.success('your order placed successfuly.')
        navigate('/orders');
    }

    if(cartProducts.length === 0) {
        return <Navigate to={'/cart'} replace />
    }

    return (
        <>
            {/* <Container>
                <PageHeading
                    title={"CheckOut"}
                    subtitle={'Complete your order!'}
                />
                <div className="flex flex-col gap-4 mb-10">
                    <label htmlFor="">Full Name</label>
                    <Input
                        required
                        type={'text'}
                        placeholder={'full name'}
                        value={order.name}
                        onChange={(e) => handleChange('name', e.target.value)}
                    />
                    <label htmlFor="">Phone number</label>
                    <Input
                        required
                        type={'number'}
                        placeholder={'number'}
                        value={order.number}
                        onChange={(e) => handleChange('number', e.target.value)}
                    />
                    <label htmlFor="">Address</label>
                    <Input
                        required
                        type={'text'}
                        placeholder={'address'}
                        value={order.address}
                        onChange={(e) => handleChange('address', e.target.value)}
                    />
                    <label htmlFor="">City</label>
                    <Input
                        required
                        type={'text'}
                        placeholder={'city'}
                        value={order.city}
                        onChange={(e) => handleChange('city', e.target.value)}
                    />
                    <Button
                        onClick={handleSubmit}
                    >
                        Place order
                    </Button>
                </div>
            </Container> */}
            {/* <form onSubmit={handleSubmit}>
                <CardElement />
                <button type="submit">Pay Now</button>
                {paymentError && <div>{paymentError}</div>}
            </form> */}
        </>
    )
}