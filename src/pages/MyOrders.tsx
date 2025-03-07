 // @ts-nocheck
import { useContext } from "react"; 
import { Link } from "react-router-dom";
import { ShoppingCartContext } from "../contexts"; 
import { EmptyOrdersIcon } from "../utils/EmptyOrdersIcon"; 
import Layout from './../components/Layout';
import OrdersCard from './../components/OrdersCard';
import { totalPrice } from './../utils/totalPrice';

function MyOrders() {
  const context = useContext(ShoppingCartContext);

  const renderView = () => {
    if (context.order.length > 0) {
      return context.order.map((order, index) => (
        <Link key={index} to={`/my-orders/${index}`}>
          <OrdersCard
            totalPrice={totalPrice(order.products)}
            totalProducts={order.products.length}
          />
        </Link>
      ));
    } else {
      return (
        <div className="w-full h-full flex justify-center items-center flex-col">
          <figure className="w-20">
            <EmptyOrdersIcon />
          </figure>
          <p className="font-semibold">
            Nothing yet, add some products and check them out :)
          </p>
        </div>
      );
    }
  };

  return (
    <Layout>
      <div className="flex items-center justify-center w-80 relative">
        <h1>My Orders</h1>
      </div>
      {renderView()}
    </Layout>
  );
}

export default MyOrders;