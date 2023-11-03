import React from "react";
import { Link } from "react-router-dom";

const Row = ({ details }) => {
  return (
    <div className="">
      {/* Display truncated content if it exceeds 100 characters */}
      <p className="card-content">
        {details.content.length > 100
          ? details.content.substring(0, 40) + "..."
          : details.content}
      </p>
      {/* Create a link to navigate to the detailed view of the blog post */}
      <Link to={`/more/${details.id}`}>↗️</Link>
    </div>
  );
};

export default Row;
