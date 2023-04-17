import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteReview } from "../../../store/reviews";
import { useModal } from "../../../context/Modal";

function DeleteReview(id) {
    const [confirm, setConfirm] = useState("");
    const dispatch = useDispatch();
    const { closeModal } = useModal();

console.log(id)

    if (confirm === "delete") {
        dispatch(deleteReview(id.id, id.spotId )).then(closeModal);
    }
    else if (confirm === "keep") {
        closeModal()
    }

    return (
        <>
            <h1>Confirm Delete</h1>
            <h2>Are you sure you want to delete this review?</h2>
            <button onClick={() => setConfirm("delete")}>Yes (Delete Review)</button>
            <button onClick={() => setConfirm("keep")}>No (Keep Review)</button>
        </>
    )
}

export default DeleteReview