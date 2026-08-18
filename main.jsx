import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './App.css'

// Nhập "cáp nối" Provider và "nhà máy điện" store
import { Provider } from 'react-redux'
import store from './store.js'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* Dùng Provider bọc lấy App và cắm store vào */}
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
)
