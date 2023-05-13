import React, { useState } from "react";
import "./update-profile-modal.css";
import {useDispatch} from "react-redux"
import { updateProfileInformation } from "../../redux/apiCalls/profileApiCall";
const UpdateProfileModal = ({ setUpdateAccount, profile }) => {
  const dispatch = useDispatch()
  const [username, setUsername] = useState(profile.username);
  const [bio, setBio] = useState(profile.bio);
  const [password, setPassword] = useState("");

  const submithandler = (e) => {
    e.preventDefault()
    const updatedUser = {username, bio}

    if(password.trim() !== ""){
        updatedUser.password = password;
    }

    dispatch(updateProfileInformation(updatedUser, profile?._id));
    setUpdateAccount(false)
  }
  return (
    <div className="update-profile">
      <form onSubmit={submithandler} className="update-profile-form">
        <abbr title="close">
          <i
            className="bi bi-x-circle-fill update-profile-form-close"
            onClick={() => setUpdateAccount(false)}
          ></i>
        </abbr>
        <h1 className="update-profile-title">Update your profile</h1>
        <input 
        type="text" 
        className="update-profile-input"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
         />
        <input 
        type="text" 
        className="update-profile-input"
        value={bio}
        onChange={(e) => setBio(e.target.value)}
        placeholder="Bio"
         />
        <input 
        type="password" 
        className="update-profile-input"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
         />
        <button className="update-profile-btn" type="submit">
          Update profile
        </button>
      </form>
    </div>
  );
};

export default UpdateProfileModal;
