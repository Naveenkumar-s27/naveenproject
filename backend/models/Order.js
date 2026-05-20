const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  orderItems: [
    {
      name: String,
      qty: Number,
      image: String,
      price: Number,
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
      }
    }
  ],

  totalPrice: {
    type: Number,
    required: true
  },

  status: {
    type: String,
    default: "Pending"
  }

}, {
  timestamps: true
});

module.exports = mongoose.model("Order", orderSchema);