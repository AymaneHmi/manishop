import ImgsCom from "./ImgsCom";
import { Minus, Plus, X } from "lucide-react";
import { useFavorites } from "../hooks/use-favorites";
import Favorite from "./ui/Favorite";
import useCart from "../providers/cart-provider";
import { useEffect, useState } from "react";

export default function CartCom(
  { 
    product
  }) {
  
  const {
    isFavorite, 
    handleFavorite
  } = useFavorites();
  
  const {
    handleRemoveCart, 
    handleQty
  } = useCart();
  
  const [qty, setQty] = useState(1);
  
  useEffect(() => {
    setQty(parseInt(product.quantity));
  }, [product.quantity]);
  
  const addQty = () => {
    const newQty = qty + 1;
    setQty(newQty);
  };

  const removeQty = () => {
    if (qty === 1) return;
    const newQty = qty - 1;
    setQty(newQty);
  };

  useEffect(() => {
    let timer;
    
    clearTimeout(timer);
    
    timer = setTimeout(() => {
      handleQty(product.cart_id, qty);
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [qty, handleQty, product.cart_id]);


  return (
    <tr className="border-b border-primary">

      <td className="p-2 grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
        <div className="relative h-28 md:h-36">
          <Favorite
            isFavorite={isFavorite(product.id)}
            handleFavorite={(e) => handleFavorite(e, product.id)}
          />
          <ImgsCom 
            images={product.images} 
            showDots
          />
        </div>
        <div className="text-center md:text-left">
          <h1 className="font-bold capitalize text-md">{product.title}{product.size && ` / ${product.size}`}</h1>
          <h1 className="text-sm opacity-70 capitalize">{product.category}</h1>
        </div>
      </td>

      <td className="py-2 font-bold text-md">${product.price}</td>

      <td className="py-2">
        <div className="space-x-2 py-2 overflow-hidden w-fit mx-auto flex flex-row items-center">
          <div onClick={removeQty} className={`w-8 h-8 flex items-center justify-center cursor-pointer text-white bg-primary hover:bg-secondary rounded-full ${qty === 1 ? 'bg-transparent hover:bg-transparent opacity-50 cursor-text' : ''}`}>
            <Minus />
          </div>
          <div className="px-2 font-bold">{qty}</div>
          <div onClick={addQty} className="w-8 h-8 flex items-center justify-center cursor-pointer text-white bg-primary hover:bg-secondary rounded-full">
            <Plus />
          </div>
        </div>
      </td>

      <td className="py-2 font-bold text-md">${(qty * product.price).toFixed(2)}</td>

      <td className="py-2">
        <div className="w-8 h-8 flex items-center justify-center cursor-pointer text-white bg-primary hover:bg-secondary rounded-full">
          <X
            onClick={() => handleRemoveCart(product.cart_id)} 
            size={20} 
          />
        </div>
      </td>

    </tr>
  );
}