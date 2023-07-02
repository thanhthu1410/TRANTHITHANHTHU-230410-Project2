import React from 'react'
import "./Navbar.scss"
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom/dist'
export default function Navbar() {
    const navigate = useNavigate();
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
                       <span style={{fontSize:"16px"}}> SHOP</span>
                    </button>
                    <ul className="dropdown-menu"  aria-labelledby="dropdownMenuButton" style={{minWidth: "50px"}}>
                        <Link to="/shop/hoabo">
                            <a className="dropdown-item" >
                            Bouquet Flower
                            </a>
                        </Link>
                        <Link to="/shop/hophoa">
                            <a className="dropdown-item" >
                            Box Flower
                            </a>
                        </Link>
                        <Link to="/shop/hoalan">
                            <a className="dropdown-item" >
                            Orchid Flower
                            </a>
                        </Link>
                        <Link to="/shop/hoacuoi">
                            <a className="dropdown-item" >
                         Wedding Flower
                            </a>
                        </Link>
                    </ul>
                </Link>
                <Link to="/cart">  <i className="fa-solid fa-cart-shopping"></i></Link >
                <Link to="/register"><i className="fa-regular fa-user"></i></Link>
            </ul>
        </div>
    )
}
