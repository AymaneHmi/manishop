import useFetch from "../hooks/useFetch";
const categoriesAPI = import.meta.env.VITE_CATEGORIES_API;

export default function getCategories () {
    const categories = useFetch(categoriesAPI);
    return categories;
}