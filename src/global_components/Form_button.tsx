import Loader from './Loader'

interface Props {
  text: string
  loading?: boolean
}

const FormButton = ({ text, loading }: Props) => {
  return (
    <button type='submit' className='btn btn_primary'>
      {loading ? <Loader /> : text}
    </button>
  )
}

export default FormButton
