import NavLinks from './Navlinks'
import Logo from '../components/Logo'
import Wrapper from '../assets/wrappers/BigSidebar'
import { useSelector } from 'react-redux'

const BigSidebar = () => {
  const { showSidebar } = useSelector((state) => state.user);

  return (
    <Wrapper>
      <div
        className={
          showSidebar ? 'sidebar-container ' : 'sidebar-container show-sidebar'
        }
      >
        <div className='content'>
          <header>
            <Logo /> 
          </header>
          <NavLinks />
        </div>
      </div>
    </Wrapper>
  )
}

export default BigSidebar
