import { csrfFetch } from "./csrf";

export const addImage = (id, image) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${id}/images`, {
        method: 'POST',
        body: JSON.stringify({url:image, preview:true})
    });
}
export const updateImage = (id, image) => async dispatch => {
    const response = await csrfFetch(`/api/spot-images/${id}`, {
        method: 'PUT',
        body: JSON.stringify({url:image})
    });
}
export const deleteImage = (id) => async dispatch => {
    const response = await csrfFetch(`/api/spot-images/${id}`, {
        method: 'DELETE',
    });
};