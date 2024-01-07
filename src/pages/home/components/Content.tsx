import { useAuthContext } from '../../../context/auth_context/Use_auth_context'

interface Props {
  handleEdit: () => void
  handleLogout: () => void
}

const Content = ({ handleEdit, handleLogout }: Props) => {
  const { user } = useAuthContext()

  return (
    <>
      <p className='content__name'>{user.fullName}</p>
      <p className='content__email'>{user.userName}</p>
      <p className='content__email'>{user.email}</p>

      <div className='content__edit' onClick={() => handleEdit()}>
        <img src='edit.svg' alt='edit' />
        <p>Editar cuenta</p>
      </div>

      <div className='content__logout' onClick={() => handleLogout()}>
        <img src='logout.svg' alt='logout' />
        <p>Cerrar sesión</p>
      </div>
    </>
  )
}

export default Content
