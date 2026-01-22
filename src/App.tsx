import { lazy, Suspense, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Home from '@/pages/Home';
import CubeLoader from '@/components/ui/cube-loader';

// Lazy load all non-home pages for better code splitting
const ServicesPage = lazy(() => import('@/pages/ServicesPage'));
const PricingPage = lazy(() => import('@/pages/PricingPage'));
const AboutPage = lazy(() => import('@/pages/AboutPage'));
const ContactPage = lazy(() => import('@/pages/ContactPage'));
const BookingPage = lazy(() => import('@/pages/BookingPage'));
const NotificationsPage = lazy(() => import('@/pages/dashboard/NotificationsPage'));

// Preload other pages in background after home loads
const preloadPages = () => {
    // Small delay to let home page render first
    setTimeout(() => {
        import('@/pages/ServicesPage');
        import('@/pages/PricingPage');
        import('@/pages/AboutPage');
        import('@/pages/ContactPage');
        import('@/pages/BookingPage');
    }, 1000);
};

// Loading component
const PageLoader = () => (
    <div className="min-h-screen flex items-center justify-center bg-white">
        <CubeLoader />
    </div>
);

function App() {
    const location = useLocation();

    // Preload other pages when on home page
    useEffect(() => {
        if (location.pathname === '/') {
            preloadPages();
        }
    }, [location.pathname]);

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

