import { useState } from 'react'
import Title from '../../../global_components/Title'
import { useAuthContext } from '../../../context/auth_context/Use_auth_context'
import { Link } from 'react-router-dom'
import { useHomeContext } from '../../../context/home_context/Use_home_context'

const NavbarMobile = () => {
  const [show, setShow] = useState(false)
  const { user } = useAuthContext()
  const { setOpenEditModal } = useHomeContext()

  const handleEdit = () => {
    setOpenEditModal(true)
    setShow(false)
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
        {user.email ? (
          <div className='navbar__content'>
            <p className='navbar__content_name'>{user.fullName}</p>
            <p className='navbar__content_email'>{user.email}</p>

            <div className='navbar__content_edit' onClick={() => handleEdit()}>
              <img src='edit.svg' alt='edit' />
              <p>Editar cuenta</p>
            </div>

            <div className='navbar__content_logout'>
              <img src='logout.svg' alt='logout' />
              <p>Cerrar sesión</p>
            </div>
          </div>
        ) : (
          <div className='navbar__not_logged'>
            <p>No hay una sesión iniciada</p>

            <div className='navbar__not_logged_buttons'>
              <Link to='/'>Iniciar sesión</Link>
              <Link to='/register'>Registrarse</Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default NavbarMobile
