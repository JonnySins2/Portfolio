import { useState, useEffect, useRef } from 'react';
import { Moon, Sun, Menu, X, ChevronDown } from 'lucide-react';

interface NavigationProps {
  activeSection: string;
  onNavigate: (section: string) => void;
  theme: 'dark' | 'light';
  onThemeToggle: () => void;
  lang: 'FR' | 'EN';
  onLangChange: (lang: 'FR' | 'EN') => void;
}

const translations = {
  FR: {
    accueil: 'accueil',
    projets: 'projets',
    competences: 'compétences',
    apropos: 'à propos',
    contact: 'contact',
    role: 'Développeur Full Stack',
    availability: 'Disponible pour de nouveaux projets',
  },
  EN: {
    accueil: 'home',
    projets: 'projects',
    competences: 'skills',
    apropos: 'about',
    contact: 'contact',
    role: 'Full Stack Developer',
    availability: 'Available for new projects',
  },
};

export default function Navigation({ activeSection, onNavigate, theme, onThemeToggle, lang, onLangChange }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);
  const [displayedText, setDisplayedText] = useState('');
  const [isLangOpen, setIsLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);
  const fullText = 'Julianot.';

  const t = translations[lang];

  // Effet typing
  useEffect(() => {
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setDisplayedText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
      }
    }, 100); // Vitesse : 150ms entre chaque lettre

    return () => clearInterval(typingInterval);
  }, []);

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
      const timeout = setTimeout(() => setShouldRender(false), 300);
      return () => clearTimeout(timeout);
    }
  }, [isMobileMenuOpen]);

  // Fermer le dropdown langue si clic en dehors
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setIsLangOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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
            ? 'bg-gray-950/70 shadow-lg'
            : 'bg-white/50 shadow-[0_10px_30px_rgba(255,255,255,0.2)]'
          : theme === 'dark' 
            ? 'bg-gray-800/25 shadow-[0_10px_50px_rgba(0,0,0,0.3)]'
            : 'bg-white/15  shadow-[0_10px_30px_rgba(255,255,255,0.2)]'
      } backdrop-blur-sm`}
            style={{
              animation: 'fadeInDown 1s ease-out',
            }}
      >
        <div style={{ maxWidth: '1600px' }} className="mx-auto px-6 py-4 flex justify-between items-center">
          <div style={{ fontFamily: "Space Grotesk" }} className={`text-2xl font-bold 
          ${theme === 'dark' 
            ? 'bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-600 bg-clip-text text-transparent' 
            : 'bg-gradient-to-r from-yellow-600 via-amber-500 to-yellow-500 bg-clip-text text-transparent'} 
           `}>
            {displayedText}
            <span className="animate-pulse">|</span>
          </div>
          
          <div className="flex items-center gap-4">
            {/* Menu Desktop */}
            <div style={{fontFamily: "Space Grotesk"}} className="hidden md:flex gap-8">
              {sections.map(section => (
                <button
                  key={section}
                  onClick={() => onNavigate(section)}
                  className={`capitalize transition-colors duration-200 ${
                    activeSection === section 
                      ? theme === 'dark' 
                        ? 'text-amber-400 font-semibold' 
                        : 'text-amber-500 font-semibold'
                      : theme === 'dark' 
                        ? 'text-white hover:text-amber-200' 
                        : 'text-black hover:text-amber-700'
                  }`}
                >
                  {t[section as keyof typeof t]}
                </button>
              ))}
            </div>
            
            {/* Theme Toggle */}
            <button
              onClick={onThemeToggle}
              className={`relative w-14 h-7 rounded-full transition-all duration-300 
                ${theme === 'dark' ? 'bg-amber-500' : 'bg-amber-200'} shadow-sm`}
              aria-label="Toggle theme"
            >
              <div className={`absolute top-1 left-1 w-5 h-5 rounded-full bg-white shadow-md transition-transform duration-300 flex items-center justify-center ${
                theme === 'light' ? 'translate-x-7' : 'translate-x-0'
              }`}>
                {theme === 'dark' ? (
                  <Moon className="w-3 h-3 text-indigo-600" />
                ) : (
                  <Sun className="w-3 h-3 text-indigo-600" />
                )}
              </div>
            </button>

            {/* Language Dropdown */}
            <div ref={langRef} className="relative">
              <button
                onClick={() => setIsLangOpen(prev => !prev)}
                style={{ fontFamily: 'Space Grotesk' }}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
                  theme === 'dark'
                    ? 'text-white hover:bg-white/10'
                    : 'text-black hover:bg-black/5'
                }`}
              >
                {lang}
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isLangOpen ? 'rotate-180' : ''}`} />
              </button>

              {isLangOpen && (
                <div
                  className={`absolute right-0 mt-2 w-24 rounded-xl overflow-hidden shadow-xl border ${
                    theme === 'dark'
                      ? 'bg-gray-900 border-white/10'
                      : 'bg-white border-black/10'
                  }`}
                  style={{ animation: 'fadeIn 0.15s ease-out' }}
                >
                  {(['FR', 'EN'] as const).map(l => (
                    <button
                      key={l}
                      onClick={() => { onLangChange(l); setIsLangOpen(false); }}
                      style={{ fontFamily: 'Space Grotesk' }}
                      className={`w-full text-left px-4 py-2.5 text-sm font-semibold transition-colors duration-150 ${
                        lang === l
                          ? theme === 'dark'
                            ? 'text-amber-400 bg-amber-500/10'
                            : 'text-amber-600 bg-amber-50'
                          : theme === 'dark'
                            ? 'text-gray-300 hover:bg-white/5 hover:text-white'
                            : 'text-gray-600 hover:bg-gray-50 hover:text-black'
                      }`}
                    >
                      {l === 'FR' ? 'FR' : 'EN'}
                    </button>
                  ))}
                </div>
              )}
            </div>

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

      {/* Menu Mobile */}
      {shouldRender && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div
            className={`absolute inset-0 backdrop-blur-sm transition-opacity duration-200 ease-out ${
              theme === 'dark' ? 'bg-black/80' : 'bg-black/50'
            } ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0'}`}
            onClick={() => setIsMobileMenuOpen(false)}
          />

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
                        ? 'bg-amber-500/20 text-amber-400 font-semibold'
                        : 'bg-amber-100 text-amber-700 font-semibold'
                      : theme === 'dark'
                        ? 'text-gray-400 hover:bg-white/5 hover:text-white'
                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                  style={{
                    animation: isMobileMenuOpen ? `slideIn 0.25s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.04}s both` : 'none',
                  }}
                >
                  {t[section as keyof typeof t]}
                </button>
              ))}
            </nav>

            <div 
              className={`absolute bottom-8 left-8 right-8 p-4 rounded-xl ${
                theme === 'dark'
                  ? 'bg-gradient-to-r from-amber-500/10 to-yellow-600/10 border border-amber-500/20'
                  : 'bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200'
              }`}
              style={{
                animation: isMobileMenuOpen ? 'fadeIn 0.3s cubic-bezier(0.4, 0, 0.2, 1) 0.15s both' : 'none',
              }}
            >
              <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                {t.role}
              </p>
              <p className={`text-xs mt-1 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>
                {t.availability}
              </p>
            </div>
          </div>
        </div>
      )}

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

          @keyframes fadeInDown {
            0% {
              transform: translateY(-100%);
              opacity: 0;
            }
            60% {
              transform: translateY(10%);
              opacity: 1;
            }
            80% {
              transform: translateY(-5%);
            } 
            100% {
              transform: translateY(0);
            }
          }
      `}</style>
    </>
  );
}