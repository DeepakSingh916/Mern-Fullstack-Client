import React, { useContext, useState } from 'react'
import AppContext from '../../context/AppContext'
import { useNavigate } from 'react-router-dom'

const Register = () => {
  const nav = useNavigate();
  const {userRegister} = useContext(AppContext)
  const [formData, setFormData] = useState({
    name:"",
    email:"",
    password:""
  })

  const onChangeHandler=(e)=>{
    const {name, value} = e.target;
    setFormData({...formData, [name]:value})
  }

  const onSubmitHandler= async (e)=>{
    e.preventDefault()
    //console.log("formData = ", formData)
    const result =  await userRegister(formData.name, formData.email, formData.password)
    if(result.success){
      nav("/login")
    }
  }

  return (
    <>
      <div className="container my-5" style={{ justifyContent: 'space-evenly', width: "400px", height: "450px", border: "2px solid white", borderRadius: "20px" }}>
        <div style={{ padding: "10px", padding: "20px" }}>
          <h3 style={{ textAlign: 'center' }}>User Register</h3>
          <form style={{ marginTop: "20px" }} onSubmit={onSubmitHandler}>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">Name</label>
              <input 
              name='name' value={formData.name} onChange={onChangeHandler}
              type="text" placeholder='enter name' className="form-control" id="exampleInputEmail13" aria-describedby="emailHelp" />
            </div>
            <div className="mb-3 my-4">
              <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
              <input name='email' value={formData.email} onChange={onChangeHandler}
              type="email" placeholder='enter email' className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
              <div id="emailHelp" className="form-text text-light">We'll never share your email with anyone else.</div>
            </div>
            <div className="mb-3 my-3">
              <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
              <input name='password' value={formData.password} onChange={onChangeHandler}
              type="password" placeholder='enter password' className="form-control" id="exampleInputPassword1" />
            </div>
            <div>
              <button type="submit" className="btn btn-primary" style={{ marginLeft: "130px", marginTop: "20px" }}>Sign Up</button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default Register
