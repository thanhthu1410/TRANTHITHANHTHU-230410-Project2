import React, { useState } from 'react'
import "./Cart.scss"

export default function CartItem({ item }) {
    const [quantity,setQuantity] = useState(item.quantity)
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
                        <i class="fa-solid fa-plus"  onClick={()=>setQuantity(quantity + 1)}></i>
                        <span style={{ padding: "0 10px" }}>{quantity}</span>
                        <i class="fa-solid fa-minus"  onClick={()=>{if(quantity > 1){
                            setQuantity(quantity - 1)}
                        }}></i>
                    </div>

                </div>
                <div><i class="fa-solid fa-trash-can"></i></div>
            </div>



           



        </div>
    )
}
