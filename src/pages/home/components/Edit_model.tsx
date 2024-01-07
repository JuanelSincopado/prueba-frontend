import { useEffect, useState } from 'react'
import { useHomeContext } from '../../../context/home_context/Use_home_context'
import FormInput from '../../auth/component/Form_input'
import FormButton from '../../../global_components/Form_button'
import { useAuthContext } from '../../../context/auth_context/Use_auth_context'
import EditFormData from '../../../context/user_context/local_data/Edit'
import { useUserContext } from '../../../context/user_context/Use_user_context'
import EnumPostModal from '../../../context/home_context/local_data/Enum_modal'

const EditModel = () => {
  const { setOpenPostModal, setError } = useHomeContext()
  const { user } = useAuthContext()
  const { error, success, loading, setLoading, editUser } = useUserContext()

  const [formData, setFormData] = useState<EditFormData>({
    fullName: user?.fullName || '',
    age: user?.age || 0,
  })

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    setLoading(true)

    const { fullName, age } = formData

    if (fullName === '' || age === 0) {
      setError('Por favor, rellene todos los campos')
      setTimeout(() => {
        setError('')
      }, 2000)
      return
    }

    await editUser(formData)
  }

  return (
    <div className='modal__background'>
      <div className='modal__container'>
        <div className='modal_flex'>
          <p>Editar cuenta</p>
          <button onClick={() => setOpenPostModal(EnumPostModal.UPDATE)}>
            &times;
          </button>
        </div>

        <form className='modal__form' onSubmit={handleSubmit}>
          <FormInput
            name='fullName'
            placeholder='Nombre Completo'
            type='text'
            onChange={(e) => handleChange(e)}
            defaultValue={user?.fullName}
          />

          <FormInput
            name='age'
            placeholder='Edad'
            type='number'
            onChange={(e) => handleChange(e)}
            defaultValue={String(user?.age)}
          />

          {error && <p className='error'>{error}</p>}
          {success && <p className='success'>{success}</p>}

          <FormButton text='Editar' loading={loading} />
        </form>
      </div>
    </div>
  )
}

export default EditModel
