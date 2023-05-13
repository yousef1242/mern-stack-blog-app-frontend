import "./account.css";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import swal from "sweetalert";
import UpdateProfileModal from "./Update-Account-Model";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  deleteProfile,
  getProfileUser,
  uploadProfilePhoto,
} from "../../redux/apiCalls/profileApiCall";
import PostItem from "../../components/posts/PostItem";
import { Oval } from "react-loader-spinner";
import { logoutUser } from "../../redux/apiCalls/authApiCall";

const AccountPage = () => {
  const { user } = useSelector((state) => state.auth);
  const [file, setFile] = useState(null);
  const [UpdateAccount, setUpdateAccount] = useState(false);
  const { profile, loading, isProfileDeleted } = useSelector(
    (state) => state.profile
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const submitFormHandler = (e) => {
    e.preventDefault();
    if (!file) return toast.error("please choose file");

    const formData = new FormData();
    formData.append("image", file);
    dispatch(uploadProfilePhoto(formData));
  };
  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(getProfileUser(params.userId));
  }, []);
  useEffect(() => {
    if (isProfileDeleted) {
      navigate("/");
      
    }
  }, [navigate, isProfileDeleted]);

  // delete account handler
  const deleteAccountHandler = () => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover your account!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      dispatch(deleteProfile(user?._id));
      dispatch(logoutUser());
    });
  };

  if (loading) {
    return (
      <div className="profile-loader">
        <Oval
          height={120}
          width={120}
          color="#000"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
          ariaLabel="oval-loading"
          secondaryColor="gray"
          strokeWidth={3}
          strokeWidthSecondary={3}
        />
      </div>
    );
  }
  return (
    <>
      <ToastContainer theme="colored" position="top-center" />
      <section className="profile">
        <div className="profile-header">
          <div className="profile-image-wrapper">
            <img
              src={file ? URL.createObjectURL(file) : profile?.imageProfile.url}
              alt=""
              className="profile-image"
            />
            <form onSubmit={submitFormHandler}>
              {user?._id === params.userId && (
                <abbr title="choose profile photo">
                  <label
                    htmlFor="file"
                    className="bi bi-camera-fill upload-profile-photo-icon"
                  ></label>
                </abbr>
              )}
              <input
                style={{ display: "none" }}
                type="file"
                name="file"
                id="file"
                onChange={(e) => setFile(e.target.files[0])}
              />
              {user?._id === params.userId && (
                <button type="submit" className="upload-profile-photo-btn">
                  upload
                </button>
              )}
            </form>
          </div>
          <h1 className="profile-username">{profile?.username}</h1>
          <p className="profile-bio">{profile?.bio}</p>
          <div className="user-date-joined">
            <strong>Date Joined: </strong>
            <span>{new Date(profile?.createdAt).toDateString()}</span>
          </div>
          {user?._id === params.userId && (
            <button
              onClick={() => setUpdateAccount(true)}
              className="profile-update-btn"
            >
              <i className="bi bi-file-person-fill">Update Profile</i>
            </button>
          )}
        </div>
        <div className="profile-post-list">
          <h2 className="profile-post-list-title">{profile?.username} Posts</h2>
          {profile?.posts?.map((post) => (
            <PostItem
              key={post?._id}
              post={post}
              username={profile?.username}
              userId={profile?._id}
            />
          ))}
        </div>
        {user?._id === params.userId && (
          <button onClick={deleteAccountHandler} className="delete-account-btn">
            Delete your account
          </button>
        )}
        {UpdateAccount && (
          <UpdateProfileModal
            profile={profile}
            setUpdateAccount={setUpdateAccount}
          />
        )}
      </section>
    </>
  );
};

export default AccountPage;
