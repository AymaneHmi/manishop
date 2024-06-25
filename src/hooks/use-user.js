import axios from "axios";
import useCookie from "./useCookies";
import { useQuery } from "react-query";

const reqUrl = import.meta.env.VITE_API + '/users'
  
export default function useUser() {
  const userToken = useCookie('ms_user_token');

  const fetchUser = async (token) => {
    const res = await axios.get(reqUrl + '?user_token=' + token);
    return res.data;
  }

  const { data: user, isLoading: isLoadingUser, error } = useQuery({
    queryKey: ['user', userToken],
    queryFn: () => fetchUser(userToken),
    initialData: null,
    enabled: !!userToken,
    refetchOnWindowFocus: false,
    refetchOnMount: true,
  });
  
  return { user, isLoadingUser, error };
}