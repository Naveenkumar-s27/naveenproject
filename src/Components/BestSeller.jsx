import React, { useState } from "react";
import "./bestseller.css";
import Egg from "../assets/egg.jpeg";
import Lime from "../assets/lemon.jpeg";
import Pea from "../assets/greenpea.jpeg";
import Jars from "../assets/container.jpeg";

const initialProducts = [
  {
    id: 1,
    title: "Accusantium",
    image: Egg,
    label: "Sale",
    oldPrice: 50.0,
    price: 45.0,
    buttonText: "Add to cart",
  },
  {
    id: 2,
    title: "assumenda est, omnis",
    image: Lime,
    label: "Sale",
    oldPrice: 70.0,
    price: 65.0,
    buttonText: "Add to cart",
  },
  {
    id: 3,
    title: "distinctio",
    image: Pea,
    label: "Sale",
    priceRange: "$99.00 – $499.00",
    buttonText: "Select options",
  },
  {
    id: 4,
    title: "et iusto odio",
    image: Jars,
    label: "Sale",
    oldPrice: 55.0,
    price: 52.0,
    buttonText: "Add to cart",
  },
];

const BestSeller = () => {
  const [products, setProducts] = useState(initialProducts);
  const [sortOrder, setSortOrder] = useState("default");

  const handleSortChange = (e) => {
    const value = e.target.value;
    setSortOrder(value);

    let sortedProducts = [...initialProducts];

    if (value === "lowToHigh") {
      sortedProducts.sort((a, b) => (a.price || 99999) - (b.price || 99999));
    } else if (value === "highToLow") {
      sortedProducts.sort((a, b) => (b.price || 0) - (a.price || 0));
    }

    setProducts(sortedProducts);
  };

  return (
    <div className="best-deals-container">
      <div className="header">
        <h1>Best Deals</h1>
        <p>Home / Best Deals</p>
      </div>

      <div className="nav">
        <p>Showing all 13 results</p>
        <div className="sort">
          <label htmlFor="sortSelect">Sort By:</label>
          <select id="sortSelect" value={sortOrder} onChange={handleSortChange}>
            <option value="default">Default sorting</option>
            <option value="lowToHigh">Price: Low to High</option>
            <option value="highToLow">Price: High to Low</option>
          </select>
        </div>
      </div>

      <div className="product-grid">
        {products.map((product) => (
          <div className="product-card" key={product.id}>
            <span className="sale-label">{product.label}</span>
            <img src={product.image} alt={product.title} />
            <p className="category">Best Deals</p>
            <h3>{product.title}</h3>
            <div className="price">
              {product.oldPrice && (
                <span className="old-price">
                  ${product.oldPrice.toFixed(2)}
                </span>
              )}
              {product.price && (
                <span className="new-price">${product.price.toFixed(2)}</span>
              )}
              {product.priceRange && (
                <span className="new-price">{product.priceRange}</span>
              )}
            </div>
            <button>{product.buttonText}</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BestSeller;
