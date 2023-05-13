import { useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "./form.css"
import {useDispatch} from "react-redux"
import { loginUser } from "../../redux/apiCalls/authApiCall";


const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const formSubmitHandler = (e) => {
    e.preventDefault();

    if (email.trim() === "") return toast.error("Email is required");
    if (password.trim() === "") return toast.error("password is required");

    dispatch(loginUser({email,password}));
  };
  return (
    <section className="form-container">
      <ToastContainer theme="colored" position="top-center" />
      <h1 className="form-title">Login</h1>
      <form onSubmit={formSubmitHandler} className="form">
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
            value={email}
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
            value={password}
          />
        </div>
        <button type="submit" className="form-btn">
          Login
        </button>
      </form>
      <div className="form-footer">
        Did you forgot your password?? <Link to={"/forgot-password"}>Forgot Password</Link>
      </div>
    </section>
  );
};

export default LoginPage;
