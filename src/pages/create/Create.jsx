import { useEffect, useState } from "react";
import "./create.css";
import { toast, ToastContainer } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CreatePost } from "../../redux/apiCalls/postApiCall";
import { RotatingLines } from "react-loader-spinner";
import { fetchCategories } from "../../redux/apiCalls/categoryApiCall";

const CreatePage = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [file, setFile] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, isPostCreated } = useSelector((state) => state.posts);
  const { categories } = useSelector((state) => state.category);

  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (title.trim() === "") return toast.error("post title is required");
    if (description.trim() === "")
      return toast.error("post description is required");
    if (category.trim() === "") return toast.error("post category is required");
    if (!file) return toast.error("post file is required");

    const formData = new FormData();
    formData.append("image", file);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", category);

    dispatch(CreatePost(formData));
  };
  useEffect(() => {
    dispatch(fetchCategories());
    if (isPostCreated) return navigate("/");
  }, [isPostCreated]);
  return (
    <>
      <section className="create-post">
        <ToastContainer theme="colored" position="top-center" />
        <h1 className="create-post-title">Create New Post</h1>
        <form onSubmit={formSubmitHandler} className="create-post-form">
          <input
            type="text"
            placeholder="Post Tile"
            className="create-post-input"
            onChange={(e) => setTitle(e.target.value)}
          />
          <select
            className="create-post-input"
            onChange={(e) => setCategory(e.target.value)}
          >
            <option disabled value="">
              Select a Category
            </option>
            {categories?.map((category) => (
              <option key={category._id} value={category.title}>{category.title}</option>
            ))}
          </select>
          <textarea
            onChange={(e) => setDescription(e.target.value)}
            className="create-post-textarea"
            placeholder="Post Description"
            rows="5"
          ></textarea>
          <input
            type="file"
            name="file"
            id="file"
            className="create-post-upload"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <button className="create-post-btn" type="submit">
            {loading ? (
              <RotatingLines
                strokeColor="grey"
                strokeWidth="5"
                animationDuration="0.75"
                width="40"
                visible={true}
              />
            ) : (
              "Create"
            )}
          </button>
        </form>
      </section>
    </>
  );
};

export default CreatePage;
