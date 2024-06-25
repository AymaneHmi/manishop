import { Minus, Plus, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useMinimize } from "../hooks/use-minimize";
import useFavorite from "../hooks/use-favorite";
import useCart from "../hooks/use-cart";
import Gallery from "./gallery";
import Favorite from "./ui/favorite";
import useUser from "../hooks/use-user";
import useDiscount from "../hooks/use-discount";

export default function CartCom(
  { 
    product
  }) {

  const {user} = useUser();
  const {
    isFavorite, 
    handleFavorite
  } = useFavorite();

  const {handleRemoveCart, handleQty} = useCart();
  
  const [qty, setQty] = useState(1);

  const discountPrice = useDiscount(product.price, product.discountAmount);
  
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
      handleQty({item: !user ? product : {}, cartId:product.cartId, qty:qty});
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [qty, handleQty, product]);


  return (
    <tr className="border-b border-primary">

      <td className="p-2 grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
        <div className="relative h-28 md:h-36">
          <Favorite
            isFavorite={isFavorite(product?.productId)}
            handleFavorite={() => handleFavorite(product?.productId, user)}
          />
          <Gallery 
            media={product.media} 
          />
        </div>
        <div className="text-center md:text-left">
          <h1 className="font-bold capitalize text-md">{useMinimize(product?.title, 10)}, {product.size}, {product.color}</h1>
          <h1 className="text-sm opacity-70 capitalize">{product.category}</h1>
        </div>
      </td>

      <td className="font-bold text-md">
        <p className="text-xs line-through">${product.price}</p> ${discountPrice}
      </td>

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

      <td className="py-2 font-bold text-md">${(qty * discountPrice).toFixed(2)}</td>

      <td className="py-2">
        <div className="w-8 h-8 flex items-center justify-center cursor-pointer text-white bg-primary hover:bg-secondary rounded-full">
          <X
            onClick={() => handleRemoveCart({item: !user?.id ? product : {}, cartId:product.cartId})} 
            size={20} 
          />
        </div>
      </td>

    </tr>
  );
}