import {Link} from "react-router-dom"
import AddCategoryForm from "./AddCategoryForm";
import {useSelector,useDispatch} from "react-redux"
import { useEffect } from "react";
import { fetchCategories } from "../../redux/apiCalls/categoryApiCall";
import { getAllUsersApi } from "../../redux/apiCalls/authApiCall";
import { getAllPostsApi } from "../../redux/apiCalls/postApiCall";
import { getAllCommentsApi } from "../../redux/apiCalls/commentApiCall";

const AdminMain = () => {
    const dipatch = useDispatch()
    const { categories } = useSelector(state => state.category);
    const { AllUsers } = useSelector(state => state.auth);
    const { posts } = useSelector(state => state.posts)
    const { comments } = useSelector((state) => state.comment);

    useEffect(() => {
        dipatch(fetchCategories())
        dipatch(getAllUsersApi())
        dipatch(getAllPostsApi())
        dipatch(getAllCommentsApi())
    },[])
    return ( 
        <div className="admin-main">
            <div className="admin-main-header">
                <div className="admin-main-card">
                    <h5 className="admin-card-title">Users</h5>
                    <div className="admin-card-count">{AllUsers?.length}</div>
                    <div className="dmin-card-link-wrapper">
                        <Link className="admin-card-link" to={"/admin/users-table"}>
                            See all users
                        </Link>
                        <div className="admin-card-icon">
                            <i className="bi bi-person"></i>
                        </div>
                    </div>
                </div>
                <div className="admin-main-card">
                    <h5 className="admin-card-title">Posts</h5>
                    <div className="admin-card-count">{posts?.length}</div>
                    <div className="dmin-card-link-wrapper">
                        <Link className="admin-card-link" to={"/admin/posts-table"}>
                            See all posts
                        </Link>
                        <div className="admin-card-icon">
                            <i className="bi bi-file-post"></i>
                        </div>
                    </div>
                </div>
                <div className="admin-main-card">
                    <h5 className="admin-card-title">Comments</h5>
                    <div className="admin-card-count">{comments?.length}</div>
                    <div className="dmin-card-link-wrapper">
                        <Link className="admin-card-link" to={"/admin/comments-table"}>
                            See all comments
                        </Link>
                        <div className="admin-card-icon">
                            <i className="bi bi-chat-left-text"></i>
                        </div>
                    </div>
                </div>
                <div className="admin-main-card">
                    <h5 className="admin-card-title">Categories</h5>
                    <div className="admin-card-count">{categories?.length}</div>
                    <div className="dmin-card-link-wrapper">
                        <Link className="admin-card-link" to={"/admin/categories-table"}>
                            See all categories
                        </Link>
                        <div className="admin-card-icon">
                            <i className="bi bi-tag-fill"></i>
                        </div>
                    </div>
                </div>
            </div>
            <AddCategoryForm/>
        </div>
     );
}
 
export default AdminMain;