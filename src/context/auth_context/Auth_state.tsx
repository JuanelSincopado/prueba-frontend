import { useState } from 'react'
import baseUrl from '../../config/db'
import AuthContext from './Create_context'
import AuthFieldState from './local__data/Auth'
import User from '../../model/User'

type Props = {
  children: string | JSX.Element | JSX.Element[]
}

const AuthState = ({ children }: Props) => {
  const [authState] = useState<AuthFieldState>({
    email: '',
    password: '',
  })
  const [error, setError] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [success, setSuccess] = useState<string>('')
  const [token, setToken] = useState<string>('')
  const [user, setUser] = useState<User>({
    _id: '',
    fullName: '',
    userName: '',
    email: '',
    password: '',
    age: 0,
    posts: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  })

  const login = async (auth: AuthFieldState) => {
    try {
      const response = await fetch(`${baseUrl}/auth`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(auth),
      })

      const data = await response.json()

      if (response.ok) {
        // Successful response
        setToken(data.token)
        setUser(data.user)

        localStorage.setItem('token', data.token)
        localStorage.setItem('user', JSON.stringify(data.user))
      } else {
        // Handle error response

        setError(data.msg || 'Error al iniciar sesión')
        setTimeout(() => {
          setError('')
        }, 3000)

        return Promise.reject({
          message: data.msg,
        })
      }
    } catch (error) {
      console.error(error)
      setError('Error al iniciar sesión, intentelo de nuevo')
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    setToken('')
    setUser({
      _id: '',
      fullName: '',
      userName: '',
      email: '',
      password: '',
      age: 0,
      posts: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }

  return (
    <AuthContext.Provider
      value={{
        authState,
        error,
        loading,
        success,
        token,
        user,
        login,
        setError,
        setLoading,
        setSuccess,
        setToken,
        setUser,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthState
