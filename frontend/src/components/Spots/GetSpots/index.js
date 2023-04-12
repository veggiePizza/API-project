import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { NavLink, Route, Switch, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getSpots } from '../../../store/spots';
import './AllSpots.css';
import sedona from "../../pictures/sedona.jpeg"
import zion from "../../pictures/zion.jpeg"
import grand_teton from "../../pictures/grand_teton.jpeg"

const Spots = () => {
  const dispatch = useDispatch();
  const spots = useSelector(state => state.spots.spots);

  useEffect(() => {
    dispatch(getSpots());
  }, [dispatch]);

  function getPic(id) {
    switch (id) {
      case 1:
        return sedona;
      case 2:
        return zion;
      case 3:
        return grand_teton;
    }
  }

  return (
    <div className='allSpots'>
      {Object.values(spots).map(({ id, name, city, state, price }) => (
        <NavLink className='spotLink' to={`/spots/${id}`}>
          <h2>{name}</h2>
          <img src={getPic(id)}></img>
          <h3>{city}, {state}</h3>
          <h4>{`$${price} night`}</h4>
        </NavLink>
      ))}
    </div>
    
  );
};

export default Spots;