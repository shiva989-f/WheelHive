import axios from 'axios'
import { useAuth } from '../Context/AuthContext';
import { handleError, handleSuccess } from '../Util';
import { useNavigate } from 'react-router-dom';

const AdminCarCard = ({ car }) => {

    const { baseURL } = useAuth()
    const { token } = useAuth();
    const navigate = useNavigate()
    const basePath = '/admin/secure/admin-dashboard/manage-cars/edit/';

    // On Edit button click
    const handleEditClick = (_id) => {
        // When you're navigating between pages in a React app and need to transfer data temporarily you can use state (e.g. , { state: { data: car } }, for editing or pre-filling forms).
        navigate(`${basePath}?id=${_id}`, { state: { data: car } });
    };

    // On Delete button click  
    const handleDeleteClick = async (_id) => {
        handleSuccess("Deleting data, Please wait")
        try {
            if (!token || !_id) {
                handleError("Token or _id is missing")
            }
            const headers = { Authorization: token }
            const res = await axios.delete(`${baseURL}admin/delete-car/${_id}`, { headers })
            handleSuccess(res.data.msg)
        } catch (error) {
            if (!error.response) {
                handleError("Internal server error, Please try again")
            }
            else {
                handleError(error.response.data.msg)
            }
        }
    }

    const { _id, make, model, year, rentedPrice, availability, image, description } = car;
    return (
        <div className='bg-card_gradient m-2 shadow-xl rounded-md w-72 flex-auto'>
            <div className="bg-charcoal rounded-md"><img src={image} alt="" className='w-full aspect-video rounded-md' /></div>
            <div className='p-2'>
                <div className="flex justify-between items-center my-2">
                    <h4 className='text-sm font-bold text-primary mr-2'>{make}</h4>
                    <h4 className='text-sm font-bold text-primary mr-2'>{model}</h4>
                    <h4 className='text-sm font-bold text-primary'>{year}</h4>
                </div>
                <div className="flex justify-between items-center my-2">
                    <h4 className='text-sm font-bold'>₹{rentedPrice}</h4>
                    <h4 className='text-sm font-bold'>{availability ? "Available" : "Unavailable"}</h4>
                </div>
                <p className='text-sm'>{description}</p>
                <div className="my-2 flex justify-between items-center transition-all">
                    <button className='px-6 py-2 bg-primary text-white rounded-md border border-primary hover:bg-transparent hover:text-primary' onClick={() => handleEditClick(_id)}>Edit</button>
                    <button className='px-6 py-2 bg-transparent border border-primary text-primary rounded-md hover:bg-primary hover:text-white' onClick={() => handleDeleteClick(_id)}>Delete</button>
                </div>
            </div>

        </div>
    )
}

export default AdminCarCard
