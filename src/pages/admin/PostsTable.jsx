import { Link } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import swal from "sweetalert";
import "./admin-table.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { deletePostApi, fetchPosts, getAllPostsApi } from "../../redux/apiCalls/postApiCall";
import { ToastContainer, toast } from "react-toastify";

const PostsTable = () => {
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(getAllPostsApi());
  }, []);

  // delete post handler
  const deleteUPostHandler = async (postId) => {
    const willDelete = await swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this post!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    });
  
    if (willDelete) {
      try {
        await dispatch(deletePostApi(postId));
        await dispatch(getAllPostsApi());
        toast.success("Post has been deleted");
      } catch (error) {
        toast.error("Failed to delete post.");
      }
    }
  };
  return (
    <section className="table-container">
    <ToastContainer theme="colored" position="top-center"/>
      <AdminSidebar />
      <div className="table-wrapper">
        <h1 className="table-title">Posts</h1>
        <table className="table">
          <thead>
            <tr>
              <th>Count</th>
              <th>Users</th>
              <th>Post Title</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {posts?.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>
                  <div className="table-image">
                    <img
                      src={item?.user?.imageProfile?.url}
                      alt=""
                      className="table-user-image"
                    />
                    <span className="table-username">
                      {item?.user?.username}
                    </span>
                  </div>
                </td>
                <td>{item.title}</td>
                <td>
                  <div className="table-button-group">
                    <button>
                      <Link to={`/post/details/${item?._id}`}>View Post</Link>
                    </button>
                    <button onClick={() => deleteUPostHandler(item?._id)}>Delete Post</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default PostsTable;
