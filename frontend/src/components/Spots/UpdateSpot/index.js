import UpdateSpotForm from '../UpdateSpotForm';
import { useDispatch } from 'react-redux';
import { readSpot } from "../../../store/spots";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams } from 'react-router-dom';

const UpdateSpot = () => {
    const { id } = useParams();
    const currSpot = useSelector(state => state.spots.spot);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(readSpot(id));
    }, []);

    if (currSpot) {
        const spot = {
            id: currSpot.id,
            address: currSpot.address,
            city: currSpot.city,
            state: currSpot.state,
            country: currSpot.country,
            lat: currSpot.lat,
            lng: currSpot.lng,
            name: currSpot.name,
            description: currSpot.description,
            price: currSpot.price
        }

        const spotImages = currSpot.SpotImages;
        for (let i = currSpot.SpotImages.length; i < 5; i++) {
            spotImages.push({ id: null, url: "" })
        }
        
        return (<UpdateSpotForm spot={spot} spotImages={spotImages} />);
    }
}

export default UpdateSpot;
