import { Link } from 'react-router-dom'

interface AuthOptionsProps {
  text: string
  nameOfRoute: string
  route: string
}

const AuthOptions = ({ text, nameOfRoute, route }: AuthOptionsProps) => {
  return (
    <div className='auth_options'>
      <p>{text}</p>
      <Link to={route}>{nameOfRoute}</Link>
    </div>
  )
}

export default AuthOptions
