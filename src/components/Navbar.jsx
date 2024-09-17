import React, { useContext, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import AppContext from '../context/AppContext'


const Navbar = () => {

  const { product, setFilterProduct, logout, isAuthenticated, cart } = useContext(AppContext)

  const nav = useNavigate()
  const location = useLocation()
  const [searchTerm, setSearchTerm] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault();
    nav(`/product/search/${searchTerm}`)
    setSearchTerm("")
  }

  const filterByCategory = (category) => {
    const element = product.filter((ele) => ele.category === category);
    console.log("element cat = ", element)
    setFilterProduct(element);
  };

  const filterByPrice = (price) => {
    const element = product.filter((ele) => ele.price <= price)
    console.log("element price = ", element)
    setFilterProduct(element);
  };

  return (
    <>
      <div className='sticky-top'>
        <div className="nav-bar" style={{ justifyContent: 'space-between', display: 'flex', padding: '10px' }}>
          <Link to={'/'} className="left text-center my-1"
            style={{ width: "250px", fontWeight: 'bolder', textDecoration: 'none', color: 'white' }}>
            <h4>E-Kart</h4>
          </Link>
          <form className="search_box" style={{ width: "450px" }} onSubmit={handleSubmit}>
            <span className="material-symbols-outlined">
              search
            </span>
            <input type='text' value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search Products . . ." style={{ width: "400px", height: '30px' }} />
          </form>
          <div className="right" style={{ width: "500px" }}>
            {isAuthenticated && (
              <span style={{marginLeft:"60px"}}>
                <Link to={"/cart"} type="button" className="btn btn-primary position-relative mx-3">
                  <span className="material-symbols-outlined">
                    shopping_cart
                  </span>
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {cart}
                    <span className="visually-hidden">unread messages</span>
                  </span>
                </Link>
                <Link to={'/profile'} className="btn btn-secondary mx-3">Profile</Link>
                <button className="btn btn-danger mx-3" onClick={() => {
                  logout();
                  nav('/')
                }}>logout</button>
                <div className="btn btn-info mx-3">Admin</div>
              </span>
            )}
            {!isAuthenticated && (
              <>
                <span style={{marginLeft:"110px"}}>
                  <Link to={'/login'} className="btn btn-success mx-5">login</Link>
                  <Link to={'/register'} className="btn btn-warning">Register</Link>
                </span>
              </>
            )}
          </div>
        </div>
        {location.pathname === "/" && (
          <div className="nav-bar-wrapper" style={{ justifyContent: 'space-between' }}>
            <Link className='items' onClick={() => setFilterProduct(product)}>No Filter</Link>
            <Link className='items' onClick={() => filterByCategory("mobiles")}>Mobiles</Link>
            <Link className='items' onClick={() => filterByCategory("laptops")}>Laptops</Link>
            <Link className='items' onClick={() => filterByCategory("tablets")}>Tablets</Link>
            <Link className='items' onClick={() => filterByPrice(15000)}>{"<"}15000</Link>
            <Link className='items' onClick={() => filterByPrice(25000)}>{"<"}25000</Link>
            <Link className='items' onClick={() => filterByPrice(45000)}>{"<"}45000</Link>
          </div>
        )}
      </div>
    </>
  )
}

export default Navbar
