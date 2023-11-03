import React, { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { add, edit } from "../store/blogSlice";
import "../index.css";

const Form = () => {
  // Select the 'blogsArray' from the Redux store's state
  const blogs = useSelector((state) => state.blogs.blogsArray);
  const { _id } = useParams();

  // Initialize state to hold details of the blog post being edited or added
  const [details, setDetails] = useState({
    id: "",
    title: "",
    category: "",
    content: "",
    isLiked: false,
  });

  const { title, category, content } = details;

  // Use useEffect to populate 'details' with existing data when editing
  useEffect(() => {
    // Filter the 'blogs' array to find the selected blog post by ID
    const dataObj = blogs.filter((obj) => {
      return obj.id === _id;
    });

    // Set 'details' to the selected blog post or default values if not found
    const fetchedObj = dataObj[0]
      ? dataObj[0]
      : {
          id: "",
          title: "",
          category: "",
          content: "",
          isLiked: false,
        };
    setDetails(fetchedObj);
  }, [_id]);

  // Initialize Redux dispatch and navigation using 'useDispatch' and 'useNavigate'
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Handle form submission
  const onSubmit = (event) => {
    event.preventDefault();
    if (details.id) {
      // If 'id' exists in 'details', it means we are editing an existing post
      dispatch(edit(details));
    } else {
      // If 'id' doesn't exist, it means we are adding a new post
      details.id = nanoid(); // Generate a unique ID using nanoid
      details.isLiked = false; // Set the 'isLiked' property to false
      dispatch(add(details));
    }

    // Navigate back to the home page after submission
    navigate("/");
  };

  // Handle input field changes and update 'details' state
  const handleChange = (e) => {
    setDetails((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="form-container">
      <div className="card1">
        <h1>Add Post</h1>
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="title">Enter title</label>
            <input
              type="text"
              id="title"
              placeholder="Title"
              onChange={handleChange}
              name="title"
              value={title}
              required
              maxLength="25"
            />
          </div>

          <div className="form-group">
            <label htmlFor="category">Enter category</label>
            <input
              type="text"
              id="category"
              placeholder="Category"
              onChange={handleChange}
              name="category"
              value={category}
              required
              maxLength="20"
            />
          </div>
          <div className="form-group">
            <label htmlFor="content">Enter content</label>
            <textarea
              id="content"
              placeholder="Content"
              rows="6"
              onChange={handleChange}
              name="content"
              value={content}
              required
              maxLength="500"
            />
          </div>
          <div className="button-group">
            <input type="submit" value={details.id ? "Update" : "Add"} />
            <Link to="/" className="back-link">
              Back
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
