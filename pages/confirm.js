import React, { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/router';
import { BsFillCheckCircleFill } from 'react-icons/bs';
import ProgBar from '../components/ProgBar';
import { useReactToPrint } from 'react-to-print';

const Confirm = () => {
  const router = useRouter()
  useEffect(() => {
    setID(router.query.id);
  }, [router.query.id])

  const [ID, setID] = useState("")
  const handleNew = () => {
    localStorage.removeItem('cart')
    router.push('/billing')
  }
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  return (
    <>
      <ProgBar page={'Confirm'} />
      <div ref={componentRef} className='mt-20 flex flex-col justify-center items-center space-y-5'>
        <div className='flex flex-col p-10 items-center bg-white justify-center space-y-10 shadow-2xl rounded-3xl w-fit'>
          <h1 className='font-bold text-2xl font-serif'>Your Order has been received</h1>
          <div className='flex flex-col items-center space-y-5 font-serif'>
            <div><BsFillCheckCircleFill className='text-green-600 text-6xl' /></div>
            <p className='text-lg font-light'>Thank you for your purchase!</p>
            <p className='text-lg font-light'>Your order ID is : {ID}</p>
            <p className='text-base font-extralight'>You will receive an order confirmation email with details of your order</p>
          </div>
        </div>
        <div className='flex justify-center space-x-5 w-full'>
          <button onClick={handlePrint} className='flex items-center px-3 py-1 rounded-lg border-2 bg-[#ff6900] hover:text-white hover:scale-110 hover:shadow-lg transition'>Print Receipt</button>
          <button onClick={handleNew} className='flex items-center px-3 py-1 rounded-lg border-2 bg-[#ff6900] hover:text-white hover:scale-110 hover:shadow-lg transition'>New Order</button>
        </div>
      </div>
    </>
  )
}

export default Confirm
