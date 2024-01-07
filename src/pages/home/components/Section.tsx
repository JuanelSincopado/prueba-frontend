import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../../../context/auth_context/Use_auth_context'
import { useHomeContext } from '../../../context/home_context/Use_home_context'
import Title from '../../../global_components/Title'
import Content from './Content'
import ContentNotLogged from './Content_not_logged'

const Section = () => {
  const { token } = useAuthContext()
  const { setOpenEditUserModal } = useHomeContext()
  const { logout } = useAuthContext()

  const navigate = useNavigate()

  const handleEdit = () => {
    setOpenEditUserModal(true)
  }

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <section>
      <div className='section_content'>
        <Title />

        {token ? (
          <Content
            handleEdit={() => handleEdit()}
            handleLogout={() => handleLogout()}
          />
        ) : (
          <ContentNotLogged />
        )}
      </div>
    </section>
  )
}

export default Section
