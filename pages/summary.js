import React from 'react'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import ProgBar from '../components/ProgBar'

const Summary = ({ cart, subTotal, customer, address }) => {
    const [ready, setReady] = useState(false)

    const router = useRouter();

    return (
        <>
            <ProgBar page={'Summary'} />
            <div className='flex items-center'>
                <div className='flex flex-col items-center justify-center mt-20 space-y-20 '>
                    <h1 className='md:text-2xl text-xl font-semibold '>Order Summary</h1>
                    <div className="flex md:flex-row flex-col justify-center items-center space-y-7 shadow-2xl rounded-3xl bg-white m-1 p-2">
                        {/* <div className='md:w-[40vw] md:border-r flex flex-col space-y-10 items-center'>
                            <h2 className='md:text-xl text-lg font-medium'>Customer Details</h2>
                            <div className='flex flex-col space-y-5 md:text-lg text-base'>
                                <div className="flex">
                                    <div className='md:w-44 w-32'>Name:</div>
                                    <div className='md:w-52 w-fit'>{customer.fname + " " + customer.lname}</div>
                                </div>
                                <div className="flex">
                                    <div className='md:w-44 w-32'>Phone No:</div>
                                    <div className='md:w-52'>{customer.phone}</div>
                                </div>
                                <div className="flex">
                                    <div className='md:w-44 w-32'>E-mail:</div>
                                    <div className='md:w-52 w-fit'>{customer.email}</div>
                                </div>
                                {address !== null && <div className="flex">
                                    <div className='md:w-44 w-64'>Address:</div>
                                    <div className='md:w-64'>{address.saddress + ", " + address.city + ", " + address.state}</div>
                                </div>}
                                <div className="flex">
                                    <div className='md:w-44 w-32'>Communication:</div>
                                    <div className='md:w-52 w-fit'>{customer.moc}</div>
                                </div>
                            </div>
                        </div> */}
                        <div className='md:w-[40vw] md:border-l flex flex-col items-center'>
                            <h2 className='md:text-xl text-lg font-medium'>Orders</h2>
                            <div className='grid'>
                                {cart.map((item, i) => {
                                    return <div key={i} className='flex md:h-28 h-fit border-b md:w-96 w-fit'>
                                        <div className='mx-auto overflow-hidden z-30 h-full flex items-center'>
                                            <Image src={item.image} className='object-contain object-center' priority={true} height={100} width={100} alt={'image'} />
                                        </div>
                                        <div className='flex flex-col justify-center md:p-2 p-1 md:text-sm text-xs w-full'>
                                            <div>{item.title}</div>
                                            <div>Quantity: {item.qty}</div>
                                            <div>Color: {item.color}</div>
                                        </div>
                                        <div className='flex items-center'>
                                            <div className='md:text-sm text-xs'>₹{item.price * item.qty}</div>
                                        </div>
                                    </div>
                                })}
                                <div className='flex flex-col md:h-28 h-auto border-b md:w-96 w-auto justify-center'>
                                    <div className='flex justify-end'>
                                        <div className='md:text-sm text-xs md:w-36 w-24 text-right'>Order Subtotal</div>
                                        <div className='md:text-sm text-xs md:w-28 w-20 text-right'>₹{subTotal}</div>
                                    </div>
                                    <div className='flex justify-end'>
                                        <div className='md:text-sm text-xs md:w-36 w-24 text-right'>Tax</div>
                                        <div className='md:text-sm text-xs md:w-28 w-20 text-right'>₹0</div>
                                    </div>
                                    <div className='flex justify-end'>
                                        <div className='md:text-xl text-lg md:w-36 w-24 text-right'>Total</div>
                                        <div className='md:text-xl text-lg md:w-28 w-20 text-right'>₹{subTotal}</div>
                                    </div>
                                </div>
                                <div className='flex flex-col space-y-7 h-28 md:border-b w-96 justify-center'>
                                    <div className='flex space-x-2 items-center'>
                                        <input type="checkbox" name="agree" id="agree" onClick={() => setReady(!ready)} />
                                        <label htmlFor="agree" className='text-xs'>I hereby declare that I have checked and verify all the details for this order.</label>
                                    </div>
                                    <div>
                                        {ready && <button onClick={() => router.push("/gateway")} className={`flex justify-center items-center px-3 py-1 rounded-lg border-2 bg-[#ff6900] hover:scale-105 hover:shadow-lg w-full`}>Proceed to payment</button>}
                                        {!ready && <button disabled className={`flex justify-center items-center px-3 py-1 rounded-lg border-2 bg-[#ff6900] w-full disabled:opacity-50`}>Proceed to payment</button>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Summary