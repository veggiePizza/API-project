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
  const { id } = useParams();
  let newX = id;
  const dispatch = useDispatch();

  const [deleted, setDeleted] = useState("")
  const spot = useSelector(state => state.spots.spot);
  const reviews = useSelector(state => state.reviews.reviews);
  const sessionUser = useSelector(state => state.session.user);

  let hasReview = "";
  let allowPost = ""



  useEffect(() => {
    dispatch(readSpot(id));
  }, [reviews]);

  useEffect(() => {
    dispatch(getReviews(id));
  }, []);

  function parseDate(date) {
    let parsedDate = new Date(date) + '';
    let dateString = parsedDate.split(' ');
    return `${dateString[1]} ${dateString[3]}`
  }


  if (sessionUser) {

    if (spot && sessionUser.id === spot.ownerId) {

      allowPost = false;
      console.log(allowPost);
    }
    else allowPost = true;


    if (reviews) {
      let check = false;
      Object.values(reviews).forEach(review => {
        if (review.userId === sessionUser.id)
          check = true;
      }
      );

      if (check)
        hasReview = true
      else hasReview = false

    }
  }


  return (
    <>
      {spot
        && <>
          <div className='spotDetails'>
            <h1>{`${spot.name}`}</h1>
            <h2>{`${spot.city}, ${spot.state}, ${spot.country}`}</h2>
            <div className='spotImages'>
              <>{spot.SpotImages &&
                <>
                  {Object.values(spot.SpotImages).length && <>
                    <img className="mainPicture" src={spot.SpotImages[0].url}></img>
                  </>}
                </>

              }
                <div className="sidePictures">
                  {spot.SpotImages && (<>{Object.values(spot.SpotImages).map(({ id,url }) => (
                    <>
                      {spot.SpotImages[0].id != id && <img className="pictures" src={url}></img>}
                    </>
                  ))}</>)}
                </div>
              </>
            </div>

            <div className='reserve'>
              <div className="description">
                {spot.Owner && (<><h2>{`Hosted by ${spot.Owner.firstName} ${spot.Owner.lastName}`}</h2></>)}
                <h4>{`${spot.description}`}</h4>
              </div>


              <div className='reserveMenu'>

                <div className='descriptionBox'>

                  <h4>{`$${spot.price} night`}</h4>

                  <div className="ratingSummary">
                    {spot.avgStarRating ? (
                      <>
                        <i class="fa-sharp fa-solid fa-star"></i>
                        <h6>{`${Number(spot.avgStarRating).toFixed(2)}`}</h6>
                        <h2>·</h2>
                        {spot.Reviews.length == 1 ? (
                          <h7>{`1 review`}</h7>
                        ) : (
                          <h7>{`${spot.numReviews} reviews`}</h7>)}
                      </>
                    ) : (<>
                      <i class="fa-sharp fa-solid fa-star"></i>
                      <h6>New</h6>
                    </>)}
                  </div>
                </div>
                <div className="reserveButton">
                  <OpenModalButton
                    buttonText="Reserve"
                    modalComponent={<h2>Feature Coming Soon...</h2>}
                  /></div>

              </div>

            </div>


          </div>

          <div className='reviews'>


            {spot.avgStarRating ? (
              <>
                <div className='leaveReview'>
                  <div className='ratingSummary2'>

                    <i class="fa-sharp fa-solid fa-star"></i>
                    <h6>{`${Number(spot.avgStarRating).toFixed(2)}`}</h6>
                    {spot.Reviews.length == 1 ? (
                      <h7>{`1 review`}</h7>
                    ) : (
                      <h7>{`${spot.numReviews} reviews`}</h7>)}
                  </div>


                  <div>
                    {!hasReview && <>     {allowPost &&
                      <div className='postReviewButton'>
                        <OpenModalButton
                          buttonText="Post Your Review"
                          modalComponent={<CreateReview />}
                        />
                      </div>
                    }
                    </>}
                  </div>

                </div>

                <ol className='allReviews'>


                  {reviews && Object.values(reviews).map(({ User, id, review, updatedAt, userId }) => (
                    <div>
                      <h4 className="date">{User.firstName}</h4>
                      <h5 className="date">{parseDate(updatedAt)}</h5>
                      <p className='reviewParagraph'>{review}</p>
                      {sessionUser && <>
                        {sessionUser.id === User.id && (
                          <div className='deleteReviewButton'>
                            <OpenModalButton className='deleteReviewButton'
                              buttonText="Delete"
                              modalComponent={<DeleteReview spotId={newX} id={id} />}
                            />
                          </div>
                        )}</>}
                    </div>
                  ))}


                </ol>



              </>
            ) : (
              <>
                {sessionUser ? (
                  <> {allowPost && <><i class="fa-sharp fa-solid fa-star"></i>
                    <h6>New</h6>
                    <div className='postReviewButton'>
                      <OpenModalButton
                        buttonText="Post Your Review"
                        modalComponent={<CreateReview />}
                      />
                    </div>
                    <h2>{`Be the first to post a review!`}</h2></>}

                  </>
                ) : (<>
                  <i class="fa-sharp fa-solid fa-star"></i>
                  <h6>New</h6></>)}
              </>
            )}



          </div>


        </>
      }
    </>
  );
};

export default SpotPage;