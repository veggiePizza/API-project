import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { readSpot } from '../../../store/spots';
import { getReviews } from '../../../store/reviews';
import OpenModalMenuItem from '../../Navigation/OpenModalMenuItem';
import OpenModalButton from '../../OpenModalButton';
import LoginFormModal from '../../LoginFormModal';
import CreateReview from '../../Reviews/CreateReview'
import DeleteReview from '../../Reviews/DeleteReview'
import './SpotPage.css';

const SpotPage = () => {
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const dispatch = useDispatch();

  const spot = useSelector(state => state.spots.spot);
  const reviews = useSelector(state => state.reviews.reviews);
  const sessionUser = useSelector(state => state.session.user);

  const [reserve, setReserve] = useState(true)
  const reserveHandler = () => {
    setReserve(false);
  };

  useEffect(() => {
    setLoading(false);
    dispatch(readSpot(id));
    dispatch(getReviews(id));
  }, [loading]);

  function featureComingSoon() {
    return (
      <OpenModalButton
        buttonText="Greeting"
        modalComponent={<h2>Feature Coming Soon...</h2>}
      />
    );
  }

  function parseDate(date) {
    let parsedDate = new Date(date) + '';
    let dateString = parsedDate.split(' ');
    return `${dateString[1]} ${dateString[3]}`
  }

  return (
    <>
      {spot
        && <>
          <div className='spotDetails'>
            <h1>{`${spot.name}`}</h1>
            <h2>{`${spot.city}, ${spot.state}, ${spot.country}`}</h2>
            <div className='spotImages'>
              {Object.values(spot.SpotImages).map(({ url }) => (
                <>
                  {spot.SpotImages[0].url == url ? (
                    <img className="mainPicture" src={url}></img>
                  ) : (<img className="pictures" src={url}></img>)}
                </>
              ))}
            </div>

            <div className='reserve'>
              <h3>{`Hosted by ${spot.Owner.firstName} ${spot.Owner.lastName}`}</h3>
              <h4>{`${spot.description}`}</h4>


              <div className='reserveMenu'>
                <h5>{`$${spot.price} night`}</h5>
                {spot.avgStarRating ? (
                  <>
                    <i class="fa-sharp fa-solid fa-star"></i>
                    <h6>{`${spot.avgStarRating.toFixed(2)}·`}</h6>
                    {spot.Reviews.length == 1 ? (
                      <h7>{`1 review`}</h7>
                    ) : (
                      <h7>{`${spot.numReviews} reviews`}</h7>)}
                  </>
                ) : (<>
                  <i class="fa-sharp fa-solid fa-star"></i>
                  <h6>New</h6>
                </>)}
                <OpenModalButton className='reserveButton'
                  buttonText="Reserve"
                  modalComponent={<h2>Feature Coming Soon...</h2>}
                />
              </div>

            </div>


          </div>

          <div className='reviews'>
            {spot.avgStarRating ? (
              <>
                <i class="fa-sharp fa-solid fa-star"></i>
                <h6>{`${spot.avgStarRating.toFixed(2)}`}</h6>
                {spot.Reviews.length == 1 ? (
                  <h7>{`1 review`}</h7>
                ) : (
                  <h7>{`${spot.numReviews} reviews`}</h7>)}
              </>
            ) : (
              <>
                {sessionUser ? (
                  <>
                    <OpenModalButton className='postReviewButton'
                      buttonText="Post Your Review"
                      modalComponent={<CreateReview spot = {spot}/>}
                    />
                    <h2>{`Be the first to post a review!`}</h2>
                  </>
                ) : (<>
                  <i class="fa-sharp fa-solid fa-star"></i>
                  <h6>New</h6></>)}
              </>
            )}
            <ol>
              {reviews && Object.values(reviews).map(({ User, review, updatedAt, userId }) => (
                <div>
                  <h4 className="date">{User.firstName}</h4>
                  <h5 className="date">{parseDate(updatedAt)}</h5>
                  <p >{review}</p>



                  {sessionUser ? (
                  <>
                    <OpenModalButton className='deleteReviewButton'
                      buttonText="Delete"
                      modalComponent={<DeleteReview spot = {spot}/>}
                    />
                    <h2>{`Be the first to post a review!`}</h2>
                  </>
                ) : (<>
                  <i class="fa-sharp fa-solid fa-star"></i>
                  <h6>New</h6></>)}
             


                </div>
              ))}
            </ol>
          </div>


        </>
      }
    </>
  );
};

export default SpotPage;