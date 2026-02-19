const Cart = require("../models/Cart");
const Course = require("../models/Course");

const addToCart = async (req, res) => {
  try {
    const { courseId } = req.body;
    const userId = req.user.id;

    const existingItem = await Cart.findOne({ where: { userId, courseId } });
    if (existingItem) {
      return res
        .status(400)
        .json({ success: false, message: "Already in cart" });
    }

    const course = await Course.findByPk(courseId);
    if (!course) {
      return res
        .status(404)
        .json({ success: false, message: "Course not found" });
    }

    const cartItem = await Cart.create({ userId, courseId });
    res.status(201).json({ success: true, data: cartItem });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const removeFromCart = async (req, res) => {
  try {
    const { courseId } = req.params;
    const userId = req.user.id;

    const result = await Cart.destroy({ where: { userId, courseId } });

    if (result === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Cart item not found" });
    }

    res.status(200).json({ success: true, message: "Removed from cart" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const getCart = async (req, res) => {
  try {
    const userId = req.user.id;

    const cartItems = await Cart.findAll({
      where: { userId },
      include: [
        { model: Course, attributes: ["id", "title", "price", "thumbnail"] },
      ],
    });

    const total = cartItems.reduce(
      (sum, item) => sum + parseFloat(item.Course.price),
      0,
    );

    res.status(200).json({ success: true, data: cartItems, total });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = { addToCart, removeFromCart, getCart };
