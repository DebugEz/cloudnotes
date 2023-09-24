import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
  let navigator = useNavigate();
  const handlelogout = ()=>{
    localStorage.removeItem('token')
    navigator('/login');
  }
  let location = useLocation();
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-info">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">CloudNotes</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} aria-current="page" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname === "/about" ? "active" : ""}`} to="/about">About</Link>
              </li>
            </ul>
            {localStorage.getItem('token') ? <form className="d-flex" role="search">
            <button onClick={handlelogout} className='btn btn-primary'>Logout</button>
            </form>:(
              <div>
              <button className='btn btn-primary mx-2'>Login</button> 
            <Link to="/signup" className='btn btn-primary'>Signup</Link>
            </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar
