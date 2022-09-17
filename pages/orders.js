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
  console.log(orders);
  return (
    <div>Orders</div>
  )
}

export default Orders