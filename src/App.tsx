import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '@/pages/Home';

// Lazy load all non-home pages for better code splitting
const ServicesPage = lazy(() => import('@/pages/ServicesPage'));
const PricingPage = lazy(() => import('@/pages/PricingPage'));
const AboutPage = lazy(() => import('@/pages/AboutPage'));
const ContactPage = lazy(() => import('@/pages/ContactPage'));
const BookingPage = lazy(() => import('@/pages/BookingPage'));
const NotificationsPage = lazy(() => import('@/pages/dashboard/NotificationsPage'));

// Loading component
const PageLoader = () => (
    <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-gray-200 border-t-black rounded-full animate-spin"></div>
            <p className="text-gray-500 text-sm">Loading...</p>
        </div>
    </div>
);

function App() {
    return (
        <Suspense fallback={<PageLoader />}>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/services" element={<ServicesPage />} />
                <Route path="/pricing" element={<PricingPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/booking" element={<BookingPage />} />
                <Route path="/dashboard/notifications" element={<NotificationsPage />} />
            </Routes>
        </Suspense>
    );
}

export default App;
