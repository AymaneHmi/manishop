import { useEffect, useState } from "react";

import getUser from "./getUser";
import { useRequest } from "../hooks/useRequest";

export default function getOrders () {
    const user = getUser();

    const [orders, setOrders] = useState([])

    useEffect(() => {
        if(!user) {
            return;
        }
        const fetchOrders = async () => {
            const data = {
                user_id: user?.id
            }
            const responseData = await useRequest.post(data, '/orders/private_api.php');
            if(responseData.error){
                setOrders([]) 
                return;
            }
            setOrders(responseData)
        }
        fetchOrders();
    },[user])

    return orders;
}