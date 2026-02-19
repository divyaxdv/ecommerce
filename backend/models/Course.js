const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Course = sequelize.define(
  "Course",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    instructor: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    duration: {
      type: DataTypes.STRING,
    },
    level: {
      type: DataTypes.ENUM("Beginner", "Intermediate", "Advanced"),
    },
    thumbnail: {
      type: DataTypes.STRING,
    },
    syllabus: {
      type: DataTypes.JSON,
      defaultValue: [],
    },
    rating: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
    },
    studentsEnrolled: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = Course;
