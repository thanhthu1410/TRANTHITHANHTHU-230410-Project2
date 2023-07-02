import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./slices/products.slice";
import userLoginReducer from './slices/userLogin.slice'

const store = configureStore(
    {
        reducer: {
            productStore: productReducer,
            userLoginStore: userLoginReducer
        }
    }
)

export default store