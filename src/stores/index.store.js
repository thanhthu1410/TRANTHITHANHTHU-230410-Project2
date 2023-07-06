import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./slices/products.slice";
import userLoginReducer from './slices/userLogin.slice';
import cartsReducer from './slices/cart.slice';

const store = configureStore(
    {
        reducer: {
            productStore: productReducer,
            userLoginStore: userLoginReducer,
            cartsLocalStore: cartsReducer

        }
    }
)

export default store