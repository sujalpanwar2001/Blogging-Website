import React from "react";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();
  const switchPath = location.pathname !== "/form";
  
  return (
    <header className="Header">
      <Link to="/" className="nav-link">
        <span>Blog App</span> 
      </Link>
      {switchPath && (
        <Link to="/form" className="nav-link">
          Add Post
        </Link>
      )}
    </header>
  );
};

export default Header;
