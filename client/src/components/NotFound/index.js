import React from "react";
import background from "../../assets/images/background.jpg";
import { Link } from "react-router-dom";

const NotFound = () => (
  <section
    className="splash"
    style={{ background: `url(${background}) center / cover no-repeat` }}
  >
    <Link to={"/"}>
      Back Home
    </Link>
    <div className="splash-header">Not Found...</div>
  </section>
);

export default NotFound;
