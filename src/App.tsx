import { useRoutes, BrowserRouter } from "react-router-dom";
import { ShoppingCartProvider } from "./contexts";
import Home from "./pages/Home"; 
import MyAccount from "./pages/MyAccount"; 
import MyOrder from "./pages/MyOrder"; 
import MyOrders from "./pages/MyOrders"; 
import NotFound from "./pages/NotFound"; 
import Navbar from "./components/Navbar"; 
import SideMenu from "./components/CheckOutSideMenu";

const AppRoutes = () => {
  let routes = useRoutes([
    { path: "/", element: <Home /> },
    { path: "/clothes", element: <Home /> },
    { path: "/electronics", element: <Home /> },
    { path: "/furnitures", element: <Home /> },
    { path: "/toys", element: <Home /> },
    { path: "/others", element: <Home /> },
    { path: "/my-order", element: <MyOrder /> },
    { path: "/my-account", element: <MyAccount /> },
    { path: "/my-orders", element: <MyOrders /> },
    { path: "/my-orders/last", element: <MyOrder /> },
    { path: "/my-orders/:id", element: <MyOrder /> },
    { path: "*", element: <NotFound /> },
  ]);

  return routes;
};

function App() {
  return (
    <ShoppingCartProvider>
      <BrowserRouter>
        <Navbar />
        <AppRoutes />
        <SideMenu />
      </BrowserRouter>
     </ShoppingCartProvider>
  );
}

export default App;