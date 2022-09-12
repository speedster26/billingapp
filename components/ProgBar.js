import React from 'react'
import { BsCheckLg } from 'react-icons/bs';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { MdOutlinePayments } from 'react-icons/md';
import { GiNotebook , GiConfirmed } from 'react-icons/gi';
import { useRouter } from 'next/router'


const ProgBar = ({ page }) => {
    const router = useRouter()
    const p = ['Billing', 'Order', 'Summary', 'Gateway', 'Confirm']
    return (
        <div className='w-fit mx-auto mt-12 p-4 shadow-lg bg-white rounded-3xl hover:scale-105 transition hover:cursor-pointer hidden md:block'>
            <div className='flex w-full'>
                {p.indexOf(page) <= 0 && <div className='flex flex-col items-center justify-center'><div className='h-16 w-16 rounded-full border border-slate-300 flex items-center justify-center text-sm' onClick={() => router.push('billing')} ><AiOutlineShoppingCart className='w-8 h-8'/></div><div>{p[0]}</div></div>}
                {p.indexOf(page) > 0 && <div className='flex flex-col items-center justify-center'><div className='rounded-full border border-slate-300 bg-green-500 hover:cursor-pointer text-sm h-16 w-16 flex items-center' onClick={() => router.push('billing')}><BsCheckLg className='w-full'/></div><div>{p[0]}</div></div>}
                <div className='w-20 mt-7'>
                    <hr className={`w-full h-1 ${p.indexOf(page) <= 0 ? 'bg-slate-300' : 'bg-green-400'} transition-colors ease-linear duration-300`} />
                </div>
                {p.indexOf(page) <= 1 && <div className='flex flex-col items-center justify-center'><div className='h-16 w-16 rounded-full border border-slate-300 flex items-center justify-center text-sm' onClick={() => router.push('order')}><GiNotebook className='w-8 h-8'/></div><div>{p[1]}</div></div>}
                {p.indexOf(page) > 1 && <div className='flex flex-col items-center justify-center'><div className='rounded-full border border-slate-300 bg-green-500 hover:cursor-pointer text-sm h-16 w-16 flex items-center' onClick={() => router.push('order')}><BsCheckLg className='w-full'/></div><div>{p[1]}</div></div>}
                <div className='w-20 mt-7'>
                    <hr className={`w-full h-1 ${p.indexOf(page) <= 1 ? 'bg-slate-300' : 'bg-green-400'}`} />
                </div>
                {p.indexOf(page) <= 2 && <div className='flex flex-col items-center justify-center'><div className='h-16 w-16 rounded-full border border-slate-300 text-sm'></div><div>{p[2]}</div></div>}
                {p.indexOf(page) > 2 && <div className='flex flex-col items-center justify-center'><div className='rounded-full border border-slate-300 bg-green-500 hover:cursor-pointer text-sm h-16 w-16 flex items-center' onClick={() => router.push('summary')}><BsCheckLg className='w-full'/></div><div>{p[2]}</div></div>}
                <div className='w-20 mt-7'>
                    <hr className={`w-full h-1 ${p.indexOf(page) <= 2 ? 'bg-slate-300' : 'bg-green-400'}`} />
                </div>
                {p.indexOf(page) <= 3 && <div className='flex flex-col items-center justify-center'><div className='h-16 w-16 rounded-full border border-slate-300 flex items-center justify-center text-sm'><MdOutlinePayments className='w-8 h-8'/></div><div>{p[3]}</div></div>}
                {p.indexOf(page) > 3 && <div className='flex flex-col items-center justify-center'><div className='rounded-full border border-slate-300 bg-green-500 hover:cursor-pointer text-sm h-16 w-16 flex items-center' onClick={() => router.push('gateway')}><BsCheckLg className='w-full'/></div><div>{p[3]}</div></div>}
                <div className='w-20 mt-7'>
                    <hr className={`w-full h-1 ${p.indexOf(page) <= 3 ? 'bg-slate-300' : 'bg-green-400'}`} />
                </div>
                {p.indexOf(page) < 4 && <div className='flex flex-col items-center justify-center'><div className='h-16 w-16 rounded-full border border-slate-300 flex items-center justify-center text-sm'><GiConfirmed className='w-8 h-8'/></div><div>{p[4]}</div></div>}
                {p.indexOf(page) >= 4 && <div className='flex flex-col items-center justify-center'><div className='rounded-full border border-slate-300 bg-green-500 hover:cursor-pointer text-sm h-16 w-16 flex items-center' onClick={() => router.push('confirm')}><BsCheckLg className='w-full'/></div><div>{p[4]}</div></div>}
            </div>
        </div>
    )
}

export default ProgBar