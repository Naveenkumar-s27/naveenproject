import React, { useState, useEffect } from "react";
import styles from "./ShopPage.module.css";
import { ChevronsRight, ChevronsLeft, Heart, ShoppingCart, Share2 } from "lucide-react";
import { products } from "../lib/Products";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import UserHeader from "../Components/user/UserHeader.jsx";
import Cart from "../Components/user/Cart.jsx";
import Wishlist from "../Components/user/Wishlist.jsx";
import Nav from "../Components/Nav.jsx";
import Fotter from "../Components/Fotter.jsx";
import { useSearch } from "@tanstack/react-router";

const ShopPage = () => {
  const searchParams = useSearch({ strict: false });
  const urlQuery = searchParams?.q || "";

  const [searchTerm, setSearchTerm] = useState(urlQuery);
  const [sortOption, setSortOption] = useState("default");
  const [currentPage, setCurrentPage] = useState(1);
  const { addToCart } = useCart();
  const { toggleWishlist, isLiked } = useWishlist();

  const productsPerPage = 9;

  const filtered = products
    .filter((p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      const aP = parseFloat(a.price.replace("$",""));
      const bP = parseFloat(b.price.replace("$",""));
      if (sortOption === "priceLow") return aP - bP;
      if (sortOption === "priceHigh") return bP - aP;
      return 0;
    });

  const totalPages = Math.ceil(filtered.length / productsPerPage);
  const indexOfFirst = (currentPage - 1) * productsPerPage;
  const currentProducts = filtered.slice(indexOfFirst, indexOfFirst + productsPerPage);

  useEffect(() => { setCurrentPage(1); }, [searchTerm, sortOption]);

  return (
    <>
      <Nav />
      <UserHeader onSearch={(val) => setSearchTerm(val)} />
      <Cart />
      <Wishlist />

      <div className={styles["shop-container"]}>
        <h1 className={styles["shop-title"]}>Shop</h1>

        <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"20px",flexWrap:"wrap",gap:"10px" }}>
          <p className={styles["product-count"]}>
            Showing {filtered.length === 0 ? 0 : indexOfFirst + 1}–{Math.min(indexOfFirst + productsPerPage, filtered.length)} of {filtered.length} products
            {searchTerm && <span style={{ color:"#006f1b",marginLeft:"6px" }}>for "{searchTerm}"</span>}
          </p>
          <div className={styles["sort-options"]}>
            <label className={styles["sort-label"]}>Sort by:</label>
            <select value={sortOption} onChange={(e) => setSortOption(e.target.value)} className={styles["sort-dropdown"]}>
              <option value="default">Default</option>
              <option value="priceHigh">Price (High to Low)</option>
              <option value="priceLow">Price (Low to High)</option>
            </select>
          </div>
        </div>

        {filtered.length === 0 && (
          <div style={{ textAlign:"center",padding:"60px 0",color:"#888" }}>
            <p style={{ fontSize:"18px" }}>No products found for "{searchTerm}"</p>
            <button onClick={() => setSearchTerm("")} style={{ marginTop:"12px",padding:"10px 20px",background:"#006f1b",color:"white",border:"none",borderRadius:"6px",cursor:"pointer" }}>Clear Search</button>
          </div>
        )}

        <div className={styles["product-grid"]}>
          {currentProducts.map((product) => (
            <div className={styles["product-card"]} key={product.id}>
              {/* ❤️ Wishlist toggle — uses WishlistContext */}
              <div className={styles["wishlist-icon"]} onClick={() => toggleWishlist(product)} style={{ cursor:"pointer" }}>
                <Heart size={24} className={isLiked(product.id) ? styles.filledHeart : styles.emptyHeart} />
              </div>

              {/* 🛒 Cart icon */}
              <div className={styles.cart} onClick={() => addToCart(product)} title="Add to cart" style={{ cursor:"pointer" }}>
                <ShoppingCart size={26} />
              </div>

              <div className={styles.share}><Share2 size={24} /></div>

              <div className={styles["image-wrapper"]}>
                <img src={product.image} alt={product.name} />
                <h3>{product.name}</h3>
                <label>{product.description}</label>
                <p>{product.price}</p>
                <button className={styles["add-to-cart"]} onClick={() => addToCart(product)}>
                  Buy Now
                </button>
              </div>
            </div>
          ))}
        </div>

        {totalPages > 1 && (
          <div className={styles.pagination}>
            <button onClick={() => setCurrentPage((p) => p - 1)} disabled={currentPage === 1}><ChevronsLeft /></button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button key={page} onClick={() => setCurrentPage(page)}
                style={{ background: currentPage===page ? "#006f1b":"#e8f5e9", color: currentPage===page?"white":"#333", fontWeight: currentPage===page?700:400 }}>
                {page}
              </button>
            ))}
            <button onClick={() => setCurrentPage((p) => p + 1)} disabled={currentPage === totalPages}><ChevronsRight /></button>
          </div>
        )}
      </div>
      <Fotter />
    </>
  );
};

export default ShopPage;