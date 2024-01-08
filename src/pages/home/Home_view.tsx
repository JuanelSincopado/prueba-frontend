import { useEffect } from 'react'
import { useAuthContext } from '../../context/auth_context/Use_auth_context'
import { useHomeContext } from '../../context/home_context/Use_home_context'
import Loader from '../../global_components/Loader'
import Post from '../../model/Post'
import NavbarMobile from './components/Navbar'
import CreateModal from './components/Post_modal'
import Search from './components/Search'
import Section from './components/Section'
import CardPost from './components/card'
import './css/home.css'
import EnumPostModal from '../../context/home_context/local_data/Enum_modal'
import EditModel from './components/Edit_model'
import { useNavigate } from 'react-router-dom'

const HomeView = () => {
  const {
    postFilterSearch,
    openEditUserModal,
    openPostModal,
    loadingGlobal,
    getAllPosts,
    setOpenPostModal,
  } = useHomeContext()

  const { setToken, setUser } = useAuthContext()

  const { token } = useAuthContext()

  useEffect(() => {
    getAllPosts()

    if (localStorage.getItem('token')) {
      const token = localStorage.getItem('token')
      const user = localStorage.getItem('user')

      if (token && user) {
        setToken(token)
        setUser(JSON.parse(user))
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (loadingGlobal) {
    return (
      <div className='loader__global'>
        <Loader />
      </div>
    )
  }

  return (
    <div className='home'>
      <NavbarMobile />

      <div className='home__body'>
        <Section />

        <div className='home__post'>
          <Search />

          <div className='home__post__container'>
            {postFilterSearch.length > 0 ? (
              postFilterSearch.map((post: Post) => {
                return <CardPost post={post} key={post._id} />
              })
            ) : (
              <h3>No hay posts</h3>
            )}
          </div>

          {token && (
            <div className='home__add'>
              <button
                className='add__post'
                onClick={() => setOpenPostModal(EnumPostModal.CREATE)}
              >
                +
              </button>
            </div>
          )}
        </div>
      </div>

      {openPostModal != EnumPostModal.NONE && <CreateModal />}

      {openEditUserModal && <EditModel />}
    </div>
  )
}

export default HomeView
