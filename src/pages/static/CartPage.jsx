import useCart from "../../providers/cart-provider";
import Container from "../../components/ui/Container";
import PageHeading from "../../components/ui/PageHeading";
import CartCom from "../../components/CartCom";
import Summary from "../../components/Summary";

export default function CartPage () {
        
    const {cartProducts} = useCart();

    return (
        <>
            <Container>
                <PageHeading
                    title="My cart"
                    subtitle="See products you added to cart."
                />
                
                <div className="my-4 grid grid-cols-1 md:grid-cols-3 md:gap-6 items-start space-y-4 md:space-y-0">
                    <div className="flex flex-col items-center w-full col-span-2 space-y-4 overflow-x-auto">
                        <table className="space-y-2 w-full table-auto">
                            <thead className="capitalize">
                                <tr className="border-b border-primary">
                                    <th className="py-2 text-left w-2/5">Product</th>
                                    <th className="py-2">Price</th>
                                    <th className="py-2">Quantity</th>
                                    <th className="py-2">Total price</th>
                                    <th className="py-2"></th>
                                </tr>
                            </thead>
                            <tbody className="text-center w-full relative">
                                {cartProducts?.map((product , index) => (
                                    <CartCom 
                                        key={index} 
                                        product={product}  
                                    /> 
                                ))}
                            </tbody>
                        </table>
                        {cartProducts?.length === 0  && <span className="font-bold">No Product here</span>}
                    </div>
                    <Summary />
                </div>
            </Container>
        </>
    )
}