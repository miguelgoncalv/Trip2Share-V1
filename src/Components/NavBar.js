import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

function NavBar() {
  const [faded, setFaded] = useState(false);
  const [user, setUser] = useState(null); // State to hold the user's info

  const handleScroll = () => {
    const isFaded = window.scrollY > 50;
    setFaded(isFaded);
  };

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        setUser(user);
      } else {
        // User is signed out
        setUser(null);
      }
    });

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      unsubscribe(); // Clean up the subscription
    };
  }, []);

  const logout = async () => {
    const auth = getAuth();
    try {
      await signOut(auth);
      console.log("User signed out successfully");
    } catch (error) {
      console.error("Logout Error:", error.message);
    }
  };

  return (
    <nav className={`navbar ${faded ? "faded" : ""}`}>
      <div className="logo">
        <Link to="/">
          <img src="/Images/logo1.png" alt="Trip 2Share" />
        </Link>
      </div>
      <ul className="nav-links">
        {!user ? (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/signup">Signup</Link>
            </li>
            <li>
              <Link to="/about">About Us</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/homepage">Find an Adventure</Link>
            </li>
            <li>
              <Link to="/about">About Us</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
            <li>
              <button onClick={logout} style={{ cursor: 'pointer' }}>Logout</button>
            </li>
            
          </>
        )}
      </ul>
    </nav>
  );
}

export default NavBar;
