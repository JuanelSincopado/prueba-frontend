import { useState } from 'react'
import baseUrl from '../../config/db'
import AuthContext from './Create_context'
import AuthFieldState from './local__data/Auth'
import User from '../../model/User'
import { useNavigate } from 'react-router-dom'

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
    id: '',
    fullName: '',
    email: '',
    password: '',
    age: 0,
    posts: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  })

  const validateToken = async () => {
    try {
      await fetch(`${baseUrl}/auth`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token,
        },
      })
        .then((res) => res.json())
        .then((response) => {
          console.log(response)
        })
        .then((error) => {
          console.log(error)
        })
    } catch (error) {
      console.log(error)
    }
  }

  const login = async (auth: AuthFieldState) => {
    try {
      fetch(`${baseUrl}/auth`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(auth),
      })
        .then((res) => res.json())
        .catch((error) => {
          setError(error.msg)
          setTimeout(() => {
            setError('')
          }, 3000)
          setLoading(false)
        })
        .then((response) => {
          setToken(response.token)
          setUser(response.user)
          setLoading(false)
        })
    } catch (error) {
      console.log(error)
    }
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
        validateToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthState
