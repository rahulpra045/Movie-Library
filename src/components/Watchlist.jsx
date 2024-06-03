import React, { useContext } from 'react';
import { Container } from './NavBar';
import '../Styles/Watchlist.css';
import NoImg from './NoImg.jpg'

function Watchlist() {
  const { watchlist, removeFromWatchlist, toggle } = useContext(Container);

  return (
    <div className={`watchlist-container ${toggle ? 'mainBgColor' : 'secondaryBgColor'}`}>
      <div className="watchlist-items-wrapper">
      <div className="watchlist-items">
        {watchlist.length > 0 ? (
          watchlist.map((movie) => (
            <div key={movie.id} className="watchlist-item">
              <img src={movie.poster_path ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}` : NoImg} alt={movie.title} />
              <h3 className={toggle ? "mainColor" : "secondaryColor"} > {movie.title ? movie.title : "Movie Title"} </h3>
              {/* <h3 className={toggle ? "mainColor" : "secondaryColor"} > {movie.title} </h3> */}
              <button className="remove-button" onClick={() => removeFromWatchlist(movie.id)}>
                Remove
              </button>
            </div>
          ))
        ) : (
          <p className={toggle ? "mainColor" : "secondaryColor"}>No movies in your watchlist</p>
        )}
      </div>
    </div>
    </div>
  );
}

export default Watchlist;
