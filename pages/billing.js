import Image from 'next/image'
import React, { useState, useEffect } from 'react'
import { AiOutlineShoppingCart } from 'react-icons/ai';
import mongoose from 'mongoose';
import Products from '../models/Products';
import connectDb from '../middleware/mongoose';
import dynamic from "next/dynamic"
import { useRouter } from 'next/router';
import ProgBar from '../components/ProgBar';
import Footer from '../components/Footer';

const BarCodeScanner = dynamic(
    () => import("barcode-react-scanner"),
    { ssr: false }
)

const Billing = ({ allproducts, addToCart, saveAddress , address , cart , subTotal , removeFromCart , deleteFromCart }) => {
    const [homedelivery, setHomedelivery] = useState(false)
    const [scanResult, setScanResult] = useState('')
    const [scan, setScan] = useState(false)
    const [products, setProducts] = useState(allproducts)
    const [category, setCategory] = useState('Select category')
    const [tAddress, setTAddress] = useState({ saddress: '', city: '', state: '' })

    const router = useRouter()

    useEffect(() => {
        router.query.category ? setCategory(router.query.category) : setCategory('')
        setProducts(allproducts)
    }, [allproducts, category, router.query.category])


    const handleChange1 = (e) => {
        setScanResult(e.target.value);
        refreshPro(e.target.value)
    }
    const handleChange2 = (e) => {
        setTAddress({ ...tAddress, [e.target.name]: e.target.value });
        saveAddress({ ...tAddress, [e.target.name]: e.target.value })
    }
    const refreshPro = (e) => {
        let pro = []
        for (let i = 0; i < allproducts.length; i++) {
            if (allproducts[i].serNo == e) {
                pro.push(allproducts[i])
            }
        }
        setProducts(pro)
    }
    const handleSelect = (e) => {
        setCategory(e.target.value)
        router.push('?category=' + e.target.value)
    }
    return (
        <>
            <ProgBar page={'Billing'}/>
        <div className='flex flex-col md:mx-auto mt-20 items-center md:space-y-10 my-14'>
            <h1 className='text-3xl text-center font-semibold'>Billing</h1>
            <div className="flex flex-col md:flex-row md:space-x-10">
                <div className="md:w-[45vw] items-center flex flex-col space-y-5 shadow-2xl bg-blue-50 rounded-3xl p-8 m-4">
                    <div className="flex flex-col md:w-1/2 w-[75vw] md:space-x-5 space-y-4">
                        <h2 className='text-xl font-semibold'>1. Select Product</h2>
                        <select name="category" onChange={handleSelect} id="category" value={category} className='relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-black focus:border-black focus:z-10 text-sm md:text-base'>
                            <option hidden value=" "></option>
                            <option value="Bundle Sales">Bundle Sales</option>
                            <option value="Smart Phone">Smart Phone</option>
                            <option value={"TV and amp"}>TV &amp</option>
                            <option value="Laptop">Laptop</option>
                            <option value="Smart Home">Smart Home</option>
                            <option value="Accessory">Accessory</option>
                        </select>
                        <div className='flex space-x-5'>
                            <input type="text" id="sn" placeholder='Enter serial number' value={scanResult} onChange={handleChange1} className="w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-black focus:border-black focus:z-10 text-sm md:text-base" />
                            <div><button className='flex items-center px-10 py-2 rounded-lg border-2 bg-[#ff6900] text-white font-semibold' onClick={() => setScan(!scan)}>Scan</button></div>
                            {scan && <div>
                                <div>Scanning</div>
                                <div>
                                    <BarCodeScanner className='hidden' onUpdate={(err, resp) => {
                                        if (resp) {
                                            setScanResult(resp.getText())
                                            refreshPro(resp.getText())
                                            setScan(false)
                                        }
                                    }}
                                    />
                                </div>
                            </div>}
                        </div>
                    </div>
                    <div className="flex flex-col md:w-1/2 w-[75vw] space-x-5 space-y-4">
                        <h2 className='text-xl font-semibold'>2. Delivery Details</h2>
                        <div className='flex flex-col space-y-3'>
                            <h3 className='text-lg'>Home Delivery?</h3>
                            <div className='flex space-x-16'>
                                <div>
                                    <input type="radio" id="homedeliveryyes" name="homedelivery" onChange={() => setHomedelivery(true)} />
                                    <label htmlFor="homedeliveryyes"> Yes</label>
                                </div>
                                <div>
                                    <input type="radio" id="homedeliveryno" name="homedelivery" onChange={() => setHomedelivery(false)} />
                                    <label htmlFor="homedeliveryno"> No</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    {homedelivery && <div className="flex flex-col md:w-1/2 w-[75vw] space-x-5 space-y-4 transition delay-300">
                        <h2 className='text-xl font-semibold'>3. Customer Address</h2>
                        <div className='flex flex-col space-y-3'>
                            <div className="flex flex-col">
                                <label htmlFor="address" className="block text-sm font-semibold">Address</label>
                                <textarea type="text" id="saddress" name='saddress' value={tAddress.saddress} onChange={handleChange2} className="resize-none w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-black focus:border-black focus:z-10 text-sm md:text-base" />
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="city" className="block text-sm font-semibold">City</label>
                                <input type="text" id="city" name='city' value={tAddress.city} onChange={handleChange2} className="w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-black focus:border-black focus:z-10 text-sm md:text-base" />
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="state" className="block text-sm font-semibold">State</label>
                                <input type="text" id="state" name='state' value={tAddress.state} onChange={handleChange2} className="w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-black focus:border-black focus:z-10 text-sm md:text-base" />
                            </div>
                        </div>
                    </div>}
                </div>
                <div className='md:w-[45vw] px-10 shadow-2xl rounded-3xl bg-white p-8 m-4'>
                    {allproducts.length == 0 && <div className='text-xl font-medium text-center'>Nothing to Display</div>}
                    <div className="grid grid-flow-row md:grid-cols-4 grid-cols-1 gap-2">
                        {products.map((item, i) => {
                            return <div key={i} className='flex flex-col border w-full p-3 hover:cursor-pointer hover:border-[#ff6900] hover:scale-105 transition'>
                                <div className='mx-auto overflow-hidden z-30'>
                                    <Image src={item.image} className='object-contain object-center' priority={true} height={200} width={200} alt={'image'} />
                                </div>
                                <div className='flex flex-col font-medium'>
                                    <h3 className='text-md'>{item.title.slice(0, 30)}...</h3>
                                    <h3 className='text-md'>&#8377;{item.price}</h3>
                                    <div className="flex flex-col space-y-1">
                                        <div className="flex flex-wrap">
                                            {item.color}
                                        </div>
                                        <div className="flex flex-wrap">
                                            <button className="px-1 rounded-lg border text-xs mr-1">{item.size}</button>
                                        </div>
                                        <div className='flex justify-end text-white font-semibold'>
                                            <button onClick={() => addToCart(1, item.title, item.price, item.size, item.color, item.serNo, item.desc, item._id, item.image)} className='flex items-center px-3 py-1 rounded-lg border-2 bg-[#ff6900] hover:scale-110 hover:shadow-lg'><AiOutlineShoppingCart />Add</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        })}

                    </div>
                </div>
            </div>

        </div>
        <Footer cart={cart} address={address} addToCart={addToCart} subTotal={subTotal} removeFromCart={removeFromCart} deleteFromCart={deleteFromCart} />
</>
    )
}

export async function getServerSideProps(context) {
    if (!mongoose.connections[0].readyState) {
        mongoose.connect(process.env.MONGO_URI)
    }
    let products = await Products.find({ category: context.query.category, availableQty: { $gt: 0 } })
    return {
        props: {
            allproducts: JSON.parse(JSON.stringify(products))
        }
    }
}

export default Billing