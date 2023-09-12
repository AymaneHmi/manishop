import useFetch from "../hooks/useFetch";
const productAPI = import.meta.env.VITE_PRODUCTS_API

export default function getProducts () {
    const products = useFetch(productAPI);
    return products;
}