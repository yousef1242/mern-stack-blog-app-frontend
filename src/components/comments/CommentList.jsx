import swal from "sweetalert";
import "./comment-list.css";
import UpdateCommentModel from "./update-comment-model";
import { useState } from "react";
import Momment from "react-moment";
import { useSelector, useDispatch } from "react-redux";
import { deleteComment } from "../../redux/apiCalls/commentApiCall";

const CommentList = ({ comments }) => {
  const [updateComment, setUpdateComment] = useState(false);
  const [commentForUpdate, setcommentForUpdate] = useState(null);

  const dispatch = useDispatch()

  //update comment
  const updateCommenthandler = (comment) => {
    setcommentForUpdate(comment);
    setUpdateComment(true);
  };
  const { user } = useSelector((state) => state.auth);

  const deleteCommentHandler = (commentId) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this comment!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((isOk) => {
      if (isOk) {
        dispatch(deleteComment(commentId))
      } 
    });
  };
  return (
    <div className="comment-list">
      <h4 className="comment-list-count">{comments?.length} Comments</h4>
      {comments?.map((com) => (
        <div className="comment-item" key={com._id}>
          <div className="comment-item-info">
            <div className="comment-item-username">{com?.username}</div>
            <div className="comment-item-time">
              <Momment fromNow ago>
                {com?.createdAt}
              </Momment>{" "}
              ago
            </div>
          </div>
          <p className="comment-item-text">{com?.text}</p>
          <div className="comment-item-icon-wrapper">
            {user?._id === com?.user && (
              <>
                <i
                  className="bi bi-pencil-square"
                  onClick={() => updateCommenthandler(com)}
                ></i>
                <i
                  onClick={() => deleteCommentHandler(com?._id)}
                  className="bi bi-trash-fill"
                ></i>
              </>
            )}
          </div>
        </div>
      ))}
      {updateComment && (
        <UpdateCommentModel
          commentForUpdate={commentForUpdate}
          setUpdateComment={setUpdateComment}
        />
      )}
    </div>
  );
};

export default CommentList;
