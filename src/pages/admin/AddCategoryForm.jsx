import { useState } from "react";
import {toast,ToastContainer} from "react-toastify"
import {useDispatch} from "react-redux"
import { createCategory, fetchCategories } from "../../redux/apiCalls/categoryApiCall";



const AddCategoryForm = () => {
    const [title,setTitle] = useState("")

    const dispatch = useDispatch()

    const formSubmithandler = async (e) => {
      e.preventDefault();
    
      if (title.trim() === "") return toast.error("Category title is required");
    
      try {
        await dispatch(createCategory({ title }));
        await dispatch(fetchCategories());
      } catch (error) {
        toast.error("Failed to create category.");
      }
    };
  return (
    <div className="add-category">
    <ToastContainer position="top-center" theme="colored"/>
      <h6 className="add-category-title">Add new category</h6>
      <form onSubmit={formSubmithandler}>
        <div className="add-category-form-group">
          <label htmlFor="title">Categoty title</label>
          <input onChange={(e) => setTitle(e.target.value)} type="text" id="title" placeholder="Category title" />
          <button type="submit" className="add-category-btn">
            Add
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCategoryForm;
