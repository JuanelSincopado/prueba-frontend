import { useEffect } from 'react'
import { useAuthContext } from '../../context/auth_context/Use_auth_context'
import { useHomeContext } from '../../context/home_context/Use_home_context'
import Loader from '../../global_components/Loader'
import Post from '../../model/Post'
import EditModel from './components/Edit_model'
import NavbarMobile from './components/Navbar'
import Search from './components/Search'
import Section from './components/Section'
import CardPost from './components/card'
import './css/home.css'
import CreateModal from './components/Create_modal'

const HomeView = () => {
  const {
    postFilterSearch,
    openCreateModal,
    loadingGlobal,
    openEditModal,
    getAllPosts,
    setOpenCreateModal,
  } = useHomeContext()
  const { user, token } = useAuthContext()

  useEffect(() => {
    getAllPosts()
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
                return <CardPost post={post} id={user.id} key={post._id} />
              })
            ) : (
              <h3>No hay posts</h3>
            )}
          </div>

          {token && (
            <div className='home__add'>
              <button
                className='add__post'
                onClick={() => setOpenCreateModal(true)}
              >
                +
              </button>
            </div>
          )}
        </div>
      </div>

      {openEditModal && <EditModel />}

      {openCreateModal && <CreateModal />}
    </div>
  )
}

export default HomeView
