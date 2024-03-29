import { useEffect, useState } from 'react'
import Title from '../../global_components/Title'
import AuthOptions from './component/Auth_options'
import FormButton from '../../global_components/Form_button'
import FormInput from './component/Form_input'
import FormTitle from './component/Form_title'
import './css/auth.css'
import { useUserContext } from '../../context/user_context/Use_user_context'
import { useAuthContext } from '../../context/auth_context/Use_auth_context'
import AuthFieldState from '../../context/auth_context/local__data/Auth'
import { useNavigate } from 'react-router-dom'

interface FormData {
  email: string
  password: string
}

const LoginView = () => {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
  })

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

  const { success } = useUserContext()
  const { error, setLoading, setError, loading, login } = useAuthContext()

  const navigate = useNavigate()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    setLoading(true)

    try {
      const { email, password } = formData

      if (email === '' || password === '') {
        setLoading(false)
        setError('Por favor llene todos los campos')
        setTimeout(() => {
          setError('')
        }, 3000)
      } else {
        const auth: AuthFieldState = {
          email,
          password,
        }

        await login(auth)

        navigate('/home')
      }
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='auth__container'>
      <img src='7613.jpg' alt='login' />

      <div className='auth'>
        <Title />

        <FormTitle text='Iniciar sesión' />

        <form className='form' onSubmit={onSubmit}>
          <FormInput
            type='email'
            placeholder='Correo'
            name='email'
            onChange={handleChange}
          />

          <FormInput
            type='password'
            placeholder='Contraseña'
            name='password'
            onChange={handleChange}
          />

          {error && <p className='error'>{error}</p>}
          {success && <p className='success'>{success}</p>}

          <FormButton text='Iniciar sesión' loading={loading} />
        </form>

        <AuthOptions
          text='¿No tienes una cuenta?'
          nameOfRoute='Registrate'
          route='/register'
        />
      </div>
    </div>
  )
}

export default LoginView
