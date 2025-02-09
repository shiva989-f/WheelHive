import React, { useState } from 'react'
import Login_Signup_Right from '../components/Login_Signup_Right'
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../Util';
import { FiUser } from "react-icons/fi";
import { MdOutlineMailOutline, MdOutlinePhone } from "react-icons/md";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import { useAuth } from '../Context/AuthContext';


const Signup = () => {

    const {baseURL} = useAuth()
    const navigate = useNavigate()

    const [isVisible, setIsVisible] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [signupInfo, setSignupInfo] = useState({
        name: "",
        email: "",
        contact: "",
        password: "",
        confirmPassword: ""
    });

    const handleVisible = () => {
        setIsVisible(!isVisible)
    }

    const handleChange = (e) => {
        setSignupInfo({ ...signupInfo, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)

        const { name, email, contact, password, confirmPassword } = signupInfo
        if (!name || !email || !contact || !password || !confirmPassword) {
            setIsLoading(false)
            return handleError("All fields are required!")
        }

        try {
            const res = await axios.post(`${baseURL}auth/register`, signupInfo)
            handleSuccess(res.data.msg)
            setIsLoading(false)
            navigate('/login')
        } catch (error) {
            setIsLoading(false)
            if (!error.response) {
                handleError("Internal server error, Please try again")
            }
            else {
                handleError(error.response.data.msg)
            }
        }


    }

    return (
        <div className='overflow-hidden w-screen h-screen flex flex-col lg:flex-row justify-center lg:justify-evenly items-center font-poppins bg-main-bg bg-cover bg-fixed'>

            <div className="w-full lg:h-5/6 lg:w-1/2 flex justify-center items-center order-2 lg:order-1">
                <form onSubmit={handleSubmit} className='w-9/12 sm:w-8/12 m-8 lg:w-1/2 bg-white rounded-xl p-6 text-charcoal'>
                    <h1 className='font-bold text-xl text-primary'>Sign up to WheelHive</h1>
                    <div className="mt-2">
                        <label htmlFor="name" className='font-semibold text-xs'>Your Name</label>
                        <div className="border-border border-[1px] rounded-md flex justify-center items-center pr-2 mt-1">
                            <input type="text" onChange={handleChange} value={signupInfo.name} name="name" id="name" className='w-full bg-transparent outline-none px-2 py-[2px] ' />
                            <FiUser />
                        </div>
                    </div>
                    <div className="mt-1">
                        <label htmlFor="email" className='font-semibold text-xs'>Your Email</label>
                        <div className="border-border border-[1px] rounded-md flex justify-center items-center pr-2 mt-1">
                            <input type="email" onChange={handleChange} value={signupInfo.email} name="email" id="email" className='w-full bg-transparent outline-none px-2 py-[2px] ' />
                            <MdOutlineMailOutline />
                        </div>
                    </div>
                    <div className="mt-1">
                        <label htmlFor="contact" className='font-semibold text-xs'>Your Contact</label>
                        <div className="border-border border-[1px] rounded-md flex justify-center items-center pr-2 mt-1">
                            <input type="text" onChange={handleChange} value={signupInfo.contact} name="contact" id="contact" className='w-full bg-transparent outline-none px-2 py-[2px]' />
                            <MdOutlinePhone />
                        </div>
                    </div>
                    <div className="mt-1">
                        <label htmlFor="password" className='font-semibold text-xs'>Your Password</label>
                        <div className="border-border border-[1px] rounded-md flex justify-center items-center pr-2 mt-1">
                            <input type={isVisible ? "text" : "password"} onChange={handleChange} value={signupInfo.password} name="password" id="password" className='w-full bg-transparent outline-none px-2 py-[2px]' />
                            <div onClick={handleVisible}>{isVisible ? <FaRegEyeSlash /> : <FaRegEye />}</div>
                        </div>
                    </div>
                    <div className="mt-1">
                        <label htmlFor="confirmPassword" className='font-semibold text-xs'>Confirm Password</label>
                        <input type="password" onChange={handleChange} value={signupInfo.confirmPassword} name="confirmPassword" id="confirmPassword" className='border-border border-[1px] rounded-md flex justify-center items-center pr-2 mt-1 w-full bg-transparent outline-none px-2 py-[2px]' />
                    </div>

                    <p className="text-xs text-end mt-2 font-light" onClick={() => navigate("/login")}>Already have an account? Login</p>

                    <Button text="Signup" isLoading={isLoading} />

                </form>
            </div>

            {/* Right side */}
            <Login_Signup_Right />
            <ToastContainer />
        </div>
    )
}

export default Signup
