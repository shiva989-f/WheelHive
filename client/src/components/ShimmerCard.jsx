import React from 'react'

const ShimmerCard = () => {
    return (
            <div className='bg-gray-200 m-2 shadow-xl rounded-md w-80 flex-auto animate-pulse'>
                <div className="bg-gray-300 rounded-md">
                    <div className='w-32 h-32'></div>
                </div>
                <div className='p-2'>
                    <div className="flex justify-between items-center my-2">
                        <div className='h-4 w-1/4 bg-gray-300 mr-2'></div>
                        <div className='h-4 w-1/4 bg-gray-300 mr-2'></div>
                        <div className='h-4 w-1/4 bg-gray-300'></div>
                    </div>
                    <div className="flex justify-between items-center my-2">
                        <div className='h-4 w-1/4 bg-gray-300'></div>
                        <div className='h-4 w-1/4 bg-gray-300'></div>
                    </div>
                    <div className='my-4 w-full h-4 bg-gray-300'></div>
                    <div className="my-2 flex justify-between items-center transition-all">
                        <div className='w-24 px-6 py-2 bg-gray-300'></div>
                        <div className='w-24 px-6 py-2 bg-gray-300'></div>
                    </div>
                </div>
            </div>
    )
}

export default ShimmerCard
