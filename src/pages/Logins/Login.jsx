
import "./Login.scss"
import { Link } from 'react-router-dom'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Loading from '@components/Loadings/Loading'
import { userLoginActions } from '@stores/slices/userLogin.slice'
import { useNavigate } from 'react-router-dom'
import { message } from "antd"



export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const userLoginStore = useSelector(store => store.userLoginStore);

  useEffect(() => {
    if (userLoginStore.userInfor == null) {
      if (localStorage.getItem("token")) {
        dispatch(userLoginActions.checkTokenLocal(localStorage.getItem("token")))
      }
    } else {
      navigate('/')
    }
  }, [userLoginStore.userInfor])

  return (
    <div className="divContainerLogin">
      <div className="container-all">
      {
                userLoginStore.loading ? <Loading></Loading> : <></>
            }

        <div className="container-left">
          <h3>LOGIN</h3>
          <h5>REGISTERED CUSTOMERS</h5>
          <p>
            Please provide the email address and password associated with the account.
            If you're having trouble, please use the prompt below to reset your
            password.
          </p>{" "}
          <br />
          <form action="" onSubmit={(eventForm) => {
            eventForm.preventDefault(); // vô hiệu hành vi mặc định form

            if (eventForm.target.inputUserEmail.value == "" || eventForm.target.inputPassword.value == "") {
              message.warning("Please check your information")
              return
            }

            dispatch(userLoginActions.login(
              {
                email: eventForm.target.inputUserEmail.value,
                password: eventForm.target.inputPassword.value
              }
            ))

          }} className='login_form'>
            <input id="valueEmail" type="email" placeholder="EMAIL ADDRESS" name="inputUserEmail" /> <br />
            <p className="validexEmail">Pleas check your email</p>
            <input id="valuePassword" type="password" placeholder="PASSWORD" name="inputPassword"/> <br />
            <button type="submit">SIGN IN</button>

          </form>

        </div>
        <div className="container-right"
        >
          <h3>REGISTER</h3>
          <h5>NEED AN ACCOUNT?</h5>
          <p>
            By creating an account with our store, you will be able to move through
            the checkout process faster, store multiple shipping addresses, view and
            track your orders in your account, and more
          </p>
          <button className="buttonnext" >
            <Link style={{color:"black"}} to="/register">PROCEED TO REGISTER</Link>
          </button>
        </div>
      </div>

    </div>
  )
}
