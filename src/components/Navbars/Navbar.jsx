import React, { useEffect, useState } from 'react'
import "./Navbar.scss"
import { Link, useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router-dom/dist'
import { useDispatch, useSelector } from 'react-redux'
import { userLoginActions } from '@stores/slices/userLogin.slice';

import Cart from '../../pages/Carts/Cart'
import { productActions } from '../../stores/slices/products.slice'
import SearchModal from '../SearchModal/SearchModal'

export default function Navbar() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const userLoginStore = useSelector(store => store.userLoginStore)
    const productStore = useSelector(store => store.productStore)
    const [showSearch, setShowSearch] = useState(false)
    const [valueSearch, setValueSearch] = useState("")


    useEffect(() => {
        if (localStorage.getItem("token")) {
            dispatch(userLoginActions.checkTokenLocal(localStorage.getItem("token")));
        }
    }, []);

    const [timeOutTarget, setTimeOutTarget] = useState(null);

    const handleChange = (e) => {

        clearTimeout(timeOutTarget); // hủy các timeout đã được đặt trước đó

        setTimeOutTarget(setTimeout(() => {


            if (!userLoginStore.loading) {

                if (e.target.value != "") {
                    console.log("da vao")
                    setShowSearch(true)
                    dispatch(productActions.searchProductByName(e.target.value))
                } else {
                    setShowSearch(false)
                    dispatch(productActions.searchProductByName(e.target.value))
                    dispatch(productActions.clearDataSearch())
                    return
                }


            }

        }, 500));
    };

    useEffect(() => {
        console.log("productStore.searchData", productStore.searchData)
    }, [productStore.searchData])


    return (
        <div>
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
                            style={{marginTop:"4px"}}
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
                    <div className='search-button'>
                        <SearchModal/>
                    </div>

                </ul>
                <div className='NavCartAccount' >
                    {userLoginStore.userInfor != null && userLoginStore.userInfor.isAdmin == true ? <Link to="/admin"><span style={{ color: "black" }} class="material-symbols-outlined">
                        admin_panel_settings
                    </span></Link> : <></>}


                    <span style={{ margin: "0px 10px 10px 0pa" }}>  <Cart /> </span>

                    {userLoginStore.userInfor != null ? (
                        <div style={{ display: "flex" }}>
                            <div className='avatar'>
                                <img src={userLoginStore.userInfor.avatar} alt="" />
                            </div>
                            <div>
                                <Link to="/login" onClick={() => {
                                    if (window.confirm("Do you want to log out? ")) {
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
            
        </div>

    )
}
