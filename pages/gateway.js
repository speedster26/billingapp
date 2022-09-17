import React, { useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { BsCheckAll } from 'react-icons/bs';
import Script from 'next/script'
import ProgBar from '../components/ProgBar';

const Gateway = ({ address, cart, customer, subTotal , user }) => {
  const [method, setMethod] = useState('')
  const [id, setId] = useState("")
  const router = useRouter()

  const handleClick = (e) => {
    if (method === 'cash') {
      getU()
      let orderId = Math.floor(Math.random() * Date.now());
      router.push(`/confirm?id=${orderId}`)
    }
    else if (method === 'paytm') {
      getU()
      initiatePayment();
    }
  }
  const getU = async () => {
    let res = await fetch('/api/getuser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({token:user})
    })
    let t = await res.json();
    setId(t.user.miid)
  }
  const initiatePayment = async () => {
    let orderId = Math.floor(Math.random() * Date.now());
    const data = { orderId, custInfo: customer, custAddress: address, orderItems: cart, orderTotal: subTotal, orderStatus: 'Pending', operatorId: id }
    let a = await fetch('/api/pretransaction', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    let txnRes = await a.json()
    if (txnRes.success) {
      let txnToken = txnRes.txnToken
      var config = {
        "root": "",
        "flow": "DEFAULT",
        "data": {
          "orderId": orderId, /* update order id */
          "token": txnToken, /* update token value */
          "tokenType": "TXN_TOKEN",
          "amount": subTotal /* update amount */
        },
        "handler": {
          "notifyMerchant": async function (eventName, data) {
            console.log("notifyMerchant handler function called");
            console.log("eventName => ", eventName);
            console.log("data => ", data);
          }
        }
      };
      // initialze configuration using init method 
      window.Paytm.CheckoutJS.init(config).then(function onSuccess() {
        // after successfully updating configuration, invoke JS Checkout
        window.Paytm.CheckoutJS.invoke();
      }).catch(function onError(error) {
        console.log("error => ", error);
      });

    }

  }

  return (
    <><Head><meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0" /></Head>
      <Script type="application/javascript" crossOrigin="anonymous" src={`${process.env.NEXT_PUBLIC_PAYTM_HOST}/merchantpgpui/checkoutjs/merchants/${process.env.NEXT_PUBLIC_PAYTM_MID}.js`} />
      <ProgBar page={'Gateway'}/>
      <div className='flex justify-center'>
      <div className='flex flex-col mt-20 justify-center items-center space-y-20 w-fit m-4 p-10 bg-white shadow-2xl rounded-3xl'>
        <h1 className='text-xl font-semibold'>Payment types</h1>
        <div className="flex space-x-28">
          <button onClick={() => setMethod('cash')} className={`border-2 shadow-lg ${method === 'cash' ? "border-green-500" : null} p-5 rounded-3xl flex space-x-2 w-28 relative justify-center`}>By Cash {method === 'cash' && <div className=' rounded-full absolute bg-green-400 -top-2 text-2xl right-0 text-white'><BsCheckAll /></div>}</button>
          <button onClick={() => setMethod('paytm')} className={`border-2 shadow-lg z-0 ${method === 'paytm' ? "border-green-500" : null} p-5 rounded-3xl flex space-x-2 w-28 relative justify-center`}>Paytm {method === 'paytm' && <div className=' rounded-full absolute bg-green-400 -top-2 text-2xl right-0 text-white'><BsCheckAll /></div>}</button>
        </div>
        <div className='flex'>
          <button onClick={handleClick} className='flex items-center px-10 py-2 rounded-lg border-2 bg-[#ff6900] text-white font-semibold'>Pay</button>
        </div>
      </div>
      </div>
    </>
  )
}

export default Gateway