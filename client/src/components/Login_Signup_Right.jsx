import React from 'react'
import hero from "../assets/images/hero.webp";

const Login_Signup_Right = () => {
    return (
        <div className="w-full lg:h-5/6 lg:w-1/2 relative lg:overflow-hidden py-6 order-1 lg:order-2">
            <div className="flex flex-col justify-center lg:justify-start items-center text-white pt-4">
                <h1 className='text-2xl sm:text-3xl lg:text-5xl font-bold text-center '>Welcome to WheelHive</h1>
                <p className='mt-5 text-xl sm:text-2xl lg:text-4xl font-bold text-center '>Your Journey, Our Wheels</p>
            </div>
            <img src={hero} alt="" className='absolute bottom-1 w-0 lg:w-9/12 right-6' />
        </div>
    )
}

export default Login_Signup_Right
