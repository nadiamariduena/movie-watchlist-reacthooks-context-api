import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div>
      <div className="container">
        <div className="inner-content">
          <div className="brand">
            <Link to="/">Watch</Link>
          </div>
          {/* ---- */}
          <ul className="nav-links">
            <li>
              <Link to="/">Watch list</Link>
            </li>
            <li>
              <Link to="/watched">Watched</Link>
            </li>
            <li>
              <Link to="/add">+ Add</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;
