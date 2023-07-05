import React, { useEffect, useState } from 'react'
import "./Register.scss"
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { userLoginActions } from '../../stores/slices/userLogin.slice'
import Loading from '@components/Loadings/Loading'
import axios from 'axios'
export default function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userLoginStore = useSelector(store => store.userLoginStore);

  const [loadingCheck , setLoadingCheck] = useState(false);
  useEffect(() => {
    if(userLoginStore.userInfor == null ){
      if(localStorage.getItem("token")){
        dispatch(userLoginActions.checkTokenLocal(localStorage.getItem("token")))
      }
    }else{
      navigate('/')
    }
  },[userLoginStore.userInfor])
  return (
    <div className='containerRegister'>
      <div className="container-all">
        {
          userLoginStore.loading || loadingCheck ? <Loading></Loading> : <></>
        }
        <div className="container-left">
          <h3>REGISTER</h3>
          <h5>NEW CUSTOMERS</h5>
          <p>
            By creating an account with our store, you will be able to move through
            the checkout process faster, store multiple shipping addresses, view and
            track your orders in your account and more.
          </p>
          <form action="" onSubmit={async (e)=>{
            e.preventDefault();
            if(e.target.inputUserEmail.value == "" || e.target.inputUserName.value == "" || e.target.inputPassword.value == "" ||  e.target.inputRePassword.value == ""){
              alert("Please Enter Your Information !")
              return
            }
            if( e.target.inputPassword.value !== e.target.inputRePassword.value ){
              alert("Please Check your Password ")
              return
            }
            if(loadingCheck) {
              return
            }
            setLoadingCheck(true)
            let resultCheck = await axios.get(process.env.REACT_APP_SERVER_JSON + "users" + "?email=" + e.target.inputUserEmail.value);
            if(resultCheck.data.length != 0) {
              console.log(resultCheck.data);
              alert("This account already exists ");
              setLoadingCheck(false)
              return
            }
            setLoadingCheck(false)
            console.log(e.target.inputUserName.value,
              e.target.inputUserEmail.value
              );
            dispatch(userLoginActions.register(
              {
                userName : e.target.inputUserName.value,
                email: e.target.inputUserEmail.value,
                password : e.target.inputPassword.value,
                isAdmin:false,
                firstName : "New",
                lastName: "Member",
                avatar : "https://i.pinimg.com/564x/c8/49/d3/c849d35b6502f1e9918b4f1d5e43f10a.jpg",
                carts : [],
                information: [],
                receipt:[]
                
              }
            ))
            
          }}>
            <input id="valueEmail"   name='inputUserEmail'  type="text" placeholder="YOUR EMAIL" /> <br />
             <input id="valueUserName" name='inputUserName' type="text" placeholder="YOUR NAME" /> <br />
            <input id="valuePassword" name='inputPassword' type="password" placeholder="PASSWORD" /> <br />
            <input id="confirm"  name='inputRePassword' type="password" placeholder="CONFIRM PASSWORD" /> <br />
            <button type='submit' style={{width:"200px",border:"2px solid black",marginLeft:"100px"}}>SIGN IN</button>
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
