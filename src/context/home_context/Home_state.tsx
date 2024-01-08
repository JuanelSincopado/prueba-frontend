import { useState } from 'react'
import HomeContext from './Create_context'
import Post from '../../model/Post'
import baseUrl from '../../config/db'
import { useAuthContext } from '../auth_context/Use_auth_context'
import CreateFormData from '../user_context/local_data/Create'
import EnumPostModal from './local_data/Enum_modal'
import Message_alert from './local_data/Message_alert'
import EnumAlerts from './local_data/Enum_alerts'

type Props = {
  children: string | JSX.Element | JSX.Element[]
}

const HomeState = ({ children }: Props) => {
  const [openPostModal, setOpenPostModal] = useState<EnumPostModal>(
    EnumPostModal.NONE
  )
  const [openEditUserModal, setOpenEditUserModal] = useState<boolean>(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)
  const [loadingGlobal, setLoadingGlobal] = useState(false)
  const [loadingPost, setLoadingPost] = useState(false)
  const [posts, setPosts] = useState<Post[]>([])
  const [postFilterSearch, setPostFilterSearch] = useState<Post[]>([])
  const [messageAlert, setMessageAlert] = useState<Message_alert>({
    type: EnumAlerts.NONE,
    message: '',
  })
  const [postEdit, setPostEdit] = useState<Post>({
    content: '',
    likes: [],
    title: '',
    user: {
      id: '',
      userName: '',
    },
    _id: '',
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
  })

  const { token, user } = useAuthContext()

  const getAllPosts = async ({ loadingGlobal = true }) => {
    try {
      if (loadingGlobal) {
        setLoadingGlobal(true)
      } else {
        setLoadingPost(true)
      }

      const response = await fetch(baseUrl + '/post', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const data = await response.json()

      if (data.error) {
        setError(data.error)
        return
      }

      //filtrar los post que no tengan deleteAt
      const filter = data.filter((post: Post) => !post.deletedAt)

      // convertir la fecha de string a Date
      filter.forEach((post: Post) => {
        post.createdAt = new Date(post.createdAt)
        post.updatedAt = new Date(post.updatedAt)
      })

      setPosts(filter)
      setPostFilterSearch(filter)
    } catch (error) {
      console.log(error)
      setMessageAlert({
        type: EnumAlerts.ERROR,
        message: 'Error al obtener los post',
      })
    } finally {
      setLoadingGlobal(false)
      setLoadingPost(false)
    }
  }

  const createPost = async (formData: CreateFormData) => {
    try {
      setLoading(true)

      const response = await fetch(baseUrl + '/post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (data.error) {
        setError(data.error)
        setLoading(false)
        return
      }

      setLoading(false)

      getAllPosts({ loadingGlobal: false })

      setMessageAlert({
        type: EnumAlerts.SUCCESS,
        message: 'Post creado correctamente',
      })

      setTimeout(() => {
        setMessageAlert({
          type: EnumAlerts.NONE,
          message: '',
        })
      }, 2000)
    } catch (error) {
      setLoading(false)
    }
  }

  const addFavorite = async (post_id: string) => {
    try {
      setLoading(true)

      const post = posts.find((post) => post._id === post_id)

      const exist = post?.likes.find((like) => like === user._id)

      if (!exist) {
        post?.likes.push(user._id)
      } else {
        post?.likes.splice(post?.likes.indexOf(user._id), 1)
      }

      const response = await fetch(baseUrl + '/post/' + post_id, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          likes: post?.likes,
        }),
      })

      const data = await response.json()

      if (data.error) {
        setError(data.error)
        setLoading(false)
        return
      }

      setLoading(false)
    } catch (error) {
      console.log(error)

      setLoading(false)
    }
  }

  const updatePost = async (formData: CreateFormData) => {
    try {
      setLoading(true)

      const response = await fetch(baseUrl + '/post/' + postEdit._id, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (data.error) {
        setError(data.error)
        setLoading(false)
        return
      }

      setLoading(false)

      getAllPosts({ loadingGlobal: false })

      setMessageAlert({
        type: EnumAlerts.SUCCESS,
        message: 'Post actualizado correctamente',
      })

      setTimeout(() => {
        setMessageAlert({
          type: EnumAlerts.NONE,
          message: '',
        })
      }, 2000)
    } catch (error) {
      console.log(error)

      setLoading(false)
    }
  }

  const deletePost = async (post_id: string) => {
    try {
      setLoading(true)

      const response = await fetch(baseUrl + '/post/' + post_id, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })

      const data = await response.json()

      if (data.error) {
        setError(data.error)
        setLoading(false)
        return
      }

      getAllPosts({ loadingGlobal: false })

      setLoading(false)

      setMessageAlert({
        type: EnumAlerts.SUCCESS,
        message: 'Post eliminado correctamente',
      })

      setTimeout(() => {
        setMessageAlert({
          type: EnumAlerts.NONE,
          message: '',
        })
      }, 2000)
    } catch (error) {
      console.log(error)

      setLoading(false)
    }
  }

  const filterPosts = (search: string) => {
    // Debounce
    setTimeout(() => {
      const filter = posts.filter((post) =>
        post.title.toLowerCase().includes(search.toLowerCase())
      )

      setPostFilterSearch(filter)
    }, 500)
  }

  return (
    <HomeContext.Provider
      value={{
        error,
        loading,
        loadingGlobal,
        posts,
        postEdit,
        success,
        messageAlert,
        loadingPost,
        postFilterSearch,
        openPostModal,
        openEditUserModal,
        setError,
        setLoading,
        setLoadingGlobal,
        getAllPosts: () => getAllPosts({ loadingGlobal: true }),
        addFavorite,
        deletePost,
        setOpenPostModal,
        createPost,
        setPostEdit,
        updatePost,
        setSuccess,
        filterPosts,
        setOpenEditUserModal,
        setMessageAlert,
        setLoadingPost,
      }}
    >
      {children}
    </HomeContext.Provider>
  )
}

export default HomeState
