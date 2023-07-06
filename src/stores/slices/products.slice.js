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

const searchProductByName = createAsyncThunk(
    "searchProductByName",
   
    async (name) => {
        let res = await axios.get(`${process.env.REACT_APP_SERVER_JSON}products?name_like=${name}`)
        return res.data
    }
)

const createReceipt = createAsyncThunk(
    "createReceipt",
    async(userObj)=>{
        console.log(process.env.REACT_APP_SERVER_JSON + 'users/' + userObj.id);
        let res = await axios.patch(process.env.REACT_APP_SERVER_JSON + 'users/' + userObj.id , userObj.patchData);
        return res.data
    }
)

const addNewProduct = createAsyncThunk(
    "addNewProduct",
    async(newProduct)=>{
        let res = await axios.post(process.env.REACT_APP_SERVER_JSON + 'products', newProduct);
        return res.data
    }
)

const productSlice = createSlice(
    {
        name : "product",
        initialState:{
            listProducts : [],
            searchData : [],
        },
        reducers: {
            clearDataSearch: (state, action) => {
                return {
                    ...state,
                    searchData:[]
                }
            }
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
              state.listProducts = [...action.payload]
            console.log("action.payload", action.payload)
            })
            // search product
            builder.addCase(searchProductByName.fulfilled, (state,action)=>{
             
              state.searchData = [...action.payload]
                
            })

            // checkOut 
            builder.addCase(createReceipt.pending, (state,action)=>{
                console.log("pending ");
                    // return user.receipt = [...action.payload.carts]

            })

            builder.addCase(createReceipt.fulfilled, (state,action)=>{
                console.log("checkout gio hang ",action.payload);
                    // return user.receipt = [...action.payload.carts]
            

        
                
            });

            // add new product
            builder.addCase(addNewProduct.fulfilled, (state,action)=>{
                console.log("action.payload new product",action.payload)  
            })
          
        }

    }
)

export const productActions = {
    ...productSlice.actions,
    findAllProducts,
    filterProductByType,
    filterProductById,
    searchProductByName,
    createReceipt,
    addNewProduct
}
export default productSlice.reducer