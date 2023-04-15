import { csrfFetch } from "./csrf";

export const addImage = (id, image) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${id}/images`, {
        method: 'POST',
        body: JSON.stringify(image)
    });
}

const initialState = { spots: [], isLoading: true };

const images = (state = initialState, action) => {
    switch (action.type) {
        case LOAD:
            const allSpots = {}
            action.spots.Spots.forEach(spot => {
                allSpots[spot.id] = spot
            });
            return {
                ...state, spots: allSpots
            };
        case READ:
            const newState = { ...state, spot: action.spot };
            return newState;
        default:
            return state;
    }

}

export default images;