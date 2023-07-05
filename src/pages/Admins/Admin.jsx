import React, { useEffect } from 'react'
import "./Admin.scss"
import { useDispatch, useSelector } from 'react-redux'
import { productActions } from '../../stores/slices/products.slice'

export default function Admin() {
  const productStore = useSelector(store => store.productStore)
  const dispatch = useDispatch()
  useEffect(() => {

    dispatch(productActions.findAllProducts());

  }, [])
  console.log(productStore.listProducts);

  return (
    <div className='container'>
      <h1>ADMIN</h1>
      <div className='container-two'>
        <div className='TitleContainer'>
          <p> + LIST CUSTOMER</p>
          <p>+ HISTORY</p>
          <p> + ADD PRODUCT</p>

          <input type="text" placeholder='search item' />
        </div>
        <div className='listProducts'>
          <h3>List Products</h3>
          <div className='productDetailContainer' >
            {productStore.listProducts.map((item) =>
              <div className='productDetail' >
                <div>
                  <img src={item.url} alt="" />
                </div>
                <div className='detail'>
                  <p>{item.name}</p>
                  <p>+ {item.quantity} -</p>
                  <p>{item.price}</p>
                </div>
              </div>
            )}


          </div>
        </div>
      </div>
    </div>
  )
}
