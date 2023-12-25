import React, { useEffect, useState } from "react";
import MovieCard from "../Components/MovieCard";
import { useNavigate } from "react-router";

const FavMovies = () => {
  const navigate = useNavigate();
  const [favoriteMovies, setFavoriteMovies] = useState([]);

  useEffect(() => {
    const favoriteMovieIds = Object.keys(localStorage).filter((key) =>
      key.endsWith("_favorite")
    );

    const movies = favoriteMovieIds.map((favoriteKey) => {
      const imdbID = favoriteKey.replace("_favorite", "");
      const movieDetails = JSON.parse(localStorage.getItem(imdbID));
      return movieDetails;
    });

    setFavoriteMovies(movies);
  }, []);

  const removeFromFavorites = (imdbID) => {
    localStorage.removeItem(imdbID + "_favorite");
    setFavoriteMovies((prevMovies) =>
      prevMovies.filter((movie) => movie.imdbID !== imdbID)
    );
  };

  return (
    <div className="favorite-movies">
      <h2>Favorite Movies</h2>

      <div>
        <button onClick={() => navigate("/")}>Back to Home</button>
      </div>
      {favoriteMovies.length > 0 ? (
        <div className="container">
          {favoriteMovies.map((movie) => (
            <MovieCard
              movie={movie}
              key={movie.imdbID}
              removeFromFavorites={removeFromFavorites}
              showReviewFeature={true}
            />
          ))}
        </div>
      ) : (
        <div className="empty">
          <p>No favorite movies yet!</p>
        </div>
      )}
    </div>
  );
};

export default FavMovies;
