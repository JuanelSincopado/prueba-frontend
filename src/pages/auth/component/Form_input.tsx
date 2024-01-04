interface FormInputProps {
  type: string
  placeholder: string
  name: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const FormInput = ({ type, name, placeholder, onChange }: FormInputProps) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      name={name}
      onChange={(e) => onChange(e)}
    />
  )
}

export default FormInput
