const Order = require("../models/Order");
const Cart = require("../models/Cart");

const createOrder = async (req, res) => {
  try {
    const userId = req.user.id;

    const cartItems = await Cart.findAll({ where: { userId } });

    if (cartItems.length === 0) {
      return res.status(400).json({ success: false, message: "Cart is empty" });
    }

    const courseIds = cartItems.map((item) => item.courseId);
    const totalPrice = await calculateTotal(courseIds);

    const order = await Order.create({
      userId,
      courseIds,
      totalPrice,
      status: "completed",
    });

    // Clear cart after order
    await Cart.destroy({ where: { userId } });

    res.status(201).json({ success: true, data: order });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const getOrders = async (req, res) => {
  try {
    const userId = req.user.id;

    const orders = await Order.findAll({ where: { userId } });
    res.status(200).json({ success: true, data: orders });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const getOrderById = async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id);

    if (!order || order.userId !== req.user.id) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }

    res.status(200).json({ success: true, data: order });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const calculateTotal = async (courseIds) => {
  const Course = require("../models/Course");
  const courses = await Course.findAll({ where: { id: courseIds } });
  return courses.reduce((sum, course) => sum + parseFloat(course.price), 0);
};

module.exports = { createOrder, getOrders, getOrderById };
