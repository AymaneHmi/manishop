import {create} from 'zustand';
import { toast } from 'react-hot-toast';
import { useEffect, useState } from 'react';
import useUser from './use-user';
import axios from 'axios';
import useDiscount from './use-discount';

const requestApi = import.meta.env.VITE_API;

const useUpdateCart = create(set => ({
  reloadCart: false,
  updateCart: () => set((state) => ({ reloadCart: !state.reloadCart })),
}))

export default function useCart () {
  const {user, isLoadingUser} = useUser();
  const {reloadCart, updateCart} = useUpdateCart();
  const [cartProducts, setCartProducts] = useState([])
  const [totalPrice, setTotalPrice] = useState(0)

  const fetchCartProducts = async (user) => {
    if(!user?.id) {
      const cartProducts = JSON.parse(localStorage.getItem('cartProducts'));
      if(cartProducts) {
        return setCartProducts(cartProducts);
      } else {
        return setCartProducts([]);
      }
    }
    axios.get(requestApi + '/user/cart?userId=' + user?.id)
    .then (res => {
      setCartProducts(res.data);
    })
    .catch(err => {
      setCartProducts([]);
    })
  }

  useEffect(() => {
    if(isLoadingUser) return;
    fetchCartProducts(user);
  },[user, reloadCart])

  useEffect(() => {
    const calculateTotalPrice = () => {
      let totalValue = 0;
      for (let i = 0; i < cartProducts?.length; i++) {
        totalValue += useDiscount(cartProducts[i].price, cartProducts[i].discountAmount) * cartProducts[i].quantity;
      }
      setTotalPrice(totalValue);
    }
    calculateTotalPrice();
  },[cartProducts])

  const handleCart = async ({item, productId, selectedSize, selectedColor, user}) => {
    if (item?.id) {
      // user not registered
      const updatedItem = {...item, productId:item.id, quantity:1, size: selectedSize?.value, color: selectedColor?.name, category: item.category.name}
      const cartProducts = JSON.parse(localStorage.getItem('cartProducts')) || [];
      const existProductinCart = cartProducts.filter(product => {
        return product.id === item?.id;
      })
      if(existProductinCart.length > 0) {
        toast.error('item is already in cart.');
        return;
      }
      cartProducts.push(updatedItem);
      localStorage.setItem('cartProducts', JSON.stringify(cartProducts));
      updateCart();
      toast.success('item added to cart successfully.');
      return;
    }
    // user registered
    const data = {
      userId: user?.id,
      productId: productId,
      quantity: 1,
      sizeId: selectedSize.id,
      colorId: selectedColor.id
    };
    axios.post(requestApi + '/user/cart', data)
    .then (res => {
      updateCart();
      toast.success('item added to cart successfully.');
    })
    .catch(err => {
      toast.error('Problem accured when adding item to cart.' + err);
    })
  }

  const handleRemoveCart = async ({item, cartId}) => {
    if(item?.productId) {
      const cartProducts = JSON.parse(localStorage.getItem('cartProducts'));
      const filteredProducts = cartProducts.filter(product => {
        return product.id !== item?.id;
      })
      localStorage.setItem('cartProducts', JSON.stringify(filteredProducts));
      toast.success('item removed from cart successfully.');
      updateCart();
      return;
    }
    const data = {
      cart_id: cartId
    };
    axios.delete(requestApi + '/user/cart', {data})
    .then (res => {
      toast.success('item removed from cart successfully.');
      updateCart();
    })
    .catch(err => {
      toast.error('Problem accured when removing item from cart.');
    })
  }

  const handleQty = async ({item, cartId, qty}) => {
    if(item?.id) {
      const cartProducts = JSON.parse(localStorage.getItem('cartProducts'));
      const updatedProducts = cartProducts.map(product => {
        if(product.id === item.id) {
            return {...product, quantity: qty};
        }
        return product;
      });
      localStorage.setItem('cartProducts', JSON.stringify(updatedProducts));
      updateCart();
      return;
  }  
    const data = {
      cart_id: cartId,
      quantity: qty
    };
    axios.patch(requestApi + '/user/cart', data)
    .then (res => {
      updateCart();
    })
    .catch(err => {
    })
  }

  const resetCart = async () => {
    localStorage.removeItem('cartProducts');
    updateCart();
  }

  return {
    cartProducts,
    totalPrice,
    handleCart,
    handleQty,
    handleRemoveCart,
    resetCart,
    updateCart
  }
}