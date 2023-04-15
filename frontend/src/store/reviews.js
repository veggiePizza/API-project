import { csrfFetch } from "./csrf";
const LOAD_ALL = 'reviews/LOAD_ALL';

const loadReviews = reviews => ({
    type: LOAD_ALL,
    reviews
});

export const getReviews = (id) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${id}/reviews`);
    if (response.ok) {
        const reviews = await response.json();
        dispatch(loadReviews(reviews));
    }
};

export const createReview = (id, stars, reviewText) => async dispatch => {
    console.log(id);
    const response = await csrfFetch(`/api/spots/${id}/reviews`, {
        method: 'POST',
        body: JSON.stringify({review:reviewText,stars})
    });
    dispatch(getReviews(id))

}
export const updateReview = (id, review) => async dispatch => {
    const response = await fetch(`/api/reviews/${id}`,{
        method: 'PUT',
        body: JSON.stringify(review)
    });
    if (response.ok) {
        const spot = await response.json();
        //dispatch(updateOneSpot(spot));
    }
};
export const deleteReview = (id) => async dispatch => {
    const response = await fetch(`/api/reviews/${id}`,{
        method: 'DELETE',
    });
    if (response.ok) {
        const spot = await response.json();
        //dispatch(deleteOneSpot(spot));
    }
};

const initialState = {reviews: []};

const reviews = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_ALL:
            const allReviews = {}
            let idx = 0;
            action.reviews.Reviews.forEach(review => {                
                allReviews[idx] = review
                idx++;
            });
            return {
                ...state, reviews: allReviews
            };
        default:
            return state;
    }

}

export default reviews;