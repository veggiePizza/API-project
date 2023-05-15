import UpdateSpotForm from '../UpdateSpotForm';
import { useDispatch } from 'react-redux';
import { readSpot } from "../../../store/spots";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const UpdateSpot = (id) => {
    const currSpot = useSelector(state => state.spots.spot);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(readSpot(id.id));
    }, []);
    if (currSpot) {
        const spot = {
            address: currSpot.address,
            city: currSpot.city,
            state: currSpot.state,
            country: currSpot.country,
            lat: currSpot.lat,
            lng: currSpot.lng,
            name: currSpot.name,
            description: currSpot.description,
            price: currSpot.price,
            mainImg: currSpot.SpotImages[0].url,
            img2: currSpot.SpotImages[1].url,
            img3: currSpot.SpotImages[2].url,
            img4: currSpot.SpotImages[3].url,
            img5: currSpot.SpotImages[4].url,
        }
console.log(spot)
        return (<UpdateSpotForm spot={spot} formType="Update Spot" />
        );
    }
}

export default UpdateSpot;
