import { Button } from "./ui/button"
import { PhoneCall } from "lucide-react"
import { useState, useEffect } from "react"

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 w-full z-40 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md" : "bg-white/5 backdrop-blur-sm border-b border-white/10"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo - Show on all screens but with different sizes */}
          <div className="flex flex-col items-start">
            <img 
              src="/Assets/id98Oz8z3__logos.svg" 
              alt="Godrej Logo" 
              className="h-8 md:h-12 w-auto"
            />
            <p className="mt-1 font-bold italic" style={{
              fontSize: '4px',
              background: 'linear-gradient(135deg, #5FB233 0%, #4187CE 50%, #BD1362 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>Authorized Marketing Partner</p>
          </div>

          <div className="flex items-center space-x-8">
            {/* Mobile menu button */}
            <button 
              className="md:hidden text-gray-700 hover:text-primary"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
              )}
            </button>
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-6">
              <a 
                href="/#floor-plan" 
                className={`text-sm font-medium transition-colors ${
                  isScrolled ? "text-gray-700 hover:text-primary" : "text-white hover:text-primary"
                }`}
              >
                Floor Plans
              </a>
              <a 
                href="/#location-advantages" 
                className={`text-sm font-medium transition-colors ${
                  isScrolled ? "text-gray-700 hover:text-primary" : "text-white hover:text-primary"
                }`}
              >
                Location
              </a>
              <a 
                href="#godrej-amenities" 
                className={`text-sm font-medium transition-colors ${
                  isScrolled ? "text-gray-700 hover:text-primary" : "text-white hover:text-primary"
                }`}
              >
                Amenities
              </a>

              {/* Phone Button - Desktop Only */}
              <Button 
                variant="default" 
                className={`${
                  isScrolled ? "bg-primary text-black hover:bg-black hover:text-white" : "bg-white text-black hover:bg-black hover:text-white"
                }`}
                onClick={() => window.location.href = "tel:+918861113311"}
              >
                <PhoneCall className="mr-2 h-4 w-4" />
                +91 8861113311
              </Button>
            </div>

            {/* Mobile Menu */}
            <div className={`
              fixed md:hidden top-20 left-0 right-0 bg-white/95 backdrop-blur-sm
              transition-all duration-300 shadow-lg border-b border-gray-200
              ${mobileMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-2 opacity-0 pointer-events-none'}
            `}>
              <div className="container mx-auto px-4 py-6 flex flex-col space-y-6">
                {/* Navigation Links */}
                <div className="flex flex-col space-y-4">
                  <a 
                    href="/#floor-plan" 
                    className="text-base font-medium text-gray-700 hover:text-primary"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Floor Plans
                  </a>
                  <a 
                    href="/#location-advantages" 
                    className="text-base font-medium text-gray-700 hover:text-primary"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Location
                  </a>
                  <a 
                    href="#godrej-amenities" 
                    className="text-base font-medium text-gray-700 hover:text-primary"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Amenities
                  </a>
                </div>

                {/* Contact Button in Mobile Menu */}
                <div className="pt-2 border-t border-gray-200">
                  <Button 
                    variant="default" 
                    className="w-full bg-primary text-black hover:bg-black hover:text-white"
                    onClick={() => window.location.href = "tel:+918861113311"}
                  >
                    <PhoneCall className="mr-2 h-4 w-4" />
                    +91 8861113311
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
