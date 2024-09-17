import React, { useContext, useEffect, useState } from 'react'
import AppContext from '../context/AppContext'
import { Link } from 'react-router-dom'

const Cart = () => {

  const { getCartItem, cart } = useContext(AppContext)

  const [cartItem, setCartItem] = useState([]);

  useEffect(() => {
    const fun1 = async () => {
      const result = await getCartItem()
      console.log("result = ", result)
      setCartItem(result)
      console.log("cartItem = ", cartItem)
    }
    fun1()
  }, [])

  return (
    <>
      {cartItem.length == 0 ? (
        <div className="text-center" style={{ marginTop: "120px" }}>
          <h1>Cart is Empty</h1>
          <Link to={"/"} className="btn btn-warning my-5">
            <h4>continue shopping . . . . .</h4>
          </Link>
        </div>
      ) : (
        <>
        <div className='text-center my-3'>
          <h3>Cart Items</h3>
        </div>
        <div className="container my-5" style={{ marginLeft: "200px" }}>
          {cartItem.map((data, index) => (
            <div key={index} style={{ marginBottom: "60px" }}> {/* Add marginBottom here */}
              <div className="card mb-3" style={{ justifyContent: 'space-between', height: "150px", width: "940px", backgroundColor: 'black', color: 'white', borderRadius: "20px", border: "2px solid white" }}>
                <div className="row g-0">
                  <div className="col-md-4" style={{ height: "150px", width: "200px" }}>
                    <img src={data.imgSrc} className="img-fluid rounded-start" alt="..." style={{ height: "150px", padding: "20px" }} />
                  </div>
                  <div className="col-md-8">
                    <div className="card-body">
                      <h5 className="card-title mx-2"><h3>{data.title}</h3></h5>
                      <div className='my-4'>
                        <button className='btn btn-primary mx-3' style={{ fontWeight: 'bold' }}>Qty: {data.qty
                        }</button>
                        <button className='btn btn-warning mx-3' style={{ fontWeight: 'bold' }}>Checkout</button>
                        <Link to={`/product/${data?._id
                          }`} className='btn btn-info mx-3' style={{ fontWeight: 'bold' }}>Details</Link>
                        <button className='btn btn-danger mx-3' style={{ fontWeight: 'bold' }}>Remove</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        </>
      )}
      {cartItem.length != 0 && (
        <div>
          <div
            className="text-center my-5"
            style={{ justifyContent: "center", alignItems: "center" }}
          >
            <button className="btn btn-primary mx-1">Items: {cart}</button>
            <button className="btn btn-warning mx-3">Checkout</button>
            <button className="btn btn-danger">
              Clear Cart
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export default Cart
