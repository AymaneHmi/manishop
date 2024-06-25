import { useQuery } from "react-query";

const ApiToken = import.meta.env.VITE_API_TOKEN;

const useFetch = ({api, queryKey}) => {

    const fetchData = async () => {
        const res = await fetch(api, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                Authorization: ApiToken,
            },
        });
        return res.json();
    };

    const {data, isLoading, error} = useQuery(queryKey, () => fetchData());

    return { data, isLoading, error };
};

export default useFetch;