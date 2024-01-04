interface Props {
  text: string
}

const FormTitle = ({ text }: Props) => {
  return (
    <div className='form-title'>
      <h1>{text}</h1>
    </div>
  )
}

export default FormTitle
