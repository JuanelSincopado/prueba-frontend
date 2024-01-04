import { useState } from 'react'
import baseUrl from '../../config/db'
import User from '../../model/User'
import UserContext from './Create_context'

type Props = {
  children: string | JSX.Element | JSX.Element[]
}

const UserState = ({ children }: Props) => {
  const [error, setError] = useState<string>('')
  const [success, setSuccess] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)

  const createUser = async (user: User) => {
    try {
      const response = await fetch(`${baseUrl}/user`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      })

      if (response.ok) {
        setSuccess('Usuario creado con éxito')

        setTimeout(() => {
          setSuccess('')
        }, 2000)
      } else {
        const errorText = await response.text()

        const errorParse = JSON.parse(errorText)

        setError(errorParse.msg)

        setTimeout(() => {
          setError('')
        }, 3000)
      }

      setLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <UserContext.Provider
      value={{
        error,
        success,
        loading,
        createUser,
        setError,
        setSuccess,
        setLoading,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export default UserState
