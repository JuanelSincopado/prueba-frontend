import { useEffect, useState } from 'react'
import { useUserContext } from '../../context/user_context/Use_user_context'
import Title from '../../global_components/Title'
import AuthOptions from './component/Auth_options'
import FormButton from '../../global_components/Form_button'
import FormInput from './component/Form_input'
import FormTitle from './component/Form_title'
import User from '../../model/User'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../../context/auth_context/Use_auth_context'

interface FormData {
  fullName: string
  userName: string
  age: number
  email: string
  password: string
  password_repeat: string
}

const RegisterView = () => {
  const { success, error, loading, setError, createUser, setLoading } =
    useUserContext()

  const navigate = useNavigate()

  const { setUser, setToken } = useAuthContext()

  useEffect(() => {
    if (localStorage.getItem('token')) {
      navigate('/home')

      const token = localStorage.getItem('token')
      const user = localStorage.getItem('user')

      if (token && user) {
        setToken(token)
        setUser(JSON.parse(user))
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    userName: '',
    age: 0,
    email: '',
    password: '',
    password_repeat: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    setLoading(true)

    const { fullName, userName, age, email, password, password_repeat } =
      formData

    if (
      fullName === '' ||
      userName === '' ||
      age === 0 ||
      email === '' ||
      password === '' ||
      password_repeat === ''
    ) {
      setError('Por favor llene todos los campos')
      setTimeout(() => {
        setError('')
      }, 3000)

      setLoading(false)
      return
    }

    if (password !== password_repeat) {
      setError('Las contraseñas no coinciden')
      setTimeout(() => {
        setError('')
      }, 3000)
      return
    }

    const user: User = {
      _id: '',
      userName,
      fullName,
      age: Number(age),
      email,
      password,
      posts: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    await createUser(user)

    navigate('/')
  }

  return (
    <div className='auth'>
      <Title />

      <FormTitle text='Registrarse' />

      <form className='form' onSubmit={onSubmit}>
        <FormInput
          type='text'
          placeholder='Nombre completo'
          name='fullName'
          onChange={(e) => handleChange(e)}
        />

        <FormInput
          type='text'
          placeholder='Nombre de usuario'
          name='userName'
          onChange={(e) => handleChange(e)}
        />

        <FormInput
          type='number'
          placeholder='Edad'
          name='age'
          onChange={(e) => handleChange(e)}
        />

        <FormInput
          type='email'
          placeholder='Correo'
          name='email'
          onChange={(e) => handleChange(e)}
        />

        <FormInput
          type='password'
          placeholder='Contraseña'
          name='password'
          onChange={(e) => handleChange(e)}
        />

        <FormInput
          type='password'
          placeholder='Repetir Contraseña'
          name='password_repeat'
          onChange={(e) => handleChange(e)}
        />

        {error && <p className='error'>{error}</p>}
        {success && <p className='success'>{success}</p>}

        <FormButton text='Registrarse' loading={loading} />
      </form>

      <AuthOptions
        text='¿Ya tiene cuenta?'
        nameOfRoute='Inicie sesión'
        route='/'
      />
    </div>
  )
}

export default RegisterView
