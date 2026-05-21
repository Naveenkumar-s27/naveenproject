import {
  createRootRoute,
  createRoute,
  createRouter,
  Outlet,
  redirect,
} from "@tanstack/react-router";

import WelcomePage from "./pages/WelcomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Home from "./pages/Home";
import ShopPage from "./pages/ShopPage";
import CheckoutPage from "./pages/CheckoutPage";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";

/* ADD THESE */
import Cart from "./Components/user/Cart";
import Wishlist from "./Components/user/Wishlist";
import PaymentPage from "./pages/PaymentPage";

const requireAuth = () => {
  if (!localStorage.getItem("vmart_session")) {
    throw redirect({ to: "/login" });
  }
};

const requireAdmin = () => {
  if (!localStorage.getItem("vmart_admin_session")) {
    throw redirect({ to: "/admin" });
  }
};

const rootRoute = createRootRoute({
  component: () => <Outlet />,
});

const welcomeRoute = createRoute({
  path: "/",
  component: WelcomePage,
  getParentRoute: () => rootRoute,
});

const loginRoute = createRoute({
  path: "/login",
  component: LoginPage,
  getParentRoute: () => rootRoute,
});

const registerRoute = createRoute({
  path: "/register",
  component: RegisterPage,
  getParentRoute: () => rootRoute,
});

const adminRoute = createRoute({
  path: "/admin",
  component: AdminLogin,
  getParentRoute: () => rootRoute,
});

const homeRoute = createRoute({
  path: "/home",
  component: Home,
  getParentRoute: () => rootRoute,
  beforeLoad: requireAuth,
});

const shopRoute = createRoute({
  path: "/shop",
  component: ShopPage,
  getParentRoute: () => rootRoute,
  beforeLoad: requireAuth,
  validateSearch: (s) => ({
    q: s.q ? String(s.q) : "",
  }),
});

const checkoutRoute = createRoute({
  path: "/checkout",
  component: CheckoutPage,
  getParentRoute: () => rootRoute,
  beforeLoad: requireAuth,
});

/* ADD CART ROUTE */
const cartRoute = createRoute({
  path: "/cart",
  component: Cart,
  getParentRoute: () => rootRoute,
  beforeLoad: requireAuth,
});

/* ADD WISHLIST ROUTE */
const wishlistRoute = createRoute({
  path: "/wishlist",
  component: Wishlist,
  getParentRoute: () => rootRoute,
  beforeLoad: requireAuth,
});

/* ADD PAYMENT ROUTE */
const paymentRoute = createRoute({
  path: "/payment",
  component: PaymentPage,
  getParentRoute: () => rootRoute,
  beforeLoad: requireAuth,
});

const dashboardRoute = createRoute({
  path: "/admin/dashboard",
  component: AdminDashboard,
  getParentRoute: () => rootRoute,
  beforeLoad: requireAdmin,
});

export const router = createRouter({
  routeTree: rootRoute.addChildren([
    welcomeRoute,
    loginRoute,
    registerRoute,
    homeRoute,
    shopRoute,
    checkoutRoute,

    /* ADD THESE */
    cartRoute,
    wishlistRoute,
    paymentRoute,

    adminRoute,
    dashboardRoute,
  ]),
});