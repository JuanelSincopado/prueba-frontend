import { useEffect, useRef, useState } from 'react'
import { useHomeContext } from '../../../context/home_context/Use_home_context'
import Loader from '../../../global_components/Loader'
import Post from '../../../model/Post'
import EnumPostModal from '../../../context/home_context/local_data/Enum_modal'
import { useAuthContext } from '../../../context/auth_context/Use_auth_context'
import EnumAlerts from '../../../context/home_context/local_data/Enum_alerts'

interface Props {
  post: Post
}

const CardPost = ({ post }: Props) => {
  const {
    addFavorite,
    deletePost,
    setOpenPostModal,
    setPostEdit,
    setMessageAlert,
  } = useHomeContext()

  const { user, token } = useAuthContext()

  const [loading, setLoading] = useState(false)
  const [showDropdown, setShowDropdown] = useState(false)

  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false)
      }
    }

    document.addEventListener('click', handleClickOutside)

    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [dropdownRef])

  const addFavoritePost = async () => {
    if (!token) {
      setMessageAlert({
        message: 'Por favor, inicia sesión para agregar a favoritos',
        type: EnumAlerts.ERROR,
      })
      setTimeout(() => {
        setMessageAlert({
          message: '',
          type: EnumAlerts.NONE,
        })
      }, 2000)
      return
    }

    setLoading(true)
    await addFavorite(post._id)
    setLoading(false)
  }

  const deleteCard = async () => {
    await deletePost(post._id)
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
      deletedAt: null,
    })
  }

  return (
    <div className='card' key={post._id}>
      <div className='card__top'>
        <div className='card__name'>
          <h3>{post.user.userName}</h3>

          {post.user.id == user._id && (
            <div
              ref={dropdownRef}
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

        <p>
          {post.createdAt.getDate() +
            '/' +
            post.createdAt.getMonth() +
            1 +
            '/' +
            post.createdAt.getFullYear()}
        </p>
      </div>

      <div className='card__body'>
        <p className='card__body_title'>{post.title}</p>

        <p className='card__body_content'>{post.content}</p>
      </div>

      <div className='card__footer'>
        {loading ? (
          <Loader />
        ) : (
          <>
            <img
              className='favorite'
              src={
                post.likes.find((like) => like == user._id)
                  ? 'heart-solid.svg'
                  : 'heart-regular.svg'
              }
              alt='like'
              onClick={() => addFavoritePost()}
            />
            <p>{post.likes.length}</p>
          </>
        )}
      </div>
    </div>
  )
}

export default CardPost
