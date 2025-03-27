// import React from 'react'
// import ReactDOM from 'react-dom/client'
// import { Provider } from 'react-redux'
// import store from './store'
// import App from './App'


// ReactDOM.createRoot(document.getElementById('root')).render(
//   <Provider store={store}>
//     <App />
//   </Provider>
// )

import React from 'react'
import ReactDOM from 'react-dom/client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import App from './App'


const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(

  <QueryClientProvider client={queryClient}>
    <App />

  </QueryClientProvider>
)