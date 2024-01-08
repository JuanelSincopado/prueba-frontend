import { useState } from 'react'
import { useAuthContext } from '../../../context/auth_context/Use_auth_context'
import { useHomeContext } from '../../../context/home_context/Use_home_context'
import CreateFormData from '../../../context/user_context/local_data/Create'
import FormButton from '../../../global_components/Form_button'
import FormInput from '../../auth/component/Form_input'
import EnumPostModal from '../../../context/home_context/local_data/Enum_modal'

const PostModal = () => {
  const {
    loading,
    error,
    setOpenPostModal,
    setLoading,
    setError,
    postEdit,
    setPostEdit,
    success,
    createPost,
    updatePost,
    openPostModal,
  } = useHomeContext()

  const { user } = useAuthContext()

  const [formData, setFormData] = useState<CreateFormData>({
    content: postEdit?.content || '',
    likes: postEdit?.likes || [],
    title: postEdit?.title || '',
    userID: user._id || '',
    userName: user.userName || '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    setLoading(true)

    const { title, content } = formData

    if (title === '' || content === '') {
      setError('Por favor, rellene todos los campos')
      setTimeout(() => {
        setError('')
      }, 2000)
      setLoading(false)
      return
    }

    await setFormData(formData)

    if (openPostModal == EnumPostModal.CREATE) {
      await createPost(formData)
    } else {
      await updatePost(formData)
    }

    closeModal()
  }

  const closeModal = () => {
    setPostEdit({
      title: '',
      content: '',
      likes: [],
      user: {
        id: '',
        userName: '',
      },
      createdAt: new Date(),
      updatedAt: new Date(),
      _id: '',
      deletedAt: null,
    })
    setOpenPostModal(EnumPostModal.NONE)
  }

  return (
    <div className='modal__background'>
      <div className='modal__container'>
        <div className='modal_flex'>
          <p>
            {openPostModal == EnumPostModal.CREATE
              ? 'Crear post'
              : 'Editar post'}
          </p>
          <button onClick={() => closeModal()}>&times;</button>
        </div>

        <form className='modal__form' onSubmit={handleSubmit}>
          <FormInput
            name='title'
            placeholder='Título del nuevo Post'
            type='text'
            onChange={(e) => handleChange(e)}
            defaultValue={postEdit?.title}
          />

          <FormInput
            name='content'
            placeholder='Contenido'
            type='text'
            onChange={(e) => handleChange(e)}
            defaultValue={postEdit?.content}
          />

          {error && <p className='error'>{error}</p>}
          {success && <p className='success'>{success}</p>}

          <FormButton
            text={
              openPostModal == EnumPostModal.CREATE
                ? 'Crear'
                : 'Guardar Cambios'
            }
            loading={loading}
          />
        </form>
      </div>
    </div>
  )
}

export default PostModal
