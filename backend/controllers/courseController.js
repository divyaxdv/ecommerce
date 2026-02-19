const Course = require("../models/Course");

const getAllCourses = async (req, res) => {
  try {
    const { page = 1, limit = 10, title } = req.query;
    // getAllCourses?page=1&limit=10&title=javascript
    // getAllCourses. returns all
    const where = title
      ? { title: { [require("sequelize").Op.iLike]: `%${title}%` } }
      : {};

    const courses = await Course.findAndCountAll({
      where,
      limit: parseInt(limit),
      offset: (parseInt(page) - 1) * parseInt(limit),
    });

    res.status(200).json({
      success: true,
      data: courses.rows,
      total: courses.count,
      page: parseInt(page),
      pages: Math.ceil(courses.count / limit),
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const getCourseById = async (req, res) => {
  try {
    const course = await Course.findByPk(req.params.id);

    if (!course) {
      return res
        .status(404)
        .json({ success: false, message: "Course not found" });
    }

    res.status(200).json({ success: true, data: course });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const createCourse = async (req, res) => {
  try {
    const {
      title,
      description,
      instructor,
      price,
      duration,
      level,
      thumbnail,
      syllabus,
      rating,
      studentsEnrolled,
    } = req.body;

    if (!title || !description || !instructor || !price) {
      return res
        .status(400)
        .json({ success: false, message: "Required fields missing" });
    }

    const course = await Course.create({
      title,
      description,
      instructor,
      price,
      duration,
      level,
      thumbnail,
      syllabus,
      rating,
      studentsEnrolled,
    });

    res.status(201).json({ success: true, data: course });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const updateCourse = async (req, res) => {
  try {
    const course = await Course.findByPk(req.params.id);

    if (!course) {
      return res
        .status(404)
        .json({ success: false, message: "Course not found" });
    }

    await course.update(req.body);
    res.status(200).json({ success: true, data: course });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findByPk(req.params.id);

    if (!course) {
      return res
        .status(404)
        .json({ success: false, message: "Course not found" });
    }

    await course.destroy();
    res.status(200).json({ success: true, message: "Course deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = {
  getAllCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
};
