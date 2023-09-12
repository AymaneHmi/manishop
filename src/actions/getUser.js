import { useEffect, useState } from "react";
import useCookie from "../hooks/useCookies";
import { useRequest } from "../hooks/useRequest";

export default function getUser() {

    const token = useCookie('ms_user_token');

    const [user, setUser] = useState(null); 

    useEffect(() => {
        const fetchUser = async () => {
            if (!token) {
                setUser(null);
                return;
            }

            const data = {
                user_token: token
            }

            const responseData = await useRequest.post(data, '/user/fetch_user.php');
            if (responseData.error) {
                setUser(null);
                return;
            }
            setUser(responseData)
        }

        fetchUser();
    }, [token]);

    return user;
}
