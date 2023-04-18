import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteSpot } from "../../../store/spots";
import { useModal } from "../../../context/Modal";
import { getUserSpots } from "../../../store/spots";

function DeleteSpot(id){
    const [confirm, setConfirm] = useState("");
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    if (confirm === "delete") {
        dispatch(deleteSpot(id.id)).then(closeModal);
        console.log("hey what is going on literally")
        dispatch(getUserSpots())
    }
    else if (confirm === "keep") {
        closeModal()
    }


    return(
        <div className="confirmDelete">
            <h1>Confirm Delete</h1>
            <h2>Are you sure you want to remove this spot from the listings?</h2>
            <button className = "confirmDelete" onClick={() => setConfirm("delete")}>Yes (Delete Spot)</button>
            <button className = "cancelDelete"onClick={() => setConfirm("keep")}>No (Keep Spot)</button>
        </div>
    )
}

export default DeleteSpot