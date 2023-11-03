import React, { createContext, useState } from "react";
import Home from "./Home";
import Form from "./Form";
import { Route, Routes, useNavigate } from "react-router-dom";
import Error from "./Error";
import More from "./More";
import { useDispatch, useSelector } from "react-redux";
import { edit, remove } from "../store/blogSlice";

const Main = () => {
  // Access the blogsArray from Redux store and setup dispatch
  const blogs = useSelector((state) => state.blogs.blogsArray);
  const dispatch = useDispatch();

  // Handles the "like" functionality
  const handleLike = (id, isLiked) => {
    dispatch(edit({ id, isLiked: !isLiked }));
  };

  // Handles the "remove" functionality and navigates back to the home page
  const navigate = useNavigate();
  const handleRemove = (id) => {
    dispatch(remove({ id }));
    navigate("/");
  };

  return (
    <div style={{minHeight: "85vh"}}>
      {/* Provide handleLike and handleRemove via context */}
      <BlogContext.Provider value={{ handleLike, handleRemove }}>
        <Routes>
          {/* Route definitions for different pages */}
          <Route path="/" element={<Home />} />
          <Route path="/form" element={<Form />} />
          <Route path="/form/:_id" element={<Form />} />
          <Route path="/more/:_id" element={<More />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </BlogContext.Provider>
    </div>
  );
};

export default Main;

// Create a context to share handleLike and handleRemove with child components
export const BlogContext = createContext({});
