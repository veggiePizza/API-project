import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createReview, updateReview } from "../../../store/reviews";
import { useModal } from "../../../context/Modal";
import StarRating from "../StarRating";
import './ReviewForm.css';

function ReviewForm({ review, formType }) {
    const dispatch = useDispatch();
    const spot = useSelector(state => state.spots.spot);
    const [reviewText, setReviewText] = useState("");
    const [stars, setStars] = useState(0);

    const [errors, setErrors] = useState([]);
    const { closeModal } = useModal();


    const [validationErrors, setValidationErrors] = useState([]);


    useEffect(() => {
      const errors = [];
  
      if (reviewText.length < 10) errors.push('login is required');
      if (stars === 0) errors.push('pass is required');
      setValidationErrors(errors);
  }, [reviewText, stars])




    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);

        if (formType === "Create Review") {
            return dispatch(createReview(spot.id, stars, reviewText))
                .then(closeModal)
                .catch(
                    async (res) => {
                        const data = await res.json()
                        if (data && data.errors) setErrors(data.errors);
                    }
                );
        }
        else {
            return dispatch(updateReview(review))
                .then(closeModal)
                .catch(
                    async (res) => {
                        const data = await res.json();
                        if (data && data.errors) setErrors(data.errors);
                    }
                );
        }
    };
    const handleRating = (value) => {
        setStars(value);
    }


    return (
        <div className="reviewForm">
            <h1>How was your stay at {`${spot.name}`}?</h1>
            <form onSubmit={handleSubmit}>
                <ul>
                    {Object.values(errors).map((error, idx) => (
                        <li key={idx}>{error}</li>
                    ))}
                </ul>
                <input
                    type="text"
                    placeholder="Leave your review here..."
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    required
                />
                <StarRating change={handleRating} stars={stars} />
                {!validationErrors.length ? (<button type="submit" >Submit Your Review</button>):(<button type="submit" disabled >Submit Your Review</button>)}
            </form>
        </div>
    );
}

export default ReviewForm;