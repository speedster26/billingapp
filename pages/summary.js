import React from 'react'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'

const Summary = ({ cart , subTotal , customer , address }) => {
    const [ready, setReady] = useState(false)
    
    const router = useRouter();

    return (
        <div className='flex flex-col items-center mt-20 space-y-20'>
            <h1 className='text-2xl font-semibold'>Order Summary</h1>
            <div className="flex">
                <div className='md:w-[40vw] border-r flex flex-col items-center space-y-10'>
                    <h2 className='text-xl font-medium'>Customer Details</h2>
                    <div className='flex flex-col space-y-5 text-lg'>
                        <div className="flex">
                            <div className='w-44'>Name:</div>
                            <div className='w-52'>{customer.fname + " " + customer.lname}</div>
                        </div>
                        <div className="flex">
                            <div className='w-44'>Phone No:</div>
                            <div className='w-52'>{customer.phone}</div>
                        </div>
                        <div className="flex">
                            <div className='w-44'>E-mail:</div>
                            <div className='w-52'>{customer.email}</div>
                        </div>
                        {address===null && <div className="flex">
                            <div className='w-44'>Address:</div>
                            <div className='w-64'>{address.saddress+", "+address.city+", "+address.state}</div>
                        </div>}
                        <div className="flex">
                            <div className='w-44'>Communication:</div>
                            <div className='w-52'>{customer.moc}</div>
                        </div>
                    </div>
                </div>
                <div className='md:w-[40vw] border-l flex flex-col items-center'>
                    <h2 className='text-xl font-medium'>Orders</h2>
                    <div className='grid'>
                        {cart.map((item,i)=>{return <div key={i} className='flex h-28 border-b w-96'>
                            <div className='mx-auto overflow-hidden z-30 h-full flex items-center'>
                                <Image src={item.image} className='object-contain object-center' priority={true} height={100} width={100} alt={'image'} />
                            </div>
                            <div className='flex flex-col justify-center p-2 text-sm w-full'>
                                <div>{item.title}</div>
                                <div>Quantity: {item.qty}</div>
                                <div>Color: {item.color}</div>
                            </div>
                            <div className='flex items-center'>
                                <div className='text-sm'>₹{item.price*item.qty}</div>
                            </div>
                        </div>})}
                        <div className='flex flex-col h-28 border-b w-96 justify-center'>
                            <div className='flex justify-end'>
                                <div className='text-sm w-36 text-right'>Order Subtotal</div>
                                <div className='text-sm w-28 text-right'>₹{subTotal}</div>
                            </div>
                            <div className='flex justify-end'>
                                <div className='text-sm w-36 text-right'>Tax</div>
                                <div className='text-sm w-28 text-right'>₹0</div>
                            </div>
                            <div className='flex justify-end'>
                                <div className='text-xl w-36 text-right'>Total</div>
                                <div className='text-xl w-28 text-right'>₹{subTotal}</div>
                            </div>
                        </div>
                        <div className='flex flex-col space-y-7 h-28 border-b w-96 justify-center'>
                            <div className='flex space-x-2 items-center'>
                                <input type="checkbox" name="agree" id="agree" onClick={()=>setReady(!ready)}/>
                                <label htmlFor="agree" className='text-xs'>I hereby declare that I have checked and verify all the details for this order.</label>
                            </div>
                            <div>
                                {ready && <button onClick={()=>router.push("/gateway")} className={`flex justify-center items-center px-3 py-1 rounded-lg border-2 bg-[#ff6900] hover:scale-105 hover:shadow-lg w-full`}>Proceed to payment</button>}
                                {!ready && <button disabled className={`flex justify-center items-center px-3 py-1 rounded-lg border-2 bg-[#ff6900] w-full disabled:opacity-50`}>Proceed to payment</button>}
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Summary