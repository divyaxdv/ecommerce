const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./User");
const Course = require("./Course");

const Cart = sequelize.define(
  "Cart",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
    courseId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Course,
        key: "id",
      },
    },
  },
  {
    timestamps: true,
  },
);

Cart.belongsTo(User, { foreignKey: "userId" });
Cart.belongsTo(Course, { foreignKey: "courseId" });
User.hasMany(Cart, { foreignKey: "userId" });
Course.hasMany(Cart, { foreignKey: "courseId" });

module.exports = Cart;
