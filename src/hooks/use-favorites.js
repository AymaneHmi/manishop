import getUser from "../actions/getUser";
import { useRequest } from "../hooks/useRequest";
import { toast } from "react-hot-toast";
import { useEffect, useState } from "react";


export function useFavorites () {
    const user = getUser();
    const [favorites, setFavorites] = useState(null);
    const [reloadFavorites , setReloadFavories] = useState(false)
    
    const isFavorite = (productId) => {
        return favorites?.some((favorite) => favorite.product_id === productId);
    };      
    
    useEffect(() => {
        if(!user) {
            return;
        }
        const fetchFavorites = async () => {
            const data = {
                user_id: user?.id
            }
            const responseData = await useRequest.get('/user/favorite.php', data);
            if(responseData.error){
                setFavorites(null) 
                return;
            }
            setFavorites(responseData)
        }
        fetchFavorites();
    },[user, reloadFavorites])

    const handleFavorite = async (e, productId) => {
        e.preventDefault();
        if(!user){
            toast.error('please login or register.')
            return;
        }
        const data = {
            product_id: productId,
            user_id: user?.id
        }
        if(isFavorite(productId)){
            const responseData = await useRequest.delete(data,'/user/favorite.php');
            if(responseData.error){
                toast.error('problem accured when defavorite this product!')
                return ;
            }
        } else {
            const responseData = await useRequest.post(data,'/user/favorite.php');
            if(responseData.error){
                toast.error('problem accured when favorite this product!')
                return;
            }
        }
        setReloadFavories(prev => !prev);
    }

    return {
        isFavorite, 
        handleFavorite,
        favorites
    }
}