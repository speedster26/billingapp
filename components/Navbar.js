import React , { useState } from 'react'
import Image from 'next/image'


const Navbar = () => {
  return (
    <div className='w-screen flex bg-blue-100 justify-evenly items-center py-4 '>
        <div className='hover:scale-110 transition hover:cursor-pointer'>
        <Image src={'/Xiaomi_logo.svg'} alt={'logo'} height={55} width={55}/>
        </div>
        <ul className='flex space-x-4'>
            <li className='hover:bg-[#ff6900] hover:cursor-pointer hover:text-white p-2 rounded-lg hover:scale-105 transition'>Home</li>
            <li className='hover:bg-[#ff6900] hover:cursor-pointer hover:text-white p-2 rounded-lg hover:scale-105 transition'>Home</li>
            <li className='hover:bg-[#ff6900] hover:cursor-pointer hover:text-white p-2 rounded-lg hover:scale-105 transition'>Home</li>
            <li className='hover:bg-[#ff6900] hover:cursor-pointer hover:text-white p-2 rounded-lg hover:scale-105 transition'>Home</li>
            <li className='hover:bg-[#ff6900] hover:cursor-pointer hover:text-white p-2 rounded-lg hover:scale-105 transition'>Home</li>
        </ul>
        <div>
            <button className='hover:bg-[#ff6900] hover:cursor-pointer hover:text-white p-2 rounded-lg hover:scale-105 transition'>Login</button>
        </div>
    </div>
  )
}

export default Navbar