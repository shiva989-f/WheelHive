import React from 'react'

const ErrorPage = ({msg}) => {
    return (
        <div className='w-full h-full flex justify-center items-center'><p>{msg}</p></div> 
    )
}

export default ErrorPage
