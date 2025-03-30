import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import { configureStore } from '@reduxjs/toolkit'
import App from './App'

import NotificationReducer from './reducers/notificationReducer'
import BlogReducer from './reducers/blogReducer'
import LoginReducer from './reducers/loginReducer'
import UsersReducer from './reducers/usersReducer'

const store = configureStore({
  reducer: {
    notification: NotificationReducer,
    blogs: BlogReducer,
    login: LoginReducer,
    users: UsersReducer,
  },
  devTools: true,
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
)
