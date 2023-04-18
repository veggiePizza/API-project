import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  return (
    <div className='nav'>
      <div>
        <NavLink exact to="/"><i class="fa-solid fa-house-crack"></i></NavLink>
      </div>
      <div>
        {isLoaded && (<>
          {sessionUser && <><NavLink className="create-spot-link" exact to="/spots/new">Airbnb your home</NavLink></>}
          <ProfileButton classsName="menuButton" user={sessionUser} />
        </>)}
      </div>
    </div>
  );
}

export default Navigation;

