const LOAD_ALL = 'reviews/LOAD_ALL';

const loadReviews = reviews => ({
    type: LOAD_ALL,
    reviews
});

export const getReviews = (id) => async dispatch => {
    const response = await fetch(`/api/spots/${id}/reviews`);
    if (response.ok) {
        const reviews = await response.json();
        dispatch(loadReviews(reviews));
    }
};

const initialState = {reviews: []};

const reviews = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_ALL:
            const allReviews = {}

            action.reviews.Reviews.forEach(review => {
                allReviews[review.id] = review
            });
            return {
                ...state, reviews: allReviews
            };
        default:
            return state;
    }

}

export default reviews;