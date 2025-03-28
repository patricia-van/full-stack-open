import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import App from './App'

import NotificationReducer from './reducers/notificationRedcuer'
import BlogReducer from './reducers/blogReducer'
import UserReducer from './reducers/userReducer'

const store = configureStore({
  reducer: {
    notification: NotificationReducer,
    blogs: BlogReducer,
    user: UserReducer,
  },
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)
