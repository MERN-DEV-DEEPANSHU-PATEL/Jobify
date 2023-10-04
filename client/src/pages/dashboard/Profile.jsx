import { useState } from "react";
import { FormRow, Alert } from "../../components";
import Wrapper from "../../assets/wrappers/DashboardFormPage";

import {
  displayAlert,
  clearAlert,
  updateUserBegin,
  updateUserSuccess,
  updateUserError,
} from "../../store/userSlice";
import { useDispatch, useSelector } from "react-redux";
import addUserToLocalStorage from "../../utils/addUserToLocalstorage.js";
import authFetch from "../../utils/authFetch";
const Profile = () => {
  const { user, showAlert, isLoading } = useSelector((state) => state.user);

  const [name, setName] = useState(user?.name);
  const [email, setEmail] = useState(user?.email);
  const [lastName, setLastName] = useState(user?.lastName);
  const [location, setLocation] = useState(user?.location);

  const dispatch = useDispatch();

  const updateUser = async (currentUser) => {
    dispatch(updateUserBegin());
    try {
      const { data } = await authFetch.patch(
        "/api/v1/auth/updateUser",
        currentUser
      );
      const { user, location, token } = data;
      dispatch(updateUserSuccess({ user, location, token }));
      addUserToLocalStorage({ user, location, token });
    } catch (error) {
      dispatch(updateUserError());
    }
    setTimeout(() => {
      dispatch(clearAlert());
    }, 3000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !lastName || !location) {
      dispatch(displayAlert());
      return;
    }
    updateUser({ name, email, lastName, location });
  };

  return (
    <Wrapper>
      <form className="form" onSubmit={handleSubmit}>
        <h3>profile</h3>
        {showAlert && <Alert />}
        <div className="form-center">
          <FormRow
            type="text"
            name="name"
            value={name}
            handleChange={(e) => setName(e.target.value)}
          />
          <FormRow
            type="text"
            labelText="last name"
            name="lastName"
            value={lastName}
            handleChange={(e) => setLastName(e.target.value)}
          />
          <FormRow
            type="email"
            name="email"
            value={email}
            handleChange={(e) => setEmail(e.target.value)}
          />
          <FormRow
            type="text"
            name="location"
            value={location}
            handleChange={(e) => setLocation(e.target.value)}
          />
          <button className="btn btn-block" type="submit" disabled={isLoading}>
            {isLoading ? "Please Wait..." : "save changes"}
          </button>
        </div>
      </form>
    </Wrapper>
  );
};

export default Profile;
