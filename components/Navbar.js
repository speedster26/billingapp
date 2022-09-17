import React, { useRef, useState } from 'react'
import Image from 'next/image'
import { BiUserCircle  } from 'react-icons/bi';
import { GoArrowUp  } from 'react-icons/go';
import { useRouter } from 'next/router';


const Navbar = ({logout}) => {
  const router = useRouter()
  const refT = useRef()

  const handleHover = () => {
    refT.current.classList.toggle('hidden')
  }
  return (
    <div className='md:relative'>
      <div className='hover:scale-110 transition hover:cursor-pointer md:absolute left-60 top-10'>
        <Image src={'/Xiaomi_logo.svg'} alt={'logo'} height={55} width={55} onClick={()=>router.pathname==="/orders"?router.push("billing"):null}/>
      </div>
      <div className='md:absolute right-60 top-10 shadow-2xl'>
        <BiUserCircle className='text-[#ff6900] text-3xl rounded-full hover:scale-110 transition hover:cursor-pointer' onClick={handleHover} />
        <div ref={refT} className="hidden md:absolute top-10 left-1">
          <GoArrowUp className='absolute -top-3 text-white text-2xl'/>
          <div className='bg-white p-2 rounded-md flex flex-col shadow-2xl'>
            <a onClick={() => router.push("/orders")} className='hover:bg-[#ff6900] w-45 hover:cursor-pointer rounded-md px-4 py-1 text-sm'>Orders</a>
            <a onClick={logout} className='hover:bg-[#ff6900] w-full hover:cursor-pointer rounded-md px-4 py-1 text-sm'>Logout</a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar