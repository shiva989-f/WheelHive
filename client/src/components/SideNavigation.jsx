import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { MdAdd, MdManageAccounts } from "react-icons/md";
import { FaCar } from "react-icons/fa";
import { FaUsers } from "react-icons/fa6";
import { IoIosLogOut } from "react-icons/io";

const SideNavigation = ({ name }) => {
    const navigate = useNavigate()
    const location = useLocation()

    const basePath = '/admin/secure/admin-dashboard';

    const menuItems = [
        { label: 'Add Car', path: `${basePath}/add-car`, icon: <MdAdd /> },
        { label: 'Manage Cars', path: `${basePath}/manage-cars`, icon: <MdManageAccounts /> },
        { label: 'Booked Cars', path: `${basePath}/bookings`, icon: <FaCar /> },
        { label: 'Customers', path: `${basePath}/customers`, icon: <FaUsers /> },
    ]

    const handleLogOut = (e)=> {
        localStorage.removeItem("loggedInUser")
        localStorage.removeItem("token")
        navigate("/login")
    }

    return (
        <div className="w-1/5 h-full bg-white rounded-md p-2 flex flex-col">
            <h2 className='text-2xl font-bold text-primary underline underline-offset-8'>{name}</h2>

            <nav className='mt-10 '>
                <ul>
                    {
                        menuItems.map((item) => (
                            <li key={item.path} className={`md:flex items-center p-2 rounded-md text-white my-4 shadow-lg ${location.pathname === item.path ? 'bg-primary font-semibold ' : 'bg-primary_light hover:bg-primary'}`} onClick={() => { navigate(item.path) }}>
                                <span className=' md:mr-5 text-xl'>{item.icon}</span>
                                <span className='hidden md:block'>{item.label}</span>

                            </li>
                        ))
                    }
                </ul>
            </nav>

            <button className="bg-primary_light bottom-2 w-full p-2 text-white font-poppins rounded-md mt-auto flex items-center shadow-lg hover:bg-primary" onClick={handleLogOut}><span className='mr-5 text-xl'><IoIosLogOut />
            </span>Log out</button>
        </div>
    )
}

export default SideNavigation
