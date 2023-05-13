import React, { useState } from "react";
import "./update-comment-model.css";
import { toast } from "react-toastify";
import {useDispatch} from "react-redux"
import { updateComment } from "../../redux/apiCalls/commentApiCall";

const UpdateCommentModel = ({ setUpdateComment, commentForUpdate }) => {
  const [text, setText] = useState(commentForUpdate?.text);
  const dispatch = useDispatch()

  const submithandler = (e) => {
    e.preventDefault()
    if (text.trim() === "") return toast.error("please write something required");
    dispatch(updateComment(commentForUpdate?._id, { text }))
    setUpdateComment(false)
  }
  return (
    <div className="update-comment">
      <form onSubmit={submithandler} className="update-comment-form">
        <abbr title="close">
          <i
            className="bi bi-x-circle-fill update-comment-form-close"
            onClick={() => setUpdateComment(false)}
          ></i>
        </abbr>
        <h1 className="update-comment-title">Update Post</h1>
        <input 
        type="text" 
        className="update-comment-input"
        value={text}
        onChange={(e) => setText(e.target.value)}
         />
        <button className="update-comment-btn" type="submit">
          Edit comment
        </button>
      </form>
    </div>
  );
};

export default UpdateCommentModel;
