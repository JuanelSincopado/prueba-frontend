import { useState } from 'react'
import HomeContext from './Create_context'
import Post from '../../model/Post'
import baseUrl from '../../config/db'
import { useAuthContext } from '../auth_context/Use_auth_context'
import CreateFormData from '../user_context/local_data/Create'
import EnumPostModal from './local_data/Enum_modal'

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
  const [posts, setPosts] = useState<Post[]>([])
  const [postFilterSearch, setPostFilterSearch] = useState<Post[]>([])
  const [postEdit, setPostEdit] = useState<Post>({
    content: '',
    likes: 0,
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

  const { token } = useAuthContext()

  const getAllPosts = async () => {
    try {
      setLoadingGlobal(true)

      const response = await fetch(baseUrl + '/post', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const data = await response.json()

      if (data.error) {
        setError(data.error)
        setLoadingGlobal(false)
        return
      }

      //filtrar los post que no tengan deleteAt
      const filter = data.filter((post: Post) => !post.deletedAt)

      setPosts(filter)
      setPostFilterSearch(filter)
      setLoadingGlobal(false)
    } catch (error) {
      setLoadingGlobal(false)
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

      setPosts([...posts, data])
      setPostFilterSearch([...posts, data])
      setLoading(false)
    } catch (error) {
      setLoading(false)
    }
  }

  const addFavorite = async (post_id: string, like: number) => {
    try {
      setLoading(true)

      const response = await fetch(baseUrl + '/post/' + post_id, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          likes: like,
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
      setSuccess('Post actualizado correctamente')

      setTimeout(() => {
        setSuccess('')
      }, 2000)

      getAllPosts()
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

      setPostFilterSearch(posts.filter((post) => post._id !== post_id))
      setPosts(posts.filter((post) => post._id !== post_id))

      setLoading(false)
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
        postFilterSearch,
        openPostModal,
        openEditUserModal,
        setError,
        setLoading,
        setLoadingGlobal,
        getAllPosts,
        addFavorite,
        deletePost,
        setOpenPostModal,
        createPost,
        setPostEdit,
        updatePost,
        setSuccess,
        filterPosts,
        setOpenEditUserModal,
      }}
    >
      {children}
    </HomeContext.Provider>
  )
}

export default HomeState
