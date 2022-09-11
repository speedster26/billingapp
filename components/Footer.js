import React, { useRef, useState } from 'react'
import { useRouter } from 'next/router'
import { BiUpArrow, BiDownArrow } from 'react-icons/bi';
import { MdDeleteForever } from 'react-icons/md';
import { AiFillMinusCircle, AiFillPlusCircle } from 'react-icons/ai';
import { BsCartCheckFill } from 'react-icons/bs';

const Footer = ({ cart, addToCart, removeFromCart, deleteFromCart, subTotal }) => {
    const footRef = useRef(null);
    const [show, setShow] = useState(false);
    const handleClick1 = () => {
        footRef.current.classList.toggle('translate-y-full')
        setShow(!show)
    }
    const router = useRouter()
    return (
        <footer ref={footRef} className='flex flex-col fixed bottom-0 z-40 bg-white border w-full transition translate-y-full h-1/2'>
            {!show && <div onClick={handleClick1} className='hover:cursor-pointer rounded-full bg-[#ff6900] px-3 py-1 text-center text-2xl z-50 flex justify-center absolute -top-8 left-[10.7rem] md:left-1/2 text-white'><BsCartCheckFill /></div>}
            <div onClick={handleClick1} className='hover:cursor-pointer rounded-full bg-[#ff6900] px-3 py-1 text-center text-2xl z-50 flex justify-center absolute -top-8 left-[10.7rem] md:left-1/2 text-white'><BsCartCheckFill /></div>
            {cart.length == 0 && <div className="flex flex-col px-52 mt-20 text-xl font-semibold">Nothing in the cart!!</div>}
            {cart.length != 0 && <div className='overflow-y-auto overscroll-y-contain'>
                <div className="flex flex-col px-10 mt-10 text-xl font-semibold">CART</div>
                <div className="flex flex-col px-10 mt-5">
                    <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                            <div className="overflow-x-auto">
                                <table className="min-w-full table-auto">
                                    <thead className="border-b bg-orange-200">
                                        <tr>
                                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                                #
                                            </th>
                                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                                Product
                                            </th>
                                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                                Quantity
                                            </th>
                                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                                Price
                                            </th>
                                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                                Amount
                                            </th>
                                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                                Action
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {cart && cart.map((item, i) => <tr key={i} className={`${i%2!==0?"bg-orange-50":"bg-white"} border-b transition duration-300 ease-in-out hover:bg-gray-100`}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{i + 1}</td>
                                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                {item.title}
                                            </td>
                                            <td className="text-sm flex items-center space-x-2 text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                <AiFillMinusCircle onClick={() => removeFromCart(item._id)} className='text-lg hover:cursor-pointer' /><span>{item.qty}</span><AiFillPlusCircle onClick={() => addToCart(1, item.title, item.price, item.size, item.color, item.sn, item.desc, item._id)} className='text-lg hover:cursor-pointer' />
                                            </td>
                                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                &#8377;{item.price}
                                            </td>
                                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap w-52">
                                                &#8377;{item.price * item.qty}
                                            </td>
                                            <td className="text-xl text-red-600 font-light px-6 py-4 whitespace-nowrap">
                                                <MdDeleteForever onClick={() => deleteFromCart(item._id)} className='hover:cursor-pointer' />
                                            </td>
                                        </tr>)}
                                        <tr className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
                                            <td colSpan={4} className="text-right px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Total</td>
                                            <td colSpan={2} className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 w-10">&#8377;{subTotal}</td>
                                        </tr>

                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='flex justify-center'><button className='flex items-center px-10 py-2 rounded-lg border-2 bg-[#ff6900] text-white font-semibold' onClick={() => router.push('/order')}>Order</button></div>
            </div>}
        </footer>
    )
}

export default Footer