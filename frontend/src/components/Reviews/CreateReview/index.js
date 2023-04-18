import ReviewForm from "../ReviewForm"

const CreateReview = () => {
    const review = {
        review: '',
        stars: ''
    }

    return (
        <ReviewForm review={review} formType="Create Review"/>
    );
}

export default CreateReview;
