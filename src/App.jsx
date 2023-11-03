import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "./index.css"; // Import the CSS file
import Main from "./components/Main";

const App = () => {
  return (
    <>
      <Header />
      <Main />
      <Footer />
    </>
  );
};

export default App;
