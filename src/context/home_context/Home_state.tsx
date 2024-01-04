import { useState } from 'react'
import HomeContext from './Create_context'

type Props = {
  children: string | JSX.Element | JSX.Element[]
}

const HomeState = ({ children }: Props) => {
  const [openEditModal, setOpenEditModal] = useState(false)

  return (
    <HomeContext.Provider
      value={{
        openEditModal,
        setOpenEditModal,
      }}
    >
      {children}
    </HomeContext.Provider>
  )
}

export default HomeState
