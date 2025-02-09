import React from 'react'
import hero from '../assets/images/hero.webp'
import Navbar from './Navbar'

const HeroComponent = () => {
    return (
        <div>
            <Navbar />
            <div className='flex justify-between items-center flex-col lg:flex-row mt-4'>
                {/* Left container */}
                <div className='text-center lg:text-start'>
                    <h2 className='text-4xl font-semibold tracking-wide mb-6 text-center sm:text-6xl lg:text-start'>
                        <div className='mt-2'>Rent a car -</div>
                        <div className='mt-2'>quickly and</div>
                        <div className='mt-2'>easily!</div>
                    </h2>
                    <p className='capitalize text-lg font-light text-center mb-6'>The speed you need, The ride you want.</p>
                    <button className='px-6 py-2 bg-primary text-white rounded-full border border-primary hover:bg-transparent hover:text-primary '><a href="#explore-cars">Explore Cars</a></button>
                </div>

                {/* Right container */}
                <div className='lg:w-1/2'>
                    {/* Background Shape */}
                    <div className="w-full h-[350px] bg-primary flex justify-center items-center lg:h-[400px]"  style={{ clipPath: "polygon(0 28%, 100% 0, 100% 90%, 1% 91%)"}}>

                    <img src={hero} loading='lazy' className="relative z-10 w-10/12 sm:w-2/4 lg:w-11/12" alt="Car" />
                    </div>
                </div>


            </div>
        </div>
    )
}

export default HeroComponent
