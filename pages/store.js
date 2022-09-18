import Image from 'next/image'
import React , { useState } from 'react'
import mongoose from 'mongoose'
var jwt = require('jsonwebtoken');
import User from '../models/User'
import { useRouter } from 'next/router';
import Head from 'next/head';

function Store({category,allstore}) {
    const [selectedS, setSelectedS] = useState({})
    const [sName, setSName] = useState([])
    const [pos, setPos] = useState([])
    const router = useRouter()

    const handleChange = (e) => {
        let a = []
        setSelectedS({...selectedS,[e.target.name]:e.target.value})
        allstore.forEach(ele => {
            if(ele.storeType===e.target.value){
                a.push(ele.storeName)
            } 
        });
        setSName(a)
    }
    const handleChange2 = (e) => {
        setSelectedS({...selectedS,[e.target.name]:e.target.value})
        allstore.forEach(ele => {
            if(ele.storeName===e.target.value){
                setPos(ele.storePOS)
            } 
        });
    }
    const handleChange3 = (e) => {
        setSelectedS({...selectedS,[e.target.name]:e.target.value})
        allstore.forEach(ele => {
            if(ele.storeName===selectedS.sname && ele.storePOS.includes(e.target.value) && ele.storeType===selectedS.stype){
                setSelectedS({...selectedS,storeId:ele.storeId})
            }
        });
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        setTimeout(() => {
            sessionStorage.setItem("store",JSON.stringify(selectedS))
            router.push(`/billing?storeId=${selectedS.storeId}`)
        },5000);
    }
    
    return (
        <>
        <Head><title>MI | Confirm</title></Head>
        <div className='flex flex-col items-center'>
            <div className='flex flex-col justify-center items-center mt-32 space-y-32 border shadow-2xl rounded-3xl w-fit p-4 bg-white m-4'>
                <Image src={'/Xiaomi_logo.svg'} alt={'logo'} height={100} width={100} />
                <div className='flex flex-col mx-auto justify-center items-center space-y-9 w-96'>
                    <h1 className='text-5xl'>Store</h1>
                    <form className='space-y-5 w-full'>
                        <div className='flex flex-col '>
                            <select name="stype" id="type" onChange={handleChange} className='rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-black focus:border-black focus:z-10 text-sm md:text-base'>
                                <option value="" hidden>Select Store Type</option>
                                {category.map((val,i)=>{return <option key={i} value={val}>{val}</option>})}
                            </select>
                            <select name="sname" id="sname" onChange={handleChange2} className='rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-black focus:border-black focus:z-10 text-sm md:text-base'>
                                <option value="" hidden>Select Store Name</option>
                                {sName.map((val,i)=>{return <option key={i} value={val}>{val}</option>})}
                            </select>
                            <select name="pos" id="pos" onChange={handleChange3} className='rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-black focus:border-black focus:z-10 text-sm md:text-base'>
                                <option value="" hidden>Select POS Id</option>
                                {pos.map((val,i)=>{return <option key={i} value={val}>{val}</option>})}
                            </select>
                        </div>
                        <div>
                            <button onClick={handleSubmit}
                                type="submit"
                                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500">
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </>
    );
}

export default Store
export async function getServerSideProps(context) {
    if (!mongoose.connections[0].readyState) {
        mongoose.connect(process.env.MONGO_URI)
    }
    const j = jwt.verify(context.query.token, process.env.JWT_SECRET);
    const u = await User.findOne({miid:j.miid})
    let cat = []
    u.store.forEach(e => {
        if (!cat.includes(e.storeType)) {
            cat.push(e.storeType)
        }
    });
    return {
        props: {category:cat,allstore:JSON.parse(JSON.stringify(u.store))}, // will be passed to the page component as props
    }
}