import { createBrowserRouter } from "react-router-dom";
import MainPage from "../pages/MainPage";
import SignUpPage from "../pages/SignUpPage";
import LogInPage from "../pages/LogInPage";
import Navbar from "../components/Navbar";
import RequireAuth from "./RequireAuth";
import ProfilePage from "../pages/ProfilePage";
import ShoppingCartPage from "../pages/ShoopingCartPage";


export const router = createBrowserRouter([
    {
        Component: Navbar,
        children: [
            {index: true, Component: MainPage},

            {
                Component: RequireAuth,
                children: [
                    {path: "/profile", Component: ProfilePage},
                    {path: "/my-cart", Component: ShoppingCartPage}
                ]
            },

            {path: "/sign-up", Component: SignUpPage},
            {path: "/log-in", Component: LogInPage}
        ]
    }
])