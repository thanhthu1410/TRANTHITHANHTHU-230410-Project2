import React, { useEffect } from 'react'
import "./Cart.scss"
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { userLoginActions } from '../../stores/slices/userLogin.slice';
import { productActions } from '../../stores/slices/products.slice';
import CartItem from './CartItem';
import { useNavigate } from 'react-router-dom';
import { convertToUSD } from '@mieuteacher/meomeojs';
import { message } from 'antd';
import {RadiusUprightOutlined,} from '@ant-design/icons';
import CartItemLocal from './CartItemLocal';
// import CartItem from './CartItem';

function Cart() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [cartData, setCartData] = useState([])
  const [cartsLocal, setCartsLocal] = useState(() => JSON.parse(localStorage.getItem("carts")));

  const cartsLocalStore = useSelector(store => store.cartsLocalStore);

  const dispatch = useDispatch();
  const userLoginStore = useSelector(store => store.userLoginStore)
  const navigate = useNavigate()
  
  useEffect(() => {
    dispatch(userLoginActions.checkTokenLocal(localStorage.getItem("token")))
  }, [])

  useEffect(() => {
   

    if (userLoginStore.userInfor != null) {

      let carts = [...userLoginStore.userInfor.carts]

      setCartData(carts)
    }
   
 
  }, [userLoginStore.userInfor])
  const totalQuantity = cartData.reduce((accumulator, product) => Number(accumulator) + Number(product.quantity ), 0)
  const totalPrice = cartData.reduce((accumulator, product) => Number(accumulator) + Number(product.quantity * product.price), 0)
 console.log(totalPrice,"totalPrice");

 

  
  return (
    <>
      <Button variant="primary" onClick={handleShow} style={{ backgroundColor: "#fff", color: "black", border: "none", width: "30px" }}>
       <div style={{display:"flex",position:"relative"}}>
       <i className="fa-solid fa-cart-shopping"></i>
        <span className='quantityItem' style={{position:"absolute", left:"18px",bottom:"3px"}}>{totalQuantity}</span>
       </div>
      </Button>

      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>SHOPPING BAG</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            {cartsLocal ? (cartsLocalStore.map(item => <CartItemLocal item={item} setCartData={setCartData}/>)) :
            (cartData?.map((item) => <CartItem item={item} setCartData={setCartData} cartData={cartData}/>))
          }
            <div className='total' style={{paddingLeft:"40px"}}>
              <p style={{ fontSize: "12px" }}>
                FREE SHIPPING IN US FOR ORDERS OVER $200.00 USD</p>
              <p style={{marginBottom:"0"}}>Total : {totalQuantity}</p>
              <p>ODER TOTAL: {convertToUSD(totalPrice)} </p>
            </div>
          </div>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose} style={{backgroundColor:"#fff",color:"black"}}>
            COUNTINUE
          </Button>
          <Button variant="primary"  style={{backgroundColor:"black",color:"#fff"}} onClick={()=>{
            if(userLoginStore.userInfor != null){
              handleClose(); 
              navigate("/checkout")
            }else{
             alert("Please check your Account")
              return
            }
         } }>
            CHECK OUT
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Cart;