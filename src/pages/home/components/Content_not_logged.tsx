import { Link } from 'react-router-dom'

const ContentNotLogged = () => {
  return (
    <div className='content__not_logged'>
      <p>No hay una sesión iniciada</p>

      <div className='content__not_logged_buttons'>
        <Link to='/'>Iniciar sesión</Link>
        <Link to='/register'>Registrarse</Link>
      </div>
    </div>
  )
}

export default ContentNotLogged
