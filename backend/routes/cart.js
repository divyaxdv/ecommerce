const express = require("express");
const {
  addToCart,
  removeFromCart,
  getCart,
} = require("../controllers/cartController");
const { auth } = require("../middleware/auth");

const router = express.Router();

router.post("/add", auth, addToCart);
router.delete("/:courseId", auth, removeFromCart);
router.get("/", auth, getCart);

module.exports = router;
