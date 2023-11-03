import React from "react";
import { useSelector } from "react-redux";
import Row from "./Row";

const Home = () => {
  // Select the 'blogsArray' from the Redux store's state
  const blogs = useSelector((state) => state.blogs.blogsArray);

  return (
    <div className="card-container">
      {blogs.length === 0 ? (
        // Render a message when there are no blogs
        <div>No data</div>
      ) : (
        // Render the list of blog posts when there are blogs
        <div className="card-grid">
          {blogs.map((obj) => (
            // Render each blog post as a card
            <div key={obj.id} className="post-card">
              <article className="card">
                <h2 className="card-title">{obj.title}</h2>
                <h2 className="card-content">{obj.category}</h2>
                <div className="postCredit">
                  {/* Render the 'Row' component and pass 'obj' as details */}
                  <Row details={obj} />
                </div>
              </article>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
