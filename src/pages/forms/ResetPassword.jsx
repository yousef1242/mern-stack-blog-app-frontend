import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "./form.css"

const ResetPassword = () => {
  const [password, setPassword] = useState("");

  const formSubmitHandler = (e) => {
    e.preventDefault();

    if (password.trim() === "") return toast.error("password is required");

    console.log({password});
  };
  return (
    <section className="form-container">
      <ToastContainer theme="colored" position="top-center" />
      <h1 className="form-title">Reset Password</h1>
      <form onSubmit={formSubmitHandler} className="form">
        <div className="form-group">
          <label htmlFor="password" className="form-label">
            New Password
          </label>
          <input
            type="password"
            id="password"
            placeholder="Enter your new password"
            className="form-input"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>
        <button type="submit" className="form-btn">
          Submit
        </button>
      </form>
    </section>
  );
};

export default ResetPassword;
