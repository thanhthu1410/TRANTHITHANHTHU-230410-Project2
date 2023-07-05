import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import "./Shop.scss"
import { useDispatch, useSelector } from 'react-redux'
import { productActions } from '../../stores/slices/products.slice'
// import {useNavigate } from 'react-router-dom/dist'
import { convertToUSD, randomId } from '@mieuteacher/meomeojs'

export default function Shop() {

  const { type } = useParams()

  const dispatch = useDispatch();
  const productStore = useSelector(store => store.productStore)
 

  useEffect(() => {
    dispatch(productActions.filterProductByType(type))
  },[type])


  return (
    <div>
  

      <div className="containerShop">
        <div className="containerAllItem">

          {productStore.listProducts?.map((product) =>

            <div key={randomId()} className="Item"  >
              <div className="imageItem">
                <img src={product.url} alt="" />
              </div>
              <div className="itemDetail">
                <h5>Name : {product.name} </h5>
                <p>Price : {convertToUSD( product?.price)}</p>
                <Link className='detailButton' to={"/detail/" + `${product.id}`} > DETAIL </Link>
              </div>
            </div>)}
        </div>
      </div>
           
    </div>
  )
}
