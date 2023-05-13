import Header from "./components/header/Header";
import "./index.css"
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/home/Home";
import PostPage from "./pages/post/Post";
import CreatePage from "./pages/create/Create";
import AmdinPage from "./pages/admin/Admin";
import PostdetailsPage from "./pages/post-details/PostDetails";
import PostCategoryPage from "./pages/postCategories/postCategoryPage";
import AccountPage from "./pages/account/Account";
import UsersTable from "./pages/admin/UsersTable";
import PostsTable from "./pages/admin/PostsTable";
import CategoriesTable from "./pages/admin/CategoriesTable";
import CommentsTable from "./pages/admin/CommentsTable";
import RegisterPage from "./pages/forms/RegisterPage";
import LoginPage from "./pages/forms/LoginPage";
import ForgetPassword from "./pages/forms/ForgetPassword";
import ResetPassword from "./pages/forms/ResetPassword";
import NotFoundPage from "./pages/not-found/Not-Found";
import {useSelector} from "react-redux"
import {useNavigate} from "react-router-dom"


function App() {
  const navigate = useNavigate()
  const { user } = useSelector(state => state.auth)
  return (
    <div>
      <Header/>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/posts" element={<PostPage/>}/>
        <Route path="/create-post" element={user ? <CreatePage/> : <Navigate to={"/"}/>}/>
        <Route path="/admin" element={user?.isAdmin ? <AmdinPage/> : <Navigate to={"/"}/>}/>
        <Route path="/admin/users-table" element={user?.isAdmin ? <UsersTable/> : <Navigate to={"/"}/>}/>
        <Route path="/admin/posts-table" element={user?.isAdmin ? <PostsTable/> : <Navigate to={"/"}/>}/>
        <Route path="/admin/categories-table" element={user?.isAdmin ? <CategoriesTable/> : <Navigate to={"/"}/>}/>
        <Route path="/admin/comments-table" element={user?.isAdmin ? <CommentsTable/> : <Navigate to={"/"}/>}/>
        <Route path="/register" element={!user ? <RegisterPage/> : <Navigate to={"/"}/>}/>
        <Route path="/login" element={!user ? <LoginPage/> : <Navigate to={"/"}/>}/>
        <Route path="/forgot-password" element={<ForgetPassword/>}/>
        <Route path="/reset-password" element={<ResetPassword/>}/>
        <Route path="/profile/:userId" element={<AccountPage/>}/>
        <Route path="/post/details/:id" element={<PostdetailsPage/>}/>
        <Route path="/post/categories/:category" element={<PostCategoryPage/>}/>
        <Route path="*" element={<NotFoundPage/>}/>
      </Routes>
    </div>
  );
}

export default App;
