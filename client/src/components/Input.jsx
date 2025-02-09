import React from 'react'

const Input = ({ type, name, placeholder, value, onChange }) => {
    return (
        <>
            <input type={type} name={name} placeholder={placeholder} value={value} onChange={onChange} className='border-border border rounded-md pr-2 mb-2 w-full bg-transparent outline-none px-2 py-1' />
        </>
    )
}

export default Input
