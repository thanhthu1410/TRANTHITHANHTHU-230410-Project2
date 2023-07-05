import React, { useEffect, useState } from 'react'
import "./Cart.scss"
import { useDispatch, useSelector } from 'react-redux';
import { userLoginActions } from '../../stores/slices/userLogin.slice';
import { cartsActions } from '../../stores/slices/cart.slice';

export default function CartItemLocal({ item, setCartData, cartData }) {
    const [quantity,setQuantity] = useState(item.quantity)
    const dispatch = useDispatch();

    const userLoginStore = useSelector(store => store.userLoginStore);

    useEffect(() => {
        dispatch(userLoginActions.checkTokenLocal(localStorage.getItem("token")))
    },[]);

    function handleDeleteProduct(productId) {
        // console.log(productId);

        let carts = userLoginStore.userInfor.carts
        // console.log(carts);

        let updatedCart = carts.filter((product) => product.productId !== productId)

        setCartData(updatedCart)

        // console.log(updatedCart);

        dispatch(userLoginActions.updateCart(
            {
                userId: userLoginStore.userInfor.id,
                carts: {
                    carts: updatedCart
                }
            }
        ))
    }

    return (
        <div style={{ border: "1px solid" }} className='itemContainer'>
            <div className='item'>
                <div className='itemImage'>
                    <img src={item?.url} alt="" />
                </div>
                <div className='detailItem'>
                    <h5>Name :{item?.name}</h5>
                    <p>Price:{item?.price}</p>
                    <div className='quantity'>
                        <i class="fa-solid fa-plus"  onClick={()=>{setQuantity(quantity + 1)
                         dispatch(cartsActions.updateItemInCart(
                            {
                                ...item,
                                quantity: quantity + 1
                            }
                        ))
                        }}></i>
                        <span style={{ padding: "0 10px" }}>{quantity}</span>
                        <i class="fa-solid fa-minus"  onClick={()=>{if(quantity > 1){
                            setQuantity(quantity - 1)
                            dispatch(cartsActions.updateItemInCart(
                                {
                                    ...item,
                                    quantity: quantity - 1
                                }
                            ))
                        }
                        }}></i>
                    </div>
                </div>
                <div onClick={() => dispatch(cartsActions.deleteItemInCart(item.productId))}><i class="fa-solid fa-trash-can"></i></div>
            </div>
        </div>
    )
}
