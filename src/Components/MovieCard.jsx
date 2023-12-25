import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";

const MovieCard = ({ movie, removeFromFavorites, showReviewFeature }) => {
  const { imdbID, Year, Poster, Title, Type } = movie;
  const [isFavorite, setIsFavorite] = useState(
    localStorage.getItem(`${imdbID}_favorite`) === "true"
  );
  const [rating, setRating] = useState("");
  const [review, setReview] = useState("");
  const [openDialog, setOpenDialog] = useState(false);

  const handleClose = () => {
    setOpenDialog(false);
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleRatingChange = (e) => {
    setRating(e.target.value);
  };

  const handleReviewChange = (e) => {
    setReview(e.target.value);
  };

  const saveReview = () => {
    const movieDetails = JSON.parse(localStorage.getItem(imdbID)) || {};
    const reviews = movieDetails.reviews || [];
    reviews.push({ rating, review });
    movieDetails.reviews = reviews;

    localStorage.setItem(imdbID, JSON.stringify(movieDetails));
    setRating("");
    setReview("");
    setOpenDialog(false);
  };

  useEffect(() => {
    localStorage.setItem(imdbID, JSON.stringify(movie));
  }, [imdbID, movie]);

  const toggleFavorite = () => {
    const newValue = !isFavorite;
    setIsFavorite(newValue);
    if (newValue) {
      localStorage.setItem(imdbID, JSON.stringify(movie));
      localStorage.setItem(`${imdbID}_favorite`, "true");
    } else {
      localStorage.removeItem(imdbID);
      localStorage.removeItem(`${imdbID}_favorite`);
      removeFromFavorites(imdbID);
    }
  };

  const savedMovieDetails = JSON.parse(localStorage.getItem(imdbID)) || {};
  const savedReviews = savedMovieDetails.reviews || [];

  return (
    <div className={`movie `} key={imdbID}>
      <div>
        <p>{Year}</p>
      </div>

      <div>
        <img
          src={Poster !== "N/A" ? Poster : "https://via.placeholder.com/400"}
          alt={Title}
        />
      </div>

      <div>
        <span>{Type}</span>
        <h3>{Title}</h3>
        <button onClick={toggleFavorite}>
          {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
        </button>
        {showReviewFeature && (
          <button onClick={handleOpenDialog}>Add or View Review</button>
        )}
      </div>
      <Dialog
        open={openDialog}
        onClose={handleClose}
        sx={{
          "& .MuiDialog-paper": {
            background: "#343739",
            borderRadius: "10px",
          },
        }}
      >
        <DialogTitle style={{ background: "#1f2123", color: "#f9d3b4" }}>
          {Title}
        </DialogTitle>
        <DialogContent>
          <TextField
            label="Rating"
            type="number"
            value={rating}
            onChange={handleRatingChange}
            fullWidth
            margin="normal"
            variant="outlined"
            sx={{
              "& .MuiOutlinedInput-input": {
                color: "#f9d3b4",
              },
              "& .MuiInputLabel-root": {
                color: "#f9d3b4",
              },
              "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                borderColor: "#f9d3b4",
              },
              "&:hover .MuiOutlinedInput-input": {
                color: "#f9d3b4",
              },
              "&:hover .MuiInputLabel-root": {
                color: "#f9d3b4",
              },
              "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                {
                  borderColor: "#f9d3b4",
                },
              "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-input": {
                color: "#f9d3b4",
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "#f9d3b4",
              },
              "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                {
                  borderColor: "#f9d3b4",
                },
            }}
          />
          <TextField
            label="Review"
            multiline
            rows={4}
            value={review}
            onChange={handleReviewChange}
            fullWidth
            margin="normal"
            variant="outlined"
            sx={{
              "& .MuiOutlinedInput-input": {
                color: "#f9d3b4",
              },
              "& .MuiInputLabel-root": {
                color: "#f9d3b4",
              },
              "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                borderColor: "#f9d3b4",
              },
              "&:hover .MuiOutlinedInput-input": {
                color: "#f9d3b4",
              },
              "&:hover .MuiInputLabel-root": {
                color: "#f9d3b4",
              },
              "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                {
                  borderColor: "#f9d3b4",
                },
              "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-input": {
                color: "#f9d3b4",
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "#f9d3b4",
              },
              "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                {
                  borderColor: "#f9d3b4",
                },
            }}
          />

          {/* Display saved reviews within the dialog */}
          {savedReviews.length > 0 && (
            <div style={{ marginTop: "1rem" }}>
              <h4 style={{ color: "#f9d3b4" }}>Saved Reviews:</h4>
              <ul style={{ padding: 0, listStyle: "none" }}>
                {savedReviews.map((savedReview, index) => (
                  <li key={index} style={{ marginBottom: "0.5rem" }}>
                    <p style={{ color: "#f9d3b4" }}>
                      Rating: {savedReview.rating}
                    </p>
                    <p style={{ color: "#f9d3b4" }}>
                      Review: {savedReview.review}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </DialogContent>
        <DialogActions style={{ background: "#343739" }}>
          <Button onClick={handleClose} style={{ color: "#f9d3b4" }}>
            Cancel
          </Button>
          <Button onClick={saveReview} style={{ color: "#f9d3b4" }}>
            Save Review
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default MovieCard;
