import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "./form.css"
import { useDispatch, useSelector } from "react-redux";
import { regsiterUser } from "../../redux/apiCalls/authApiCall";
import swal from "sweetalert"

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { registerMessage } = useSelector((state) => state.auth)
  const formSubmitHandler = (e) => {
    e.preventDefault();
    
    if (username.trim() === "") return toast.error("Username is required");
    if (email.trim() === "") return toast.error("Email is required");
    if (password.trim() === "") return toast.error("password is required");
    
    dispatch(regsiterUser({username,email,password}));
  };
  if(registerMessage) {
    swal({
      title : registerMessage,
      icon : "success"
    }).then(isOk => {
      if (isOk) {
        navigate("/login")
      }
    })
  }
  return (
    <section className="form-container">
      <ToastContainer theme="colored" position="top-center" />
      <h1 className="form-title">Create new account</h1>
      <form onSubmit={formSubmitHandler} className="form">
        <div className="form-group">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            type="text"
            id="username"
            placeholder="Enter your username"
            className="form-input"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            className="form-input"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            className="form-input"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="form-btn">
          Register
        </button>
      </form>
      <div className="form-footer">
        Already have an account?? <Link to={"/login"}>Login</Link>
      </div>
    </section>
  );
};

export default RegisterPage;
