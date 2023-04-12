const LOAD = 'spots/LOAD';
const CREATE = 'spots/CREATE';
const READ = 'spots/READ';
const UPDATE = 'spots/UPDATE'
const DELETE = 'spots/DELETE';

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
const deleteOneSpot = spot => ({
    type: DELETE,
    spot
});

export const getSpots = () => async dispatch => {
    const response = await fetch(`/api/spots`);
    if (response.ok) {
        const spots = await response.json();
        dispatch(loadSpots(spots));
    }
};
export const createSpot = (spot) => async dispatch => {
          console.log("****")
        console.log(spot);
        console.log("****")

    const response = await fetch(`/api/spots`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(spot)
    });
    if (response.ok) {
        const newSpot = await response.json();
        
        //dispatch(createOneSpot(newSpot));
    }

};
export const readSpot = (id) => async dispatch => {
    const response = await fetch(`/api/spots/${id}`);
    if (response.ok) {
        const spot = await response.json();
        dispatch(readOneSpot(spot));
    }
};
export const updateSpot = (id) => async dispatch => {
    const response = await fetch(`/api/spots/${id}`);
    if (response.ok) {
        const spot = await response.json();
        dispatch(updateOneSpot(spot));
    }
};
export const deleteSpot = (id) => async dispatch => {
    const response = await fetch(`/api/spots/${id}`);
    if (response.ok) {
        const spot = await response.json();
        dispatch(deleteOneSpot(spot));
    }
};
const initialState = { spots: [], isLoading: true };

const spots = (state = initialState, action) => {
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

export default spots;