import { createSlice } from "@reduxjs/toolkit";

// Load the blogsArray from localStorage or initialize it as an empty array
const blogsArray =
  localStorage.getItem("blogsArray") !== null
    ? JSON.parse(localStorage.getItem("blogsArray"))
    : [];

// Define the initial state with the loaded or empty blogsArray
const initialState = {
  blogsArray,
};

// Create a Redux slice named "blog" with actions and reducers
const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    // Action: Add a new blog
    add: (state, action) => {
      // Push the new blog to the state's blogsArray
      state.blogsArray.push(action.payload);

      // Update the blogsArray in localStorage
      localStorage.setItem("blogsArray", JSON.stringify(state.blogsArray));
    },
    // Action: Edit an existing blog
    edit: (state, action) => {
      // Map through the blogsArray and update the matching blog
      state.blogsArray = state.blogsArray.map((item) =>
        item.id === action.payload.id ? { ...item, ...action.payload } : item
      );

      // Update the blogsArray in localStorage
      localStorage.setItem("blogsArray", JSON.stringify(state.blogsArray));
    },
    // Action: Remove a blog
    remove: (state, action) => {
      // Filter out the blog to be removed based on its ID
      state.blogsArray = state.blogsArray.filter(
        (item) => item.id !== action.payload.id
      );

      // Update the blogsArray in localStorage
      localStorage.setItem("blogsArray", JSON.stringify(state.blogsArray));
    },
  },
});

// Export the action creators
export const { add, edit, remove } = blogSlice.actions;

// Export the reducer
export default blogSlice.reducer;
