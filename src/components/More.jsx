import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { BlogContext } from "./Main";

const More = () => {
  // Select the 'blogsArray' from the Redux store's state
  const blogs = useSelector((state) => state.blogs.blogsArray);

  // Get the 'id' parameter from the current route using useParams
  const { _id } = useParams();

  // Initialize state to hold details of the selected blog post
  const [details, setDetails] = useState({
    id: "",
    title: "",
    catagory: "",
    content: "",
    isLiked: false,
  });

  // Use useEffect to update details when the URL parameter (_id) changes
  useEffect(() => {
    // Filter the blogs array to find the selected blog post by ID
    const dataObj = blogs.filter((obj) => {
      return obj.id === _id;
    });

    // If the blog post is found, set the details; otherwise, set default values
    const fetchedObj = dataObj[0]
      ? dataObj[0]
      : {
          id: "",
          title: "",
          catagory: "",
          content: "",
          isLiked: false,
        };
    setDetails(fetchedObj);
  }, [_id]);

  const { id, title, catagory, content, isLiked } = details;
  const { handleLike, handleRemove } = useContext(BlogContext);

  return (
    <div className="card3">
      <h2 className="title">{title}</h2>
      <div className="content">{content}</div>
      <div className="details">
        <span className="category">{catagory}</span>
        <button
          onClick={() => {
            // Call the handleLike function from the context and update isLiked state
            handleLike(id, isLiked);
            setDetails((prev) => ({ ...prev, isLiked: !isLiked }));
          }}
        >
          {isLiked ? "Liked" : "Like"}
        </button>
        <Link to={`/form/${id}`} className="edit-link">
          Edit
        </Link>
        <button onClick={() => handleRemove(id)} className="delete-button">
          Delete
        </button>
      </div>
    </div>
  );
};

export default More;
