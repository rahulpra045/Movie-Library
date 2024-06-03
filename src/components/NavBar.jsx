import React, { Fragment, useState } from 'react';
import { HiSearch } from 'react-icons/hi';
import { BiMenu } from "react-icons/bi"; // Import burger menu icon
import '../Styles/NavBarStyle.css';
import { Routes, Route, NavLink , useNavigate, Link} from 'react-router-dom';
import Movies from './Movies';
import TvShows from './TvShows';
import Trends from './Trends';
import Pricing from './Pricing';
import Login from './Login';
import Register from './Register';
import Watchlist from './Watchlist';
import MovieDetail from './MovieDetail';
import { useAuth } from '../contexts/authContext'
import { doSignOut } from '../firebase/auth'

export const Container = React.createContext();

function NavBar({children}) {
  const navigate = useNavigate();
  const { userLoggedIn } = useAuth();
  const [watchlist, setWatchlist] = useState([]);
  const [toggle, setToggle] = useState(true);
  const [inputValue, setInputValue] = useState('');
  const [showMenu, setShowMenu] = useState(false); // State for burger menu

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const clearSearch = () => {
    setInputValue('');
  };

  const addToWatchlist = (movie) => {
    setWatchlist((prevList) => [...prevList, movie]);
  };

  const removeFromWatchlist = (movieId) => {
    setWatchlist((prevList) => prevList.filter((movie) => movie.id !== movieId));
  };

  return (
    <Container.Provider value={{ toggle, inputValue , watchlist, addToWatchlist, removeFromWatchlist}}>
      <Fragment>
        <nav className={toggle ? '' : 'navBarColor'}>
          <div className="nav-options">
            <h1 id={toggle ? '' : 'heading'}>REACTFLIX</h1>
            <div className="links">
              <NavLink
                to="/"
                onClick={clearSearch} 
                style={({ isActive }) => {
                  return { color: isActive ? '#fff' : '#EE9B00' };
                }}
              >
                <span id={toggle ? 'Movies' : 'MoviesLight'}>Movies</span>
              </NavLink>
              <NavLink
                to="/TvShows"
                onClick={clearSearch} 
                style={({ isActive }) => {
                  return { color: isActive ? '#fff' : '#EE9B00' };
                }}
              >
                <span id={toggle ? 'Movies' : 'MoviesLight'}>Tv Shows</span>
              </NavLink>
              <NavLink
                to="/Trends"
                onClick={clearSearch} 
                style={({ isActive }) => {
                  return { color: isActive ? '#fff' : '#EE9B00' };
                }}
              >
                <span id={toggle ? 'Movies' : 'MoviesLight'}>Trending</span>
              </NavLink>
              <NavLink
                to="/Pricing"
                onClick={clearSearch} 
                style={({ isActive }) => {
                  return { color: isActive ? '#fff' : '#EE9B00' };
                }}
              >
                <span id={toggle ? 'Movies' : 'MoviesLight'}>Pricing</span>
              </NavLink>
              <NavLink
                to="/Watchlist"
                onClick={clearSearch}
                style={({ isActive }) => {
                  return { color: isActive ? '#fff' : '#EE9B00' };
                }}
              >
                <span id={toggle ? 'Movies' : 'MoviesLight'}>Watchlist</span>
              </NavLink>
            </div>
            <div className='auth-links'>
              {
                userLoggedIn
                  ? <button onClick={() => { doSignOut().then(() => { navigate('/') }) }} className='logout-button'>Logout</button>
                  : <>
                      <Link className='auth-link' to={'/Login'}>Login</Link>
                      <Link className='auth-link' to={'/Register'}>Register</Link>
                    </>
              }
            </div>
          </div>
          <div className="input-group">
            <input
              type="text"
              placeholder="Search"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <HiSearch fontSize={21} color={toggle ? 'black' : '#ff206e'} id="search" />
            <div id="Color-switcher" onClick={() => setToggle(!toggle)}>
              <div id={toggle ? 'Color-switcher-mover' : 'Color-switcher-moved'}></div>
            </div>
          </div>
          <BiMenu className="burger-menu" color={'white'} size={30} onClick={toggleMenu} />
          {children}
        </nav>

        {/* Burger menu */}
        {showMenu && (
          <div className="mobile-menu">
            <div className="input-group">
              <input
                type="text"
                placeholder="Search"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
              <HiSearch fontSize={21} color={toggle ? 'black' : '#ff206e'} id="search" />
            </div>
            <NavLink to="/" onClick={() => { setShowMenu(false); clearSearch(); }}>Movies</NavLink>
            <NavLink to="/TvShows" onClick={() => { setShowMenu(false); clearSearch(); }}>Tv Shows</NavLink>
            <NavLink to="/Trends" onClick={() => { setShowMenu(false); clearSearch(); }}>Trending</NavLink>
            <NavLink to="/Pricing" onClick={() => { setShowMenu(false); clearSearch(); }}>Pricing</NavLink>
            <NavLink to="/Watchlist" onClick={() => { setShowMenu(false); clearSearch(); }}>Watchlist</NavLink>

            {/* Authentication links */}
            {userLoggedIn ? (
                <button onClick={() => { doSignOut().then(() => { navigate('/Login'); setShowMenu(false); }) }} className="logout-button">Logout</button>
              ) : (
                <>
                  <NavLink to="/Login" onClick={() => setShowMenu(false)}>Login</NavLink>
                  <NavLink to="/Register" onClick={() => setShowMenu(false)}>Register</NavLink>
                </>
              )}
            
          </div>
        )}

        <Routes>
          <Route path="/" element={<Movies />} />
          <Route path="/TvShows" element={<TvShows />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/Trends" element={<Trends />} />
          <Route path="/Pricing" element={<Pricing />} />
          <Route path="/Watchlist" element={<Watchlist />} />
          <Route path="/movies/:movieId" element={<MovieDetail />} />
        </Routes>
      </Fragment>
    </Container.Provider>
  );
}

export default NavBar;
