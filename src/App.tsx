import { Routes, Route } from 'react-router-dom';
import Home from '@/pages/Home';
import ServicesPage from '@/pages/ServicesPage';
import PricingPage from '@/pages/PricingPage';
import AboutPage from '@/pages/AboutPage';
import ContactPage from '@/pages/ContactPage';
import NotificationsPage from '@/pages/dashboard/NotificationsPage';

function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/dashboard/notifications" element={<NotificationsPage />} />
        </Routes>
    );
}

export default App;
