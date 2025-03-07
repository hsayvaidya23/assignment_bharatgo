 // @ts-nocheck
import { XMarkIcon, PlusIcon, MinusIcon } from "@heroicons/react/24/solid";
import { useContext, useEffect, useState } from "react";
import { ShoppingCartContext } from "../contexts";

interface Product {
  id: string;
  title: string;
  price: number;
  images: string[];
  count: number;
}

interface OrderCardProps {
  id: string;
  title: string;
  imgUrl: string;
  price: number;
  initialCount?: number;
  handleDelete?: (id: string) => void;
}

function OrderCard({ 
  id, 
  title, 
  imgUrl, 
  price, 
  initialCount = 1,
  handleDelete 
}: OrderCardProps) {
  const context = useContext(ShoppingCartContext);
  const [productCount, setProductCount] = useState(initialCount);

  useEffect(() => {
    setProductCount(initialCount);
  }, [initialCount]);

  const updateCartProduct = (newCount: number) => {
    if (!context.cartProducts) return;

    const index = context.cartProducts.findIndex((item: Product) => item.id === id);
    if (index === -1) return;

    const updatedProducts = [...context.cartProducts];
    const updatedProduct = {
      ...updatedProducts[index],
      count: newCount
    };

    updatedProducts[index] = updatedProduct;
    context.setCartProducts(updatedProducts);
    context.updateTotalPriceOfProducts();
  };

  const reduceProductCount = () => {
    if (productCount > 1) {
      const newCount = productCount - 1;
      setProductCount(newCount);
      updateCartProduct(newCount);
    }
  };

  const increaseProductCount = () => {
    const newCount = productCount + 1;
    setProductCount(newCount);
    updateCartProduct(newCount);
  };

  const totalPrice = price * productCount;

  return (
    <div className="flex justify-between items-center p-4 border-b border-gray-200">
      <div className="flex items-center gap-4">
        <figure className="w-20 h-20 min-w-20">
          <img
            className="w-full h-full rounded-lg object-cover"
            src={imgUrl}
            alt={title}
          />
        </figure>
        <div className="flex flex-col gap-2">
          <p className="text-sm font-light line-clamp-2">{title}</p>
          <div className="flex flex-col gap-1">
            <p className="text-lg font-medium">${totalPrice.toFixed(2)}</p>
            <p className="text-sm text-gray-500">
              ${price.toFixed(2)} each
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={reduceProductCount}
              disabled={productCount <= 1}
              className={`p-1 rounded-lg ${
                productCount <= 1 
                  ? 'bg-gray-100 text-gray-400'
                  : 'bg-red-200 text-black hover:bg-red-300'
              } transition-colors`}
            >
              <MinusIcon className="h-4 w-4" />
            </button>
            <span className="bg-gray-100 px-3 py-1 rounded-md min-w-[2rem] text-center">
              {productCount}
            </span>
            <button
              onClick={increaseProductCount}
              className="p-1 rounded-lg bg-green-200 text-black hover:bg-green-300 transition-colors"
            >
              <PlusIcon className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
      {handleDelete && (
        <button
          onClick={() => handleDelete(id)}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          aria-label="Remove item"
        >
          <XMarkIcon className="h-6 w-6 text-black" />
        </button>
      )}
    </div>
  );
}

export default OrderCard;