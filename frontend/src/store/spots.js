import { csrfFetch } from "./csrf";
import { addImage } from "./images";

const LOAD = 'spots/LOAD';
const CREATE = 'spots/CREATE';
const READ = 'spots/READ';
const UPDATE = 'spots/UPDATE'
const DELETE = 'spots/DELETE';
const RESET_SPOT = 'spots/RESET_SPOT'

const resetSpot = () => ({
    type: RESET_SPOT,
});

const loadSpots = spots => ({
    type: LOAD,
    spots
});
const createOneSpot = spot => ({
    type: CREATE,
    spot
});
const readOneSpot = spot => ({
    type: READ,
    spot
});
const updateOneSpot = spot => ({
    type: UPDATE,
    spot
});
const deleteOneSpot = id => ({
    type: DELETE,
    id
});

export const resetSingleSpot = () => async dispatch => {
    dispatch(resetSpot())
}
export const getSpots = () => async dispatch => {
    const response = await csrfFetch(`/api/spots`);
    if (response.ok) {
        const spots = await response.json();
        dispatch(loadSpots(spots.Spots));
    }
};
export const createSpot = (spot,images) => async dispatch => {
    const response = await csrfFetch(`/api/spots`, {
        method: 'POST',
        body: JSON.stringify(spot)
    });
    if (response.ok) {
        const newSpot = await response.json();
        dispatch(createOneSpot(newSpot))

        images.forEach(img => {
            dispatch(addImage(newSpot.id,img))
        });
    


    }
}

export const readSpot = (id) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${id}`);
    if (response.ok) {
        const spot = await response.json();
        dispatch(readOneSpot(spot));
    }
};
export const updateSpot = (id, spot) => async dispatch => {
    const response = await fetch(`/api/spots/${id}`, {
        method: 'PUT',
        body: JSON.stringify(spot)
    });
    if (response.ok) {
        const spot = await response.json();
        dispatch(updateOneSpot(spot));
    }
};
export const deleteSpot = (id) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${id}`, {
        method: 'DELETE',
    });
    if (response.ok) {
        dispatch(deleteOneSpot(id));
    }
};
export const getUserSpots = () => async dispatch => {
    const response = await csrfFetch(`/api/spots/current`);
    if (response.ok) {
        const spots = await response.json();
        dispatch(loadSpots(spots));
    }
};

const initialState = { spots: [], isLoading: true };

const spots = (state = initialState, action) => {
    switch (action.type) {
        case LOAD:
            const allSpots = {}
            action.spots.forEach(spot => {
                allSpots[spot.id] = spot
            });
            return {
                ...state, spots: allSpots
            };
        case READ:
            const newState = { ...state, spot: action.spot };
            return newState;
        case DELETE:
           
            const newState2 = { ...state };
            console.log(newState2.spots)
            console.log(newState2.spots[action.id])
            delete newState2.spots[action.id];
            return newState2;
        case CREATE:
            const addedSpotState = { ...state, spot: action.spot };
            //newState[action.id];
            return addedSpotState;
        case RESET_SPOT:
            return initialState
        default:
            return state;
    }

}

export default spots;