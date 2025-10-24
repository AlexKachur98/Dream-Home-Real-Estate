
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './assets/css/global.css'
import PagesMaster from './pages/pages_master.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PagesMaster />
  </StrictMode>
);
