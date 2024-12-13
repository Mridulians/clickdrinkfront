import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {TonConnectUIProvider} from '@tonconnect/ui-react'

createRoot(document.getElementById('root')).render(
  
  <StrictMode>
    <TonConnectUIProvider manifestUrl=''>

    <App />
    </TonConnectUIProvider>
  </StrictMode>,
)
