import React, { useContext, useEffect, useState } from 'react'
import AppContext from '../../context/AppContext';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

const SearchProduct = () => {

  const { term } = useParams();
  const { product } = useContext(AppContext);

  // console.log("product details = ", product)
  // console.log("term = ", term)

  const [searchItem, setSearchItem] = useState([])

  useEffect(() => {
    setSearchItem(
       product.filter((p)=>p?.title?.toLowerCase().includes(term.toLowerCase()))
  )
  }, [term, product])


  return (
    <>
      <div className="row justify-content-center my-3">
        {searchItem?.map((data) => <div key={data._id} className='col-md-4 d-flex justify-content-center my-3'>
          <div className="card text-center text-light align-item-center p-2" style={{border: "2px solid white", width: "18rem", backgroundColor: 'black' }}>
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
                <Link to={`/product/${data._id}`} className='btn btn-info' style={{ fontWeight: 'bold' }}>
                Details
                </Link>
                <br />
                <br />
                <Link to={"/cart"} className='btn btn-warning' style={{ fontWeight: 'bold' }}>Add to Cart</Link>
              </div>
            </div>
          </div>
        </div>)}
      </div>
    </>
  )
}

export default SearchProduct
