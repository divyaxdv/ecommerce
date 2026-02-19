import React, { useState, useEffect } from "react";
import Navbar from "./components/layouts/Navbar";
import CoursesPage from "./components/page/CoursePage";
import CourseDetail from "./components/page/CourseDetail";

import { Routes, Route } from "react-router-dom";

const API_URL = "http://localhost:5001/api";

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  // ============================
  // ✅ Fetch Courses from Backend
  // ============================
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch(`${API_URL}/courses`);
        const data = await res.json();

        if (data.success) {
          setCourses(data.data);
        } else {
          console.log("Courses API failed:", data.message);
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
  // ✅ Fetch Cart from Backend
  // ============================
  const fetchCart = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const res = await fetch(`${API_URL}/cart`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();

      if (data.success) {
        setCartItems(data.data);
      }
    } catch (err) {
      console.error("Error fetching cart:", err);
    }
  };

  // Fetch cart once when app loads
  useEffect(() => {
    fetchCart();
  }, []);

  // ============================
  // ✅ Add To Cart
  // ============================
  const addToCart = async (course) => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first");
      return;
    }

    // Prevent duplicates
    if (cartItems.find((item) => item.courseId === course.id)) {
      alert("Course already in cart");
      return;
    }

    try {
      const res = await fetch(`${API_URL}/cart/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ courseId: course.id }),
      });

      const data = await res.json();

      if (data.success) {
        alert("Added to cart ✅");

        // ✅ Refresh cart properly
        fetchCart();
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error("Error adding to cart:", err);
    }
  };

  // ============================
  // ✅ Remove From Cart
  // ============================
const removeFromCart = async (courseId) => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API_URL}/cart/${courseId}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });

  const data = await res.json();
  if (data.success) fetchCart();
};



  // ============================
  // ✅ Search Courses
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

  // ============================
  // ✅ Render
  // ============================
  return (
    <>
      {/* Navbar */}
      <Navbar
        cartItems={cartItems}
        removeFromCart={removeFromCart}
        searchCourse={searchCourse}
      />

      {/* Routes */}
      <Routes>
        {/* HOME PAGE */}
        <Route
          path="/"
          element={
            loading ? (
              <div style={{ padding: "40px", textAlign: "center" }}>
                Loading courses...
              </div>
            ) : (
              <CoursesPage
                addToCart={addToCart}
                cartItems={cartItems}
                coursesData={courses} // ✅ FIXED HERE
              />
            )
          }
        />

        {/* COURSE DETAIL PAGE */}
        <Route
          path="/courses/:id"
          element={
            <CourseDetail
              courses={courses}
              addToCart={addToCart}
              cartItems={cartItems}
            />
          }
        />
      </Routes>
    </>
  );
}

export default App;
