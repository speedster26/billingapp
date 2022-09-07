import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import { useState, useEffect } from 'react'
import '../styles/globals.css'
import NextNProgress from "nextjs-progressbar";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function MyApp({ Component, pageProps }) {
  const [cart, setCart] = useState([])
  const [address, setAddress] = useState({})
  const [customer, setCustomer] = useState({})
  const [subTotal, setSubTotal] = useState(0)
  const [user, setUser] = useState("")

  useEffect(() => {
    let cart = JSON.parse(localStorage.getItem('cart'))
    if (cart) {
      setCart(cart)
      saveCart(cart)
    }
    else {
      setCart([])
    }
    if (localStorage.getItem('token')) {
      setUser(localStorage.getItem('token'))
    }
    if (sessionStorage.getItem('address')) {
      setAddress(JSON.parse(sessionStorage.getItem('address')))
    }
    if (sessionStorage.getItem('customer')) {
      setCustomer(JSON.parse(sessionStorage.getItem('customer')))
    }
  }, [])


  const saveCart = (myCart) => {
    localStorage.setItem('cart', JSON.stringify(myCart))
    let subT = 0;
    for (let i = 0; i < myCart.length; i++) {
      subT += myCart[i].price * myCart[i].qty;
    }
    setSubTotal(subT);
  }
  const addToCart = (qty, title, price, size, color, sn, desc, _id, image) => {
    let myCart = cart;
    let found = false
    for (let i = 0; i < myCart.length; i++) {
      const element = myCart[i];
      if (element._id === _id) {
        found = true
        myCart[i].qty = myCart[i].qty + qty
        break;
      }
    }
    if (!found) {
      myCart.push({ qty, title, price, size, color, sn, desc, _id, image })
    }
    saveCart(myCart)
    setCart(myCart)
  }

  const removeFromCart = (_id) => {
    let myCart = cart;
    for (let i = 0; i < myCart.length; i++) {
      const element = myCart[i];
      if (element._id === _id) {
        if (element.qty > 1) {
          myCart[i].qty = myCart[i].qty - 1
        }
        else {
          myCart.splice(i, 1)
        }
        break;
      }
    }
    saveCart(myCart)
    setCart(myCart)
  }

  const deleteFromCart = (_id) => {
    let myCart = cart;
    for (let i = 0; i < myCart.length; i++) {
      const element = myCart[i];
      if (element._id === _id) {
        myCart.splice(i, 1)
        break;
      }
    }
    saveCart(myCart)
    setCart(myCart)
  }

  const saveAddress = (address) => {
    setAddress(address)
    sessionStorage.setItem('address', JSON.stringify(address))
  }
  const saveCustomer = (customer) => {
    setCustomer(customer)
    sessionStorage.setItem('customer', JSON.stringify(customer))
  }
  return <>
    {/* <Navbar /> */}
    <NextNProgress color='#ff6900' />
    <ToastContainer
      position="bottom-center"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
    />
    <Component addToCart={addToCart} saveAddress={saveAddress} saveCustomer={saveCustomer} cart={cart} subTotal={subTotal} customer={customer} address={address} {...pageProps} />
    {user && <Footer cart={cart} address={address} addToCart={addToCart} subTotal={subTotal} removeFromCart={removeFromCart} deleteFromCart={deleteFromCart} />}
  </>
}

export default MyApp
