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
import "./UpdateSpotForm.css";

function UpdateSpotForm({ spot, formType }) {
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

        const spot2={
            address: "1542 Some Address",
            city: "San Francisco",
            country: "United States",
            description: "Place where web developers are created",
            lat: "37.7645358",
            lng: "122.4730327",
            name: "App Academy",
            price: "123",
            state: "California"
        }

        const spotImages2 =["https://www.science.org/do/10.1126/science.abd8020/abs/frog_1280p_0.jpg",
    "https://media.australian.museum/media/dd/images/Some_image.width-1600.4c73ba1.jpg",
"https://media.australian.museum/media/dd/images/Some_image.width-1600.4c73ba1.jpg",
"https://media.australian.museum/media/dd/images/Some_image.width-1600.4c73ba1.jpg",
"https://media.australian.museum/media/dd/images/Some_image.width-1600.4c73ba1.jpg"]

        if (formType === "Update Spot") {
            dispatch(updateSpot(spot))
            /*dispatch(addImage(newId, spotImg))*/

        }

    


        //history.push(`/spots/${spot.id}`);


        /* const contactUsInformation = {
           name,
           email,
           phone,
           phoneType,
           comments,
           submittedOn: new Date()
         };*/

        // Ideally, we'd persist this information to a database using a RESTful API.
        // For now, though, just log the contact us information to the console.
        //console.log(contactUsInformation);
        /*
            // Reset the form state.
            setName('');
            setEmail('');
            setPhone('');
            setPhoneType('');
            setComments('');
            //!!START SILENT
            setValidationErrors([]);
            setHasSubmitted(false);*/
        //!!END

    }

    if(idx){
        console.log("%%%%%")
        console.log(idx.id)
        console.log("%%%%%")
        history.push(`/spots/${idx.id}`);
    }

    return (
        <div className='uspotForm'>
            <h1>Update Your Spot</h1>
            <h2>Where's your place located?</h2>
            <h3>Guests will only get your exact address once they booked a reservation</h3>

            <form onSubmit={onSubmit}>

                <div className='uspotLocation'>
                    <div className='ucountry'>
                        <label htmlFor='name'>Country</label>
                        <input
                            id='Country'
                            placeholder="Country"
                            type='text'
                            onChange={e => setCountry(e.target.value)}
                            value={country}
                        />
                    </div>
                    <div className='uaddress'>
                        <label htmlFor='email'>Street Address</label>
                        <input
                            id='address'
                            placeholder="Address"
                            type='text'
                            onChange={e => setAddress(e.target.value)}
                            value={address}
                        />
                    </div>
                    <div className='ucity'>
                        <label htmlFor='phone'>City</label>
                        <input
                            id='phone'
                            placeholder="City"
                            type='text'
                            onChange={e => setCity(e.target.value)}
                            value={city}
                        />
                    </div>
                    <div className='ustate'>
                        <label htmlFor='comments'>State</label>
                        <textarea
                            id='comments'
                            placeholder="STATE"
                            name='comments'
                            onChange={e => setState(e.target.value)}
                            value={state}
                        />
                    </div>
                    <div className='ulat'>
                        <label htmlFor='comments'>Latitude</label>
                        <textarea
                            id='comments'
                            placeholder="Latitude"
                            name='comments'
                            onChange={e => setLat(e.target.value)}
                            value={lat}
                        />
                    </div>
                    <div className='ulng'>
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

                <div className='udescription'>
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
                <div>
                    <label htmlFor='comments'>Create a title for your spot</label>
                    <h1>Catch guests' attention with a spot title that highlights what makes your place special.</h1>
                    <textarea
                        id='comments'
                        placeholder="Name of your spot"
                        name='comments'
                        onChange={e => setName(e.target.value)}
                        value={name}
                    />
                </div>

                <div>
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
                <div>
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

                <button type="submit">Update Your Spot</button>
            </form>
        </div>
    );
}

export default UpdateSpotForm;

