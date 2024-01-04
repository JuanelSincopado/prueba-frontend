interface FormInputProps {
  type: string
  placeholder: string
  name: string
  defaultValue?: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const FormInput = ({
  type,
  name,
  placeholder,
  onChange,
  defaultValue,
}: FormInputProps) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      name={name}
      onChange={(e) => onChange(e)}
      className='input'
      defaultValue={defaultValue ? defaultValue : ''}
    />
  )
}

export default FormInput
