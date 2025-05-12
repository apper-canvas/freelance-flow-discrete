import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { ClientAuthProvider } from './contexts/ClientAuthContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <ClientAuthProvider>
      <App />
    </ClientAuthProvider>
  </BrowserRouter>
)