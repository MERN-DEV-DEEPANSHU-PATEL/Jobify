import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { IoBarChartSharp } from "react-icons/io5";
import { MdQueryStats } from "react-icons/md";
import { FaWpforms } from "react-icons/fa";
import { ImProfile } from "react-icons/im";
import { RiDeleteBin6Line } from "react-icons/ri";
import { toggleSidebar } from "../store/userSlice";

const links = [
  { id: 1, text: "stats", path: "/", icon: <IoBarChartSharp /> },
  { id: 2, text: "all jobs", path: "all-job", icon: <MdQueryStats /> },
  { id: 3, text: "add job", path: "add-job", icon: <FaWpforms /> },
  { id: 4, text: "profile", path: "profile", icon: <ImProfile /> },
  { id: 5, text: "delete account", path: "delete", icon: <RiDeleteBin6Line /> },
];
const NavLinks = () => {
  const dispatch = useDispatch();
  return (
    <div className="nav-links">
      {links.map((link) => {
        const { text, path, id, icon } = link;

        return (
          <NavLink
            to={path}
            key={id}
            onClick={() => dispatch(toggleSidebar())}
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
            end
          >
            <span className="icon">{icon}</span>
            {text}
          </NavLink>
        );
      })}
    </div>
  );
};

export default NavLinks;
