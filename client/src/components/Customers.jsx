import React, { useEffect, useState } from 'react'
import { useAuth } from '../Context/AuthContext'
import axios from 'axios'
import ShimmerCard from './ShimmerCard'

const Customers = () => {
    const {baseURL, token} = useAuth()
    const headers = { Authorization: token }

    const [users, setUsers] = useState();
    const [isDataLoaded, setIsDataLoaded] = useState(false);

    const fetchUsers = async ()=> {
        try {
            const res = await axios(`${baseURL}admin/customers`, { headers })
            setUsers(res.data.data)
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
        fetchUsers()
    }, [])
    return (
        <div className='p-6'>
            
            {
                // Check if data has been loaded
                isDataLoaded ?
                    // Check if 'allCars' is a non-empty array
                    Array.isArray(users) && users.length > 0 ? (
                        // If data is available, map through the array of cars and render AdminCarCard for each item
                        <div className="grid place-items-center grid-cols-1 mx-4 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {users.map((item, index) => (
                                <div key={index} className="h-48 bg-bg rounded-md p-4 m-2 flex-1">
                                    <div className='flex justify-between items-center gap-4'>
                                        <p><span className='text-xl text-primary font-bold'>Name: </span> {item.name}</p>
                                        <p><span className='text-xl text-primary font-bold'>Role: </span> {item.role}</p>
                                    </div>
                                    <p><span className='text-xl text-primary font-bold'>Email: </span> {item.email}</p>
                                    <p><span className='text-xl text-primary font-bold'>Contact: </span> {item.contact}</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        // If no data is available, show an error page with a relevant message
                        <ErrorPage msg="Users are not available" />
                    )
                    :
                    // If data is still loading, render 10 ShimmerCard components as a loading indicator
                    (<div className="flex justify-evenly flex-wrap">
                        {[...Array(10)].map((_, index) => <ShimmerCard key={index} />)}
                    </div>)
            }
        </div>
    )
}

export default Customers
