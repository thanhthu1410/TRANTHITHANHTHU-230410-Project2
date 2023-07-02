import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const createNewUsers = createAsyncThunk(
    "register",
    async () => {
        let result = await axios.get(process.env.REACT_APP_SERVER_JSON + 'users');
        return  result.data
    }
)
const registerSlice = createSlice({
    name : "register",
    initialState:{
        loading : false,
        user : []
    },
    reducers:{

    },
    extraReducers: (builder) => {
        builder.addCase(createNewUsers.pending, (state, action) => {
            state.loading = true
            // console.log("da vao pending",action.payload);
        });
    }

})