import { Github, Linkedin, Mail, ChevronDown } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

interface HeroProps {
  scrollY: number;
  onNavigate: (section: string) => void;
  theme: 'dark' | 'light';
}

export default function Hero({ scrollY, onNavigate, theme }: HeroProps) {
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1024
  );

  const bgRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Parallax fluide sans re-render React
  useEffect(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);

    rafRef.current = requestAnimationFrame(() => {
      if (bgRef.current) {
        bgRef.current.style.transform = `translate3d(0, ${scrollY * 0.5}px, 0) scale(1.1)`;
      }
      if (contentRef.current) {
        contentRef.current.style.transform = `translate3d(0, ${scrollY * 0.2}px, 0)`;
      }
    });

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [scrollY]);

  const getBackgroundPosition = () => {
    if (windowWidth < 650) {
      const offset = Math.max(0, 10 - (650 - windowWidth) * 0.1);
      return `${offset}% 30%`;
    }
    return '10% 30%';
  };

  return (
    <section
      id="accueil"
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
    >
      <div
        ref={bgRef}
        className="absolute inset-0 will-change-transform"
        style={{
          backgroundImage: 'url(/imgHero.jpg)',
          backgroundSize: '130%',
          backgroundPosition: getBackgroundPosition(),
          backgroundRepeat: 'no-repeat',
          minWidth: '430px',
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            theme === 'dark'
              ? 'linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,0.6) 40%, rgba(0,0,0,0) 70%, transparent 100%)'
              : 'linear-gradient(to right, rgba(255,255,255,1) 0%, rgba(255,255,255,0.6) 40%, rgba(255,255,255,0) 70%, transparent 100%)',
        }}
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6">
        <div
          ref={contentRef}
          className="text-left space-y-8 max-w-2xl will-change-transform"
        >
          <div className="space-y-4">
            <div
              className={`inline-block px-4 py-2 rounded-full text-sm font-semibold ${
                theme === 'dark'
                  ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                  : 'bg-blue-100 text-blue-700 border border-blue-200'
              }`}
            >
               Disponible pour de nouveaux projets
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight">
              Développeur
              <span className="block bg-purple-600 to-pink-600 bg-clip-text text-transparent mt-2">
                Full Stack
              </span>
            </h1>
          </div>

          <p
            className={`text-lg md:text-xl max-w-xl ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
            }`}
          >
            Passionné par la création d'expériences web modernes et performantes.
            Je transforme vos idées en solutions digitales élégantes.
          </p>

          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => onNavigate('contact')}
              className="px-8 py-4 bg-purple-600 text-white rounded-full font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all hover:scale-105"
            >
              Me contacter
            </button>

            <button
              onClick={() => onNavigate('projets')}
              className={`px-8 py-4 rounded-full font-semibold transition-all hover:scale-105 ${
                theme === 'dark'
                  ? 'bg-white/5 hover:bg-white/10 border border-gray-700'
                  : 'bg-gray-100 hover:bg-gray-200 border border-gray-300'
              }`}
            >
              Voir mes projets
            </button>
          </div>

          <div className="flex gap-6 pt-4">
            <a
              href="https://github.com/JonnySins2"
              target="_blank"
              rel="noopener noreferrer"
              className={`p-3 rounded-full transition-all hover:scale-110 ${
                theme === 'dark'
                  ? 'bg-white/5 hover:bg-white/10 border border-gray-800'
                  : 'bg-gray-100 hover:bg-gray-200 border border-gray-200'
              }`}
            >
              <Github className="w-6 h-6" />
            </a>

            <a
              href="https://www.linkedin.com/in/julianot-ralahijaonina-ba9262320/"
              target="_blank"
              rel="noopener noreferrer"
              className={`p-3 rounded-full transition-all hover:scale-110 ${
                theme === 'dark'
                  ? 'bg-white/5 hover:bg-white/10 border border-gray-800'
                  : 'bg-gray-100 hover:bg-gray-200 border border-gray-200'
              }`}
            >
              <Linkedin className="w-6 h-6" />
            </a>

            <a
              href="mailto:votre@email.com"
              className={`p-3 rounded-full transition-all hover:scale-110 ${
                theme === 'dark'
                  ? 'bg-white/5 hover:bg-white/10 border border-gray-800'
                  : 'bg-gray-100 hover:bg-gray-200 border border-gray-200'
              }`}
            >
              <Mail className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>

      <button
        onClick={() => onNavigate('projets')}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce"
      >
        <ChevronDown className="w-10 h-10" />
      </button>
    </section>
  );
}