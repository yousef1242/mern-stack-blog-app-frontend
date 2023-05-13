import { Link } from "react-router-dom";
import "./side.css";
import {useDispatch, useSelector} from "react-redux"
import { useEffect } from "react";
import { fetchCategories } from "../../redux/apiCalls/categoryApiCall";



const Sidebar = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchCategories())
  },[])
  const { categories } = useSelector(state => state.category)
  return (
    <>
      <div className="sidebar">
        <h5 className="sidebar-title">CATEGORIES</h5>
        <ul className="sidebar-links">
          {categories?.map((category) => (
            <Link
              className="sidebar-link"
              key={category._id}
              to={`/post/categories/${category.title}`}
            >
              {category.title}
            </Link>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
