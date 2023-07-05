import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { productActions } from '../../../stores/slices/products.slice';
import "./CheckOut.scss"
import {  message} from 'antd';
import { useNavigate } from 'react-router-dom';
export default function CheckOut() {
    const [name,setName] = useState("")
    const [phone,setPhone] = useState("")
    const [address,setAddress] = useState("")
    const[date,setDate] = useState("")
    const userLoginStore = useSelector(store => store.userLoginStore)
    const [email,setEmail] = useState(userLoginStore.userInfor.email)
    const dispatch = useDispatch()
    const navigate =  useNavigate()
    
    useEffect(() => {
        console.log("thu ne ", userLoginStore.userInfor);

    }, [])
    return (
        <div className='containerCheckOut'>
        
                <div className='container-two'>

                <div className='inforDelivery'>
                    <label htmlFor="">NAME:</label> <br />
                    <input type="text" value={name} onChange={(e)=>setName(e.target.value)} placeholder='Your Name'  /><br />
                    <label htmlFor="">EMAIL:</label> <br />
                    <input type="email" value={email} onChange={(e)=> setEmail(e.target.value)} name='emailUser' placeholder='Email' /><br />
                    <label htmlFor="" > SHIPPING ADDRESS:</label> <br />
                    <input type="text" value={address} onChange={(e)=>setAddress(e.target.value)} name='addressUser' placeholder='Address' /><br />
                </div>
                <div className='inforDelivery-right'>
                    <label htmlFor="">PHONE NUMBER:</label> <br/>
                    <input type="text" value={phone} onChange={(e)=>setPhone(e.target.value)} name='phoneNumber' placeholder='Phone Number' /> <br />
                    <label htmlFor="">DELIVERY DATE</label><br/>
                    <input type="date" value={date} onChange={(e)=>setDate(e.target.value)} placeholder='' /> <br/>
                    <button className='buttonCheckOut' onClick={() => {
                    if(name == "" || phone == "" || email == "" || address == "" ){
                            message.error("Please Check Your Information",2)
                            return
                    }else{
                        dispatch(productActions.createReceipt({
                            id: userLoginStore.userInfor.id,
                            patchData:
                            {   information:[{
                                name:name,
                                phone:phone,
                                address:address,
                                }],
                                carts: [],
                                receipt: [...userLoginStore.userInfor.carts, ...userLoginStore.userInfor.receipt]
                            }
                         }))
                         message.success("Thank you!")
                         navigate("/")
                         
                    }
                   

                }
                
                }
                 >CHECK OUT</button>
                </div>

              
            </div>
            
            
           
        </div>
    )
}
