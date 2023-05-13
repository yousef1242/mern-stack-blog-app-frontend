import { useState } from "react";
import "./add-comment.css";
import { toast, ToastContainer } from "react-toastify";
import {useDispatch} from "react-redux"
import { createComment } from "../../redux/apiCalls/commentApiCall";


const AddComment = ({ postId }) => {
  const dispatch = useDispatch()

    const [text, setComment] = useState("")
    const formSubmitHandler = (e) => {
        e.preventDefault()
        if(text.trim() === "") return toast.error("Text is required")
        dispatch(createComment({ text,postId }))
        setComment("")
    }
  return (
    <form onSubmit={formSubmitHandler} className="add-comment">
    <ToastContainer theme="colored" position="top-center"/>
      <input
        type="text"
        placeholder="Add comment"
        className="add-comment-input"
        onChange={(e) => setComment(e.target.value)}
        value={text}
      />
      <button className="add-comment-btn" type="submit">
        Comment
      </button>
    </form>
  );
};

export default AddComment;
