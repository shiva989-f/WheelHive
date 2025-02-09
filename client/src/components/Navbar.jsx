import React from 'react'
import logo from '../assets/images/car_rental_logo.png'
import {useAuth} from '../Context/AuthContext.jsx'
const Navbar = () => {

    const { setIsLogoutOpen } = useAuth()

    return (
        <header className='w-full flex justify-between items-center py-2 bg-transparent'>
            <img src={logo} alt="" className='w-28' />
            <button className='px-6 py-2 bg-primary text-white rounded-full hover:border-2 hover:border-primary hover:bg-transparent hover:text-primary transition-all' onClick={() => setIsLogoutOpen(true)}>Logout</button>
        </header>
    )
}

export default Navbar
