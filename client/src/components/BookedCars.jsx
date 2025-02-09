import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { handleError } from '../Util'
import ErrorPage from './ErrorPage'
import ShimmerCard from './ShimmerCard'
import { useAuth } from '../Context/AuthContext'
import BookedCarCard from './BookedCarCard'

const BookedCars = () => {
    const { baseURL, token } = useAuth()
    const [allCars, setAllCars] = useState([]);
    const [isDataLoaded, setIsDataLoaded] = useState(false);

    const headers = { Authorization: token }

    const fetchData = async () => {
        try {
            const res = await axios.get(`${baseURL}admin/booked-cars`, {headers})
            setAllCars(res.data.data)
            
            setInterval(() => {
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

    return (
        <>
            {
                // Check if data has been loaded
                isDataLoaded ?
                    // Check if 'allCars' is a non-empty array
                    Array.isArray(allCars) && allCars.length > 0 ? (
                        // If data is available, map through the array of cars and render AdminCarCard for each item
                        <div className="flex justify-evenly flex-wrap ">
                            {allCars.map((item, index) => (
                                <BookedCarCard item={item} key={index}/>
                            ))}
                        </div>
                    ) : (
                        // If no data is available, show an error page with a relevant message
                        <ErrorPage msg="Data is not available" />
                    )
                    :
                    // If data is still loading, render 10 ShimmerCard components as a loading indicator
                    (<div className="flex justify-evenly flex-wrap">
                        {[...Array(10)].map((_, index) => <ShimmerCard key={index} />)}
                    </div>)
            }
        </>

    )
}

export default BookedCars;
