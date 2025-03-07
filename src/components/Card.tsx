import { PlusIcon, CheckIcon } from "@heroicons/react/24/solid";
import { useContext } from "react";
import { ShoppingCartContext } from "../contexts"; 

function Card({ data }: any) {
  const context = useContext(ShoppingCartContext);

  const showProduct = () => {
    context.openProductDetail();
    context.setProductToShow(data);
  };

  const addProductToCart = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    data.count = 1;
    context.setCartProducts([...context.cartProducts, data]);
    context.closeProductDetail();
    context.openCheckOutSideMenu();
  };

  const isInCart = context.cartProducts.some((item) => item.id === data.id);

  return (
    <div
      onClick={showProduct}
      className="bg-white cursor-pointer w-56 h-60 rounded-lg transition-transform duration-75 hover:scale-105 active:scale-95"
    >
      <figure className="relative mb-2 w-full h-4/5">
        <span className="absolute bottom-0 left-0 bg-white/60 rounded-lg text-black text-sm m-1 px-2">
          {data.category?.name}
        </span>
        <img
          className="w-full h-full object-cover rounded-lg"
          src={data.images[0]}
          alt={data.title}
        />
        <button
          onClick={addProductToCart}
          className={`absolute m-2 top-0 right-0 flex justify-center items-center w-6 h-6 rounded-full ${
            isInCart ? "bg-black" : "bg-white"
          }`}
        >
          {isInCart ? (
            <CheckIcon className="h-6 w-6 text-white p-1" />
          ) : (
            <PlusIcon className="h-6 w-6 text-black" />
          )}
        </button>
      </figure>
      <p className="flex justify-between px-2">
        <span className="text-sm font-light">{data.title}</span>
        <span className="text-lg font-medium">${data.price}</span>
      </p>
    </div>
  );
}

export default Card;