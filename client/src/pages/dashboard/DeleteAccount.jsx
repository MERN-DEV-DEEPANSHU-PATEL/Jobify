import { useState } from "react";
import Wrapper from "../../assets/wrappers/DashboardFormPage";
import { Alert, FormRow } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import {
  clearAlert,
  deleteUserBegin,
  deleteUserError,
  deleteUserSuccess,
  displayAlert,
  logoutUser,
} from "../../store/userSlice";
import authFetch from "../../utils/authFetch";

const DeleteAccount = () => {
  const dispatch = useDispatch();
  const { user, showAlert, isLoading } = useSelector((state) => state.user);
  const [password, setPassword] = useState("");
  const [re_password, setRe_Password] = useState("");

  const deleteAc = async () => {
    try {
      dispatch(deleteUserBegin());
      await authFetch.delete(
        `/api/v1/auth/delete?email=${user.email}&password=${password}`
      );
      dispatch(deleteUserSuccess());
      setTimeout(() => {
        dispatch(logoutUser());
      }, 2000);
    } catch (error) {
      dispatch(deleteUserError({ msg: error.response.data.msg }));
    }
    setTimeout(() => {
      dispatch(clearAlert());
    }, 3000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== re_password) {
      dispatch(
        displayAlert({ notMatch: "Password doesn't match re-type password" })
      );
      return;
    } else {
      deleteAc();
    }
    setTimeout(() => {
      dispatch(clearAlert());
    }, 3000);
  };
  return (
    <Wrapper>
      <form className="form" onSubmit={handleSubmit}>
        <h3>Delete Account</h3>
        {showAlert && <Alert />}
        <div className="form-center">
          <FormRow
            type="password"
            labelText="type password"
            name="password"
            value={password}
            handleChange={(e) => setPassword(e.target.value)}
          />
          <FormRow
            type="text"
            labelText="re-type password"
            name="re_password"
            value={re_password}
            handleChange={(e) => setRe_Password(e.target.value)}
          />
          <button className="btn btn-block" type="submit" disabled={isLoading}>
            {isLoading ? "Please Wait..." : "Delete Account Now"}
          </button>
        </div>
      </form>
    </Wrapper>
  );
};

export default DeleteAccount;
