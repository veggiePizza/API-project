import ReviewForm from "../ReviewForm"

const CreateReview = (spot) => {
    const review = {
        review: '',
        stars: ''
    }

    return (
        <ReviewForm review={review} formType="Create Review" spot = {spot}/>
    );
}

export default CreateReview;
