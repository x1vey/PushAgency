import { Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="py-12 border-t border-accent/10 bg-dark relative z-10">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-8">
                    <Link to="/" className="flex items-center gap-2">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent to-accent-dark flex items-center justify-center">
                            <Zap className="w-5 h-5 text-dark" fill="currentColor" />
                        </div>
                        <span className="text-xl font-bold tracking-tight text-white">
                            Catalyst Digital
                        </span>
                    </Link>

                    <div className="flex gap-8 text-gray-400">
                        <Link to="/services" className="hover:text-accent transition-colors">Services</Link>
                        <Link to="/pricing" className="hover:text-accent transition-colors">Pricing</Link>
                        <Link to="/about" className="hover:text-accent transition-colors">About</Link>
                        <Link to="/contact" className="hover:text-accent transition-colors">Contact</Link>
                    </div>
                </div>

                <div className="text-center text-gray-600 text-sm">
                    &copy; {new Date().getFullYear()} Catalyst Digital. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
