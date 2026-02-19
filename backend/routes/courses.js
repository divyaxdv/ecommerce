const express = require("express");
const {
  getAllCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
} = require("../controllers/courseController");
const { auth, adminAuth } = require("../middleware/auth");

const router = express.Router();

router.get("/", getAllCourses);
router.get("/:id", getCourseById);
router.post("/", auth, adminAuth, createCourse);
router.put("/:id", auth, adminAuth, updateCourse);
router.delete("/:id", auth, adminAuth, deleteCourse);

module.exports = router;
