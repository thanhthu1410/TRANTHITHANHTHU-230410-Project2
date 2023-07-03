import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const findAllProducts = createAsyncThunk(
    "findAllProducts",
    async () => {
        let res = await axios.get(process.env.REACT_APP_SERVER_JSON + 'products');
        return res.data
    }
)

const filterProductByType = createAsyncThunk(
    "filterProductByType",
    async (type) => {
        let res = await axios.get(`${process.env.REACT_APP_SERVER_JSON}products?type=${type}`)
        return res.data
    }
)
const filterProductById = createAsyncThunk(
    "filterProductById",
    async (id) => {
        let res = await axios.get(`${process.env.REACT_APP_SERVER_JSON}products?id=${id}`)
        return res.data
    }
)

const productSlice = createSlice(
    {
        name : "product",
        initialState:{
            listProducts : []
        },
        extraReducers: (builder) => {
            // find all products
            builder.addCase(findAllProducts.fulfilled, (state,action)=>{
                 state.listProducts = [...action.payload]
            })

            // filter product by Type
            builder.addCase(filterProductByType.fulfilled, (state,action)=>{
                state.listProducts = [...action.payload]
            })

            builder.addCase(filterProductById.fulfilled, (state,action)=>{
                console.log("da vao detail");
              state.listProducts = [...action.payload]
                
            })
        }

    }
)

export const productActions = {
    ...productSlice.actions,
    findAllProducts,
    filterProductByType,
    filterProductById
}
export default productSlice.reducer