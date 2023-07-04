import React, { useEffect, useState } from 'react'
import "./Navbar.scss"
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom/dist'
import { useDispatch, useSelector } from 'react-redux'
import { userLoginActions } from '@stores/slices/userLogin.slice';

import Cart from '../../pages/Carts/Cart'
import { productActions } from '../../stores/slices/products.slice'

export default function Navbar() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const userLoginStore = useSelector(store => store.userLoginStore)
    const productStore = useSelector(store => store.productStore)
    const [showSearch,setShowSearch] = useState(false)

    useEffect(() => {
        if (localStorage.getItem("token")) {
            dispatch(userLoginActions.checkTokenLocal(localStorage.getItem("token")));
        }
    }, []);

    const [timeOutTarget, setTimeOutTarget] = useState(null);

    const handleChange = (e) => {

        clearTimeout(timeOutTarget); // hủy các timeout đã được đặt trước đó

        setTimeOutTarget(setTimeout(() => {
            // call api

            if (!userLoginStore.loading) {
                if (e.target.value != "") {
                    setShowSearch(true)
                    console.log("thay phuoc ne");
                    dispatch(productActions.searchProductByName(e.target.value))
                }
                if(e.target.value == ""){
                     setShowSearch(false)
                }
               
            }

        }, 1000));
    };

    useEffect(() => {
        console.log("productStore.searchData", productStore.searchData)
    }, [productStore.searchData])
   

    return (
        <>
            <div className='HeaderContainer'>
                <div className='logoContainer'>
                    <div className='logoImage'>
                        <img src="../image/banner/logo.png" alt="" />
                    </div>
                </div>

                <ul className='NavRight' >
                    <a href="#home" onClick={() => navigate("/")} >HOME</a>
                    <a href="#storysContainer" onClick={() => navigate("/")}>ABOUT</a>
                    <Link className="dropdown">
                        <button
                            className="btn btn-primary dropdown-toggle shop-btn"
                            type="button"
                            id="dropdownMenuButton"
                            data-mdb-toggle="dropdown"
                            aria-expanded="false"
                        >
                            <span style={{ fontSize: "16px" }}> SHOP</span>
                        </button>
                        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton" style={{ minWidth: "50px" }}>
                            <Link to="/shop/hoabo">
                                <span className="dropdown-item" >
                                    Bouquet Flower
                                </span>
                            </Link>
                            <Link to="/shop/hophoa">
                                <span className="dropdown-item" >
                                    Box Flower
                                </span>
                            </Link>
                            <Link to="/shop/hoalan">
                                <span className="dropdown-item" >
                                    Orchid Flower
                                </span>
                            </Link>
                            <Link to="/shop/hoacuoi">
                                <span className="dropdown-item" >
                                    Wedding Flower
                                </span>
                            </Link>
                        </ul>
                    </Link>
                    <div>
                        <input onInput={(e) => {
                            // if( searchQuery !== ""){
                            //     handleSearchInputChange(e.target.value)
                            // }
                            handleChange(e);
                        }
                        } type="text" placeholder='Search ....' />
                    </div>

                </ul>
                <div className='NavCartAccount' >

                    <span style={{ margin: "0px 10px 10px 0pa" }}>  <Cart /> </span>

                    {userLoginStore.userInfor != null ? (
                        <div style={{ display: "flex" }}>
                            <div className='avatar'>
                                <img src={userLoginStore.userInfor.avatar} alt="" />
                            </div>
                            <div>
                                <Link to="/login" onClick={() => {
                                    if (window.confirm("ban co muon dang xuat khong ")) {
                                        localStorage.removeItem("token")
                                        dispatch(userLoginActions.logOut())
                                        navigate("/login")
                                    }

                                }
                                }
                                >
                                    <i className="fa-solid fa-right-from-bracket" style={{ color: "black", paddingTop: "8px" }}></i>
                                </Link>
                            </div>

                        </div>) :
                        <Link to="/login" className='registerIcon'><i style={{ color: "black", padding: "0px 25px 8px 25px" }} className="fa-regular fa-user"></i></Link>}
                </div>
            </div>
            {showSearch ? ( <div className='searchItem'>
              {  productStore.searchData?.map((item) =>
                <div className='itemSearch'>
                <div className='imgItem'>
                    <img src={item.url} alt="" />
                </div>
                <div className='detailItemSearch'>
                    <h6>{item.name}</h6>
                    <p>Price:{item.price}</p>
                    <p>In Stock :{item.stock}</p>
                </div>
            </div>
              )}
                
            </div>) : <></>}
           
        </>

    )
}
