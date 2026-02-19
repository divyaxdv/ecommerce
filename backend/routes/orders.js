const express = require("express");
const {
  createOrder,
  getOrders,
  getOrderById,
} = require("../controllers/orderController");
const { auth } = require("../middleware/auth");

const router = express.Router();

router.post("/create", auth, createOrder);
router.get("/", auth, getOrders);
router.get("/:id", auth, getOrderById);

module.exports = router;
