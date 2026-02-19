import React from "react";
import CoursesGrid from "../courses/CourseGrid";

const CoursesPage = ({ addToCart, cartItems, coursesData }) => {
  // Debug check
  console.log("Courses Data Received:", coursesData);

  // Ensure we always work with an array
  const data = coursesData && coursesData.length > 0 ? coursesData : [];

  return (
    <div style={{ padding: "40px" }}>
      <h1>All Courses</h1>
      <p>Browse our available courses and start learning today.</p>

      {/* Show Courses */}
      {data.length > 0 ? (
        <CoursesGrid
          courses={data}
          addToCart={addToCart}
          cartItems={cartItems}
        />
      ) : (
        <p style={{ color: "#999", marginTop: "20px" }}>
          No courses available right now.
        </p>
      )}
    </div>
  );
};

export default CoursesPage;
