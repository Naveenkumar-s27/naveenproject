import React, { useEffect, useState } from "react";
import { ShoppingCart } from "lucide-react"; // lucide-react icon

const getcardStyles = (isMobile) => ({
  container: {
    border: "1px solid #ddd",
    borderRadius: "12px",
    overflow: "hidden",
    maxWidth: isMobile ? "90%" : "300px",
    backgroundColor: "white",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    transition: "transform 0.3s ease",
    margin: isMobile ? "1rem auto" : "0",
    position: "relative",
  },
  label: {
    position: "absolute",
    top: "0.5rem",
    left: "0.5rem",
    backgroundColor: "#28a745",
    color: "white",
    padding: "0.2rem 0.5rem",
    borderRadius: "990px",
    fontSize: "0.8rem",
    fontFamily: "Poppins, san-serif",
    zIndex: 1,
  },
  image: {
    width: "100%",
    height: isMobile ? "150px" : "200px",
    objectFit: "cover",
  },
  info: {
    padding: "0.5rem",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
  },
  ratingrow: {
    textAlign: "left",
    fontSize: isMobile ? "0.8rem" : "1rem",
    fontFamily: "Poppins, san-serif",
    gap: "0.5px",
    marginBottom: "0.25px",
  },
  reviewCount: {
    fontSize: isMobile ? "0.7rem" : "0.9rem",
    fontFamily: "Poppins, san-serif",
    color: "#666",
    textAlign: "left",
  },
  name: {
    fontSize: isMobile ? "1rem" : "1.2rem",
    fontFamily: "Poppins, algeria",
    marginBottom: "1px",
    textAlign: "left",
  },
  description: {
    fontSize: isMobile ? "0.8rem" : "0.9rem",
    fontFamily: "Poppins, algeria",
    color: "#666",
    textAlign: "left",
    bottom: "2px",
  },
  priceContainer: {
    display: "flex",
    alignItems: "center",
    gap: "1px",
  },
  price: {
    fontWeight: "1000",
    fontFamily: "Poppins, san-serif",
    textAlign: "left",
    color: "#28a745",
    bottom: "0.5rem",
    left: "1rem",
    fontSize: isMobile ? "1.2rem" : "1.5rem",
    gap: "1px",
  },
  strikePrice: {
    textDecoration: "line-through",
    color: "#999",
    fontSize: isMobile ? "0.8rem" : "1rem",
    fontFamily: "Poppins, san-serif",
  },
  button: {
    position: "absolute",
    bottom: "0.4rem",
    right: "1rem",
    marginTop: "0.5rem",
    padding: isMobile ? "0.4rem 0.8rem" : "0.5rem 1rem",
    backgroundColor: "rgb(23, 163, 73)",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
    fontSize: isMobile ? "0.8rem" : "1rem",
  },
});

const ProductCard = ({
  name,
  description,
  image,
  price,
  rating,
  actualPrice = null,
  review = 0,
  label,
}) => {
  const [isMobile, setisMobile] = useState(window.innerWidth < 600);

  useEffect(() => {
    const handleResize = () => {
      setisMobile(window.innerWidth < 600);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const cardStyles = getcardStyles(isMobile);

  return (
    <div
      style={cardStyles.container}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "scale(1.03)";
        e.currentTarget.style.boxShadow = "0 6px 10px rgba(0, 0, 0, 0.15)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "scale(1)";
        e.currentTarget.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)";
      }}
    >
      <img src={image} alt={name} style={cardStyles.image} />
      <div style={cardStyles.label}>{label}</div>
      <div style={cardStyles.info}>
        <div style={cardStyles.ratingrow}>
          <span style={{ marginRight: "4px" }}>⭐ {rating}</span>
          <span style={{ color: "#666" }}>({review})</span>
        </div>
        <h3 style={cardStyles.name}>{name}</h3>
        <p style={cardStyles.description}>{description}</p>
        <div style={cardStyles.priceContainer}>
          <div style={cardStyles.price}>
            <span style={{ marginRight: "4px" }}>${price}</span>
          </div>
          {actualPrice && (
            <span style={cardStyles.strikePrice}>${actualPrice}</span>
          )}
        </div>
        <button
          style={cardStyles.button}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = "rgb(16, 125, 54)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = "rgb(23, 163, 73)")
          }
        >
          <ShoppingCart
            size={18}
            style={{ textAlign: "center", marginRight: "1rem" }}
          />
          Add
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
