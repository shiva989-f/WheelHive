import { useState } from "react";
import { MdClose } from "react-icons/md";
import { handleError, handleSuccess } from "../Util";
import { ToastContainer } from "react-toastify";
import { useAuth } from "../Context/AuthContext";
import axios from "axios";

const CarDetailPopup = ({ data, isOpen, onClose }) => {
    if (!isOpen) return null
    const { baseURL, token } = useAuth()
    const { _id, make, model, image, rentedPrice, year, description } = data;
    const [totalPriceMSG, setTotalPriceMSG] = useState('');
    const [dates, setDates] = useState({
        startDate: "",
        endDate: ""
    })

    const [bookingInfo, setBookingInfo] = useState({
        carId: _id,
        startDate: "",
        endDate: "",
        isReturned: false,
        totalPrice: "",
    })

    const [isConfirmBtn, setIsConfirmBtn] = useState(false)

    const handleInput = (e) => {
        setDates((prevDates) => ({ ...prevDates, [e.target.name]: e.target.value }));
        setIsConfirmBtn(false)
    }

    const calculatePrice = () => {
        const { startDate, endDate } = dates
        if (!startDate || !endDate) {
            return handleError("Please select 'Rent from' and 'Rent to' date")
        }
        const currentDate = new Date().setHours(0, 0, 0, 0); // Ensures dates are compared without time differences. Midnight for accurate comparison
        const dateStart = new Date(startDate).setHours(0, 0, 0, 0);
        const dateEnd = new Date(endDate).setHours(0, 0, 0, 0);

        if (dateStart < currentDate) {
            handleError("'Rent from' date cannot be in the past. Please select a future date.")
        }
        else if (dateEnd <= dateStart) {
            handleError("'Rent to' date cannot be before or the same as the 'Rent from' date.");
        }
        else {
            const days = Math.ceil((dateEnd - dateStart) / (1000 * 60 * 60 * 24)); // Convert milliseconds to days
            const totalPrice = (rentedPrice * days)

            setBookingInfo({ carId: _id, startDate: dateStart, endDate: dateEnd, isReturned: false, totalPrice })
            setTotalPriceMSG(`Your total amount for ${days} days is ${totalPrice.toLocaleString("en-IN", {
                style: "currency",
                currency: "INR",
            })}`)
            // After checking date and calculating total amount changing isConfirmBtn to true so if user click again it hit the rent api instead of calculating price
            setIsConfirmBtn(true)

        }
    }

    const headers = { Authorization: token }

    // Creates payment order
    const handlePayment = async () => {
        try {
            const amount = bookingInfo.totalPrice
            const res = await axios.post(`${baseURL}payment/order`, { totalPrice: amount }, { headers })
            handlePaymentVerify(res.data.order)
        }
        catch (error) {
            handleError(error.response?.data?.msg || "An error occurred");
        }
    }

    // handlePaymentVerify Function
    const handlePaymentVerify = async (data) => {
        const { carId, startDate, endDate, isReturned, totalPrice } = bookingInfo
        const options = {
            key: import.meta.env.VITE_RAZORPAY_KEY_ID,
            amount: data.amount,
            currency: data.currency,
            name: "WheelHive",
            description: "Test Mode",
            order_id: data.id,
            handler: async (response) => {
                const dataSet = {
                    razorpay_order_id: response.razorpay_order_id,
                    razorpay_payment_id: response.razorpay_payment_id,
                    razorpay_signature: response.razorpay_signature,
                    carId,
                    startDate,
                    endDate,
                    isReturned,
                    totalPrice
                }
                try {
                    const res = await axios.post(`${baseURL}payment/verify`, dataSet, { headers })
                    console.log(res);
                    
                    if (res.data.msg) {
                        // After payment close car popup
                        handleSuccess(res.data.msg)
                        setTimeout(() => {
                            console.log("Closing popup after payment");
                            onClose()
                        }, 2000);
                    }
                } catch (error) {
                    console.log(error);
                }
            },
            theme: {
                color: "#e25300"
            }
        };
        const rzp1 = new window.Razorpay(options);
        rzp1.open();

    }

    const handleRentBtn = () => {
        if (!isConfirmBtn) {
            calculatePrice()
        }
        else {
            const { carId, startDate, endDate, totalPrice } = bookingInfo
            if (!carId || !startDate || !endDate || !totalPrice) {
                console.log(bookingInfo);

                return handleError("Something went wrong!")
            }
            handlePayment()
        
        }

    }

    return (
        <div className="fixed inset-0 bg-opacity-30 backdrop-blur-md flex justify-center ">
            <div className="flex flex-col justify-center items-center p-4 sm:w-8/12">
                <button
                    onClick={onClose}
                    className="text-2xl self-end"
                ><MdClose /></button>

                <div className="bg-card_gradient rounded-md p-4 sm:p-6 flex flex-col">
                    <h2 className='text-xl sm:text-2xl font-bold text-primary mb-2'>{`${make} ${model}`}</h2>
                    <img src={image} alt="" className='w-2/3 md:w-2/4 rounded-md aspect-video self-center' />

                    <div className="flex justify-between">
                        <h2 className='text-sm sm:text-xl font-bold my-4'>{year}</h2>
                        <h2 className='text-sm sm:text-xl font-bold my-4'>₹{rentedPrice}<sub className='text-xs font-light'>/day</sub></h2>
                    </div>

                    <p className="text-sm sm:text-base mb-2 ">{description}</p>

                    <div className="flex flex-col items-center gap-1 my-2 sm:gap-4 ">
                        <div className="sm:flex sm:gap-4 sm:justify-between sm:items-center w-full">
                            <label htmlFor="start-date" className="text-sm sm:text-base">Rent from</label>
                            <input type="date" name="startDate" id="start-date" className="border-border border rounded-md w-full bg-transparent outline-none px-2 py-1 sm:w-2/4" value={dates.startDate} onChange={handleInput} />
                        </div>

                        <div className="sm:flex sm:gap-4 sm:justify-between sm:items-center w-full">
                            <label htmlFor="end-date" className="text-sm sm:text-base">Rent to</label>
                            <input type="date" name="endDate" id="end-date" className="border-border border rounded-md w-full bg-transparent outline-none px-2 py-1 sm:w-2/4" value={dates.endDate} onChange={handleInput} />
                        </div>

                        <p className="text-sm sm:text-base mb-2 ">{totalPriceMSG}</p>
                    </div>

                    <button className='w-full px-6 py-2 bg-primary text-white rounded-md border border-primary hover:bg-transparent hover:text-primary self-center mt-2 sm:w-2/4' onClick={handleRentBtn}>{isConfirmBtn ? "Confirm" : "Rent"}</button>
                </div>
            </div>
            <ToastContainer />
        </div>
    )
}

export default CarDetailPopup
