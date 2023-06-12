import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { NavLink, Route, Switch, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getUserSpots } from '../../../store/spots';
import OpenModalButton from "../../OpenModalButton"
import DeleteSpot from "../DeleteSpot"
import UpdateSpot from "../UpdateSpot"

import './SpotsManagement.css';

const SpotsManagement = () => {
  const dispatch = useDispatch();
  const spots = useSelector(state => state.spots.spots);
  //const id = useSelector(state => state.session.user);


  useEffect(() => {
    dispatch(getUserSpots());
  }, []);


  return (
    <div className='spotsManagement'>
      <h1>Manage Spots</h1>
      <NavLink exact to="/spots/new">Create a New Spot</NavLink>
      {Object.keys(spots).length &&
        <div className='allSpots'>

          {Object.values(spots).map(({ id, name, city, state, price, previewImage, avgRating }) => (
            <>

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
              <div>

                <NavLink to={`/spots/${id}/edit`}>
                  <button className='updateButton'>
                    Update
                  </button>
                </NavLink>



                <div className='deleteButton'>  <OpenModalButton className='deleteSpotButton'
                  buttonText="Delete"
                  modalComponent={<DeleteSpot id={id} />}
                /></div>

                <></>
              </div>
            </>

          ))}
        </div>
      }

    </div>
  )
};

export default SpotsManagement;