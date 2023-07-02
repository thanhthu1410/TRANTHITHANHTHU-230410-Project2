import React, { useEffect, useState } from 'react'
import "./DetailItem.scss"
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { productActions } from '../../stores/slices/products.slice'
import { convertToUSD } from '@mieuteacher/meomeojs'
import { Link } from 'react-router-dom'

export default function DetailItem() {
    const { id } = useParams()
    const [quantity,setQuantity] = useState(1)

    const dispatch = useDispatch();
    const productStore = useSelector(store => store.productStore.listProducts)
    useEffect(() => {
        dispatch(productActions.findAllProducts())
    }, [])

    console.log(productStore)
    const product = productStore.find((product) => {
        return product.id == id
    })
    console.log(product)
    return (
        <div className="Container">
            <div className="ContainerDetail">

                <div className="Image">
                   <div style={{margin:"0px 0px 20px 100px"}}> <Link style={{color:"black"}} to="/shop/hoabo" >BACK TO SHOP</Link></div>
                    <img src={`${product?.url}`} alt="" />
                </div>
                <div className="DetailItem">
                    <div className="content">
                        <h1 style={{ marginTop: "40px" }}>{product?.name}</h1>
                        <p>Renew Hope Society - Monthly Floral Subscription</p>
                        <p>Availabillty: In Stock {product?.stock} Items </p>
                        <div className="quantityCart">
                            <h5>Price :{convertToUSD(product?.price)} </h5>
                            <div className="quantity" style={{ margin: "20px" }}>
                                <i className="fa-solid fa-plus" onClick={()=> quantity < product.stock ? setQuantity(quantity + 1) : <></>}></i>
                                <span style={{ padding: "10px" }}>{quantity}</span>
                                <i class="fa-solid fa-minus" onClick={()=> quantity > 1 ? setQuantity(quantity -1 ) : <></>}></i>

                            </div>
                            <div>
                                <button >ADD TO CART</button>
                            </div>

                        </div>

                    </div>


                </div>
            </div>


        </div>
    )
}
