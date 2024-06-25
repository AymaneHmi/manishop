import {create} from 'zustand';
import useUser from './use-user';
import { useEffect, useState } from 'react';
import axios from 'axios';

const requestApi = import.meta.env.VITE_REQUEST_URL;

const useUpdateFavorites = create(set => ({
  reloadFavorites: false,
  updateFavorites: () => set((state) => ({ reloadFavorites: !state.reloadFavorites })),
}))

export default function useFavorite () {
  const {user, isLoadingUser} = useUser();
  const [favorites, setFavorites] = useState([])
  const {reloadFavorites, updateFavorites} = useUpdateFavorites();

  const fetchFavorites = async (user) => {
    if(!user?.id) {
      const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
      return setFavorites(favorites);
    }
    const res = await axios.get(requestApi + '/user/favorite.php?user_id=' + user?.id)
    setFavorites(res.data);
  }
    
  useEffect(() => {
    if(isLoadingUser) return;
    fetchFavorites(user);
  },[user, reloadFavorites, isLoadingUser]);

  const isFavorite = ({ item, productId }) => {
    if (item?.id) {
      return favorites?.some((favorite) => favorite.id === item?.id);
    }
    return favorites?.some((favorite) => favorite.id === productId);
  }

  const handleFavorite = async ({item, productId, user}) => {
    if(item?.id) {
      const isFavorited = isFavorite({item});
      const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

      if (isFavorited) {
        const filteredProducts = favorites.filter(favorite => {
          return favorite.id !== item?.id;
        })
        localStorage.setItem('favorites', JSON.stringify(filteredProducts));
      } else {
        favorites.push(item)
        localStorage.setItem('favorites', JSON.stringify(favorites));
      }
      return updateFavorites();
    }

    console.log(productId)

    const data = {
      product_id: productId,
      user_id: user?.id,
    };

    const isFavorited = isFavorite({productId});

    if (isFavorited) {
      await axios.delete(requestApi + '/user/favorite.php', {data})
    } else {
      await axios.post(requestApi + '/user/favorite.php', data)
    }

    updateFavorites();
  }

  return {
    favorites,
    handleFavorite,
    isFavorite,
    updateFavorites
  }
}
