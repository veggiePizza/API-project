import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { NavLink, Route, Switch, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getSpots } from '../../../store/spots';
import './LandingPage.css';

const LandingPage = () => {
  const dispatch = useDispatch();
  const spots = useSelector(state => state.spots.spots);

  useEffect(() => {
    dispatch(getSpots());
  }, [dispatch]);

  return (
    <div className='allSpots'>
      {Object.values(spots).map(({ id, name, city, state, price, previewImage, avgRating }) => (
        <NavLink className='spotLink' to={`/spots/${id}`}>
          <h2>{name}</h2>
          <img src={`${previewImage}`}></img>
          <h3>{city}, {state}</h3>
          <div className='rating'>
            {avgRating ? (
              <>
                <i class="fa-sharp fa-solid fa-star"></i>
                <h6>{`${Number(avgRating).toFixed(2)}`}</h6>
              </>
            ) : (<>
              <i class="fa-sharp fa-solid fa-star"></i>
              <h6>New</h6>
            </>)}
          </div>
          <h4>{`$${price} night`}</h4>
        </NavLink>
      ))}
    </div>

  );
};

export default LandingPage;