import React, { useEffect, useState } from 'react'
import "./Admin.scss"
import { useDispatch, useSelector } from 'react-redux'
import { productActions } from '../../stores/slices/products.slice'
import { userLoginActions } from '../../stores/slices/userLogin.slice'
import { convertToUSD } from '@mieuteacher/meomeojs'

export default function Admin() {
  const productStore = useSelector(store => store.productStore)
  const userLoginStore = useSelector(store => store.userLoginStore)
  const [showCustomers,setShowCustomers] = useState(false)
  const [showHistory,setShowHistory] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
      
    dispatch(productActions.findAllProducts());
    dispatch(userLoginActions.getAllUsers())

  }, [])

  console.log(userLoginStore.listUsers,"userLoginStore");
  console.log("productStore",productStore);
  const listUserCustomers = [];
  for ( let i in userLoginStore.listUsers){
        if(userLoginStore.listUsers[i].information.length != 0){
                listUserCustomers.push(userLoginStore.listUsers[i])
        }
  }

  const listReceipts = [];
  for ( let i in userLoginStore.listUsers){
    if(userLoginStore.listUsers[i].receipt.length != 0){
      listReceipts.push(userLoginStore.listUsers[i].receipt)
    }
}


const listReceiptsFlat = listReceipts.flat()


  return (
    <div className='container'>
      <h1>ADMIN</h1>
      <div className='container-two'>
        <div className='TitleContainer'>
          <p onClick={()=> setShowCustomers(true)}> + LIST CUSTOMERS</p>
          <p onClick={()=> setShowHistory(true)}>+ HISTORY</p>
          <p> + ADD PRODUCT</p>

          <input type="text" placeholder='search item' />
        </div>

        {/* history */}
        {showCustomers ?  <div>
          ListCustommers : 
          <div className='listUser'>
            <table>
              <thead>
                <tr>
                  <th>STT</th>
                  <th>NAME</th>
                  <th> PHONE </th>
                  <th> ADDRESS</th>
                </tr>
              </thead>
              <tbody>
              {listUserCustomers.map((user,index) => 
                <tr>
                  <td>{index + 1}</td>
                  <td>{user.information[0].name}</td>
                  <td>{user.information[0].phone}</td>
                  <td>{user.information[0].address}</td>
                </tr>
                 )}
                 <tr>
                  <td colSpan={4}>
                    <button onClick={()=> setShowCustomers(false)} style={{width:"100px",backgroundColor:"black",color:"#fff"}}>CLOSE</button>
                  </td>
                 </tr>
              </tbody>
             </table>
            
             
           
           
         
          </div>
        </div> : <></>}

          {showHistory ?    <div className='history'>
              <table>
                <thead>
                  <tr>
                    <th>STT</th>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Quantity</th>
                    <th>Time</th>
                  </tr>
                </thead>
                <tbody>
                  {listReceiptsFlat.map((receipt,index)=>
                     <tr>
                     <td>{index + 1}</td>
                    <td><img className='imageReceipt' src={receipt.url} alt="" /> </td> 
                     <td>{receipt.name}</td>
                     <td>{receipt.quantity}</td>
                     <td>{receipt.time}</td>
                   </tr>
                  )}
                  <tr>
                  <td colSpan={5}>
                    <button onClick={()=> setShowHistory(false)} style={{width:"100px",backgroundColor:"black",color:"#fff"}}>CLOSE</button>
                  </td>
                 </tr>
                 
                </tbody>
              </table>
        </div> : <></>}
     
       
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
                  <p>+ {item.stock} -</p>
                  <p>{convertToUSD(item.price)}</p>
                </div>
              </div>
            )}


          </div>
        </div>
      </div>
    </div>
  )
}
