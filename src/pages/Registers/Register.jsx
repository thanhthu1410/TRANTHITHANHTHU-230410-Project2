import React from 'react'
import "./Register.scss"
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

export default function Register() {
  const navigate = useNavigate()
  return (
    <div>
      <div className="container-all">
        <div className="container-left">
          <h3>REGISTER</h3>
          <h5>NEW CUSTOMERS</h5>
          <p>
            By creating an account with our store, you will be able to move through
            the checkout process faster, store multiple shipping addresses, view and
            track your orders in your account and more.
          </p>
          <form action="" onSubmit={()=>{
            
          }}>
            <input id="valueEmail" type="text" placeholder="YOUR EMAIL" /> <br />
            <input id="valuePassword" type="password" placeholder="PASSWORD" /> <br />
            <input id="confirm" type="password" placeholder="CONFIRM PASSWORD" /> <br />
            <button type='submit'>SIGN IN</button>
          </form>
        </div>
        <div className="container-right">
          <h3>LOGIN</h3>
          <h5>HAVE AN ACCOUNT?</h5>
          <p>
            Please provide the email address and password associated with the account.
            If you’re having troubles, please use the prompt below to reset your
            password.
          </p>
          <button className="buttonnext"  >
            <Link to="/login">PROCESS TO LOGIN</Link>
          </button>
        </div>
      </div>

    </div>
  )
}
