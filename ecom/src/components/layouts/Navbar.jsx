import React, { useState} from "react";
import "./Navbar.css";
import SignupPage from "../page/SignupPage";  
import LoginPage from "../page/LoginPage"; 
import Cart from "../page/Cart" 
import { authService } from "../../services/authService";


const Navbar = ({ cartItems, removeFromCart, searchCourse }) => {
    const [openDialog, setOpenDialog] = useState('')
    const [user, setUser] = useState(authService.getUser())
    const [cartOpen, setCartOpen] = useState(false)

    const handleAuthSuccess = () => {
      setOpenDialog('')
      setUser(authService.getUser())
    }

    const handleSignupClick = () => {
      setOpenDialog('signup')
    }

    // const handleLoginClick = () => {
    //   setOpenDialog('login')
    // }

    const handleLogout = () => {
      authService.logout()
      setUser(null)
      setCartOpen(false)
    }

    const handleCartClick = () => {
      if (!user) {
        alert('Please login first')
        setOpenDialog('login')
        return
      }
      setCartOpen((prev) => !prev)
    }

    const handleSearch = (event) => {
      searchCourse(event.target.value)
    }

  return (
    <nav className="navbar">
      {/* Left */}
      <div className="navbar-left">
        <h2 className="logo">LearnHub</h2>
      </div>

      {/* Center */}
      <div className="navbar-center">
        <input onKeyDown={handleSearch}
          type="text"
          placeholder="Search for courses..."
          className="search-bar"
        />
      </div>

      {/* Right */}
      <div className="navbar-right">
        {user ? (
          <>
            <span style={{ marginRight: '12px' }}>👋 {user.name}</span>
            <button className="btn cart-btn" onClick={handleCartClick}>🛒 Cart ({cartItems.length})</button>
            <button className="btn signup-btn" onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <button className="btn signup-btn" onClick={handleSignupClick}>Sign Up</button>
            {/* <button className="btn signup-btn" onClick={handleLoginClick}>Log In</button> */}
            <button className="btn cart-btn" onClick={handleCartClick}>🛒 Cart</button>
          </>
        )}
      </div>
      <SignupPage open={openDialog == 'signup'? true : false} setOpenDialog={setOpenDialog} onAuthSuccess={handleAuthSuccess}/>
      <LoginPage open={openDialog == 'login' ? true: false} setOpenDialog={setOpenDialog} onAuthSuccess={handleAuthSuccess}/>
      <Cart cartItems={cartItems} cartOpen={cartOpen} setCartOpen={setCartOpen} removeFromCart={removeFromCart}/>
    </nav>
  );
};

export default Navbar;
