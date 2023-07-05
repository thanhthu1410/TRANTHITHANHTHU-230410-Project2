import React, { useEffect, useState } from 'react'
import "./Home.scss"
import Banner from './components/Banners/Banner';
import Story from './components/Storys/Story';
import Footer from './components/Footers/Footer';
import DetailItem from '../DetailItems/DetailItem';
import Login from '../Logins/Login';
import { userLoginActions } from '@stores/slices/userLogin.slice';
import { useDispatch, useSelector } from 'react-redux'
import { productActions } from '../../stores/slices/products.slice';
import Admin from '../Admins/Admin';

export default function Home() {
  const dispatch = useDispatch();
  const userLoginStore = useSelector(store => store.userLoginStore)
 
  
  useEffect(() => {
    dispatch(userLoginActions.checkTokenLocal(localStorage.getItem("token")))
  }, [])

  useEffect(() => {
    if (localStorage.getItem("token")) {
      if (userLoginStore.userInfor != null) {
        if (localStorage.getItem("carts")) {
          if (userLoginStore.userInfor.carts.length == 0) {
            dispatch(userLoginActions.updateCart(
              {
                userId: userLoginStore.userInfor.id,
                carts: {
                  carts: JSON.parse(localStorage.getItem("carts"))
                }
              }
            ))
          }else {
            let carts = JSON.parse(localStorage.getItem("carts"));
            let jssCarts = [...userLoginStore.userInfor.carts];

            for (let i in carts) {
              for (let j in jssCarts) {
                if (carts[i].productId == jssCarts[j].productId) {
                  carts[i].quantity += jssCarts[j].quantity;
                  jssCarts.splice(j, 1);
                }
              }
            }

            let result  = carts.concat(jssCarts);

            dispatch(userLoginActions.updateCart(
              {
                userId: userLoginStore.userInfor.id,
                carts: {
                  carts: result
                }
              }
            ))
          }
        }
      }
    }
  }, [])
  return (
    <div className="home">
      <Banner />
      <Story />
      <Footer />
     
    </div>
  )
}
