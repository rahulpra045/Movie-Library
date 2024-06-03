import React, { useEffect, useState } from "react";
import axios from "axios";
import NoImg from "./NoImg.jpg";
import "../Styles/MovieDetail.css";

function MovieDetail({ movieId }) {
  const [movieData, setMovieData] = useState(null);
  const Images = "https://image.tmdb.org/t/p/w500/";

  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}`,
          {
            params: {
              api_key: "b73c0c24a34970a26f93fc262383e7d4",
            },
          }
        );
        setMovieData(response.data);
      } catch (error) {
        console.error("Error fetching movie data:", error);
      }
    };

    fetchMovieData();
  }, [movieId]);

  return (
    <div className="movie-detail-container">
      {movieData ? (
        <>
          <img
            src={
              movieData.poster_path
                ? `${Images}${movieData.poster_path}`
                : NoImg
            }
            alt=""
            className="movie-poster"
          />
          <div className="movie-details">
            <h2 className="movie-title">{movieData.title}</h2>
            <p className="movie-overview">{movieData.overview}</p>
            <p className="movie-release-date">
              Release Date: {movieData.release_date}
            </p>
            <p className="movie-rating">Rating: {movieData.vote_average}</p>
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default MovieDetail;
