import React, { useEffect, useRef, useState } from 'react'
import "./DetailItem.scss"
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { productActions } from '../../stores/slices/products.slice'
import { convertToUSD , createBuyAnimation} from '@mieuteacher/meomeojs'
import { Link } from 'react-router-dom'
import { userLoginActions } from '@stores/slices/userLogin.slice';
import CartItem from '../Carts/CartItem'
import {  message} from 'antd';
export default function DetailItem() {
    const { id } = useParams()
    const [quantity, setQuantity] = useState(1)
    const quantityRef = useRef()
    const dispatch = useDispatch();
    const productStore = useSelector(store => store.productStore);
    const userLoginStore = useSelector(store => store.userLoginStore);

    useEffect(() => {
        dispatch(productActions.filterProductById(id))
        dispatch(userLoginActions.checkTokenLocal(localStorage.getItem("token")))
    }, [])

    const product = productStore.listProducts[[0]]

    function addToCart(buyItem) {
        console.log("da vao add");
        if (localStorage.getItem("token")) {


            let carts = [];
            let flag = false;

            carts = userLoginStore.userInfor.carts?.slice().map(item => {
                if (item.productId == buyItem.productId) {
                    let temp = { ...item };
                    temp.quantity += buyItem.quantity;
                    flag = true;
                    return temp
                }

                return item
            })



            if (!flag) {
                carts?.push(buyItem)
            }

            dispatch(userLoginActions.updateCart(
                {
                    userId: userLoginStore.userInfor.id,
                    carts: {
                        carts: carts
                    }
                }
            ))
            return
        }

        // chưa đăng nhập

        if (localStorage.getItem("carts")) {
            // đã từng có giỏ hàng
            let carts = JSON.parse(localStorage.getItem("carts"));
            console.log(carts);
            let flag = false;
            carts.map(item => {
                if (item.productId == buyItem.productId) {
                    item.quantity += buyItem.quantity
                    flag = true;
                }
                return item
            })
            if (!flag) {
                carts.push(buyItem)
            }
            localStorage.setItem("carts", JSON.stringify(carts));
        } else {
            // chưa từng có
            let carts = [buyItem]
            localStorage.setItem("carts", JSON.stringify(carts));
        }
    }
    return (
        <div className="Container">
            <div className="ContainerDetail">

                <div className="Image">
                    <div style={{ margin: "0px 0px 20px 100px" }}> <Link style={{ color: "black" }} to="/shop/hoabo" >BACK TO SHOP</Link></div>
                    <img className='imageItem' src={`${product?.url}`} alt="" />
                </div>
                <div className="DetailItem">
                    <div className="content">
                        <h1 style={{ marginTop: "40px" }}>{product?.name}</h1>
                        <p>Renew Hope Society - Monthly Floral Subscription</p>
                        <p>Availabillty: In Stock {product?.stock} Items </p>
                        <div className="quantityCart">
                            <h5>Price :{convertToUSD(product?.price)} </h5>
                            <div className="quantity" style={{ margin: "20px" }}>
                                <i className="fa-solid fa-plus" onClick={() => quantity < product.stock ? setQuantity(quantity + 1) : <></>}></i>
                                <span ref={quantityRef} style={{ padding: "10px" }}>{quantity}</span>
                                <i className="fa-solid fa-minus" onClick={() => quantity > 1 ? setQuantity(quantity - 1) : <></>}></i>
                                    
                            </div>
                            <div>
                                <button className='addToCartButton' onClick={(e) => {
                                        let imageElement = e.target.parentNode.parentNode.parentNode.parentNode.parentNode.querySelector(".imageItem");
                                        let cartElement = document.querySelector(".fa-cart-shopping")
                                        createBuyAnimation(imageElement,cartElement,50,50)
                                    let quantity = Number(quantityRef.current.innerText);
                                    addToCart(
                                        {
                                            productId: product.id,
                                            quantity: quantity,
                                            des: "hello baby",
                                            url: product.url,
                                            name : product.name,
                                            price: product.price
                                        }
                                    )
                                    message.success("da them san pham vao gio hang")
                                    setQuantity(1)
                                }} >ADD TO CART
                            </button>
                            </div>

                        </div>

                    </div>


                </div>
            </div>
        </div>
    )
}
