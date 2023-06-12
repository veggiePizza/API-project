import SpotForm from "../SpotForm"
import { useDispatch } from 'react-redux';
import { resetSingleSpot } from "../../../store/spots";

const CreateSpot = () => {
    const dispatch = useDispatch();
    dispatch(resetSingleSpot());

    const spot = {
        address: '',
        city: '',
        state: '',
        country: '',
        lat: '',
        lng: '',
        name: '',
        description: '',
        price: ''
    }

    return (<SpotForm spot={spot} />);
}

export default CreateSpot;
