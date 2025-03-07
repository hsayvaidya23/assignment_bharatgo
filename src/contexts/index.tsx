 // @ts-nocheck
import { createContext, useState, useEffect, ReactNode } from "react";
import { totalPrice } from "../utils/totalPrice";

// Define a Product type
interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  // Add other product properties as needed
}

// Define a User type
interface User {
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
}

// Define an Order type
interface Order {
  id: string;
  products: Product[];
  date: string;
  // Add other order properties as needed
}

interface ShoppingCartContextType {
  isProductDetailOpen: boolean;
  openProductDetail: () => void;
  closeProductDetail: () => void;
  isCheckoutSideMenuOpen: boolean;
  openCheckOutSideMenu: () => void;
  closeCheckOutSideMenu: () => void;
  productToShow: Product | null;
  setProductToShow: (product: Product | null) => void;
  cartProducts: Product[];
  setCartProducts: (products: Product[]) => void;
  order: Order[];
  setOrder: (order: Order[]) => void;
  items: Product[] | null;
  setItems: (items: Product[] | null) => void;
  filteredItems: Product[] | null;
  setFilteredItems: (items: Product[] | null) => void;
  searchTitleBar: string | null;
  setSearchTitleBar: (search: string | null) => void;
  searchByCategory: string | null;
  setSearchByCategory: (category: string | null) => void;
  totalPriceOfProducts: number;
  updateTotalPriceOfProducts: () => void;
  user: User | null;
  setUser: (user: User | null) => void;
  cleanTitlebarState: () => void;
}

const initialState: ShoppingCartContextType = {
  isProductDetailOpen: false,
  openProductDetail: () => {},
  closeProductDetail: () => {},
  isCheckoutSideMenuOpen: false,
  openCheckOutSideMenu: () => {},
  closeCheckOutSideMenu: () => {},
  productToShow: null,
  setProductToShow: () => {},
  cartProducts: [],
  setCartProducts: () => {},
  order: [],
  setOrder: () => {},
  items: null,
  setItems: () => {},
  filteredItems: null,
  setFilteredItems: () => {},
  searchTitleBar: null,
  setSearchTitleBar: () => {},
  searchByCategory: null,
  setSearchByCategory: () => {},
  totalPriceOfProducts: 0,
  updateTotalPriceOfProducts: () => {},
  user: null,
  setUser: () => {},
  cleanTitlebarState: () => {},
};

const ShoppingCartContext = createContext<ShoppingCartContextType>(initialState);

interface ShoppingCartProviderProps {
  children: ReactNode;
}

function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
  const [isProductDetailOpen, setIsProductDetailOpen] = useState(false);
  const [isCheckoutSideMenuOpen, setCheckOutMenuOpen] = useState(false);
  const [productToShow, setProductToShow] = useState<Product | null>(null);
  const [cartProducts, setCartProducts] = useState<Product[]>([]);
  const [order, setOrder] = useState<Order[]>([]);
  const [items, setItems] = useState<Product[] | null>(null);
  const [filteredItems, setFilteredItems] = useState<Product[] | null>(null);
  const [searchTitleBar, setSearchTitleBar] = useState<string | null>(null);
  const [searchByCategory, setSearchByCategory] = useState<string | null>(null);
  const [totalPriceOfProducts, setTotalPriceOfProducts] = useState(0);
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const openProductDetail = () => setIsProductDetailOpen(true);
  const closeProductDetail = () => setIsProductDetailOpen(false);
  const openCheckOutSideMenu = () => setCheckOutMenuOpen(true);
  const closeCheckOutSideMenu = () => setCheckOutMenuOpen(false);

  const updateTotalPriceOfProducts = () => {
    setTotalPriceOfProducts(totalPrice(cartProducts));
  };

  const cleanTitlebarState = () => {
    setSearchTitleBar(null);
    setFilteredItems(items);
  };

  useEffect(() => {
    updateTotalPriceOfProducts();
  }, [cartProducts]);

  return (
    <ShoppingCartContext.Provider
      value={{
        isProductDetailOpen,
        openProductDetail,
        closeProductDetail,
        isCheckoutSideMenuOpen,
        openCheckOutSideMenu,
        closeCheckOutSideMenu,
        productToShow,
        setProductToShow,
        cartProducts,
        setCartProducts,
        order,
        setOrder,
        items,
        setItems,
        filteredItems,
        setFilteredItems,
        searchTitleBar,
        setSearchTitleBar,
        searchByCategory,
        setSearchByCategory,
        totalPriceOfProducts,
        updateTotalPriceOfProducts,
        user,
        setUser,
        cleanTitlebarState,
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
}

export { ShoppingCartProvider, ShoppingCartContext };
