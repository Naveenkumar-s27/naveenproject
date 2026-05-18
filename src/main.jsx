import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider }   from "@tanstack/react-router";
import { router }           from "./router";
import { AuthProvider }     from "./context/AuthContext";
import { AdminProvider }    from "./context/AdminContext";
import { CartProvider }     from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";
import { OrdersProvider }   from "./context/OrdersContext";
import { RatingsProvider }  from "./context/RatingsContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <AdminProvider>
        <CartProvider>
          <WishlistProvider>
            <OrdersProvider>
              <RatingsProvider>
                <RouterProvider router={router} />
              </RatingsProvider>
            </OrdersProvider>
          </WishlistProvider>
        </CartProvider>
      </AdminProvider>
    </AuthProvider>
  </React.StrictMode>
);