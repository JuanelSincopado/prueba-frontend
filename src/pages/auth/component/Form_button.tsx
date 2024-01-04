interface Props {
  text: string
  loading?: boolean
}

const FormButton = ({ text, loading }: Props) => {
  return (
    <button type='submit' className='btn btn_primary'>
      {loading ? <div className='loader'></div> : text}
    </button>
  )
}

export default FormButton
