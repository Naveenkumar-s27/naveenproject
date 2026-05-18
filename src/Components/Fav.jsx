import React from "react";
import "./Fav.css";

const products = [
  {
    name: "Organic Apples",
    price: "$100.00–$450.00",
    image: "https://funkimunki.com.au/wp-content/uploads/2023/06/20003616_1.jpg",
    sale: true,
  },
  {
    name: "Voluptatem",
    price: "$410.00",
    image: "https://i0.wp.com/b2bgrocery.in/wp-content/uploads/2020/06/fruit-juices.png?resize=320%2C320&ssl=1",
    sale: true,
  },
  {
    name: "Organic Corn",
    price: "$100.00–$320.00",
    image: "https://th.bing.com/th/id/OIP.UsHmD0Lk3tzwS8727oY4SgHaHa?r=0&rs=1&pid=ImgDetMain",
  },
  {
    name: "et iusto odio",
    price: "$55.00 $52.00",
    image: "https://m.media-amazon.com/images/I/71K1TEFxzUL._UF350,350_QL80_.jpg",
    sale: true,
    originalPrice: "$55.00",
    discountedPrice: "$52.00",
  },
  {
    name: "Ut perspiciatis",
    price: "$400.00",
    image: "https://150698241.v2.pressablecdn.com/organic-food/wp-content/uploads/sites/253/2021/10/image-11-300x300.png",
  },
  {
    name: "Facere possimus",
    price: "$120.00",
    image: "https://img.freepik.com/free-vector/mojito-cocktail-realistic_1284-3884.jpg",
  },
  {
    name: "Omnis iste natus",
    price: "$40.00–$300.00",
    image: "https://th.bing.com/th/id/OIP.PikA_RyqWWsihDDtuqJf2AHaHa?r=0&w=1000&h=1000&rs=1&pid=ImgDetMain",
  },
  {
    name: "Organic Peas",
    price: "$17.00",
    image: "https://png.pngtree.com/png-vector/20240528/ourmid/pngtree-wicker-basket-overflowing-with-fresh-green-peas-png-image_12518017.png",
  },
  {
    name: "Assumenda est",
    price: "$150.00",
    image: "https://png.pngtree.com/png-vector/20240528/ourmid/pngtree-three-bottles-of-juice-with-fruits-and-berries-on-a-transparent-png-image_12512902.png",
  },
];

const OrganicFoods = () => {
  return (
    <div className="organic-foods">
      <h2>Our Favorite Organic Foods</h2>
      <div className="product-grid">
        {products.map((item, index) => (
          <div className="product-card" key={index}>
            {item.sale && <div className="sale-badge">Sale</div>}
            <img src={item.image} alt={item.name} />
            <h4>{item.name}</h4>
            <p className="price">
              {item.originalPrice ? (
                <>
                  <span className="strikethrough">{item.originalPrice}</span>{" "}
                  <span className="discount">{item.discountedPrice}</span>
                </>
              ) : (
                <span>{item.price}</span>
              )}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrganicFoods;