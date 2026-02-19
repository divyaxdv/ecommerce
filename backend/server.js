require("dotenv").config();
const express = require("express");
const cors = require("cors");
const sequelize = require("./config/database");
const errorHandler = require("./middleware/errorHandler");

// Import models to register associations
require("./models/User");
require("./models/Course");
require("./models/Cart");
require("./models/Order");

// Import routes
const authRoutes = require("./routes/auth");
const courseRoutes = require("./routes/courses");
const cartRoutes = require("./routes/cart");
const orderRoutes = require("./routes/orders");

const app = express();

// Middleware
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  }),
);
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);

// Health check
app.get("/api/health", (req, res) => {
  res.status(200).json({ success: true, message: "Server is running" });
});

// Error handler (must be last)
app.use(errorHandler);

// Sync database and start server
const PORT = process.env.PORT || 5001;

sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("Database synced successfully");
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to sync database:", err);
    process.exit(1);
  });
