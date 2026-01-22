import { Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="py-12 border-t border-gray-100 bg-white relative z-10">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-8">
                    <Link to="/" className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-black flex items-center justify-center">
                            <Zap className="w-5 h-5 text-white" fill="currentColor" />
                        </div>
                        <span className="text-xl font-bold tracking-tight text-black">
                            4th Dimension
                        </span>
                    </Link>

                    <div className="flex gap-8 text-gray-500">
                        <Link to="/services" className="hover:text-black transition-colors">Services</Link>
                        <Link to="/pricing" className="hover:text-black transition-colors">Pricing</Link>
                        <Link to="/about" className="hover:text-black transition-colors">About</Link>
                        <Link to="/booking" className="hover:text-black transition-colors">Booking</Link>
                    </div>
                </div>

                <div className="text-center text-gray-400 text-sm">
                    &copy; {new Date().getFullYear()} 4th Dimension. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
