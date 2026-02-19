import React from "react";
import "./CartPage.css";

const CartPage = ({ cartItems, cartOpen, setCartOpen, removeFromCart }) => {
  // ✅ Total Price Calculation (safe numeric conversion)
  const totalPrice = cartItems.reduce((sum, item) => {
    const price = Number(item.Course?.price || item.price || 0);
    return sum + price;
  }, 0);

  // ✅ Remove handler (expects courseId)
  const handleRemove = (courseId) => {
    removeFromCart(courseId);
  };

  return (
    <div className={`cart-page ${cartOpen ? "open" : ""}`}>
      
      {/* Close Button */}
      {setCartOpen && (
        <button
          className="cart-close-btn"
          onClick={() => setCartOpen(false)}
        >
          ✕
        </button>
      )}

      <h1 className="cart-title">Your Cart</h1>

      {/* Layout Wrapper */}
      <div className="cart-container">
        
        {/* LEFT SIDE - Items */}
        <div className="cart-items">
          {cartItems.length === 0 ? (
            <p className="empty-cart-text">Your cart is empty</p>
          ) : (
            cartItems.map((item) => {
              // Backend format: item.Course holds course details
              const course = item.Course || {};

              const title = course.title || "Untitled Course";
              const price = Number(course.price || 0);
              const thumbnail = course.thumbnail || "";
              
              // ✅ This is what backend expects for delete
              const courseId = item.courseId;

              return (
                <div key={courseId} className="cart-item">
                  <img src={thumbnail} alt={title} />

                  <div className="cart-item-info">
                    <h3>{title}</h3>
                    <p>${price}</p>
                  </div>

                  {/* ✅ Remove must send courseId */}
                  <button
                    className="remove-btn"
                    onClick={() => handleRemove(courseId)}
                  >
                    Remove
                  </button>
                </div>
              );
            })
          )}
        </div>

        {/* RIGHT SIDE - Summary */}
        <div className="cart-summary">
          <h2>Total: ${totalPrice.toFixed(2)}</h2>

          <button className="checkout-btn">
            Proceed to Checkout
          </button>
        </div>

      </div>
    </div>
  );
};

export default CartPage;
