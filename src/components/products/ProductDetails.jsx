import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import RelatedProduct from './RelatedProduct';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AppContext from '../../context/AppContext';

const ProductDetails = () => {

  const { isAuthenticated, addToCart } = useContext(AppContext)

  const { id } = useParams();

  const [product, setProduct] = useState();

  const url = "https://mern-fullstack-api.onrender.com/api"
  
  useEffect(() => {
    const fetchProduct = async () => {
      const api = await axios.get(`${url}/product/${id}`,
        {
          headers: {
            "content-type": "Application/json"
          },
          withCredentials: true
        }
      )
      //console.log("data = ", api.data.prod)
      setProduct(api.data.prod)
    }
    fetchProduct();
  }, [id])

  const verifyLogin = async (productId, title, price, qty, imgSrc) => {
    if (isAuthenticated){
        const result = await addToCart(productId, title, price, qty, imgSrc)
        console.log("result = ", result)
        if(result){
            toast.success(result.message, {
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
        }
    }else{
        toast.success("Login First...", {
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
    }
}


  return (
    <>
      <div className="container my-4 justify-content-center text-center align-item-center">
        <div className="card mb-3 text-light" style={{ border: "2px solid white", backgroundColor: 'black', width: "950px", height: "280px", marginLeft: "120px" }}>
          <div className="row g-0 my-3">
            <div className="col-md-4">
              <img src={product?.imgSrc} className="img-fluid rounded-start my-2" alt="" style={{ width: "280px", height: "230px" }} />
            </div>
            <div className="col-md-8">
              <div className="card-body my-4" style={{ fontWeight: 'bold' }}>
                <h3 className="card-title">{product?.title}</h3>
                <p className="card-text">{product?.description}</p>
                <button className='btn btn-primary'>₹{product?.price}</button>
                &nbsp;&nbsp;&nbsp;
                <button className='btn btn-warning' style={{ fontWeight: 'bold' }}
                  onClick={()=>verifyLogin(product._id, product.title, product.price, product.qty, product.imgSrc)}
                >Add to Cart</button>
                &nbsp;&nbsp;&nbsp;
                <button className='btn btn-info' style={{ fontWeight: 'bold' }}>Buy Now</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <h2 className='text-center'>Related Products</h2>
        <RelatedProduct category={product?.category} />
      </div>
    </>
  )
}

export default ProductDetails
