import React, { Fragment, useContext, useEffect, useState } from "react";
import axios from "axios";
import {
  AiFillPlayCircle,
  AiOutlineClose,
  AiOutlineHeart,
  AiFillHeart,
} from "react-icons/ai";
import NoImg from "./NoImg.jpg";
import "../Styles/Videos.css";
import { Container } from "./NavBar";
import { TrailerMovies } from "../Trailers/TrailerMovies";
import { useAuth } from "../contexts/authContext";

function Movies() {
  const { toggle, inputValue, watchlist, addToWatchlist, removeFromWatchlist } =
    useContext(Container);
  const { userLoggedIn } = useAuth();
  const input = inputValue;
  const [moviesData, setMoviesData] = useState([]);
  const [trailer, setTrailer] = useState(true);
  const [movieTitle, setMovieTitle] = useState("");

  const Shown = input ? "search" : "discover";
  const Api = `https://api.themoviedb.org/3/${Shown}/movie`;
  const Images = "https://image.tmdb.org/t/p/w500/";

  const MovieCall = async () => {
    const data = await axios.get(Api, {
      params: {
        api_key: "b73c0c24a34970a26f93fc262383e7d4",
        query: input,
      },
    });
    const results = data.data.results;
    setMoviesData(results);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      MovieCall();
    }, 100);
    return () => clearTimeout(timer);
  }, [input]);

  const MoviesTitle = (movie) => {
    setMovieTitle(movie.title);
    setTrailer(!trailer);
  };
  const isInWatchlist = (movie) =>
    watchlist.some((item) => item.id === movie.id);

  return (
    <Fragment>
      <div className={toggle ? "mainBgColor" : "secondaryBgColor"}>
        <div className="movies-container">
          {moviesData.map((movie) => {
            return (
              <Fragment>
                <div key={movie.id} id={trailer ? "container" : "NoContainer"}>
                  <AiFillPlayCircle
                    color="#fff"
                    fontSize={40}
                    id={trailer ? "playIcon" : "hide"}
                    onClick={() => MoviesTitle(movie)}
                  />
                  <img
                    src={
                      movie.poster_path
                        ? `${Images}${movie.poster_path}`
                        : NoImg
                    }
                    alt=""
                    onClick={() => MoviesTitle(movie)}
                  />
                  <h3
                    id={movie.title.length > 28 ? "smaller-Text" : ""}
                    className={toggle ? "mainColor" : "secondaryColor"}
                  >
                    {movie.title ? movie.title : "Movie Title"}
                  </h3>
                  {userLoggedIn ? (
                    isInWatchlist(movie) ? (
                      <AiFillHeart
                        color="#f00"
                        fontSize={30}
                        
                        onClick={() => removeFromWatchlist(movie.id)}
                      />
                    ) : (
                      <AiOutlineHeart
                        color={toggle ?  "#fff" : "#333"} 

                          fontSize={30}
                          
                        onClick={() => addToWatchlist(movie)}
                      />
                    )
                  ) : (
                    <AiOutlineHeart
                    color={toggle ?  "#fff" : "#333"} 
                        fontSize={30}
                        
                      onClick={() =>
                        alert("Please log in to add movies to your watchlist")
                      }
                    />
                  )}
                </div>
              </Fragment>
            );
          })}
          {trailer ? (
            console.log
          ) : (
            <TrailerMovies moviesTitle={movieTitle} toggle={toggle} />
          )}
          <AiOutlineClose
            id={trailer ? "Nothing" : "Exit1"}
            className={toggle ? "DarkTheme" : "LightThemeClose"}
            fontSize={55}
            cursor={"pointer"}
            onClick={() => setTrailer(true)}
          />
        </div>
      </div>
    </Fragment>
  );
}

export default Movies;
