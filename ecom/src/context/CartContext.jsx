import React, { createContext, useContext, useState, useEffect } from "react";

const API_URL = "http://localhost:5001/api";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // ============================
  // Fetch Cart
  // ============================
  const fetchCart = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setCartItems([]);
      return;
    }

    try {
      const res = await fetch(`${API_URL}/cart`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();

      if (data.success) {
        setCartItems(data.data || []);
      }
    } catch (err) {
      console.error("Error fetching cart:", err);
    }
  };

  useEffect(() => {
    let ignore = false;
  
    const loadCart = async () => {
      if (ignore) return;
      await fetchCart();
    };
  
    loadCart();
  
    return () => {
      ignore = true;
    };
  }, []);
  

  // ============================
  // Add To Cart
  // ============================
  const addToCart = async (course) => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first");
      return;
    }

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
        fetchCart();
      }
    } catch (err) {
      console.error("Error adding to cart:", err);
    }
  };

  // ============================
  // Remove From Cart
  // ============================
  const removeFromCart = async (courseId) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const res = await fetch(`${API_URL}/cart/${courseId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();

      if (data.success) {
        fetchCart();
      }
    } catch (err) {
      console.error("Error removing from cart:", err);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        fetchCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }
  return context;
};
