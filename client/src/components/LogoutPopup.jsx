import React from 'react'
import { MdClose } from 'react-icons/md'
import { useAuth } from '../Context/AuthContext'
import {useNavigate} from 'react-router-dom'

const LogoutPopup = () => {
    const { isLogoutOpen, setIsLogoutOpen } = useAuth()
    const navigate = useNavigate()
    const handleLogout = ()=> {
        localStorage.removeItem("token")
        localStorage.removeItem("loggedInUser")
        navigate("/login")
        setIsLogoutOpen(false)
    }

    if (!isLogoutOpen) return null
    return (
        <div className="fixed inset-0 bg-opacity-30 backdrop-blur-md flex justify-center items-center ">

            <div className="flex flex-col justify-between w-60 sm:w-72 h-40 rounded-md bg-bg p-4">
                <button
                    onClick={()=> setIsLogoutOpen(false)}
                    className="text-2xl self-end mb-4"
                ><MdClose /></button>
                <h3 className='self-center mb-2 text-center'>Are you sure want to logout</h3>
                <div className="flex justify-between gap-4">
                    <button className='w-full px-6 py-2 bg-transparent text-primary rounded-md border border-primary hover:bg-primary hover:text-white' onClick={()=> {setIsLogoutOpen(false)}}>Cancel</button>

                    <button className='w-full px-6 py-2 bg-primary text-white rounded-md border border-primary hover:bg-transparent hover:text-primary ' onClick={handleLogout}>Ok</button>
                </div>
            </div>
            
        </div>
    )
}

export default LogoutPopup
