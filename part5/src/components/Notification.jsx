import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector((state) => state.notification)

  const style = {
    backgroundColor: 'lightgrey',
    margin: '10px',
    padding: '10px',
    border: '2px solid',
    // borderColor: type === 'success' ? 'green' : 'red',
    borderRadius: '5px',
  }

  if (notification === '') {
    return null
  }

  return <div style={style}>{notification}</div>
}

export default Notification
