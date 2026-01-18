import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ScrollProvider } from '@/components/scroll-provider'
import './index.css'
import App from './App'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <BrowserRouter>
            <ScrollProvider>
                <App />
            </ScrollProvider>
        </BrowserRouter>
    </StrictMode>,
)

