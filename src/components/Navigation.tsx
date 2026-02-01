import { useState, useEffect } from 'react';
import { Moon, Sun, Menu, X } from 'lucide-react';

interface NavigationProps {
  activeSection: string;
  onNavigate: (section: string) => void;
  theme: 'dark' | 'light';
  onThemeToggle: () => void;
}

export default function Navigation({ activeSection, onNavigate, theme, onThemeToggle }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      setShouldRender(true);
    } else {
      document.body.style.overflow = 'unset';
      // Attendre la fin de l'animation avant de démonter
      const timeout = setTimeout(() => setShouldRender(false), 300);
      return () => clearTimeout(timeout);
    }
  }, [isMobileMenuOpen]);

  const sections = ['accueil', 'projets', 'competences', 'apropos', 'contact'];

  const handleNavClick = (section: string) => {
    onNavigate(section);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? theme === 'dark'
            ? 'bg-gray-950/80 border-b border-gray-800 shadow-lg'
            : 'bg-white/80 border-b border-gray-200 shadow-lg'
          : 'bg-transparent border-b border-transparent'
      } backdrop-blur-sm`}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold bg-purple-600 bg-clip-text text-transparent">
            Julianot
          </div>
          
          <div className="flex items-center gap-4">
            {/* Menu Desktop */}
            <div className="hidden md:flex gap-8">
              {sections.map(section => (
                <button
                  key={section}
                  onClick={() => onNavigate(section)}
                  className={`capitalize transition-colors duration-200 ${
                    activeSection === section 
                      ? 'text-purple-500 font-semibold' 
                      : theme === 'dark' 
                        ? 'text-gray-300 hover:text-white' 
                        : 'text-gray-700 hover:text-gray-900'
                  }`}
                >
                  {section}
                </button>
              ))}
            </div>
            
            {/* Theme Toggle */}
            <button
              onClick={onThemeToggle}
              className={`relative w-14 h-7 rounded-full transition-all duration-300 ${
                theme === 'dark' ? 'bg-purple-600' : 'bg-amber-500'
              } shadow-lg`}
              aria-label="Toggle theme"
            >
              <div className={`absolute top-1 left-1 w-5 h-5 rounded-full bg-white shadow-md transition-transform duration-300 flex items-center justify-center ${
                theme === 'light' ? 'translate-x-7' : 'translate-x-0'
              }`}>
                {theme === 'dark' ? (
                  <Moon className="w-3 h-3 text-indigo-600" />
                ) : (
                  <Sun className="w-3 h-3 text-amber-500" />
                )}
              </div>
            </button>

            {/* Bouton Hamburger */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`md:hidden p-2 rounded-lg transition-colors ${
                theme === 'dark' ? 'hover:bg-white/10' : 'hover:bg-gray-100'
              }`}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Menu Mobile - Rendu conditionnel pour performance */}
      {shouldRender && (
        <div className="fixed inset-0 z-40 md:hidden">
          {/* Backdrop */}
          <div
            className={`absolute inset-0 backdrop-blur-sm transition-opacity duration-200 ease-out ${
              theme === 'dark' ? 'bg-black/80' : 'bg-black/50'
            } ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0'}`}
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Menu Panel */}
          <div
            className={`absolute top-[73px] right-0 bottom-0 w-72 ${
              theme === 'dark' ? 'bg-gray-950' : 'bg-white'
            } shadow-2xl will-change-transform`}
            style={{
              transform: isMobileMenuOpen ? 'translate3d(0, 0, 0)' : 'translate3d(100%, 0, 0)',
              transition: 'transform 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          >
            <nav className="flex flex-col p-8 space-y-2">
              {sections.map((section, index) => (
                <button
                  key={section}
                  onClick={() => handleNavClick(section)}
                  className={`text-left py-4 px-6 rounded-xl capitalize transition-all duration-200 ${
                    activeSection === section
                      ? theme === 'dark'
                        ? 'bg-blue-500/20 text-blue-400 font-semibold'
                        : 'bg-blue-100 text-blue-700 font-semibold'
                      : theme === 'dark'
                        ? 'text-gray-400 hover:bg-white/5 hover:text-white'
                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                  style={{
                    animation: isMobileMenuOpen ? `slideIn 0.25s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.04}s both` : 'none',
                  }}
                >
                  {section}
                </button>
              ))}
            </nav>

            {/* Décoration */}
            <div 
              className={`absolute bottom-8 left-8 right-8 p-4 rounded-xl ${
                theme === 'dark'
                  ? 'bg-gradient-to-r from-blue-500/10 to-purple-600/10 border border-blue-500/20'
                  : 'bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200'
              }`}
              style={{
                animation: isMobileMenuOpen ? 'fadeIn 0.3s cubic-bezier(0.4, 0, 0.2, 1) 0.15s both' : 'none',
              }}
            >
              <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                Développeur Full Stack
              </p>
              <p className={`text-xs mt-1 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>
                Disponible pour de nouveaux projets
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Animations CSS optimisées */}
      <style>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translate3d(20px, 0, 0);
          }
          to {
            opacity: 1;
            transform: translate3d(0, 0, 0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  );
}