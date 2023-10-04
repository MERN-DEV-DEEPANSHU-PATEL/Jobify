import Wrapper from "../assets/wrappers/SmallSidebar";

import { FaTimes } from "react-icons/fa";
import Logo from "./Logo";
// import NavLinks from './NavLinks'
import { useDispatch, useSelector } from "react-redux";
import { toggleSidebar } from "../store/userSlice";
import NavLinks from "./Navlinks";

const SmallSidebar = () => {
  const { showSidebar } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  return (
    <Wrapper>
      <div
        className={
          showSidebar ? "sidebar-container show-sidebar" : "sidebar-container"
        }
      >
        <div className="content">
          <button
            type="button"
            className="close-btn"
            onClick={() => dispatch(toggleSidebar())}
          >
            <FaTimes />
          </button>
          <header>
            <Logo />
          </header>
          <NavLinks/>
        </div>
      </div>
    </Wrapper>
  );
};

export default SmallSidebar;
