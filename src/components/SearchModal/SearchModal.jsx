import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import "./SearchModal.scss";
import { useDispatch, useSelector } from 'react-redux';
import { productActions } from '../../stores/slices/products.slice'
import { convertToUSD } from '@mieuteacher/meomeojs';
import { Link, useNavigate } from 'react-router-dom';
// import FoodModal from './FoodModal';

function SearchModal() {
    const [show, setShow] = useState(false);
    const [showSearch, setShowSearch] = useState(false);

    const navigate = useNavigate();

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const dispatch = useDispatch();

    const userLoginStore = useSelector(store => store.userLoginStore);

    const productStore = useSelector(store => store.productStore);

    const [timeOutTarget, setTimeOutTarget] = useState(null);

    const handleChange = (e) => {

        clearTimeout(timeOutTarget); // hủy các timeout đã được đặt trước đó

        setTimeOutTarget(setTimeout(() => {

            if (!userLoginStore.loading) {
                if (e.target.value != "") {
                    setShowSearch(true)
                    dispatch(productActions.searchProductByName(e.target.value))
                }
                if (e.target.value == "") {
                    setShowSearch(false)
                }

            }

        }, 1000));
    };

    console.log(productStore.searchData)


    return (
        <>

            <Button style={{ backgroundColor: "#fff", color: "black", border: "none",width:"100px",paddingLeft:"0px" }} onClick={handleShow} size="sm" className="search-btn-container">
                SEARCH
            </Button>

            <Modal show={show} onHide={handleClose} size='xl' fullscreen='xxl-down'>
                <Modal.Header closeButton>
                    <Modal.Title>
                        <input onChange={(e) => handleChange(e)} className='input-search' type="text" placeholder='SEARCH BY NAME ...' autoFocus />
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='modal-body-container'>

                        <div className='search-render'>
                            <h3>SUGGESTED PRODUCTS</h3>
                            <div className='search-food-container'>

                                {
                                    showSearch ? (productStore.searchData.map((product) =>

                                        <div className='productDetail' >
                                            <div className='product-img'>
                                                <img src={product.url} alt="" />
                                            </div>
                                            <div className='detail'>
                                                <p>Name: {product.name} </p>
                                                <p>Price: {product.price}</p>
                                                <p>Quantity : {product.stock}</p>
                                                <Link to={"/detail/" + `${product.id}`} style={{color:"black"}} onClick={() => {
                                                    setShowSearch(false);
                                                    handleClose()
                                                }}>Detail</Link>
                                            </div>
                                        </div>)) : <></>

                                }


                            </div>
                        </div>
                    </div>

                </Modal.Body>
            </Modal>
        </>
    );
}

export default SearchModal;