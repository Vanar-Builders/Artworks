import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="left-navbar">
      <ul>
        <li>
          <Link to="/">Artworks</Link>
        </li>
        <li>
          <Link to="/shop">Shop</Link>
        </li>
        <li>
          <Link to="/submit-your-work">Submit Your Artworks</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/faqs">FAQs & Tutorials</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
