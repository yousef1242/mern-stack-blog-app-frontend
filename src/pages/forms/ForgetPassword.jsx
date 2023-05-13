import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "./form.css"

const ForgetPassword = () => {
  const [email, setEmail] = useState("");

  const formSubmitHandler = (e) => {
    e.preventDefault();

    if (email.trim() === "") return toast.error("Email is required");

    console.log({email});
  };
  return (
    <section className="form-container">
      <ToastContainer theme="colored" position="top-center" />
      <h1 className="form-title">Forgot Password</h1>
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
        <button type="submit" className="form-btn">
          Submit
        </button>
      </form>
    </section>
  );
};

export default ForgetPassword;
