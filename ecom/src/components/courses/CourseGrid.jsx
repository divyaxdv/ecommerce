import React from "react";
import CourseCard from "./CourseCard";
import "./CourseGrid.css";

const CoursesGrid = ({ courses }) => {
  return (
    <div className="courses-grid">
      {courses.map((course) => (
        <CourseCard key={course.id} course={course} />
      ))}
    </div>
  );
};

export default CoursesGrid;
