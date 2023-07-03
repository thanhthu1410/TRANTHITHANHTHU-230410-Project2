import React, { useEffect } from 'react'
import "./Navbar.scss"
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom/dist'
import { useDispatch, useSelector } from 'react-redux'
import { userLoginActions } from '@stores/slices/userLogin.slice';

import Cart from '../../pages/Carts/Cart'

export default function Navbar() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const userLoginStore = useSelector(store => store.userLoginStore)

    useEffect(() => {
        dispatch(userLoginActions.checkTokenLocal(localStorage.getItem("token")))

    }, [])

    return (
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
                <span style={{marginLeft:"25px"}}>  <Cart/> </span>
                
                {localStorage.getItem("token") ? (<Link to="/login" onClick={() => {
                    alert("ban co muon dang xuat khong ")
                    localStorage.removeItem("token")
                    dispatch(userLoginActions.logOut())
                    navigate("/login")
                }
                }
                ><i className="fa-solid fa-right-from-bracket"></i></Link>) :
                    <Link to="/login" className='registerIcon'><i className="fa-regular fa-user"></i></Link>}
            </ul>
        </div>
    )
}
