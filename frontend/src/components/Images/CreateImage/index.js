import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createSpot, updateSpot } from '../../../store/spots';
import { useDispatch } from 'react-redux';
import { addImage } from '../../../store/images';
import { getSpots } from '../../../store/spots';
import { readSpot } from '../../../store/spots';
import "./CreateImage.css";

function CreateImage() {
    const spot = useSelector(state => state.spots.spot);
    console.log("crating image")
    console.log(spot)
    console.log("crating image")

}

export default CreateImage