import { Link } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import swal from "sweetalert";
import "./admin-table.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllUsersApi, logoutUser } from "../../redux/apiCalls/authApiCall";
import { deleteProfile } from "../../redux/apiCalls/profileApiCall";
import { ToastContainer, toast } from "react-toastify";

const UsersTable = () => {
  const dispatch = useDispatch();
  const { AllUsers } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getAllUsersApi());
  }, []);

  // delete user handler
const deleteUserHandler = async (userId) => {
  const willDelete = await swal({
    title: "Are you sure?",
    text: "Once deleted, you will not be able to recover this user!",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  });

  if (willDelete) {
    try {
      await dispatch(deleteProfile(userId));
      await dispatch(getAllUsersApi());
      toast.success("User deleted successfully");
      if (user?._id === userId) {
        await dispatch(logoutUser());
        toast.success("Your profile has been deleted");
      }
    } catch (error) {
      toast.error("Failed to delete user.");
    }
  }
};
  return (
    <section className="table-container">
      <ToastContainer theme="colored" position="top-center" />
      <AdminSidebar />
      <div className="table-wrapper">
        <h1 className="table-title">Users</h1>
        <table className="table">
          <thead>
            <tr>
              <th>Count</th>
              <th>Users</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {AllUsers?.map((item, index) => (
              <tr key={item?._id}>
                <td>{index + 1}</td>
                <td>
                  <div className="table-image">
                    <img
                      src={item?.imageProfile?.url}
                      alt=""
                      className="table-user-image"
                    />
                    <span className="table-username">{item?.username}</span>
                  </div>
                </td>
                <td>{item?.email}</td>
                <td>
                  <div className="table-button-group">
                    <button>
                      <Link to={`/profile/${item?._id}`}>View Profile</Link>
                    </button>
                    <button onClick={() => deleteUserHandler(item._id)}>
                      Delete User
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default UsersTable;
