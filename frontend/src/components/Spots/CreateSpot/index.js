import SpotForm from "../SpotForm"

const CreateReportForm = () => {
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

    return (
        <SpotForm spot={spot} formType="Create Spot" />
    );
}

export default CreateReportForm;
