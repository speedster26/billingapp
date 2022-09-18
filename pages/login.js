import { useRouter } from 'next/router'
import React, { useState } from 'react'
import Image from 'next/image'
import { toast } from 'react-toastify';
import Head from 'next/head';

const Login = () => {
    const [credentials, setCredentials] = useState({ miid: "", password: "" })

    const router = useRouter()
    
    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        })
        const response = await res.json()
        if (response.success) {
            toast.success("Login successful", {
                position: "bottom-center",
                autoClose: 800,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
            localStorage.setItem("token", response.token)
            router.push(`/store?token=${response.token}`)
        }
        else{
            toast.error("Login failed", {
                position: "bottom-center",
                autoClose: 800,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
        }
    }
    return (
        <>
        <Head><title>MI | Login</title></Head>
        <div className='flex flex-col items-center'>
            <div className='flex flex-col justify-center items-center mt-32 space-y-32 border shadow-2xl rounded-3xl w-fit p-4 bg-white m-4'>
                <Image src={'/Xiaomi_logo.svg'} alt={'logo'} height={100} width={100} />
                <div className='flex flex-col mx-auto justify-center items-center space-y-9 w-96'>
                    <h1 className='text-5xl'>Login</h1>
                    <form className='space-y-5 w-full'>
                        <div className='flex flex-col '>
                            <input type="text" required placeholder='Mi ID' name='miid' value={credentials.miid} onChange={handleChange} className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-black focus:border-black focus:z-10 sm:text-sm' />
                            <input type="password" required placeholder='Password' name='password' value={credentials.password} onChange={handleChange} className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-black focus:border-black focus:z-10 text-sm md:text-base' />
                        </div>
                        <div>
                            <button onClick={handleSubmit}
                                type="submit"
                                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500">
                                Login
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        </>
    )
}

export default Login