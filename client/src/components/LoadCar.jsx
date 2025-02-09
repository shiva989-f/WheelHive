import { useState, useEffect } from 'react';
import { useAuth } from '../Context/AuthContext';
import ShimmerCard from './ShimmerCard';
import { handleError } from '../Util';
import axios from 'axios';
import CarDetailPopup from './CarDetailPopup';
import CarSearchBar from './CarSearchBar';

const LoadCar = () => {

    const { baseURL } = useAuth()
    const [allCars, setAllCars] = useState([]);
    const [isDataLoaded, setIsDataLoaded] = useState(false);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [popUpCarData, setPopUpCarData] = useState({});
    const [searchQuery, setSearchQuery] = useState("");

    const fetchData = async () => {
        try {
            const res = await axios.get(`${baseURL}all-cars`)
            setAllCars(res.data.data)
            // setFilteredCars(res.data.data); 
            setTimeout(() => {
                setIsDataLoaded(true)
            }, 2000);
        } catch (error) {
            if (!error.response) {
                handleError("Internal server error, Please try again")
            } else {
                handleError(error.response.data.msg)
            }
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    // Handle search input change
    const handleSearch = (query) => {
        setSearchQuery(query.toLowerCase());
    };

    // Handle details button
    const handleDetailBtn = (item) => {
        setIsPopupOpen(true)
        setPopUpCarData(item)
    }

    // Filters allCars to create a new array filteredCars, keeping only those cars whose make or model (converted to lowercase) includes the searchQuery. The includes() method ensures partial matches, allowing users to find cars even if they type only part of the name and show all data from all cars if query is empty.
    const filteredCars = allCars.filter((car) =>
        car.make.toLowerCase().includes(searchQuery) || car.model.toLowerCase().includes(searchQuery)
    );

    return (
        <>
            <CarSearchBar searchQuery={searchQuery} onSearch={handleSearch} />
            <div className='grid place-items-center grid-cols-1 mx-4 sm:grid-cols-2 lg:grid-cols-3 gap-6 my-4 relative' id='explore-cars'>

                {
                    // Check if data has been loaded
                    isDataLoaded ?
                        // Check if 'allCars' is a non-empty array
                        Array.isArray(filteredCars) && filteredCars.length > 0 ? (
                            // If data is available, map through the array of cars and render AdminCarCard for each item
                            filteredCars.map((item, index) => (
                                item.availability ? <div key={index} className='w-full bg-card_gradient m-2 shadow-xl rounded-md flex-auto p-4'>
                                    <h2 className='text-2xl font-bold text-primary mr-2'>{`${item.make} ${item.model}`}</h2>
                                    <h2 className='text-xl font-bold mr-2 my-4'>₹{item.rentedPrice}<sub className='text-xs font-light'>/day</sub></h2>
                                    <img src={item.image} alt="" className='w-full rounded-md aspect-video ' />
                                    <div className="mt-4 text-end transition-all">
                                        <button className='px-6 py-2 bg-primary text-white rounded-md border border-primary hover:bg-transparent hover:text-primary' onClick={() => handleDetailBtn(item)}>Details</button>
                                    </div>
                                </div> : null

                            ))
                        ) : (
                            // If no data is available, show an error page with a relevant message
                            <div className='w-full h-full flex justify-center items-center'><p>No Cars Found</p></div>
                        )
                        :
                        // If data is still loading, render 10 ShimmerCard components as a loading indicator
                        ([...Array(10)].map((_, index) => <ShimmerCard key={index} />))
                }

                {/* CarDetailPopup screen */}
                <CarDetailPopup data={popUpCarData} isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)} />

            </div>
        </>
    )
}

export default LoadCar
