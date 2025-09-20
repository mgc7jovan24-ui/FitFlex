import React from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <h2>MGC FITZZ</h2>
      </div>
      <ul className="navbar-links">
        <li>
          <NavLink to="/" className={({ isActive }) => (isActive ? 'active' : '')}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/about" className={({ isActive }) => (isActive ? 'active' : '')}>
            About
          </NavLink>
        </li>
        <li>
          {/* Change this to HomeSearch page */}
          <NavLink to="/homeSearch" className={({ isActive }) => (isActive ? 'active' : '')}>
            Search
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
