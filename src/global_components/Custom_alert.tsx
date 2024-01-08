import { useHomeContext } from '../context/home_context/Use_home_context'
import EnumAlerts from '../context/home_context/local_data/Enum_alerts'

const CustomAlert = () => {
  const { messageAlert } = useHomeContext()

  return (
    <div
      className={
        messageAlert.type == EnumAlerts.ERROR ? 'alert danger' : 'alert success'
      }
      role='alert'
    >
      <strong>{messageAlert.message}</strong>
    </div>
  )
}

export default CustomAlert
