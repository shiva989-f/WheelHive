import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import SideNavigation from '../components/SideNavigation'
import AddCar from '../components/AddCar'
import ManageCars from '../components/ManageCars'
import { isTokenExpired } from '../Util'
import { ToastContainer } from 'react-toastify'
import { useAuth } from '../Context/AuthContext'
import EditCarData from '../components/EditCarData'
import BookedCars from '../components/BookedCars'
import Customers from '../components/Customers'

const AdminDashboard = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const [loggedInUser, setLoggedInUser] = useState({});
    const [component, setComponent] = useState();
    const basePath = '/admin/secure/admin-dashboard';
    const { token } = useAuth()

    // Navigate to login if user is not logged in or to all-cars if not admin
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("loggedInUser"))
        // Checking if token is expired or not
        const isTokenExp = isTokenExpired(token)

        if (!user || !token || isTokenExp) {
            navigate('/login')
        }
        else if (user.role !== 'admin') {
            navigate('/all-cars')
        }
        setLoggedInUser(user)
    }, [])

    useEffect(() => {
        const path = location.pathname
        if (path.match(`${basePath}/add-car`)) {
            setComponent(<AddCar />)
        }
        // match func is not used here because while we are navigating to manage-cars/edit it is matching with this path and ManageCars component is loading
        else if (path === `${basePath}/manage-cars`) {
            setComponent(<ManageCars />)
        }
        else if (path.startsWith(`${basePath}/manage-cars/edit`)) {
            setComponent(<EditCarData />)
        }
        else if (path.startsWith(`${basePath}/bookings`)) {
            setComponent(<BookedCars />)
        }
        else if (path.startsWith(`${basePath}/customers`)) {
            setComponent(<Customers />)
        }
        else {
            setComponent(<AddCar />)
        }


    }, [location])

    return (
        <div className='flex justify-between items-center w-screen h-screen bg-bg p-2 font-poppins'>
            {/* Sidebar container */}
            <SideNavigation name={loggedInUser.name} />

            {/* Main container */}
            {/* flex-1 is shrink grow basis and it takes remaining space because of grow in flex div */}
            <div className="flex-1 bg-white ml-2 p-2 rounded-md overflow-y-scroll h-full transition-all">
                {component}
            </div>
            <ToastContainer />
        </div>
    )
}

export default AdminDashboard
