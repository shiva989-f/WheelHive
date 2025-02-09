import React from 'react'
import { useAuth } from '../Context/AuthContext';
import axios from 'axios';
import { handleError, handleSuccess } from '../Util';

const BookedCarCard = ({ item }) => {

    const { baseURL, token } = useAuth()
    const headers = { Authorization: token }
    const startFormattedDate = new Date(item.startDate).toLocaleDateString("en-GB");

    const endFormattedDate = new Date(item.endDate).toLocaleDateString("en-GB");

    const handleReturnBtn = async (id, carId) => {
        try {
            const res = await axios.post(`${baseURL}admin/return-cars`, { id, carId }, { headers })
            handleSuccess(res.data.msg)
        } catch (error) {
            if (!error.response) {
                handleError("Internal server error, Please try again")
            } else {
                handleError(error.response.data.msg)
            }
        }

    }


    return (
        <div>
            <div className='bg-card_gradient m-2 shadow-xl rounded-md w-72 flex-auto'>
                <div className="bg-charcoal rounded-md"><img src={item.carId.image} alt="" className='w-full aspect-video rounded-md' /></div>
                <div className='p-2'>
                    <div className="flex justify-between items-center my-2">
                        <h4 className='text-sm font-bold text-primary mr-2'>{item.carId.make}</h4>
                        <h4 className='text-sm font-bold text-primary mr-2'>{item.carId.model}</h4>
                    </div>
                    <div className="flex justify-between items-center my-2">
                        <h4 className='text-sm font-bold'>₹{item.totalPrice}</h4>
                        <h4 className='text-sm font-bold'>{item.isReturned ? "Returned" : "Not returned"}</h4>
                    </div>
                    <div className="flex justify-between items-center my-2">
                        <h4 className='text-xs mr-2'>Rented On: {startFormattedDate}</h4>
                        <h4 className='text-xs mr-2'>Last Date: {endFormattedDate}</h4>
                    </div>
                    <p className='text-xs text-blue-600'><span className='text-black'>Rented By: </span>{item.email}</p>
                    <button className={`w-full px-6 py-2 mt-2 bg-primary text-white rounded-md border border-primary hover:bg-transparent hover:text-primary 
    ${item.isReturned ? "opacity-50 cursor-not-allowed" : ""}`}
                        onClick={() => handleReturnBtn(item._id, item.carId._id)}
                        disabled={item.isReturned} 
                    >
                        Return
                    </button>

                </div>

            </div>
        </div>
    )
}

export default BookedCarCard
