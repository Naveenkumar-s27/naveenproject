const mongoose = require("mongoose");
require("dotenv").config();

const Product = require("./models/Product");

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));


const products = [
  {
    name: "Container",
    description: "Fresh Container",
    price: 120,
    image: "/products/container.jpeg",
  },
  {
    name: "Egg",
    description: "Organic Egg",
    price: 80,
    image: "/products/egg.jpeg",
  },
  {
    name: "Green Pea",
    description: "Fresh Green Pea",
    price: 60,
    image: "/products/greenpea.jpeg",
  },
  {
    name: "Leek",
    description: "Healthy Leek",
    price: 50,
    image: "/products/leek.jpg",
  },
  {
    name: "Lemon",
    description: "Fresh Lemon",
    price: 40,
    image: "/products/lemon.jpeg",
  },
  {
    name: "Lime",
    description: "Organic Lime",
    price: 35,
    image: "/products/lime.jpg",
  },
  {
    name: "Tomatos",
    description: "Farm Fresh Tomatos",
    price: 55,
    image: "/products/tomatos.jpg",
  },
  {
    name: "Zuccini",
    description: "Fresh Zuccini",
    price: 90,
    image: "/products/zuccini.jpg",
  }
];

const seedData = async () => {
  try {
    await Product.deleteMany();
    await Product.insertMany(products);

    console.log("Products Added");

    mongoose.connection.close();
  } catch (error) {
    console.log(error);
    mongoose.connection.close();
  }
};

seedData();