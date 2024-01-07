import { useState } from 'react'
import { useHomeContext } from '../../../context/home_context/Use_home_context'
import Loader from '../../../global_components/Loader'
import Post from '../../../model/Post'
import EnumPostModal from '../../../context/home_context/local_data/Enum_modal'

interface Props {
  post: Post
  id: string
}

const CardPost = ({ post, id }: Props) => {
  const {
    addFavorite,
    deletePost,
    setLoadingGlobal,
    setOpenPostModal,
    setPostEdit,
  } = useHomeContext()

  const [loading, setLoading] = useState(false)
  const [showDropdown, setShowDropdown] = useState(false)

  const addFavoritePost = async () => {
    setLoading(true)
    await addFavorite(post._id, (post.likes += 1))
    setLoading(false)
  }

  const deleteCard = async () => {
    setLoadingGlobal(true)
    await deletePost(post._id)
    setLoadingGlobal(false)
  }

  const editCard = () => {
    setOpenPostModal(EnumPostModal.UPDATE)
    setPostEdit({
      title: post.title,
      content: post.content,
      likes: post.likes,
      user: {
        id: post.user.id,
        userName: post.user.userName,
      },
      _id: post._id,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
    })
  }

  return (
    <div className='card' key={post._id}>
      <div className='card__top'>
        <div className='card__name'>
          <h3>{post.user.userName}</h3>

          {post.user.id == id && (
            <div
              className={
                showDropdown
                  ? 'card__dropdown dropwodn_active'
                  : 'card__dropdown'
              }
              onClick={() => setShowDropdown(!showDropdown)}
            >
              <img src='ellipsis.svg' alt='options' />
              <div
                className={
                  showDropdown
                    ? 'dropdown__content dropwodn_active'
                    : 'dropdown__content'
                }
              >
                <p onClick={() => editCard()}>Editar</p>
                <p onClick={() => deleteCard()}>Eliminar</p>
              </div>
            </div>
          )}
        </div>

        {/* <p>{post.createdAt.getDate.toString()}</p> */}
      </div>

      <div className='card__body'>
        <p className='card__body_title'>{post.title}</p>

        <p className='card__body_content'>{post.content}</p>
      </div>

      {!loading ? (
        <div className='card__footer'>
          <img
            className='favorite'
            src='heart.svg'
            alt='like'
            onClick={() => addFavoritePost()}
          />
          <p>{post.likes}</p>
        </div>
      ) : (
        <Loader />
      )}
    </div>
  )
}

export default CardPost
