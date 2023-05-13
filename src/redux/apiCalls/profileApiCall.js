import request from "../../utils/request";
import { setAuthAction, setUserPhoto } from "../slices/authSlice";
import { clearIsProfileDeleted, clearLoading, setIsProfileDeleted, setLoading, setProfile, setProfileAction, setProfilePhoto } from "../slices/profileSlice";
import { toast, ToastContainer } from "react-toastify";





//get user profile

export function getProfileUser(userId) {
  return async (dispatch) => {
    try {
      const { data } = await request.get(`/api/users/profile/${userId}`);
      dispatch(setProfile(data));
    } catch (error) {
      <ToastContainer theme="colored" />;
      toast.error(error.response.data.message);
    }
  };
}

// upload profile image
export function uploadProfilePhoto(newPhoto) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.post(
        `/api/users/profile/profile-photo-upload`,
        newPhoto,{
            headers : {
                Authorization : "bearen "+getState().auth.user.token,
                "Content-Type" : "multipart/form-data"
            }
        }
      );
      dispatch(setProfilePhoto(data.profilePhoto));
      dispatch(setUserPhoto(data.profilePhoto))
      toast.success(data.message);

      const user = JSON.parse(localStorage.getItem("userInfo"));
      user.imageProfile = data?.profilePhoto;
      localStorage.setItem("userInfo", JSON.stringify(user))
    } catch (error) {
      <ToastContainer theme="colored" />;
      toast.error(error.response.data.message);
    }
  };
}
// upload profile image
export function updateProfileInformation(newInformation,userId) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.post(
        `/api/users/profile/${userId}`,
        newInformation,{
            headers : {
                Authorization : "bearen "+getState().auth.user.token,
            }
        }
      );
      dispatch(setProfileAction(data));
      dispatch(setAuthAction(data.username))

      const user = JSON.parse(localStorage.getItem("userInfo"));
      user.username = data?.username;
      localStorage.setItem("userInfo", JSON.stringify(user))
    } catch (error) {
      <ToastContainer theme="colored" />;
      toast.error(error.response.data.message);
    }
  };
}


// delete profile
export function deleteProfile(userId) {
  return async (dispatch, getState) => {
    try {
      dispatch(setLoading())
      await request.delete(
        `/api/users/profile/delete/${userId}`,{
            headers : {
                Authorization : "bearen "+getState().auth.user.token,
            }
        }
      );
      dispatch(setIsProfileDeleted());
      setTimeout(() => {
        dispatch(clearIsProfileDeleted())
      },2000)
    } catch (error) {
      <ToastContainer theme="colored" />;
      toast.error(error.response.data.message);
      dispatch(clearLoading())
    }
  };
}
