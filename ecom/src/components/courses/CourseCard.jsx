import React from "react";
import { Link } from "react-router-dom";
import "./CourseCard.css";
import { useCart } from "../../context/CartContext";

const CourseCard = ({ course}) => {
  //const [isAdded, setIsAdded] = React.useState(false);
  const { addToCart, cartItems } = useCart();
  const handleAddToCart = () => {
    //setIsAdded((prev) => !prev); 
    //if(cartItems.find((item) => item.id === course.id)) {
    addToCart(course);

    };


  return (
    <div className="course-card">
      {/* Course Thumbnail */}
      <img
        src={course.thumbnail}
        alt={course.title}
        className="course-image"
      />

      {/* Course Info */}
      <div className="course-content">
        <h3 className="course-title">{course.title}</h3>

        <p className="course-instructor">
          By <span>{course.instructor}</span>
        </p>

        <p className="course-price">${course.price}</p>

        <div className="course-actions">
          <Link to={`/courses/${course.id}`} className="course-btn">View Details</Link>
          <button
  className="course-addbtn"
  aria-label="Add to cart"
  onClick={handleAddToCart}
>
  {cartItems?.find((item) => item.courseId === course.id)
    ? "✔️"
    : "🛒"}
</button>

        </div>
      </div>
    </div>
  );
};

export default CourseCard;
