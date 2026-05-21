const express = require("express");
const mongoose = require("mongoose");
const productRoutes = require("./routes/productRoutes");
const cors = require("cors");
require("dotenv").config();

const app = express();

// ✅ Fix: Allow Vercel frontend URL
app.use(cors({
  origin: [
    "http://localhost:5173",
    "http://localhost:3000",
    "https://naveenproject-one.vercel.app",
  ],
  credentials: true,
}));

app.use(express.json());
app.use("/api/products", productRoutes);

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("V-Mart API Running ✅");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));