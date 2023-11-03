import React from "react";
import { Link } from "react-router-dom";

const Error = () => {
  return (
    <>
      404 Page not found
      <Link to="/">Home</Link>
    </>
  );
};

export default Error;
