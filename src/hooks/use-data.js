import { create } from "zustand";
import useFetch from "./useFetch";
import axios from "axios";
import { useQuery } from "react-query";
import { useEffect } from "react";
import useUser from "./use-user";

const api = import.meta.env.VITE_API;

const categoriesApi = api + '/categories';
const productsApi = api + '/public/products';
const blogsApi = api + '/blogs';
const ordersApi = api + '/private/orders';
const reviewsApi = api + '/reviews'


export const useUpdateData = create((set) => ({
    reloadCart: false,
    updateCart: () => set((state) => ({ reloadCart: !state.reloadCart })),
    reloadFavorites: false,
    updateFavorites: () => set((state) => ({ reloadFavorites: !state.reloadFavorites })),
    reloadOrders: false,
    updateOrders: () => set((state) => ({ reloadOrders: !state.reloadOrders })),
    reloadReviews: false,
    updateReviews: () => set((state) => ({reloadReviews: !state.reloadReviews})),
}))

export default function useData () {
    const {user} = useUser();
    const {relaodOrders} = useUpdateData();

    const {data:categories, isLoading: isLoadingCategories, error: errorCategories} = useFetch({api:categoriesApi, queryKey: "categories"})
    const {data:products, isLoading: isLoadingProducts, error: errorProducts} = useFetch({api:productsApi, queryKey: "products"})
    const {data:blogs, isLoading: isLoadingBlogs, error: errorBlogs} = useFetch({api:blogsApi, queryKey: "blogs"})
    const {data:reviews, isLoading: isLoadingReviews, error: errorReviews} = useFetch({api: reviewsApi, queryKey: "reviews"})
    
    const fetchOrders = async (userId) => {
        const data = {
            user_id: userId
        }
        const res = await axios.post(ordersApi, data);
        return res.data;
    }
    
    const { data: orders, isLoading: isLoadingOrders, error: errorOrders, refetch: refetchOrders } = useQuery({
        queryKey: ['orders', user?.id],
        queryFn: () => fetchOrders(user?.id),
        initialData: [],
        enabled: !!user?.id,
      });
    
    useEffect(() => {
        refetchOrders();
    },[relaodOrders])

    return {
        categories,
        isLoadingCategories,
        errorCategories,

        products,
        isLoadingProducts,
        errorProducts,

        blogs,
        isLoadingBlogs,
        errorBlogs,

        orders,
        isLoadingOrders,
        errorOrders,

        reviews,
        isLoadingReviews,
        errorReviews,
    }
}