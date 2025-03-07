 // @ts-nocheck
import { useContext } from "react";
import { ShoppingCartContext } from "../contexts"; 
import { Link } from "react-router-dom";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import Layout from './../components/Layout';
import OrderCard from './../components/Ordercard';

interface OrderProduct {
  id: string;
  title: string;
  price: number;
  images: string[];
  count: number;
}

function MyOrder() {
  const context = useContext(ShoppingCartContext);
  const currentPath = window.location.pathname;
  let index = parseInt(currentPath.substring(currentPath.lastIndexOf("/") + 1));
  if (isNaN(index)) {
    index = (context.order?.length || 1) - 1;
  }

  return (
    <Layout>
      <div className="flex items-center justify-center w-80 relative m-6">
        <Link to="/my-orders" className="absolute left-0">
          <ChevronLeftIcon className="h-6 w-6 text-black cursor-pointer" />
        </Link>
        <h1>My Order</h1>
      </div>
      <div>
        {context.order?.[index]?.products?.map((product: OrderProduct) => (
          <OrderCard
            key={product.id}
            id={product.id}
            title={product.title}
            price={product.price}
            imgUrl={product.images[0]}
            initialCount={product.count}
          />
        ))}
      </div>
    </Layout>
  );
}

export default MyOrder;