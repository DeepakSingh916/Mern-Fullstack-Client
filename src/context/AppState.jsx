import React, { useEffect, useState } from 'react'
import AppContext from './AppContext'
import axios from 'axios'
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AppState = (props) => {

    const [product, setProduct] = useState([]);
    const [filterProduct, setFilterProduct] = useState([]);

    const [user, setUser] = useState();

    const [cart, setCart] = useState([]);

    const value = localStorage.getItem('token')

    const [token, setToken] = useState([value]);
    const [isAuthenticated, setIsAuthenticated] = useState(value);

    //const url = "http://localhost:1000/api"
    const url = "https://mern-fullstack-api.onrender.com/api"


    useEffect(() => {
        const fetchProduct = async () => {
            const api = await axios.get(`${url}/product/all`,
                {
                    headers: {
                        "content-type": "Application/json"
                    },
                    withCredentials: true
                }
            )
            setProduct(api.data)
            setFilterProduct(api.data)
            userProfile();
        }
        fetchProduct();
        getCartItem();
    }, [token])

    //user register
    const userRegister = async (name, email, password) => {
        const api = await axios.post(`${url}/user/register`, { name, email, password },
            {
                headers: {
                    "content-type": "Application/json"
                },
                withCredentials: true
            }
        )
        toast.success(api.data.message, {
            //position: "top-right",
            position: "top-center",
            autoClose: 1200,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
        });
        return api.data;
    }

    //user login
    const userLogin = async (email, password) => {
        const api = await axios.post(`${url}/user/login`, { email, password },
            {
                headers: {
                    "content-type": "Application/json"
                },
                withCredentials: true
            }
        )
        //alert(api.data.message)
        console.log("login = ", api.data)
        toast.success(api.data.message, {
            //position: "top-right",
            position: "top-center",
            autoClose: 1200,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
        });
        setToken(api.data.token)
        console.log("token = ", token)
        setIsAuthenticated(true)
        localStorage.setItem("token", api.data.token)
        return api.data;
    }

    // user logout
    const logout = () => {
        setIsAuthenticated(false);
        setToken("");
        localStorage.removeItem('token');
        toast.success("logout successfully . . .", {
            //position: "top-right",
            position: "top-center",
            autoClose: 1200,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
        });
        return true;
    }

    // user profile
    const userProfile = async () => {
        const api = await axios.get(`${url}/user/profile`,
            {
                headers: {
                    "content-type": "Application/json",
                    "Auth": token
                },
                withCredentials: true
            }
        )
        //console.log("profile = ", api.data)
        setUser(api.data.user)
    }

    // add cart in item
    const addToCart = async (productId, title, price, qty, imgSrc) => {
        const api = await axios.post(`${url}/cart/add`, { productId, title, price, qty, imgSrc },
            {
                headers: {
                    "content-type": "Application/json",
                    "Auth": token
                },
                withCredentials: true
            }
        )
        //console.log("cart item = ", api.data)
        setCart(api?.data?.total_qty)
        //console.log("cart = ", cart)
        return api.data
    }

    // get cart item by userId
    const getCartItem = async () => {
        const api = await axios.get(`${url}/cart/user`,
            {
                headers: {
                    "content-type": "Application/json",
                    "Auth": token
                },
                withCredentials: true
            }
        )
        if(!api.data.totalQty || api.data.totalQty === 0){
            setCart(0)
        }else{
            setCart(api?.data?.totalQty)
        }
        return api.data.cartItem.items
        //console.log("cart state = ", cart)
        //console.log("get cart item api = ", api)
        //return api.data
    }


    return (
        <AppContext.Provider value={{
            product,
            userRegister,
            userLogin,
            token,
            setToken,
            url,
            isAuthenticated,
            setIsAuthenticated,
            filterProduct,
            setFilterProduct,
            logout,
            user,
            addToCart,
            cart,
            setCart,
            getCartItem
        }}>{props.children}</AppContext.Provider>
    )
}

export default AppState
