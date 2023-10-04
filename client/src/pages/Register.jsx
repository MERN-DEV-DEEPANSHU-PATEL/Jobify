import { useEffect, useState } from "react";
import { Logo, FormRow, Alert } from "../components/index";
import Wrapper from "../assets/wrappers/RegisterPage";
import { useSelector, useDispatch } from "react-redux";
import {
  displayAlert,
  clearAlert,
  setupUserBegin,
  setupUserSuccess,
  setupUserError,
} from "../store/userSlice";
// import { useAppContext } from '../context/appContext';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import addUserToLocalStorage from "../utils/addUserToLocalstorage";
const initialState = {
  name: "",
  email: "",
  password: "",
  isMember: false,
};

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [values, setValues] = useState(initialState);

  const { showAlert, isLoading, user } = useSelector((state) => state.user);

  // const { user, isLoading, showAlert, displayAlert, setupUser } =
  //   useAppContext();
  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember });
  };

  const setupUser = async ({ currentUser, endPoint, alertText }) => {
    dispatch(setupUserBegin());
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/v1/auth/${endPoint}`,
        currentUser
      );
      const { user, token, location } = data;
      dispatch(setupUserSuccess({ user, token, location, alertText }));
      addUserToLocalStorage({ user, token, location });
    } catch (error) {
      if (error.code === "ERR_NETWORK") {
        dispatch(setupUserError({ msg: "Internet Connection Error" }));
      } else {
        dispatch(setupUserError({ msg: error.response.data.msg }));
      }
    }
    setTimeout(() => {
      dispatch(clearAlert());
    }, 3000);
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const { name, email, password, isMember } = values;
    if (!email || !password || (!isMember && !name)) {
      dispatch(displayAlert());
      setTimeout(() => {
        dispatch(clearAlert());
      }, 3000);
      return;
    }
    const currentUser = { name, email, password };
    if (isMember) {
      setupUser({
        currentUser,
        endPoint: "login",
        alertText: "Login Successful! Redirecting...",
      });
    } else {
      setupUser({
        currentUser,
        endPoint: "register",
        alertText: "User Created! Redirecting...",
      });
    }
  };

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate("/");
      }, 3000);
    }
  }, [user, navigate]);

  return (
    <Wrapper className="full-page">
      <form className="form" onSubmit={onSubmit}>
        <Logo />
        <h3>{values.isMember ? "Login" : "Register"}</h3>
        {showAlert && <Alert />}
        {/* name input */}
        {!values.isMember && (
          <FormRow
            type="text"
            name="name"
            value={values.name}
            handleChange={handleChange}
          />
        )}

        {/* email input */}
        <FormRow
          type="email"
          name="email"
          value={values.email}
          handleChange={handleChange}
        />
        {/* password input */}
        <FormRow
          type="password"
          name="password"
          value={values.password}
          handleChange={handleChange}
        />
        <button type="submit" className="btn btn-block" disabled={isLoading}>
          submit
        </button>
        <p>
          {values.isMember ? "Not a member yet?" : "Already a member?"}
          <button
            type="button"
            onClick={toggleMember}
            className="member-btn"
            disabled={isLoading}
          >
            {values.isMember ? "Register" : "Login"}
          </button>
        </p>
      </form>
    </Wrapper>
  );
};
export default Register;
