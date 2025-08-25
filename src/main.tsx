import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/global.module.scss'
import './styles/highlighted-text.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
