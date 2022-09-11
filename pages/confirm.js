import React , { useState , useEffect } from 'react'
import { useRouter } from 'next/router';
import { BsFillCheckCircleFill } from 'react-icons/bs';
import ProgBar from '../components/ProgBar';

const Confirm = () => {
  const router = useRouter()
  useEffect(() => {
    setID(router.query.id);
  }, [router.query.id])
  
  const [ID, setID] = useState("")
  return (
    <>
    <ProgBar page={'Confirm'}/>
    <div className='mt-20 flex justify-center'>
      <div className='flex flex-col p-10 items-center bg-slate-200 justify-center space-y-10'>
        <h1 className='font-bold text-2xl font-serif'>Your Order has been received</h1>
        <div className='flex flex-col items-center space-y-5 font-serif'>
          <div><BsFillCheckCircleFill className='text-green-600 text-6xl'/></div>
          <p className='text-lg font-light'>Thank you for your purchase!</p>
          <p className='text-lg font-light'>Your order ID is : {ID}</p>
          <p className='text-base font-extralight'>You will receive an order confirmation email with details of your order</p>
        </div>

      </div>
    </div>
    </>
  )
}

export default Confirm
