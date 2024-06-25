import axios from "axios";
import { CheckCircleIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import PageHeading from "./ui/page-heading";
import Button from "./ui/button";
import useCart from "../hooks/use-cart";
import useUser from "../hooks/use-user";

const api = import.meta.env.VITE_API;

const Return = () => {
  const {user} = useUser();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  
  const [status, setStatus] = useState(null);
  const [customerEmail, setCustomerEmail] = useState('');

  const {resetCart} = useCart();

  const sessionId = queryParams.get("session_id");

  useEffect(() => {
    if(!sessionId) return;
    const resData = {
      session_id: sessionId
    }

    axios.post(api + '/status', resData)
    .then(res => {
      setStatus(res.data.status)
      setCustomerEmail(res.data.customer_email)
    })
  }, [sessionId]);

  useEffect(() => {
    if(!status) return;
    if(status === 'complete') {
      resetCart()
    }
  },[status])

  if (status === 'complete') {
    return (
      <section className="h-[80vh] w-11/12 lg:w-3/5 mx-auto flex flex-col items-center justify-center gap-2 my-4">
        <CheckCircleIcon size={40} className="text-lime-600" />
        <PageHeading
          title={"Payment Done Seccussfuly"}
          subtitle={"We would like to thank you for your confidence. A confirmation email is sent to " + customerEmail}
          className={"items-center text-center"}
        />
        <div className="flex flex-row gap-2">
          {user && <Link to={'/orders'}>
            <Button
              varient={"secondary"}
            >
              See Orders
            </Button>
          </Link>}
          <Link to={'/products'}>
            <Button>
              Continue Shopping
            </Button>
          </Link>
        </div>
      </section>
    )
  }

  return null;
}

export default Return