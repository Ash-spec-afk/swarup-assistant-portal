
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 lg:px-12", 
        isScrolled ? "py-3 bg-white/90 backdrop-blur-md shadow-sm" : "py-5 bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <a href="#" className="flex items-center gap-2">
          <img 
            src="/lovable-uploads/50e23182-7dd1-4051-95cf-d2b13a63ccad.png" 
            alt="Swarup Logo" 
            className="h-10 w-auto" 
          />
          <span className="font-display text-xl font-medium text-medical-900">Swarup</span>
        </a>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <a href="#features" className="nav-item text-sm font-medium text-gray-600 hover:text-medical-600">Features</a>
          <a href="#how-it-works" className="nav-item text-sm font-medium text-gray-600 hover:text-medical-600">How It Works</a>
          <a href="#testimonials" className="nav-item text-sm font-medium text-gray-600 hover:text-medical-600">Testimonials</a>
          <a href="#contact" className="nav-item text-sm font-medium text-gray-600 hover:text-medical-600">Contact</a>
        </nav>
        
        <div className="hidden md:flex items-center gap-4">
          <Button variant="outline" className="rounded-full px-5">Login</Button>
          <Button className="bg-medical-600 hover:bg-medical-700 text-white rounded-full px-5">Get Started</Button>
        </div>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-gray-700"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg py-4 px-6 animate-fade-in">
          <nav className="flex flex-col gap-4 mb-6">
            <a 
              href="#features" 
              className="text-gray-600 hover:text-medical-600 py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Features
            </a>
            <a 
              href="#how-it-works" 
              className="text-gray-600 hover:text-medical-600 py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              How It Works
            </a>
            <a 
              href="#testimonials" 
              className="text-gray-600 hover:text-medical-600 py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Testimonials
            </a>
            <a 
              href="#contact" 
              className="text-gray-600 hover:text-medical-600 py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contact
            </a>
          </nav>
          <div className="flex flex-col gap-3">
            <Button variant="outline" className="w-full justify-center rounded-full">Login</Button>
            <Button className="w-full justify-center bg-medical-600 hover:bg-medical-700 text-white rounded-full">
              Get Started
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
