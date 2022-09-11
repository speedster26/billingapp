import React, { useState } from 'react'
import { useRouter } from 'next/router'
import ProgBar from '../components/ProgBar'

const Order = ({saveCustomer}) => {
    const [customer, setCustomer] = useState({ fname: '', lname: '', email: '', phone: '', moc: '' })
    const handleChange = (e) => {
        setCustomer({ ...customer, [e.target.name]: e.target.value })
        saveCustomer({ ...customer, [e.target.name]: e.target.value })
    }
    const router = useRouter()
    const handleSubmit = (e) => {
        e.preventDefault()
        router.push('/summary')
    }

    return (
        <>
        <ProgBar page={'Order'}/>
        <div className='flex justify-center'>

        <div className='flex flex-col items-center mt-20 space-y-20 bg-blue-50 w-fit p-10 rounded-3xl shadow-2xl '>
            <h1 className='text-2xl font-semibold'>Basic Information</h1>
            <form onSubmit={handleSubmit} className='flex flex-col text-xl space-y-3'>
                <div className="flex items-center">
                    <label htmlFor="opid" className='w-64'>Operator id:</label>
                    <input type="text" id="opid" disabled={true} className="w-full p-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-black focus:border-black focus:z-10 text-sm md:text-base" />
                </div>
                <div className="flex items-center">
                    <label htmlFor="fname" className='w-64'>First name:</label>
                    <input type="text" id="fname" value={customer.fname} name='fname' onChange={handleChange} className="w-full p-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-black focus:border-black focus:z-10 text-sm md:text-base" />
                </div>
                <div className="flex items-center">
                    <label htmlFor="lname" className='w-64'>Last name:</label>
                    <input type="text" id="lname" value={customer.lname} name='lname' onChange={handleChange} className="w-full p-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-black focus:border-black focus:z-10 text-sm md:text-base" />
                </div>
                <div className="flex items-center">
                    <label htmlFor="phone" className='w-64'>Phone No:</label>
                    <input type="text" id="phone" value={customer.phone} name='phone' onChange={handleChange} className="w-full p-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-black focus:border-black focus:z-10 text-sm md:text-base" />
                </div>
                <div className="flex items-center">
                    <label htmlFor="email" className='w-64'>E-mail:</label>
                    <input type="text" id="email" value={customer.email} name='email' onChange={handleChange} className="w-full p-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-black focus:border-black focus:z-10 text-sm md:text-base" />
                </div>
                <div className="flex items-center">
                    <label htmlFor="moc" className='w-64'>Communication:</label>
                    <select name="moc" id="moc" value={customer.moc} onChange={handleChange} className="w-full p-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-black focus:border-black focus:z-10 text-sm md:text-base">
                        <option hidden></option>
                        <option value="WhatsApp">WhatsApp</option>
                        <option value="E-mail">Email</option>
                    </select>
                </div>
                <div className="flex w-full justify-center">
                    <button onClick={()=>router.push('/summary')} className='flex w-36 justify-center px-3 py-1 rounded-lg border-2 bg-[#ff6900] hover:scale-110 hover:shadow-lg'>Next</button>
                </div>
            </form>
        </div>
        </div>
        </>
    )
}

export default Order