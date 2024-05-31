import React, { Fragment, useState } from 'react';
import { HiSearch } from 'react-icons/hi';
import { BiMenu } from "react-icons/bi"; // Import burger menu icon
import '../Styles/NavBarStyle.css';
import { Routes, Route, NavLink } from 'react-router-dom';
import Movies from './Movies';
import TvShows from './TvShows';
import Trends from './Trends';
import Pricing from './Pricing';

export const Container = React.createContext();

function NavBar() {
  const [toggle, setToggle] = useState(true);
  const [inputValue, setInputValue] = useState('');
  const [showMenu, setShowMenu] = useState(false); // State for burger menu

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };
  const clearSearch = () => {
    setInputValue('');
  };
  

  return (
    <Container.Provider value={{ toggle, inputValue }}>
      <Fragment>
        <nav className={toggle ? '' : 'navBarColor'}>
          <div className="nav-options">
            <h1 id={toggle ? '' : 'heading'}>REACTFLIX</h1>
            <div className="links">
              <NavLink
                to=""
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
         
        <BiMenu className="burger-menu"  color={'white'} size={30} onClick={toggleMenu} />
     
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
    <NavLink to="" onClick={() => {setShowMenu(false); clearSearch()}}>Movies</NavLink>
    <NavLink to="/TvShows" onClick={() => {setShowMenu(false); clearSearch()}}>Tv Shows</NavLink>
    <NavLink to="/Trends" onClick={() => {setShowMenu(false); clearSearch()}}>Trending</NavLink>
    <NavLink to="/Pricing" onClick={() => {setShowMenu(false); clearSearch()}}>Pricing</NavLink>
  </div>
)}


        <Routes>
          <Route path="" element={<Movies />} />
          <Route path="TvShows" element={<TvShows />} />
          <Route path="Trends" element={<Trends />} />
          <Route path="Pricing" element={<Pricing />} />
        </Routes>
      </Fragment>
    </Container.Provider>
  );
}

export default NavBar;
