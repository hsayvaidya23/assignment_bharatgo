import {
  ArchiveBoxIcon,
  ShoppingCartIcon,
  UserCircleIcon,
  UserIcon,
  ArrowRightOnRectangleIcon
} from "@heroicons/react/24/solid";
import { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { ShoppingCartContext } from "../contexts";
import GoogleSignIn from "./GoogleSignIn/GoogleSignIn";
import { auth, signOut } from '../firebase/firebase'

function Navbar() {
  const activeStyle = "underline underline-offset-8";
  const context = useContext(ShoppingCartContext);
  const [userMenuIsActive, setUserMenuIsActive] = useState(false);

  const closeEverything = () => {
    context.closeCheckOutSideMenu();
    context.closeProductDetail();
    setUserMenuIsActive(false);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth); 
      context.setUser(null);
      localStorage.removeItem('user'); 
      closeEverything();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <nav className="bg-white border-b-2 flex justify-between items-center fixed top-0 z-10 w-full py-5 px-8 text-sm font-light">
      <ul className="flex items-center gap-4">
        <li className="font-semibold text-lg hidden md:inline">
          <NavLink
            to="/"
            onClick={() => {
              context.cleanTitlebarState();
              context.setSearchByCategory("");
              closeEverything();
            }}
          >
            <p>Shopi</p>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/"
            onClick={() => {
              context.setSearchByCategory("");
              closeEverything();
            }}
            className={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            <p>All</p>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/clothes"
            onClick={() => {
              context.setSearchByCategory("clothes");
              closeEverything();
            }}
            className={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            <p>Clothes</p>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/electronics"
            onClick={() => {
              context.setSearchByCategory("electronics");
              closeEverything();
            }}
            className={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            <p>Electronics</p>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/furnitures"
            onClick={() => {
              context.setSearchByCategory("furnitures");
              closeEverything();
            }}
            className={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            <p>Furnitures</p>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/toys"
            onClick={() => {
              context.setSearchByCategory("toys");
              closeEverything();
            }}
            className={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            <p>Toys</p>
          </NavLink>
        </li>
      </ul>

      <ul className="items-center gap-4 hidden md:flex">
        {context.user ? (
          <>
            <li className="flex items-center gap-2">
              <img
                src={context.user.photoURL || "/default-avatar.png"}
                alt={context.user.displayName || "User"}
                className="w-8 h-8 rounded-full"
              />
              <span>{context.user.displayName || "Guest"}</span>
            </li>
            <li>
              <NavLink
                to="/my-orders"
                onClick={() => {
                  context.cleanTitlebarState();
                  closeEverything();
                }}
                className={({ isActive }) => (isActive ? activeStyle : undefined)}
              >
                <p>My Orders</p>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/my-account"
                onClick={() => {
                  context.cleanTitlebarState();
                  closeEverything();
                }}
                className={({ isActive }) => (isActive ? activeStyle : undefined)}
              >
                <p>My Account</p>
              </NavLink>
            </li>
            <li>
              <p className="flex gap-2">
                <ShoppingCartIcon
                  onClick={() => {
                    context.cleanTitlebarState();
                    context.isCheckoutSideMenuOpen
                      ? context.closeCheckOutSideMenu()
                      : context.openCheckOutSideMenu();
                  }}
                  className="h-6 w-6 text-black-500 cursor-pointer"
                />
                {context.cartProducts.length}
              </p>
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 text-red-600 hover:text-red-800"
              >
                <ArrowRightOnRectangleIcon className="h-6 w-6" />
                Logout
              </button>
            </li>
          </>
        ) : (
          <li>
            <GoogleSignIn />
          </li>
        )}
      </ul>

      {/* Mobile Menu */}
      <ul className="md:hidden relative">
        <UserCircleIcon
          className="h-6 w-6 text-black-500 cursor-pointer"
          onClick={(event) => {
            context.cleanTitlebarState();
            setUserMenuIsActive(!userMenuIsActive);
            context.closeCheckOutSideMenu();
            context.closeProductDetail();
            event.stopPropagation();
          }}
        />
        <div
          className={`${
            userMenuIsActive ? "inline-block" : "hidden"
          } w-64 h-auto absolute bg-white border border-black rounded-lg right-0 p-2`}
        >
          <ul className="flex flex-col items-center w-full gap-4 py-2">
            {context.user ? (
              <>
                <li className="flex items-center gap-2 w-full">
                  <img
                    src={context.user.photoURL || "/default-avatar.png"}
                    alt={context.user.displayName || "User"}
                    className="w-8 h-8 rounded-full"
                  />
                  <span className="text-sm">{context.user.displayName || "Guest"}</span>
                </li>
                <li className="flex gap-2 w-full">
                  <ArchiveBoxIcon className="h-6 w-6 text-black-500" />
                  <NavLink
                    to="/my-orders"
                    onClick={() => {
                      context.cleanTitlebarState();
                      closeEverything();
                    }}
                    className={({ isActive }) => (isActive ? activeStyle : undefined)}
                  >
                    <p>My Orders</p>
                  </NavLink>
                </li>
                <li className="flex gap-2 w-full">
                  <UserIcon className="h-6 w-6 text-black-500" />
                  <NavLink
                    to="/my-account"
                    onClick={() => {
                      context.cleanTitlebarState();
                      closeEverything();
                    }}
                    className={({ isActive }) => (isActive ? activeStyle : undefined)}
                  >
                    <p>My Account</p>
                  </NavLink>
                </li>
                <li className="w-full">
                  <p className="flex gap-2">
                    <ShoppingCartIcon
                      onClick={() => {
                        context.cleanTitlebarState();
                        context.isCheckoutSideMenuOpen
                          ? context.closeCheckOutSideMenu()
                          : context.openCheckOutSideMenu();
                      }}
                      className="h-6 w-6 text-black-500 cursor-pointer"
                    />
                    {context.cartProducts.length}
                  </p>
                </li>
                <li className="w-full">
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 cursor-pointer text-red-600 hover:text-red-800"
                  >
                    <ArrowRightOnRectangleIcon className="h-6 w-6" />
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <li className="w-full">
                <GoogleSignIn />
              </li>
            )}
          </ul>
        </div>
      </ul>
    </nav>
  );
}

export default Navbar;
