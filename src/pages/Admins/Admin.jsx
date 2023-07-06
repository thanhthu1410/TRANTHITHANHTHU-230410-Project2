import React, { useEffect, useState } from 'react'
import "./Admin.scss"
import { useDispatch, useSelector } from 'react-redux'
import { productActions } from '../../stores/slices/products.slice'
import { userLoginActions } from '../../stores/slices/userLogin.slice'
import { convertToUSD } from '@mieuteacher/meomeojs'
import SearchModal from '../../components/SearchModal/SearchModal'
import { uploadFileToStorage } from "../../firebase.config"
import { message } from 'antd'
export default function Admin() {
  const productStore = useSelector(store => store.productStore)
  const userLoginStore = useSelector(store => store.userLoginStore)
  const [showCustomers, setShowCustomers] = useState(false)
  const [showHistory, setShowHistory] = useState(false)
  const [showAddNew, setShowAddNew] = useState(false)
  const [imgBlod, setImgBlod] = useState(null)
  const dispatch = useDispatch()
  const typeList = [
    {
      title: "Bouquet Flower",
      code: "hoabo"
    },
    {
      title: "Box Flower",
      code: "hoacuoi",
    },
    {
      title: "Orchid Flower",
      code: "hoalan",
    },
    {
      title: "Wedding Flower",
      code: "hophoa"
    }



  ]

  useEffect(() => {

    dispatch(productActions.findAllProducts());
    dispatch(userLoginActions.getAllUsers())

  }, [])

  console.log(userLoginStore.listUsers, "userLoginStore");
  console.log("productStore", productStore);
  const listUserCustomers = [];
  for (let i in userLoginStore.listUsers) {
    if (userLoginStore.listUsers[i].information.length != 0) {
      listUserCustomers.push(userLoginStore.listUsers[i])
    }
  }

  const listReceipts = [];
  for (let i in userLoginStore.listUsers) {
    if (userLoginStore.listUsers[i].receipt.length != 0) {
      listReceipts.push(userLoginStore.listUsers[i].receipt)
    }
  }


  const listReceiptsFlat = listReceipts.flat()


  return (
    <div className='container'>
      <h1>ADMIN</h1>
      <div className='container-two'>
        <div className='TitleContainer'>
          <p onClick={() => { setShowCustomers(true); setShowAddNew(false); setShowHistory(false) }}> + LIST CUSTOMERS</p>
          <p onClick={() => { setShowHistory(true); setShowCustomers(false); setShowAddNew(false) }}>+ HISTORY</p>
          <p onClick={() => { setShowAddNew(true); setShowCustomers(false); setShowHistory(false) }}> + ADD PRODUCT</p>
          <p style={{ margin: "0px", padding: "3px" }}>+<SearchModal /></p>
        </div>
        {showAddNew ? <form onSubmit={async (e) => {
          e.preventDefault();
          let newProduct = {
            name: e.target.productName.value,
            price: e.target.productPrice.value,
            stock: e.target.productStock.value,
            type: e.target.productType.value,
            url: null
          }
          if (e.target.productUrl.files.length == 0 ||
            e.target.productName.value == "" ||
            e.target.productPrice.value == "" ||
            e.target.productStock.value == "" ||
            e.target.productType.value == ""
          ) {
            message.warning("Please check infomation new product! ")
            return
          }
          let result = await uploadFileToStorage(e.target.productUrl.files[0], "productImages")
          if (!result) {
            newProduct.url = "https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg"
          } else {
            newProduct.url = result
          }

          dispatch(productActions.addNewProduct(newProduct))
          message.success("Success !")
          // e.target.productName.value == ""
          // e.target.productPrice.value == ""
          // e.target.productStock.value == ""
          // e.target.productType.value == ""
       

        }} className='containerAddNew'>

          <div className='containerAdd' >

            <div className='containerLeft'>
              <label htmlFor="">Name Product:</label> <br />
              <input name="productName" type="text" /><br />
              <label htmlFor="">Price:</label><br />
              <input name="productPrice" type="text" /><br />
              <label htmlFor="">Stock:</label><br />
              <input name="productStock" type="text" /><br />
              <label htmlFor="">Type:</label><br />
              <select defaultValue={""} name="productType">
                <option value="">Choose</option>
                {
                  typeList.map(option =>
                    <option value={option.code}>{option.title}</option>
                  )
                }
              </select>
            </div>
            <div>
              <label htmlFor="">Image:</label><br />
              <input onChange={(e) => {
                setImgBlod(URL.createObjectURL(e.target.files[0]));
              }} type="file" name='productUrl' /><br />
              <div style={{marginTop:"20px"}}>
                <img width={"150px"} height={"150px"}  src={
                  imgBlod != null ? imgBlod : "https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg"
                } alt="" />
              </div>
            </div>
          </div>

          <div className='buttonAddNew'>
            <button type='submit'>ADD</button>
            <button onClick={() => setShowAddNew(false)}>CLOSE</button>
          </div>
        </form> : <></>}

        {/* history */}
        {showCustomers ? <div>
          <h3>List Custommers : </h3>
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
                {listUserCustomers.map((user, index) =>
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{user.information[0].name}</td>
                    <td>{user.information[0].phone}</td>
                    <td>{user.information[0].address}</td>
                  </tr>
                )}
                <tr>
                  <td colSpan={4}>
                    <button onClick={() => setShowCustomers(false)} style={{ width: "100px", backgroundColor: "black", color: "#fff" }}>CLOSE</button>
                  </td>
                </tr>
              </tbody>
            </table>





          </div>
        </div> : <></>}

        {showHistory ? <div className='history'>
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
              {listReceiptsFlat.map((receipt, index) =>
                <tr key={index} >
                  <td>{index + 1}</td>
                  <td><img className='imageReceipt' src={receipt.url} alt="" /> </td>
                  <td>{receipt.name}</td>
                  <td>{receipt.quantity}</td>
                  <td>{receipt.time}</td>
                </tr>
              )}
              <tr>
                <td colSpan={5}>
                  <button onClick={() => setShowHistory(false)} style={{ width: "100px", backgroundColor: "black", color: "#fff" }}>CLOSE</button>
                </td>
              </tr>

            </tbody>
          </table>
        </div> : <></>}


        <div className='listProducts'>
          <h3>List Products</h3>
          <div className='productDetailContainer' >
            {productStore.listProducts.map((item) =>
              <div className='productDetail' key={item.id}>
                <div>
                  <img src={item.url} alt="" />
                </div>
                <div className='detail'>
                  <p>{item.name}</p>
                  <p>Stock :{item.stock} </p>
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
