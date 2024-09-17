import React, { useContext } from 'react'
import AppContext from '../../context/AppContext'
import { Link } from 'react-router-dom';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RelatedProduct = ({ category }) => {

    const { product, isAuthenticated, addToCart } = useContext(AppContext);

    //console.log("products = ", product)
    const filterProduct = product.filter((p) => p.category == category);
    //console.log("filterProduct = ", filterProduct)

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
            <div className="row justify-content-center my-3">
                {filterProduct?.map((data) => <div key={data._id} className='col-md-4 d-flex justify-content-center my-3'>
                    <div className="card text-center text-light align-item-center p-2" style={{ border: "2px solid white", width: "18rem", backgroundColor: 'black' }}>
                        <Link to={`/product/${data._id}`} className='d-flex justify-content-center'>
                            <img src={data.imgSrc} className="card-img-top" alt="..."
                                style={{ width: "230px", height: "250px", borderRadius: "10px", border: "2px solid white" }} />
                        </Link>
                        <div className="card-body">
                            <h5 className="card-title">{data.title}</h5>
                            <br />
                            <div className='text-center align-item-center justify-content-center'>
                                <button className='btn btn-primary'>₹{data.price}</button>
                                &nbsp;&nbsp;
                                <Link to={`/product/${data._id}`} className='btn btn-info'
                                    style={{ fontWeight: 'bold' }}>Details</Link>
                                <br />
                                <br />
                                <button className='btn btn-warning' style={{ fontWeight: 'bold' }}
                                    onClick={()=>verifyLogin(data._id, data.title, data.price, data.qty, data.imgSrc)}
                                >Add to Cart</button>
                            </div>
                        </div>
                    </div>
                </div>)}
            </div>
        </>
    )
}

export default RelatedProduct
