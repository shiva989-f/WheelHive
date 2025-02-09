import React, { useState } from 'react'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa'
import { MdOutlineMailOutline } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import Login_Signup_Right from '../components/Login_Signup_Right'
import { ToastContainer } from 'react-toastify'
import { handleError } from '../Util'
import axios from 'axios'
import Button from '../components/Button'
import { useAuth } from '../Context/AuthContext'

const Login = () => {

    const {baseURL} = useAuth()
    
    const navigate = useNavigate()
    const [isVisible, setIsVisible] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [loginInfo, setLoginInfo] = useState({
        email: "",
        password: ""
    })
    const handleVisible = () => {
        setIsVisible(!isVisible)
    }
    const handleChange = (e)=> {
        setLoginInfo({...loginInfo, [e.target.name]: e.target.value})
    }

    const handleSubmit = async (e)=>{
        e.preventDefault()
        setIsLoading(true)
        const {email, password} = loginInfo
        if (!email || !password) {
            setIsLoading(false)
            return handleError("All fields are required!")
        }

        try {
            const res = await axios.post(`${baseURL}auth/login`, loginInfo)
            const name = res.data.name
            const role = res.data.role
            localStorage.setItem("token", res.data.jwtToken)
            localStorage.setItem("loggedInUser", JSON.stringify({ name, role }))
            setIsLoading(false)
            if (role === 'customer') {
                navigate('/all-cars')
            }
            else if (role === 'admin') {
                navigate('/admin/secure/admin-dashboard')
            }
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
        <div className='w-screen h-screen flex flex-col lg:flex-row justify-center lg:justify-evenly items-center font-poppins bg-main-bg bg-cover'>
            <div className="w-full lg:h-5/6 lg:w-1/2 flex justify-center items-center order-2 lg:order-1">
                <form onSubmit={handleSubmit} className='w-10/12 sm:w-8/12 m-8 lg:w-1/2 bg-white rounded-xl p-6 text-charcoal'>
                    <h1 className='font-bold text-xl text-primary'>Login to WheelHive</h1>
                    <div className="mt-1">
                        <label htmlFor="email" className='font-semibold text-xs'>Your Email</label>
                        <div className="border-border border-[1px] rounded-md flex justify-center items-center pr-2 mt-1">
                            <input type="email" onChange={handleChange} value={loginInfo.email} name="email" id="email" className='w-full bg-transparent outline-none px-2 py-[2px] ' />
                            <MdOutlineMailOutline />
                        </div>
                    </div>
                    <div className="mt-1">
                        <label htmlFor="password" className='font-semibold text-xs'>Your Password</label>
                        <div className="border-border border-[1px] rounded-md flex justify-center items-center pr-2 mt-1">
                            <input type={isVisible ? "text" : "password"} onChange={handleChange} value={loginInfo.password} name="password" id="password" className='w-full bg-transparent outline-none px-2 py-[2px]' />
                            <div onClick={handleVisible}>{isVisible ? <FaRegEyeSlash /> : <FaRegEye />}</div>
                        </div>
                    </div>

                    <p className="text-xs text-end mt-2 font-light" onClick={() => navigate("/signup")}>Create a new account, Signup</p>

                    <Button text="Login" isLoading={isLoading}/>

                </form>
            </div>

            {/* Right side */}
            <Login_Signup_Right />
            <ToastContainer />
        </div>
    )
}

export default Login
