import React, { useEffect, useState } from "react";
import "./update-post-model.css";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { updatePost } from "../../redux/apiCalls/postApiCall";
import { fetchCategories } from "../../redux/apiCalls/categoryApiCall";


const UpdatePostModel = ({ setUpdatePost, post }) => {
  const [title, setTitle] = useState(post.title);
  const [description, setDescription] = useState(post.description);
  const [category, setCategory] = useState(post.category);
  const dispatch = useDispatch()

  const { categories } = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(fetchCategories())
  },[])

  const submithandler = (e) => {
    e.preventDefault()
    if (title.trim() === "") return toast.error("post title is required");
    if (description.trim() === "") return toast.error("post description is required");
    if (category.trim() === "") return toast.error("post category is required");
    dispatch(updatePost({title, description, category},post?._id));
    setUpdatePost(false);
  }
  return (
    <div className="update-post">
      <form onSubmit={submithandler} className="update-post-form">
        <abbr title="close">
          <i
            className="bi bi-x-circle-fill update-post-form-close"
            onClick={() => setUpdatePost(false)}
          ></i>
        </abbr>
        <h1 className="update-post-title">Update Post</h1>
        <input 
        type="text" 
        className="update-post-input"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
         />
        <select 
        className="update-post-input"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        >
          <option disabled value="">
            Select Category
          </option>
          {categories?.map((category) => (
            <option key={category._id} value={category.title}>{category.title}</option>
          ))}
        </select>
        <textarea 
        className="update-post-textarea" 
        rows="5"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <button className="update-post-btn" type="submit">
          Update post
        </button>
      </form>
    </div>
  );
};

export default UpdatePostModel;
