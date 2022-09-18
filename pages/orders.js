import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const Orders = () => {
  const [orders, setOrders] = useState([])
  useEffect(() => {
    const fetchOrder = async () => {
      let data = { token }
      let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getorders`, {
        method: 'POST', // or 'PUT'
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      let res = await a.json();
      setOrders(res.orders)
    }
    let token = localStorage.getItem('token')
    if (token) {
      fetchOrder()
    }
    if (localStorage.getItem('cart')) {
      localStorage.removeItem('cart')
    }

  }, [])
  return (
    <>
      <Head><title>MI | Orders</title></Head>
      <div className='flex flex-col space-y-4 my-3 mx-auto items-center min-h-screen mt-20'>
        {orders.length !== 0 && <h1 className='font-semibold text-3xl'>Orders</h1>}
        {orders.length === 0 && <h1 className='font-semibold text-3xl text-center'>No Orders Found</h1>}
        {orders.map((ele,i) => {
          var d = new Date(ele.createdAt);
          const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"];
          return <div key={i} className='flex flex-col my-2 bg-white rounded-xl w-full md:w-auto px-1 md:px-0'>
            <div className='border-2 p-3 bg-[#ff6a0030] rounded-t-xl'>
              <div className='flex flex-col text-xs '>
                <div className='flex'>
                  <div className='w-40'>ORDER PLACED</div>
                  <div className='w-20'>TOTAL</div>
                  <div className='w-40'>SHIP TO</div>
                  <div className='w-44'>ORDER #</div>
                </div>
                <div className='flex'>
                  <div className='w-40'>{d.getDate() + " " + monthNames[d.getMonth()] + " " + d.getFullYear()}</div>
                  <div className='w-20'>&#8377;{ele.orderTotal}</div>
                  <div className='w-40'>{ele.custInfo.fname+" "+ele.custInfo.lname}</div>
                  <div className='w-44'>{ele.orderId}</div>
                </div>
              </div>
            </div>
            <div className='flex flex-col p-3 border-t-0 border-2 rounded-b-xl text-sm'>
              <div className='text-sm'>Status: {ele.orderStatus}</div>
              {ele.orderItems.map((elem,j) => {
                return <div key={j} className='flex'>
                  {/* <div className='my-2'> */}
                    <div className='w-28 h-28'>
                      <Image alt="ecommerce" width={80} height={80} className="lg:w-1/2 w-full lg:h-auto object-contain object-center rounded " src={elem.image} />
                    </div>
                  {/* </div> */}
                  <div className="flex flex-col font-normal">
                    <div>
                      <div>{elem.title.substring(0,60)}...</div>
                      <div>&#8377;{elem.price}</div>
                      <div>Colour: {elem.color}</div>
                      <div>Size: {elem.size}</div>
                      <div>Quantity: {elem.qty}</div>
                    </div>
                  </div>
                </div>
              })}
            </div>
          </div>
        })}
      </div >
    </>
  )
}

export default Orders