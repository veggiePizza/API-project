import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createSpot, updateSpot } from '../../../store/spots';
import { useDispatch } from 'react-redux';
import { addImage } from '../../../store/images';
import { getSpots } from '../../../store/spots';
import { readSpot } from '../../../store/spots';
import CreateImage from '../../Images/CreateImage';
import { resetSingleSpot } from '../../../store/spots';
import "./SpotForm.css";

function SpotForm({ spot, formType }) {
    const idx = useSelector(state => state.spots.spot);
    const history = useHistory();
    const [address, setAddress] = useState(spot.address);
    const [city, setCity] = useState(spot.city);
    const [state, setState] = useState(spot.state);
    const [country, setCountry] = useState(spot.country);
    const [lat, setLat] = useState(spot.lat);
    const [lng, setLng] = useState(spot.lng);
    const [name, setName] = useState(spot.name);
    const [description, setDescription] = useState(spot.description);
    const [price, setPrice] = useState(spot.price);
    const [mainImg, setMainImg] = useState('');
    const [img2, setImg2] = useState('');
    const [img3, setImg3] = useState('');
    const [img4, setImg4] = useState('');
    const [img5, setImg5] = useState('');
    const [validationErrors, setValidationErrors] = useState([]);
    const [successfulSubmit, setSuccessfullSubmit] = useState(false);
    const [postErrors, setPostErrors] = useState([]);

    const dispatch = useDispatch();



    useEffect(() => {
        const errors = [];

        if (!address.length) errors.push(' is required');
        if (!city.length) errors.push(' is required');
        if (!state.length) errors.push(' is required');
        if (!country.length) errors.push(' is required');
        if (!lat.length) errors.push(' is required');
        if (!lng.length) errors.push(' is required');
        if (!name.length) errors.push(' is required');
        if (!description.length) errors.push(' is required');
        if (!price.length) errors.push(' is required');
        if (!mainImg.length) errors.push(' is required');
        setValidationErrors(errors);
    }, [address, city, state, country, lat, lng, name, description, price, mainImg])


    const onSubmit = e => {
        
        e.preventDefault();
        setSuccessfullSubmit(false)
        //if (validationErrors.length) return alert(`Cannot Submit`);

        spot = { ...spot, address, city, state, country, lat, lng, name, description, price };
        const spotImages = [mainImg, img2, img3, img4, img5]




        if (formType === "Create Spot") {
            dispatch(createSpot(spot, spotImages))

        }

    }

    if(idx){
        console.log("%%%%%")
        console.log(idx.id)
        console.log("%%%%%")
        history.push(`/spots/${idx.id}`);
    }

    return (
        <div className='spotForm'>
            <h1>Create a New Spot</h1>
            <h2>Where's your place located?</h2>
            <h3>Guests will only get your exact address once they booked a reservation</h3>

            <form onSubmit={onSubmit}>

                <div className='spotLocation'>
                    <div className='country'>
                        <label htmlFor='name'>Country</label>
                        <input
                            id='Country'
                            placeholder="Country"
                            type='text'
                            onChange={e => setCountry(e.target.value)}
                            value={country}
                        />
                    </div>
                    <div className='address'>
                        <label htmlFor='email'>Street Address</label>
                        <input
                            id='address'
                            placeholder="Address"
                            type='text'
                            onChange={e => setAddress(e.target.value)}
                            value={address}
                        />
                    </div>
                    <div className='city'>
                        <label htmlFor='phone'>City</label>
                        <input
                            id='phone'
                            placeholder="City"
                            type='text'
                            onChange={e => setCity(e.target.value)}
                            value={city}
                        />
                    </div>
                    <div className='state'>
                        <label htmlFor='comments'>State</label>
                        <input
                            id='comments'
                            placeholder="STATE"
                            name='comments'
                            onChange={e => setState(e.target.value)}
                            value={state}
                        />
                    </div>
                    <div className='lat'>
                        <label htmlFor='comments'>Latitude</label>
                        <textarea
                            id='comments'
                            placeholder="Latitude"
                            name='comments'
                            onChange={e => setLat(e.target.value)}
                            value={lat}
                        />
                    </div>
                    <div className='lng'>
                        <label htmlFor='comments'>Longitude</label>
                        <textarea
                            id='comments'
                            placeholder="Longitude"
                            name='comments'
                            onChange={e => setLng(e.target.value)}
                            value={lng}
                        />
                    </div>
                </div>

                <div className='description'>
                    <label htmlFor='comments'>Describe your place to guests</label>
                    <h1>Mention the best features of your space, any special amentities like fast wifi or parking, and what you love about the neighborhood.</h1>
                    <textarea
                        id='comments'
                        placeholder="Description"
                        name='comments'
                        onChange={e => setDescription(e.target.value)}
                        value={description}
                    />
                </div>
                <div className='title'>
                    <label className='name'>Create a title for your spot</label>
                    <h1>Catch guests' attention with a spot title that highlights what makes your place special.</h1>
                    <textarea
                        id='comments'
                        placeholder="Name of your spot"
                        name='comments'
                        onChange={e => setName(e.target.value)}
                        value={name}
                    />
                </div>

                <div className='title'>
                    <label htmlFor='comments'>Set a base price for your spot</label>
                    <h1>Competitive pricing can help your listing stand out and rank higher in search results.</h1>
                    <textarea
                        id='comments'
                        placeholder="Price per night (USD)"
                        name='comments'
                        onChange={e => setPrice(e.target.value)}
                        value={price}
                    />
                </div>
                <div className='title'>
                    <label htmlFor='comments'>Liven up your spot with photos</label>
                    <h1>Submit a link to at least one photo to publish your spot.</h1>
                    <textarea
                        id='comments'
                        placeholder="Preview Image URL"
                        name='comments'
                        onChange={e => setMainImg(e.target.value)}
                        value={mainImg}
                    />

                    <textarea
                        id='comments'
                        placeholder="Image URL"
                        name='comments'
                        onChange={e => setImg2(e.target.value)}
                        value={img2}
                    />
                    <textarea
                        id='comments'
                        placeholder="Image URL"
                        name='comments'
                        onChange={e => setImg3(e.target.value)}
                        value={img3}
                    />
                    <textarea
                        id='comments'
                        placeholder="Image URL"
                        name='comments'
                        onChange={e => setImg4(e.target.value)}
                        value={img4}
                    />
                    <textarea
                        id='comments'
                        placeholder="Image URL"
                        name='comments'
                        onChange={e => setImg5(e.target.value)}
                        value={img5}
                    />



                </div>

                <button type="submit">Create Spot</button>
            </form>
        </div>
    );
}

export default SpotForm;


/*


*/