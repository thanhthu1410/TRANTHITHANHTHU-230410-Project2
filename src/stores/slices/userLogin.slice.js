import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const CryptoJS = require("crypto-js");

const login = createAsyncThunk(
    "login",
    async (inforLogin) => {
        // localhost:4000/users
        let res = await axios.get(process.env.REACT_APP_SERVER_JSON + 'users');
        return {
            users: res.data,
            inforLogin: inforLogin
        }
    }
)

const checkTokenLocal = createAsyncThunk(
    "checkTokenLocal",
    async (token) => {
        // localhost:4000/users
        let res = await axios.get(process.env.REACT_APP_SERVER_JSON + 'users');
        return {
            users: res.data,
            token: token
        }
    }
)

const updateCart = createAsyncThunk(
    "updateCarts",
    async (dataObj) => {
        // localhost:4000/users/1
        //console.log("dataObj",dataObj)
        let res = await axios.patch(process.env.REACT_APP_SERVER_JSON + 'users/' + dataObj.userId, dataObj.carts);
        return res.data
    }
)

function createToken(userObj, privateKey) {
    return CryptoJS.AES.encrypt(JSON.stringify(userObj), privateKey).toString();
}
function checkToken(token, privateKey, keyEnv) {
    try {
        if (privateKey != keyEnv) {
            return false
        }
        // giải mã
        const decryptedData = CryptoJS.AES.decrypt(token, privateKey)
            .toString(CryptoJS.enc.Utf8);
        return JSON.parse(decryptedData)
    } catch {
        //console.log("key lỗi")
        return false
    }
}


const register = createAsyncThunk(
    "register",
    async (inforRegister) => {
        // localhost:4000/users
        let res = await axios.post(process.env.REACT_APP_SERVER_JSON + 'users', inforRegister);
        return res.data

    }
)
const userLoginSlice = createSlice(
    {
        name: "userLogin",
        initialState: {
            loading: false,
            userInfor: null
        },
        reducers: {
            logOut : (state,action) => {
                return {
                    ...state,userInfor: null
                }
            }
        },
        extraReducers: (builder) => {
            // login
            builder.addCase(login.fulfilled, (state, action) => {
                let user = action.payload.users.find(user => user.userName == action.payload.inforLogin.userName);
                if (!user) {
                    alert("Không tìm thấy người dùng")
                } else {
                    if (user.password != action.payload.inforLogin.password) {
                        alert("Mật khẩu không chính xác")
                    } else {
                        state.userInfor = user; // cập nhật lại state
                        // tạo token và lưu vào local storage

                        // Mã hóa dữ liệu
                        let token = createToken(user, process.env.REACT_APP_JWT_KEY);
                        localStorage.setItem("token", token);
                    }
                }

            });
            // check token
            builder.addCase(checkTokenLocal.fulfilled, (state, action) => {
                //console.log("du lieu khi checktoken", action.payload)
                let deToken = checkToken(action.payload.token, process.env.REACT_APP_JWT_KEY, process.env.REACT_APP_JWT_KEY);
                let user = action.payload.users.find(user => user.email == deToken.email);
                if (user) {
                    if (user.password == deToken.password) {
                        state.userInfor = user;
                    }
                }
            });
            // update cart
            builder.addCase(updateCart.fulfilled, (state, action) => {
                state.userInfor = action.payload
                localStorage.removeItem("carts")
            });
            //register
            builder.addCase(register.fulfilled, (state, action) => {
                state.userInfor = action.payload;
                console.log("register ",action.payload);
                // Mã hóa dữ liệu
                let token = createToken(action.payload, process.env.REACT_APP_JWT_KEY);
                localStorage.setItem("token", token);
            });
            // xử lý các pending và rejected
            builder.addMatcher(
                (action) => {
                    if (action.meta) {
                        return action
                    }
                },
                (state, action) => {
                    if (action.meta) {
                        if (action.meta.requestStatus == "pending") {
                            //console.log("đã vào pending của api: ", action.type)
                            // if (action.type == "deleteUserByid/pending") {
                            //     console.log("trường hợp pending của api delete")
                            // }
                            state.loading = true;
                        }
                        if (action.meta.requestStatus == "rejected") {
                            console.log("đã vào rejected của api: ", action.type)
                            state.loading = false;
                        }
                        if (action.meta.requestStatus == "fulfilled") {
                            //console.log("đã vào fulfilled của api: ", action.type)
                            state.loading = false;
                        }
                    }
                }
            );
            
        }
    }
)


export const userLoginActions = {
    ...userLoginSlice.actions,
    login,
    checkTokenLocal,
    updateCart,
    register
}
export default userLoginSlice.reducer;
