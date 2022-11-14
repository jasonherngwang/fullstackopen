export default function Notification({ message }) {
  if (message === null) {
    return null
  }

  return (
    <div className={`message ${message.type || 'info'}`}>{message.message}</div>
  )
}
