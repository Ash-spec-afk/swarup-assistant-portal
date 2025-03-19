import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Menu, X, LogIn, UserPlus, LogOut } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);



  useEffect(() => {
    // Check if user is logged in by calling the API
    fetch("http://localhost:8080/api/isLoggedIn", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: "heyo" }),
      credentials: "include", // Ensure cookies are sent and received
    })
      .then((response) => {
        if (response.ok) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      })
      .catch(() => {
        setIsLoggedIn(false); // Handle error case
      });
  }, []);

  const handleLogout = () => {
    fetch("http://localhost:8080/api/logout", {
      method: "POST",
      credentials: "include", // Ensure cookies are sent and received
    })
      .then((response) => {
        if (response.ok) {
          setIsLoggedIn(false);
          navigate('/');
        }
      })
      .catch((err) => {
        console.error("Logout failed", err);
      });
  };

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 lg:px-12", 
        isScrolled ? "py-3 bg-white/90 backdrop-blur-md shadow-sm" : "py-5 bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img 
            src="/lovable-uploads/50e23182-7dd1-4051-95cf-d2b13a63ccad.png" 
            alt="Swarup Logo" 
            className="h-10 w-auto" 
          />
          <span className="font-display text-xl font-medium text-medical-900">Swarup</span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <Link 
            to="/#features" 
            className={cn(
              "nav-item text-sm font-medium text-gray-600 hover:text-medical-600",
              location.pathname === "/" && location.hash === "#features" && "text-medical-600"
            )}
          >
            Features
          </Link>
          <Link 
            to="/#how-it-works" 
            className={cn(
              "nav-item text-sm font-medium text-gray-600 hover:text-medical-600",
              location.pathname === "/" && location.hash === "#how-it-works" && "text-medical-600"
            )}
          >
            How It Works
          </Link>
          <Link 
            to="/#testimonials" 
            className={cn(
              "nav-item text-sm font-medium text-gray-600 hover:text-medical-600",
              location.pathname === "/" && location.hash === "#testimonials" && "text-medical-600"
            )}
          >
            Testimonials
          </Link>
          <Link 
            to="/#contact" 
            className={cn(
              "nav-item text-sm font-medium text-gray-600 hover:text-medical-600",
              location.pathname === "/" && location.hash === "#contact" && "text-medical-600"
            )}
          >
            Contact
          </Link>
          <Link 
            to="/chatbot" 
            className={cn(
              "nav-item text-sm font-medium text-gray-600 hover:text-medical-600",
              location.pathname === "/chatbot" && "text-medical-600"
            )}
          >
            Chatbot
          </Link>
          <Link 
            to="/privacy-policy" 
            className={cn(
              "nav-item text-sm font-medium text-gray-600 hover:text-medical-600",
              location.pathname === "/privacy-policy" && "text-medical-600"
            )}
          >
            Privacy
          </Link>
        </nav>
        
        <div className="hidden md:flex items-center gap-4">
          { isLoggedIn ? (
            <Button variant="outline" className="rounded-full px-5" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          ) : (
              <><Link to="/login">
                <Button variant="outline" className="rounded-full px-5">
                  <LogIn className="mr-2 h-4 w-4"/>
                  Login
                </Button>
              </Link><Link to="/signup">
                <Button className="bg-medical-600 hover:bg-medical-700 text-white rounded-full px-5">
                  <UserPlus className="mr-2 h-4 w-4"/>
                  Sign Up
                </Button>
              </Link></>
          )}
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
            <Link 
              to="/#features" 
              className="text-gray-600 hover:text-medical-600 py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Features
            </Link>
            <Link 
              to="/#how-it-works" 
              className="text-gray-600 hover:text-medical-600 py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              How It Works
            </Link>
            <Link 
              to="/#testimonials" 
              className="text-gray-600 hover:text-medical-600 py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Testimonials
            </Link>
            <Link 
              to="/#contact" 
              className="text-gray-600 hover:text-medical-600 py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contact
            </Link>
            <Link 
              to="/chatbot" 
              className="text-gray-600 hover:text-medical-600 py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Chatbot
            </Link>
            <Link 
              to="/privacy-policy" 
              className="text-gray-600 hover:text-medical-600 py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Privacy Policy
            </Link>
          </nav>
          <div className="flex flex-col gap-3">
            <Link to="/login" className="w-full">
              <Button variant="outline" className="w-full justify-center rounded-full">
                <LogIn className="mr-2 h-4 w-4" />
                Login
              </Button>
            </Link>
            <Link to="/signup" className="w-full">
              <Button className="w-full justify-center bg-medical-600 hover:bg-medical-700 text-white rounded-full">
                <UserPlus className="mr-2 h-4 w-4" />
                Sign Up
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
