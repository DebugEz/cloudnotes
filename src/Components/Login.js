import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = (props) => {
  const [ceredentials, setCeredentials] = useState({ email: "", password: "" })

  useEffect(() => {
    if (localStorage.getItem('token')) {
      navigate('/')
    }
    // eslint-disable-next-line
  }, [])

  let navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",

      },
      body: JSON.stringify({ email: ceredentials.email, password: ceredentials.password }),
    });
    const json = await response.json()
    console.log(json);
    if (json.success) {
      //save the auth token and redirect
      localStorage.setItem('token', json.authtoken)
      props.showAlert("Login successfully", "success")
      navigate("/");
    } else {
      props.showAlert("invalid credential", "danger")
    }
  }

  const onChange = (e) => {
    setCeredentials({ ...ceredentials, [e.target.name]: e.target.value })
  }

  return (
    <div className='mt-3 '>
      <h2>Login To Continue</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" value={ceredentials.email} id="email" name='email' onChange={onChange} aria-describedby="emailHelp" />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" value={ceredentials.password} id="password" name='password' onChange={onChange} />
        </div>
        <button type="submit" className="btn btn-primary" >Login</button>
      </form>
    </div>
  )
}

export default Login
