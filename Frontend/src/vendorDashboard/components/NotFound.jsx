import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="errorSection">
      <h4>
        <span>404</span> <br /> page not found
      </h4>

      <Link className="goHome" to="/">
        <p> click here to go home page</p>
      </Link>
    </div>
  );
};

export default NotFound;
