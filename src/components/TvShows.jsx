import React, { Fragment, useContext, useEffect, useState } from "react";
import axios from "axios";
import { AiFillPlayCircle, AiOutlineClose, AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import NoImg from "./NoImg.jpg";
import "../Styles/Videos.css";
import { Container } from "./NavBar";
import TrailerTvShows from "../Trailers/TrailerTvShows";
import { useAuth } from '../contexts/authContext'


function TvShows() {
  const { userLoggedIn } = useAuth();

  const [showData, setShowData] = useState([]);
  const { toggle, inputValue, watchlist, addToWatchlist, removeFromWatchlist } = useContext(Container);
  const [title, setTitle] = useState("");
  const input = inputValue;
  const [trailer, setTrailer] = useState(true);
  const Shown = input ? "search" : "discover";
  const Api = `https://api.themoviedb.org/3/${Shown}/tv`;
  const Images = "https://image.tmdb.org/t/p/w500/";

  const TvShows = async () => {
    const data = await axios.get(Api, {
      params: {
        api_key: "b73c0c24a34970a26f93fc262383e7d4",
        query: input,
      },
    });
    const results = data.data.results;
    setShowData(results);
  };

  useEffect(() => {
    setTimeout(() => {
      TvShows();
    }, 100);
  }, [input]);
  
  const isInWatchlist = (shows) => watchlist.some((item) => item.id === shows.id);

  const TvShowTitle = (shows) => {
    setTitle(shows.name);
    setTrailer(!trailer);
  };
  return (
    <Fragment>
      <div className={toggle ? "mainBgColor" : "secondaryBgColor"}>
        <div className="movies-container">
          {showData.map((shows) => {
            return (
              <Fragment key={shows.id}>
                <div key={shows.id} id={trailer ? "container" : "NoContainer"}>
                  <AiFillPlayCircle
                    color="#fff"
                    fontSize={40}
                    id={trailer ? "playIcon" : "hide"}
                    onClick={() => TvShowTitle(shows)}
                  />
                  <img
                    src={
                      shows.poster_path
                        ? `${Images}${shows.poster_path}`
                        : NoImg
                    }
                    alt=""
                    onClick={() => TvShowTitle(shows)}
                  />
                  <h3
                    id={shows.name.length > 28 ? "smaller-Text" : ""}
                    className={toggle ? "mainColor" : "secondaryColor"}
                  >
                    {shows.name ? shows.name : "Show Title"}
                  </h3>
                  {userLoggedIn ? (
                isInWatchlist(shows) ? (
                  <AiFillHeart
                    color="#f00"
                    fontSize={30}
                    onClick={() => removeFromWatchlist(shows.id)}
                  />
                ) : (
                  <AiOutlineHeart
                  color={toggle ?  "#fff" : "#333"}
                    fontSize={30}
                    onClick={() => addToWatchlist(shows)}
                  />
                )
              ) : (
                <AiOutlineHeart
                color={toggle ?  "#fff" : "#333"}
                  fontSize={30}
                  onClick={() => alert('Please log in to add movies to your watchlist')}
                />
              )}
                </div>
              </Fragment>
            );
          })}
          {trailer ? console.log : <TrailerTvShows TvShowsTitle={title} toggle={ toggle} />}

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

export default TvShows;
