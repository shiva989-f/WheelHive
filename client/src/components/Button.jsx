import React from 'react'
import spinner from '../assets/svg/infinite-spinner.svg'

const Button = ({ text, isLoading }) => {
    return (
        <>
            <button className="w-full relative inline-block px-5 py-2 mt-2 text-sm font-bold tracking-wide border border-black bg-transparent cursor-pointer group rounded-lg text-white">
                <span className='absolute inset-0 w-full h-full bg-primary translate-x-[7px] translate-y-[7px] transition-transform duration-200 group-hover:translate-x-0 group-hover:translate-y-0 rounded-lg'></span>
                
                {isLoading ? <span className="relative top-1/2 left-[calc(50%-1rem)]"><img src={spinner} className='w-8' /> </span> : <span className="relative">{text}</span>}
            </button>
        </>
    )
}

export default Button
