import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../../../context/auth_context/Use_auth_context'
import { useHomeContext } from '../../../context/home_context/Use_home_context'
import Title from '../../../global_components/Title'
import Content from './Content'
import ContentNotLogged from './Content_not_logged'

const NavbarMobile = () => {
  const navigate = useNavigate()
  const [show, setShow] = useState(false)
  const { setOpenEditUserModal } = useHomeContext()
  const { token, logout } = useAuthContext()

  const handleEdit = () => {
    setOpenEditUserModal(true)
    setShow(false)
  }

  const handleLogout = () => {
    logout()
    setShow(false)
    navigate('/')
  }

  return (
    <div className='navbar'>
      <Title />
      <div className='navbar_mobile' onClick={() => setShow(!show)}>
        {show ? (
          <img
            loading='lazy'
            src='times.svg'
            alt='close'
            width={30}
            height={30}
          />
        ) : (
          <img loading='lazy' src='bar.svg' alt='bar' width={30} height={30} />
        )}
      </div>

      {/* content */}
      <div
        className={
          show ? 'content navbar_desktop active' : ' content navbar_desktop'
        }
      >
        {token ? (
          <div className='navbar__content'>
            <Content handleEdit={handleEdit} handleLogout={handleLogout} />
          </div>
        ) : (
          <ContentNotLogged />
        )}
      </div>
    </div>
  )
}

export default NavbarMobile
