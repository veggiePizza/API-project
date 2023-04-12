import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import logo from "../pictures/airbnb_logo.png"

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  return (
    <div className='nav'>
      <NavLink exact to="/"><img className="nav-logo" src={logo}></img></NavLink>
      {isLoaded && (<NavLink className = "CreateSpot" exact to= "/spots/new">Airbnb your home</NavLink>)}
      {isLoaded && (<ProfileButton classsName = "menuButton" user={sessionUser} /> )}
    </div>
  );
}

export default Navigation;