import React, { useState, useEffect } from "react";
import MovieCard from "../Components/MovieCard";
import SearchIcon from "../search.svg";
import { Link } from "react-router-dom";
import "./Home.css";
import axios from "axios";

const API_URL = "https://www.omdbapi.com?apikey=69407c7b";

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [loading, setLoading] = useState(false);
  const [favoriteMovies, setFavoriteMovies] = useState([]);

  useEffect(() => {
    setLoading(true);
    if (searchTerm === "") {
      searchMovies("Avengers", currentPage);
    } else {
      searchMovies(searchTerm, currentPage);
    }
  }, [currentPage, searchTerm]);

  const searchMovies = async (title, page) => {
    try {
      const response = await axios.get(`${API_URL}&s=${title}&page=${page}`);
      const data = response.data;
      //   console.log(data);
      setMovies(data.Search || []);
      setTotalResults(parseInt(data.totalResults) || 0);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const removeFromFavorites = (imdbID) => {
    localStorage.removeItem(imdbID + "_favorite");
    setFavoriteMovies((prevMovies) =>
      prevMovies.filter((movie) => movie.imdbID !== imdbID)
    );
  };

  const handleNextPage = () => {
    if (currentPage < Math.ceil(totalResults / 10)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const totalPages = Math.ceil(totalResults / 10);
  //   console.log(totalPages);

  return (
    <div className="app">
      <h1>FlickPulse</h1>

      <div className="search">
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for movies"
        />
        <img
          src={SearchIcon}
          alt="search"
          onClick={() => {
            setCurrentPage(1);
            searchMovies(searchTerm, 1);
          }}
        />
      </div>
      <Link to="/fav">
        <button className="fav-btn">Favorites</button>
      </Link>
      {loading ? (
        <div className="loading-spinner"></div>
      ) : totalPages > 1 ? (
        <div className="pagination">
          <button onClick={handlePrevPage} disabled={currentPage === 1}>
            &larr; Prev
          </button>
          <span className="current-page">{currentPage}</span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            Next &rarr;
          </button>
        </div>
      ) : null}

      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard
              movie={movie}
              key={movie.imdbID}
              removeFromFavorites={removeFromFavorites}
              showReviewFeature={false}
            />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No movies found</h2>
        </div>
      )}
    </div>
  );
};

export default Home;
