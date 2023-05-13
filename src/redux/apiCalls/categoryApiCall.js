import request from "../../utils/request";
import {toast,ToastContainer} from "react-toastify"
import { addCategory, deletedcategoryMessage, setCategories } from "../slices/categoriesSlice";



//fetch all categories
export function fetchCategories(user){
    return async (dispatch) => {
        try {
            const { data } = await request.get(`/api/categories`);
            dispatch(setCategories(data));
        } catch (error) {
            <ToastContainer theme="colored"/>
            toast.error(error.response.data.message)
        }
    }
}


//create category
export function createCategory(newCategory){
    return async (dispatch,getState) => {
        try {
            await request.post(`/api/categories`,
            newCategory,
            {
                headers : {
                    Authorization : "bearen "+getState().auth.user.token
                }
            }
            );
            
            toast.success("Category has been created")
        } catch (error) {
            <ToastContainer theme="colored"/>
            toast.error(error.response.data.message)
        }
    }
}


//create category
export function deleteCategory(categoryId){
    return async (dispatch,getState) => {
        try {
           const { data } = await request.delete(`/api/categories/delete/${categoryId}`,
            {
                headers : {
                    Authorization : "bearen "+getState().auth.user.token
                }
            }
            );
            dispatch(deletedcategoryMessage(data.message))
        } catch (error) {
            <ToastContainer theme="colored"/>
            toast.error(error.response.data.message)
        }
    }
}