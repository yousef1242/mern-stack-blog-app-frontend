import { Link, useNavigate, useParams } from "react-router-dom";
import "./post-details.css";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import AddComment from "../../components/comments/AddComment.jsx";
import CommentList from "../../components/comments/CommentList.jsx";
import swal from "sweetalert";
import UpdatePostModel from "./update-post-model.jsx";
import { useSelector, useDispatch } from "react-redux";
import {
  deletePostApi,
  fetchSinglePost,
  toggleLikePost,
  updatePostImage,
} from "../../redux/apiCalls/postApiCall.js";

const PostdetailsPage = () => {
  const [file, setFile] = useState(null);
  const [updatePost, setUpdatePost] = useState(false);
  const { id } = useParams();
  const dispatch = useDispatch();
  const { post } = useSelector((state) => state.posts);
  const navigate = useNavigate()
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchSinglePost(id));
    window.scrollTo(0, 0);
  }, [id]);
  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (!file) return toast.error("post file is required");
    const formData = new FormData();
    formData.append("image", file);
    dispatch(updatePostImage(formData, post?._id));
  };

  // delete post handler
  const deletePostHandler = () => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this imaginary file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(deletePostApi(post?._id));
      }
    }).then(() => {
      navigate("/");
    })
  };
  return (
    <>
      <section className="post-details">
        <ToastContainer theme="colored" position="top-center" />
        <div className="post-details-image-wrapper">
          <img
            src={file ? URL.createObjectURL(file) : post?.image?.url}
            alt=""
            className="post-details-image"
          />
          {user?._id === post?.user?._id && (
            <form
              onSubmit={formSubmitHandler}
              className="update-post-image-form"
            >
              <label htmlFor="file" className="update-post-label">
                <i className="bi bi-image-fill"></i>
                Select new image
              </label>
              <input
                style={{ display: "none" }}
                type="file"
                name="file"
                id="file"
                onChange={(e) => setFile(e.target.files[0])}
              />
              <button type="submit">Upload</button>
            </form>
          )}
        </div>
        <h1 className="post-details-title">{post?.title}</h1>
        <div className="post-details-user-info">
          <img
            src={post?.user?.imageProfile.url}
            alt=""
            className="post-details-user-image"
          />
          <div className="post-details-user">
            <strong>
              <Link to={`/profile/${post?.user?._id}`}>
                {post?.user?.username}
              </Link>
            </strong>
            <span>{new Date(post?.createdAt).toDateString()}</span>
          </div>
        </div>
        <p className="post-details-description">{post?.description}</p>
        <div className="post-details-icon-wrapper">
          <div>
            {user && (
              <i
                onClick={() => dispatch(toggleLikePost(post?._id))}
                className={
                  post?.likes?.includes(user?._id)
                    ? "bi bi-hand-thumbs-up-fill"
                    : "bi bi-hand-thumbs-up"
                }
              ></i>
            )}
            <small>{post?.likes?.length} likes</small>
          </div>
          <div>
            {user?._id === post?.user?._id && (
              <i
                className="bi bi-pencil-square"
                onClick={() => setUpdatePost(true)}
              ></i>
            )}
            {user?._id === post?.user?._id && (
              <i onClick={deletePostHandler} className="bi bi-trash-fill"></i>
            )}
          </div>
        </div>
        <div>{user && <AddComment postId={post?._id} />}</div>
        <div>
          <CommentList comments={post?.comments} />
        </div>
        {updatePost && (
          <UpdatePostModel post={post} setUpdatePost={setUpdatePost} />
        )}
      </section>
    </>
  );
};

export default PostdetailsPage;
