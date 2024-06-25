import { EmbeddedCheckout, EmbeddedCheckoutProvider } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useStripeClientSecret } from "../hooks/stripe-client-secret";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC);

const CheckoutForm = () => {

    const {clientSecret} = useStripeClientSecret();
  
    const options = {clientSecret};
  
    return (
      <div id="checkout" className="my-4">
        <EmbeddedCheckoutProvider
          stripe={stripePromise}
          options={options}
        >
          <EmbeddedCheckout />
        </EmbeddedCheckoutProvider>
      </div>
    )
}

export default CheckoutForm