import Wrapper from "../assets/wrappers/Navbar"
import { FaAlignLeft, FaCaretDown, FaUserCircle } from 'react-icons/fa';
import Logo from "./Logo";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser, toggleSidebar } from "../store/userSlice";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const dispatch= useDispatch();
  const navigate = useNavigate();
  const {user}= useSelector((state)=> state.user);
  const [showLogout, setShowLogout] = useState(false);
  useEffect(() => {
    if (!user) {
      navigate('/landing')
    }
  }, [user , navigate])
  
  return (
    <Wrapper>
      <div className='nav-center'>
        <button type='button' className='toggle-btn' onClick={()=>dispatch(toggleSidebar())}>
          <FaAlignLeft />
        </button>
        <div>
          <Logo />
          <h3 className='logo-text'>dashboard</h3>
        </div>
        <div className='btn-container'>
          <button
            type='button'
            className='btn'
            onClick={()=>setShowLogout(!showLogout)}
          >
            <FaUserCircle />
            {user.name}
            <FaCaretDown />
          </button>
          <div className={showLogout? "dropdown show-dropdown": 'dropdown'} >
            <button type='button' className='dropdown-btn' onClick={()=>dispatch(logoutUser())} >
              logout
            </button>
          </div>
        </div>
      </div>
    </Wrapper>

  )
}

export default Navbar