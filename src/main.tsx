import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ScrollProvider } from '@/components/scroll-provider'
import { ThemeProvider } from '@/components/theme-provider'
import './index.css'
import App from './App'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <BrowserRouter>
            <ThemeProvider>
                <ScrollProvider>
                    <App />
                </ScrollProvider>
            </ThemeProvider>
        </BrowserRouter>
    </StrictMode>,
)


