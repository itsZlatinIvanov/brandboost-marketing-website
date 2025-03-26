
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -80;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/80 backdrop-blur-md shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          <a href="/" className="text-2xl font-serif font-bold text-primary-900">
            clyc.io
          </a>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className="text-gray-600 hover:text-primary-500 transition-colors"
            >
              Home
            </Link>
            <Link
              to="/case-studies"
              className="text-gray-600 hover:text-primary-500 transition-colors"
            >
              Case Studies
            </Link>
            <button
              onClick={() => scrollTo('testimonials')}
              className="text-gray-600 hover:text-primary-500 transition-colors"
            >
              Testimonials
            </button>
            <Link
              to="/about"
              className="text-gray-600 hover:text-primary-500 transition-colors"
            >
              About
            </Link>
            <Button onClick={() => scrollTo('book-call')} size="lg">
              Get Started
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-600"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden absolute top-20 left-0 right-0 bg-white shadow-lg animate-fade-down">
            <div className="flex flex-col space-y-4 px-4 py-6">
              <Link
                to="/"
                className="text-gray-600 hover:text-primary-500 transition-colors py-2 text-left"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/case-studies"
                className="text-gray-600 hover:text-primary-500 transition-colors py-2 text-left"
                onClick={() => setIsOpen(false)}
              >
                Case Studies
              </Link>
              <button
                onClick={() => scrollTo('testimonials')}
                className="text-gray-600 hover:text-primary-500 transition-colors py-2 text-left w-full"
              >
                Testimonials
              </button>
              <Link
                to="/about"
                className="text-gray-600 hover:text-primary-500 transition-colors py-2 text-left"
                onClick={() => setIsOpen(false)}
              >
                About
              </Link>
              <Button onClick={() => scrollTo('book-call')} className="w-full">
                Get Started
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
