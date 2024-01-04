import { useState } from 'react'
import { useAuthContext } from '../../../context/auth_context/Use_auth_context'
import { useHomeContext } from '../../../context/home_context/Use_home_context'
import CreateFormData from '../../../context/user_context/local_data/Create'
import FormButton from '../../../global_components/Form_button'
import FormInput from '../../auth/component/Form_input'

const CreateModal = () => {
  const {
    loading,
    error,
    setOpenCreateModal,
    setLoading,
    setError,
    createPost,
    postEdit,
    setPostEdit,
    updatePost,
    success,
  } = useHomeContext()

  const { user } = useAuthContext()

  const [formData, setFormData] = useState<CreateFormData>({
    content: postEdit?.content || '',
    likes: postEdit?.likes || 0,
    title: postEdit?.title || '',
    userID: '',
    userName: '',
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
      return
    }

    setFormData({
      title: title,
      content: content,
      likes: postEdit?.likes || 0,
      userID: user.id,
      userName: user.userName,
    })

    if (postEdit) {
      await updatePost(postEdit._id, formData)
      return
    } else {
      await createPost(formData)
    }
  }

  const closeModal = () => {
    setPostEdit({
      title: '',
      content: '',
      likes: 0,
      user: {
        id: '',
        userName: '',
      },
      createdAt: new Date(),
      updatedAt: new Date(),
      _id: '',
    })
    setOpenCreateModal(false)
  }

  return (
    <div className='modal__background'>
      <div className='modal__container'>
        <div className='modal_flex'>
          <p>Crear Post</p>
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

          <FormButton text={postEdit ? 'Editar' : 'Crear'} loading={loading} />
        </form>
      </div>
    </div>
  )
}

export default CreateModal
