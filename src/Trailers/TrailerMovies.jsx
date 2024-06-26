import React, { Fragment, useEffect } from 'react'
import { useState } from 'react'; 
import ReactPlayer from 'react-player'; 
import movieTrailer from 'movie-trailer'; 
import '../Styles/TrailerMovie.css'
export const TrailerMovies = ({ moviesTitle,toggle }) => {
    const [video, setVideo] = useState(""); 
    const [videoURL, setVideoURL] = useState("");


    function handleSearch() { 
        setVideo(moviesTitle)
        movieTrailer(video).then((res) => { 
            setVideoURL(res); 
        }); 
    } 
    useEffect(() => {
        handleSearch();
    },[videoURL])

  return (
      <Fragment>
          <div className="Container">
              
          </div>
          <div className="player">
              <h1 id={toggle ? 'TrailerMovie-name-dark' : 'TrailerMovie-name-light'}>{moviesTitle}</h1>
              <ReactPlayer url={videoURL} controls={true} width={'850px'} height={'500px'} muted={false} />
          </div>
   </Fragment>
  )
}