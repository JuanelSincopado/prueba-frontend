import { Link } from 'react-router-dom'
import './css/not_found.css'

const NotFound = () => {
  return (
    <div className='not_found'>
      <h2>Lo siento</h2>
      <p>La página no ha sido encontrada</p>
      <Link to='/'>Volver a inicio</Link>
    </div>
  )
}

export default NotFound
