import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ScrollProvider } from '@/components/scroll-provider'
import { ThemeProvider } from '@/components/theme-provider'
import InitialLoader from '@/components/ui/initial-loader'
import './index.css'
import App from './App'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <BrowserRouter>
            <ThemeProvider>
                <ScrollProvider>
                    <InitialLoader>
                        <App />
                    </InitialLoader>
                </ScrollProvider>
            </ThemeProvider>
        </BrowserRouter>
    </StrictMode>,
)


