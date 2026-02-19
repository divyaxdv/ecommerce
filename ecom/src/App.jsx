import React, { useState, useEffect } from "react";
import Navbar from "./components/layouts/Navbar";
import CoursesPage from "./components/page/CoursePage";
import CourseDetail from "./components/page/CourseDetail";

import { Routes, Route } from "react-router-dom";

const API_URL = "http://localhost:5001/api";

function App() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  // ============================
  // Fetch Courses
  // ============================
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch(`${API_URL}/courses`);
        const data = await res.json();

        if (data.success) {
          setCourses(data.data);
        }
      } catch (err) {
        console.error("Error fetching courses:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  // ============================
  // Search Courses
  // ============================
  const searchCourse = async (searchTerm) => {
    try {
      const url =
        searchTerm.trim() === ""
          ? `${API_URL}/courses`
          : `${API_URL}/courses?title=${searchTerm}`;

      const res = await fetch(url);
      const data = await res.json();

      if (data.success) {
        setCourses(data.data);
      }
    } catch (err) {
      console.error("Error searching courses:", err);
    }
  };

  return (
    <>
      {/* Navbar */}
      <Navbar searchCourse={searchCourse} />

      <Routes>
        <Route
          path="/"
          element={
            loading ? (
              <div style={{ padding: "40px", textAlign: "center" }}>
                Loading courses...
              </div>
            ) : (
              <CoursesPage coursesData={courses} />
            )
          }
        />

        <Route
          path="/courses/:id"
          element={<CourseDetail courses={courses} />}
        />
      </Routes>
    </>
  );
}

export default App;
