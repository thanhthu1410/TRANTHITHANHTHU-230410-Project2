import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const findAllProducts = createAsyncThunk(
    "findAllProducts",
    async () => {
        let res = await axios.get(process.env.REACT_APP_SERVER_JSON + 'products');
        return res.data
    }
)

const productSlice = createSlice(
    {
        name : "product",
        initialState:{
            listProducts : [],
            cart : []
        },
        extraReducers: (builder) => {
            // find all products
            builder.addCase(findAllProducts.fulfilled, (state,action)=>{
                state.listProducts = [...action.payload]
            })
        }

    }
)

export const productActions = {
    ...productSlice.actions,
    findAllProducts
}
export default productSlice.reducer;