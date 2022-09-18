import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import { useState, useEffect } from 'react'
import '../styles/globals.css'
import NextNProgress from "nextjs-progressbar";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProgBar from '../components/ProgBar';
import { useRouter } from 'next/router';


function MyApp({ Component, pageProps }) {
  const [cart, setCart] = useState([])
  const [address, setAddress] = useState({})
  const [customer, setCustomer] = useState({})
  const [subTotal, setSubTotal] = useState(0)
  const [user, setUser] = useState("")
  const router = useRouter()

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
    else{
      setUser("")
      if(router.pathname!=='/login'){
        toast.error('Please login to continue', {
          position: "bottom-center",
          autoClose: 800,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
      setTimeout(() => {
        router.push('/login')
      }, 200);
      }
    }
    if(router.route  == '/'){
      router.push('/login')
    }
    if (sessionStorage.getItem('address')) {
      setAddress(JSON.parse(sessionStorage.getItem('address')))
    }
    if (sessionStorage.getItem('customer')) {
      setCustomer(JSON.parse(sessionStorage.getItem('customer')))
    }
  }, [router])

  const ignore = ["/login","/store"]
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
      toast.success("Added to cart", {
        position: "bottom-center",
        autoClose: 800,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    })
    }
    else{
      toast.success("Quantity increased", {
        position: "bottom-center",
        autoClose: 800,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    })
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
  const logout = () => {
    localStorage.removeItem('token')
    setUser("")
    router.push('/login')
  }

  return <>
    {!ignore.includes(router.pathname) && <Navbar logout={logout} />}
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
    <Component addToCart={addToCart} saveAddress={saveAddress} saveCustomer={saveCustomer} cart={cart} subTotal={subTotal} customer={customer} address={address} removeFromCart={removeFromCart} deleteFromCart={deleteFromCart} user={user} {...pageProps} />
  </>
}

export default MyApp
