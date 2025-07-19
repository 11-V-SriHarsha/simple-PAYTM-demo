import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
// Removed: import { RecoilRoot } from 'recoil'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* Reverted: <RecoilRoot> */}
      <App />
    {/* Reverted: </RecoilRoot> */}
  </StrictMode>,
)
