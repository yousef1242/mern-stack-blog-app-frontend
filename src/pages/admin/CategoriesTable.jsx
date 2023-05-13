import AdminSidebar from "./AdminSidebar";
import swal from "sweetalert";
import "./admin-table.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  deleteCategory,
  fetchCategories,
} from "../../redux/apiCalls/categoryApiCall";
import { ToastContainer, toast } from "react-toastify";
import { setCategories } from "../../redux/slices/categoriesSlice";

const CategoriesTable = () => {
  const dispatch = useDispatch();
  const { categories, categoryMessage } = useSelector(
    (state) => state.category
  );

  useEffect(() => {
    dispatch(fetchCategories());
  }, []);

  // delete category handler
  const deleteCategoryHandler = async (categoryId) => {
    const willDelete = await swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this category!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    });
  
    if (willDelete) {
      try {
        await dispatch(deleteCategory(categoryId));
        await dispatch(fetchCategories());
        toast.success(categoryMessage);
      } catch (error) {
        toast.error("Failed to delete category.");
      }
    }
  };

  return (
    <section className="table-container">
      <ToastContainer theme="colored" position="top-center" />
      <AdminSidebar />
      <div className="table-wrapper">
        <h1 className="table-title">Categories</h1>
        <table className="table">
          <thead>
            <tr>
              <th>Count</th>
              <th>Category Title</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {categories?.map((item, index) => (
              <tr key={item?._id}>
                <td>{index + 1}</td>
                <td>
                  <b>{item?.title}</b>
                </td>
                <td>
                  <div className="table-button-group">
                    <button onClick={() => deleteCategoryHandler(item?._id)}>
                      Delete Category
                    </button>
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

export default CategoriesTable;
