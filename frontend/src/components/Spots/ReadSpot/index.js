import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { readSpot } from '../../../store/spots';
import { getReviews } from '../../../store/reviews';
import './SingleSpot.css';
import sedona from "../../pictures/sedona.jpeg"
import zion from "../../pictures/zion.jpeg"
import grand_teton from "../../pictures/grand_teton.jpeg"

const SingleSpot = () => {
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const dispatch = useDispatch();

  const spot = useSelector(state => state.spots.spot);
  const reviews = useSelector(state => state.reviews.reviews);

  useEffect(() => {
    setLoading(false);
    dispatch(readSpot(id));
    dispatch(getReviews(id));
  }, [loading]);

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
    <>
      {spot
        && <>
          <div className='spotDetails'>
            <h1>{`${spot.name}`}</h1>
            <h2>{`${spot.city}, ${spot.state}, ${spot.country}`}</h2>

            <div className='images'>
              <img src={sedona} /> <img src={sedona} /><img src={sedona} /><img src={sedona} /><img src={sedona} />
            </div>



            <div className='reserve'>
              <h3>{`Hosted by ${spot.Owner.firstName} ${spot.Owner.lastName}`}</h3>
              <h4>{`${spot.description}`}</h4>
              <div className='reserveMenu'>

                <h5>{`$${spot.price} night`}</h5>
                <h6>{`*${spot.avgStarRating}`}</h6>
                <h7>{`${spot.numReviews} reviews`}</h7>
                <button className='reserveButton'> Reserve </button>

              </div>
            </div>
          </div>
          <div className='reviews'>
            <h1>{`*${spot.avgStarRating}`}</h1>
            <h1>{`${spot.numReviews} reviews`}</h1>
            <ol>
              {reviews && Object.values(reviews).map(({ User, review, updatedAt }) => (
                <div>
                  <h4 className="date">{User.firstName}</h4>
                  <h5 className="date">{updatedAt}</h5>
                  <p >{review}</p>
                </div>
              ))}
            </ol>
          </div>
        </>
      }
    </>
  );
};

export default SingleSpot;