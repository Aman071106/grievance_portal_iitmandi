import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="header-logo">
        <Link to="/">Grievance Portal</Link>
      </div>
      <nav className="header-nav">
        <ul>
          <li>
            <Link to="/create-grievance">File a Grievance</Link>
          </li>
          <li>
            <Link to="/my-grievances">My Grievances</Link>
          </li>
          <li>
            <Link to="/authorities">Authorities</Link>
          </li>
          <li>
            <Link to="/signin">Sign In</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
