import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { coursesData } from "../courses/CourseData";
import "./CourseDetail.css";
import { useCart } from "../../context/CartContext";

const CourseDetail = ({ courses}) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const courseId = Number(id);
  const data = courses && courses.length ? courses : coursesData;
  const course = data.find((c) => c.id === courseId);
  const { addToCart, cartItems } = useCart();
  const handleBuy=() => {
    addToCart(course);
  }

  if (!course) {
    return (
      <div style={{ padding: "40px" }}>
        <h2>Course not found</h2>
        <button onClick={() => navigate(-1)} className="buy-button" style={{ marginTop: 12 }}>
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="course-detail">
      <img className="course-thumb" src={course.thumbnail} alt={course.title} />
      <div className="course-info">
        <h1 className="course-title">{course.title}</h1>
        <p className="course-instructor">Instructor: {course.instructor}</p>
        <p className="course-price">Price: ${course.price}</p>
        <p><strong>Duration:</strong> {course.duration} &nbsp; <strong>Level:</strong> {course.level}</p>
        <p><strong>Rating:</strong> {course.rating} ({course.studentsEnrolled} students)</p>

        <h3>Description</h3>
        <p>{course.description}</p>

        <h3>Syllabus</h3>
        <ul>
          {Array.isArray(course.syllabus) && course.syllabus.map((s, idx) => <li key={idx}>{s}</li>)}
        </ul>

        <div style={{ marginTop: 16 }}>
          <button
            className="buy-button"
            onClick={ handleBuy}
          >
            {cartItems?.find((item) => item.id === course.id) ? 'Cart Added' : 'Buy'}
          </button>
          <button
            style={{ marginLeft: 12 }}
            className="buy-button"
            onClick={() => navigate(-1)}
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
