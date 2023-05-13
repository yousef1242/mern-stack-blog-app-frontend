

import request from "../../utils/request";
import {toast,ToastContainer} from "react-toastify"
import { addCommentToPost, deleteCommentPost, updateCommentPost } from "../slices/postSlice";
import { setAllComments } from "../slices/commentSlice";



//create comment
export function createComment(newComment){
    return async (dispatch,getState) => {
        try {
            const { data } = await request.post(`/api/comments`,
            newComment,
            {
                headers : {
                    Authorization : "bearen "+getState().auth.user.token
                }
            }
            );
            dispatch(addCommentToPost(data));
        } catch (error) {
            <ToastContainer theme="colored"/>
            toast.error(error.response.data.message)
        }
    }
}
//update comment
export function updateComment(commentId,comment){
    return async (dispatch,getState) => {
        try {
            const { data } = await request.post(`/api/comments/update/${commentId}`,
            comment,
            {
                headers : {
                    Authorization : "bearen "+getState().auth.user.token
                }
            }
            );
            dispatch(updateCommentPost(data));
        } catch (error) {
            <ToastContainer theme="colored"/>
            toast.error(error.response.data.message)
        }
    }
}
//delete comment
export function deleteComment(commentId){
    return async (dispatch,getState) => {
        try {
            await request.delete(`/api/comments/delete/${commentId}`,
            {
                headers : {
                    Authorization : "bearen "+getState().auth.user.token
                }
            }
            );
            dispatch(deleteCommentPost(commentId));
            toast.success("comment has been deleted")
        } catch (error) {
            <ToastContainer theme="colored"/>
            toast.error(error.response.data.message)
        }
    }
}


//get all comments
export function getAllCommentsApi(){
    return async (dispatch,getState) => {
        try {
            const { data } =  await request.get(`/api/comments`,
            {
                headers : {
                    Authorization : "bearen "+getState().auth.user.token
                }
            }
            );
            dispatch(setAllComments(data));
        } catch (error) {
            <ToastContainer theme="colored"/>
            toast.error(error.response.data.message)
        }
    }
}



//get all comments
export function deleteCommentApi(commentId){
    return async (dispatch,getState) => {
        try {
            await request.delete(`/api/comments/delete/${commentId}`,
            {
                headers : {
                    Authorization : "bearen "+getState().auth.user.token
                }
            }
            );
        } catch (error) {
            <ToastContainer theme="colored"/>
            toast.error(error.response.data.message)
        }
    }
}