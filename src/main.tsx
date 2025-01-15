import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './Hooks/AuthContext.tsx'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ToastContainer />
        <App />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
  ,
)
