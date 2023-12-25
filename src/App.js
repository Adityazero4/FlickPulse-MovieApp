import React from "react";
import Home from "./Pages/Home";
import FavMovies from "./Pages/FavMovies";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/fav" element={<FavMovies />} />
      </Routes>
    </Router>
  );
};

export default App;
