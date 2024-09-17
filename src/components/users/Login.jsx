import React, { useContext, useState } from 'react'
import AppContext from '../../context/AppContext'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const {userLogin} = useContext(AppContext)

  const nav = useNavigate();
  const [formData, setFormData] = useState({
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
    const result =  await userLogin(formData.email, formData.password)
    if(result.success){
      nav("/")
    }
  }

  return (
    <>
      <div className="container my-5" style={{justifyContent:'space-evenly', width: "400px", height:"350px", border: "2px solid white", borderRadius: "20px" }}>
        <div style={{ padding: "10px", padding:"20px" }}>
          <h3 style={{ textAlign: 'center' }}>User Login</h3>
          <form style={{marginTop:"20px"}} onSubmit={onSubmitHandler}>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
              <input name='email' value={formData.email} onChange={onChangeHandler}
              type="email" placeholder='enter email' className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
              <div id="emailHelp" className="form-text text-light">We'll never share your email with anyone else.</div>
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
              <input name='password' value={formData.password} onChange={onChangeHandler}
              type="password" placeholder='enter password' className="form-control" id="exampleInputPassword1" />
            </div>
            <div>
              <button type="submit" className="btn btn-primary" style={{marginLeft:"130px", marginTop:"20px"}}>Login</button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default Login
