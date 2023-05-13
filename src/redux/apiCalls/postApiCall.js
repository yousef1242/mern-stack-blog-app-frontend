import request from "../../utils/request";
import {toast,ToastContainer} from "react-toastify"
import { getPostsCate, getPosts, getPostsCount, setIsPostCreated, clearIsPostCreated, setPostLoading, clearPostLoading, getSinglePost, setLike } from "../slices/postSlice";


// get posts
export function fetchPosts (pageNumber) {
    return async (dispatch) => {
        try {
            const { data } = await request.get(`/api/posts?pageNumber=${pageNumber}`)
            dispatch(getPosts(data))
        } catch (error) {
            <ToastContainer theme="colored"/>
            toast.error(error.response.data.message)
        }
    }

}


// get posts count
export function fetchPostsCount () {
    return async (dispatch) => {
        try {
            const { data } = await request.get(`/api/posts/count`)
            dispatch(getPostsCount(data))
            console.log(data);
        } catch (error) {
            <ToastContainer theme="colored"/>
            toast.error(error.response.data.message)
        }
    }

}


// get posts category
export function fetchPostsCategory (category) {
    return async (dispatch) => {
        try {
            const { data } = await request.get(`/api/posts/?category=${category}`)
            dispatch(getPostsCate(data))
        } catch (error) {
            <ToastContainer theme="colored"/>
            toast.error(error.response.data.message)
        }
    }

}


// add new post
export function CreatePost (newPost) {
    return async (dispatch,getState) => {
        try {
            dispatch(setPostLoading())
            const { data } = await request.post(`/api/posts`,
            newPost,
            {
                headers : {
                    Authorization : "bearen "+getState().auth.user.token,
                    "Content-Type" : "multipart/form-data"
                }
            }
            );
            toast.success(data?.message);
            dispatch(setIsPostCreated());
            setTimeout(() => {
                dispatch(clearIsPostCreated())
            },2000)
        } catch (error) {
            <ToastContainer theme="colored"/>
            toast.error(error.response.data)
            console.log(error);
            dispatch(clearPostLoading())
        }
    }

}



// fetch single post
export function fetchSinglePost (postId) {
    return async (dispatch) => {
        try {
            const { data }  = await request.get(`/api/posts/${postId}`,
            )
            dispatch(getSinglePost(data));
        } catch (error) {
            <ToastContainer theme="colored"/>
            toast.error(error.response.data.message)
        }
    }

}

// toggle like
export function toggleLikePost (postId) {
    return async (dispatch,getState) => {
        try {
            const { data }  = await request.post(`/api/posts/like/${postId}`,
            {},
            {
                headers : {
                    Authorization : "bearen "+getState().auth.user.token
                }
            }
            )
            dispatch(setLike(data));
        } catch (error) {
            <ToastContainer theme="colored"/>
            toast.error(error.response.data.message)
        }
    }

}


//  update post image
export function updatePostImage (newImage,postId) {
    return async (dispatch,getState) => {
        try {
            await request.post(`/api/posts/update-image/${postId}`,
            newImage,
            {
                headers : {
                    Authorization : "bearen "+getState().auth.user.token,
                    "Content-Type" : "multipart/form-data"
                }
            }
            )
            toast.success("New post image uploaded successfully")
        } catch (error) {
            <ToastContainer theme="colored"/>
            toast.error(error.response.data.message)
        }
    }

}



//  update post 
export function updatePost (newPost,postId) {
    return async (dispatch,getState) => {
        try {
            const { data } = await request.post(`/api/posts/update/${postId}`,
            newPost,
            {
                headers : {
                    Authorization : "bearen "+getState().auth.user.token,
                }
            }
            )
            dispatch(getSinglePost(data))
        } catch (error) {
            <ToastContainer theme="colored"/>
            toast.error(error.response.data.message)
        }
    }

}


//  delete post 
export function deletePostApi (postId) {
    return async (dispatch,getState) => {
        try {
            await request.delete(`/api/posts/delete/${postId}`,
            {
                headers : {
                    Authorization : "bearen "+getState().auth.user.token,
                }
            }
            )
        } catch (error) {
            <ToastContainer theme="colored"/>
            toast.error(error.response.data.message)
        }
    }

}


// get all posts
export function getAllPostsApi () {
    return async (dispatch) => {
        try {
            const { data } = await request.get(`/api/posts`)
            dispatch(getPosts(data))
        } catch (error) {
            <ToastContainer theme="colored"/>
            toast.error(error.response.data.message)
        }
    }

}