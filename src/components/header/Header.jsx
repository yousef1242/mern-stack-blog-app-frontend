import { useState } from "react";
import "./header.css";
import { Link } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import { logoutUser } from "../../redux/apiCalls/authApiCall";

const Header = () => {
  const [toggle, setToggle] = useState(false);
  const dispatch = useDispatch()
  const [dropdown, setDropdown] = useState(false)
  
  const { user } = useSelector((state) => state.auth);
  return (
    <> 
      <header className="header">
        <div className="header-left">
          <div className="header-logo">
            <strong>BLOG</strong>
            <i className="bi bi-pencil"></i>
          </div>
          <div className="header-menu" onClick={() => setToggle(!toggle)}>
            {toggle ? (
              <i className="bi bi-x-lg"></i>
            ) : (
              <i className="bi bi-list"></i>
            )}
          </div>
        </div>
        <div
          className="navbar"
          style={{
            clipPath: toggle && "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
          }}
        >
          <ul className="nav-links">
            <Link to="/" onClick={() => setToggle(false)} className="nav-link">
              <i className="bi bi-house"></i> Home
            </Link>
            <Link
              to="/posts"
              onClick={() => setToggle(false)}
              className="nav-link"
            >
              <i class="bi bi-stickies"></i> Posts
            </Link>
            {user && 
              <Link
              to="/create-post"
              onClick={() => setToggle(false)}
              className="nav-link"
            >
              <i className="bi bi-journal-plus"></i> Create
            </Link>
            }
            {user?.isAdmin && 
              <Link
              to="/admin"
              onClick={() => setToggle(false)}
              className="nav-link"
            >
              <i className="bi bi-person-check"></i> Admin dashboard
            </Link>
            }
          </ul>
        </div>
        {user ? (
          <>
            <div className="header-rigth-user-info" onClick={(() => setDropdown(!dropdown))}>
              <span className="header-right-username">{user.username}</span>
              <img
                src={user.imageProfile.url}
                alt="userImage"
                className="header-right-userPhoto"
              />
              {dropdown && 
                <div className="header-right-dropdown">
                <Link
                  className="header-dropdown-item"
                  to={`/profile/${user?._id}`}
                >
                <i className="bi bi-file-person"></i>
                <span>Profile</span>
                </Link>
                <div className="header-dropdown-item" onClick={() => dispatch(logoutUser())}>
                    <i className="bi bi-box-arrow-in-left"></i>
                    <span>Logout</span>
                </div>
              </div>
              }
            </div>
          </>
        ) : (
          <>
            <div className="header-rigth">
              <Link to="/login" className="header-right-link">
                <i className="bi bi-box-arrow-in-right"></i>
                <span>Login</span>
              </Link>
              <Link to="/register" className="header-right-link">
                <i className="bi bi-person-plus"></i>
                <span>Register</span>
              </Link>
            </div>
          </>
        )}
      </header>
    </>
  );
};

export default Header;
