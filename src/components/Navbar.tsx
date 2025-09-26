import { useState, useContext } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { CartContext } from "../contexts/CartContext";
import CartIcon from "../assets/shoppingCart.svg?react";
import BagIcon from "../assets/bag-heart-fill.svg?react";
import MenuIcon from "../assets/list.svg?react"

export default function Navbar() {
  const { currentUser, logOut } = useAuth();
  const shoppingCart = useContext(CartContext);
  const [open, setOpen] = useState(false);

  const closeMenu = () => setOpen(false);

  const linkBase = "px-3 py-2 rounded-md transition hover:text-slate-800 hover:bg-amber-400";
  const active = "text-slate-800 bg-amber-400 border border-amber-300";
  const navLink = ({ isActive }: { isActive: boolean }) =>
    `${linkBase} ${isActive ? active : ""}`;

  return (
    <>
      <div className="bg-amber-300 h-[64px] md:h-[80px] px-3 md:px-12 sticky top-0 flex items-center justify-between shadow-md z-[100]">
        <header className="flex items-center gap-2 md:w-[200px]">
          <BagIcon className="text-slate-800 w-8 h-8 md:w-10 md:h-10" />
          <span className="inline text-xl">Heart Cart</span>
        </header>

        <nav className="hidden md:flex gap-5 items-center">
          <NavLink to="/" className={navLink}>
            Store
          </NavLink>
          <NavLink to="/profile" className={navLink}>
            Profile
          </NavLink>
        </nav>

        <div className="flex items-center gap-3 md:w-[200px] justify-end">
          <button
            onClick={() => setOpen((v) => !v)}
            className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-md border-2 border-slate-800 bg-amber-400 hover:bg-amber-500"
            aria-label="Open menu"
            aria-expanded={open}
            >
            <MenuIcon className="h-5 w-5"/>
          </button>

          {currentUser ? (
            <button
              onClick={logOut}
              className="md:inline-flex cursor-pointer bg-amber-400 px-3 py-2 rounded-md border-2 border-slate-800 hover:bg-amber-500"
            >
              Log Out
            </button>
          ) : (
            <NavLink
              to="/log-in"
              className="hidden md:inline-flex hover:text-slate-800 hover:bg-amber-400 px-3 py-2 rounded-md"
            >
              Log In
            </NavLink>
          )}

          {currentUser && (
            <NavLink to="/my-cart" aria-label="Open cart">
              <button className="relative rounded-full border-2 border-slate-800 bg-amber-400 cursor-pointer w-[44px] h-[44px] hover:bg-amber-500">
                <span className="absolute bg-red-500 text-white rounded-full w-5 h-5 -right-2 -top-2 text-xs flex items-center justify-center z-[10]">
                  {shoppingCart?.getTotalItems ?? 0}
                </span>
                <CartIcon className="m-auto text-slate-800 w-6 h-6" />
              </button>
            </NavLink>
          )}
        </div>
      </div>

      <div
        className={`md:hidden ${open ? "block" : "hidden"} fixed inset-0 z-[90]`}
      >
        <div
          className="absolute inset-0 bg-black/40"
          onClick={closeMenu}
          aria-hidden
        />
        <div className="absolute top-[64px] left-0 right-0 bg-amber-50 border-t border-amber-200 shadow-md">
          <nav className="flex flex-col p-4 gap-2">
            <NavLink to="/" className={navLink} onClick={closeMenu}>
              Store
            </NavLink>
            <NavLink to="/profile" className={navLink} onClick={closeMenu}>
              Profile
            </NavLink>

            <div className="h-px bg-amber-200 my-2" />

            {currentUser ? (
              <button
                onClick={() => {
                  closeMenu();
                  logOut();
                }}
                className="cursor-pointer bg-amber-400 px-3 py-2 rounded-md border-2 border-slate-800 hover:bg-amber-500 text-left"
              >
                Log Out
              </button>
            ) : (
              <NavLink
                to="/log-in"
                className={navLink}
                onClick={closeMenu}
              >
                Log In
              </NavLink>
            )}
          </nav>
        </div>
      </div>

      <main>
        <Outlet />
      </main>
    </>
  );
}
