import { csrfFetch } from "./csrf";

export const addImage = (id, image) => async dispatch => {
    console.log("here")
    console.log(id,image)
    console.log("here")

    const response = await csrfFetch(`/api/spots/${id}/images`, {
        method: 'POST',
        body: JSON.stringify({url:image, preview:true})
    });
}