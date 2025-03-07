 // @ts-nocheck
import { useContext, useRef } from "react";
import { CSSTransition } from "react-transition-group";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { ShoppingCartContext } from "../contexts"; 
import OrderCard from './Ordercard';
import { Link } from "react-router-dom";

interface CartProduct {
  id: string;
  title: string;
  price: number;
  image: string;
  count: number;
}

interface OrderProduct {
  id: string;
  title: string;
  price: number;
  images: string[];
  count: number;
}

interface Order {
  id: string;
  date: string;
  products: OrderProduct[];
  totalProducts: number;
  totalPrice: number;
}

function CheckOutSideMenu() {
  const context = useContext(ShoppingCartContext);
  const nodeRef = useRef(null);

  const handleDelete = (id: string) => {
    const filteredProducts = context.cartProducts.filter(
      (product: CartProduct) => product.id !== id
    );
    context.setCartProducts(filteredProducts);
  };

  const handleCheckout = () => {
    const orderProducts: OrderProduct[] = context.cartProducts.map((product: CartProduct) => ({
      id: product.id,
      title: product.title,
      price: product.price,
      images: [product.image],
      count: product.count
    }));

    const orderToAdd: Order = {
      id: crypto.randomUUID(),
      date: new Date().toLocaleDateString(),
      products: orderProducts,
      totalProducts: context.cartProducts.length,
      totalPrice: context.totalPriceOfProducts,
    };

    context.setOrder([...context.order, orderToAdd]);
    context.setCartProducts([]);
  };

  return (
    <CSSTransition
      in={context.isCheckoutSideMenuOpen}
      timeout={400}
      classNames="fade"
      nodeRef={nodeRef}
      unmountOnExit
    >
      <aside
        ref={nodeRef}
        className="fixed right-0 top-[70px] w-[360px] h-[calc(100vh-68px)] bg-white border border-black rounded-lg overflow-auto"
      >
        <div className="flex justify-between items-center p-6">
          <h2 className="font-medium text-xl">My Order</h2>
          <XMarkIcon
            onClick={context.closeCheckOutSideMenu}
            className="h-6 w-6 text-black cursor-pointer animate-pulse"
          />
        </div>

        <div>
          {context.cartProducts.map((product: CartProduct) => (
            <OrderCard
              key={product.id}
              id={product.id}
              title={product.title}
              price={product.price}
              imgUrl={product.image}
              handleDelete={handleDelete}
            />
          ))}
        </div>

        <div className="fixed bottom-0 bg-white w-[360px] p-4 border-t border-slate-400">
          <p className="flex justify-between mb-4">
            <span className="font-medium">Total:</span>
            <span className="text-lg font-bold">
              ${context.totalPriceOfProducts}
            </span>
          </p>
          <Link to="/my-orders/last">
            <button
              onClick={() => {
                handleCheckout();
                context.closeCheckOutSideMenu();
              }}
              className="w-full py-2 border border-slate-600 rounded-md text-white font-medium bg-black hover:bg-slate-900 transition-colors"
            >
              Checkout
            </button>
          </Link>
        </div>
      </aside>
    </CSSTransition>
  );
}

export default CheckOutSideMenu;