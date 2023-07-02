import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import "./Shop.scss"
import { useDispatch, useSelector } from 'react-redux'
import { productActions } from '../../stores/slices/products.slice'
// import {useNavigate } from 'react-router-dom/dist'
import { convertToUSD } from '@mieuteacher/meomeojs'

export default function Shop() {

  const { type } = useParams()
 console.log(type);
  const dispatch = useDispatch();
  const productStore = useSelector(store => store.productStore.listProducts)
  // const navigate = useNavigate()

  useEffect(() => {
    dispatch(productActions.findAllProducts())
    console.log(productStore);
  }, [])



  return (
    <div>
      <h1>Shop Page</h1>

      <div className="containerShop">
        <div className="containerAllItem">

          {productStore?.filter((product) => product.type == type).map((product) =>

            <div className="Item"  >
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
