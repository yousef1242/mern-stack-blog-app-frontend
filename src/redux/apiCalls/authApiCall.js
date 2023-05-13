import request from "../../utils/request";
import { login, logout, register, setAllUsers } from "../slices/authSlice"
import {toast,ToastContainer} from "react-toastify"



//login user

export function loginUser (user) {
    return async (dispatch) => {
        try {
            const { data } = await request.post("/api/auth/login",user)
            dispatch(login(data));
            localStorage.setItem("userInfo", JSON.stringify(data));
            
        } catch (error) {
            <ToastContainer theme="colored"/>
            toast.error(error.response.data.message)
        }
    }

}

//register
export function regsiterUser (user) {
    return async (dispatch) => {
        try {
            const { data } = await request.post("/api/auth/register",user)
            dispatch(register(data.message));
            
        } catch (error) {
            <ToastContainer theme="colored"/>
            toast.error(error.response.data.message)
            console.log(error)
        }
    }

}
//all users
export function getAllUsersApi () {
    return async (dispatch,getState) => {
        try {
            const { data } = await request.get("/api/users/profile",
            {
                headers : {
                    Authorization : "bearen "+getState().auth.user.token
                }
            }
            );
            dispatch(setAllUsers(data))
        } catch (error) {
            <ToastContainer theme="colored"/>
            toast.error(error.response.data.message)
            console.log(error)
        }
    }

}

export function logoutUser () {
    return (dispatch) => {
        dispatch(logout());
        localStorage.removeItem("userInfo");
    }
}