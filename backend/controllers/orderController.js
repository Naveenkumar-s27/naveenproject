const Order = require("../models/Order");

exports.createOrder = async (req, res) => {

  try {

    const order = new Order(req.body);

    const savedOrder = await order.save();

    res.status(201).json(savedOrder);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};

exports.getOrders = async (req, res) => {

  try {

    const orders = await Order.find().populate("user");

    res.json(orders);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};