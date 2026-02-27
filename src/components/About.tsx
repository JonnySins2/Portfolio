import { Download } from 'lucide-react';
import { useRef, useEffect, useState, type JSX } from 'react';

interface AboutProps {
  theme: 'dark' | 'light';
  lang: 'FR' | 'EN';
}

const content = {
  FR: {
    titleLeft: 'À ',
    titleRight: 'Propos',
    paragraphs: [
      `Je m'appelle Julianot RALAHIJAONINA, développeur fullstack passionné avec plus de 3 ans d'expérience dans la conception et le développement d'applications web modernes. Titulaire d'une Licence en Informatique, je poursuis actuellement un Master à l'École Nationale de l'Informatique (E.N.I) Madagascar.`,
      `Je travaille principalement avec des technologies comme React, Next.js, Node.js (NestJS), PHP (Laravel), Java (Spring Boot) et .NET pour le web, ainsi que Kotlin et React Native pour les applications mobiles, en mettant un point d'honneur sur la performance, la maintenabilité du code et l'expérience utilisateur.`,
      `Curieux, rigoureux et orienté solution, j'aime transformer des idées en produits concrets et fiables. Je suis actuellement ouvert à des opportunités professionnelles, collaborations ou projets freelance.`
    ],
    boldKeywords: [
      'Julianot RALAHIJAONINA',
      "3 ans d'expérience",
      'Licence en Informatique',
      "Master à l'École Nationale de l'Informatique (E.N.I) Madagascar",
      'React, Next.js, Node.js (NestJS), PHP (Laravel), Java (Spring Boot) et .NET',
      'Kotlin et React Native',
      'opportunités professionnelles, collaborations ou projets freelance',
    ],
    cvFR: 'CV Français',
    cvEN: 'CV English',
    hint: 'Téléchargez mon CV dans la langue de votre choix',
  },
  EN: {
    titleLeft: 'Ab',
    titleRight: 'out',
    paragraphs: [
      `My name is Julianot RALAHIJAONINA, a passionate fullstack developer with over 3 years of experience designing and building modern web applications. I hold a Bachelor's degree in Computer Science and am currently pursuing a Master's degree at the École Nationale de l'Informatique (E.N.I) Madagascar.`,
      `I primarily work with technologies such as React, Next.js, Node.js (NestJS), PHP (Laravel), Java (Spring Boot) and .NET for the web, as well as Kotlin and React Native for mobile applications, with a strong focus on performance, code maintainability and user experience.`,
      `Curious, detail-oriented and solution-driven, I love turning ideas into concrete, reliable products. I am currently open to professional opportunities, collaborations or freelance projects.`
    ],
    boldKeywords: [
      'Julianot RALAHIJAONINA',
      'over 3 years of experience',
      "Bachelor's degree in Computer Science",
      "Master's degree at the École Nationale de l'Informatique (E.N.I) Madagascar",
      'React, Next.js, Node.js (NestJS), PHP (Laravel), Java (Spring Boot) and .NET',
      'Kotlin and React Native',
      'professional opportunities, collaborations or freelance projects',
    ],
    cvFR: 'CV Français',
    cvEN: 'CV English',
    hint: 'Download my resume in the language of your choice',
  },
};

export default function About({ theme, lang }: AboutProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  const t = content[lang];
  const leftPart = t.titleLeft.split('');
  const rightPart = t.titleRight.split('');

  const handleDownloadCV = (language: 'FR' | 'EN') => {
    const link = document.createElement('a');
    link.href = `/CV_Julianot_RALAHIJAONINA_${language}.pdf`;
    link.download = `CV_Julianot_RALAHIJAONINA_${language}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.7 && rect.bottom > 0) {
          if (!isVisible) setIsVisible(true);
        } else {
          if (isVisible) setIsVisible(false);
        }
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isVisible]);

  const renderParagraph = (text: string) => {
    let parts: (string | JSX.Element)[] = [text];
    t.boldKeywords.forEach((kw, kwIndex) => {
      parts = parts.flatMap((part) => {
        if (typeof part !== 'string') return [part];
        const idx = part.indexOf(kw);
        if (idx === -1) return [part];
        return [
          part.slice(0, idx),
          <strong key={`kw-${kwIndex}`}>{part.slice(idx, idx + kw.length)}</strong>,
          part.slice(idx + kw.length),
        ];
      });
    });
    return parts;
  };

  return (
    <section
      ref={sectionRef}
      id="apropos"
      className="relative min-h-screen flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 py-16 sm:py-20 overflow-hidden"
    >
      {/* Background */}
      <div
        className="absolute inset-0"
        style={{
          background: theme === 'dark' ? 'rgb(0,0,0)' : 'rgb(255,255,255)',
        }}
      />

      <div className="relative z-10 w-full max-w-xs sm:max-w-lg md:max-w-2xl lg:max-w-4xl mx-auto text-center">

        {/* Titre animé */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 sm:mb-8 text-amber-500 flex justify-center">
          <span className="inline-flex">
            {leftPart.map((letter, index) => (
              <span
                key={`left-${index}`}
                className="inline-block"
                style={{
                  animation: isVisible
                    ? `aboutSlideFromLeft 0.5s ease-out forwards ${index * 0.05}s`
                    : 'none',
                  opacity: 0,
                }}
              >
                {letter === ' ' ? '\u00A0' : letter}
              </span>
            ))}
          </span>
          <span className="inline-flex">
            {rightPart.map((letter, index) => (
              <span
                key={`right-${index}`}
                className="inline-block"
                style={{
                  animation: isVisible
                    ? `aboutSlideFromRight 0.5s ease-out forwards ${index * 0.05}s`
                    : 'none',
                  opacity: 0,
                }}
              >
                {letter === ' ' ? '\u00A0' : letter}
              </span>
            ))}
          </span>
        </h2>

        {/* Paragraphes */}
        <div className={`text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed mb-6 sm:mb-8 text-left space-y-4 sm:space-y-5 md:space-y-6 ${
          theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
        }`}>
          {t.paragraphs.map((para, index) => {
            const animations = [
              'paragraphSlideFromLeft',
              'paragraphSlideFromRight',
              'paragraphSlideFromLeft',
            ];
            return (
              <p
                key={index}
                style={{
                  animation: isVisible
                    ? `${animations[index]} 0.5s ease-out forwards ${0.5 + index * 0.2}s`
                    : 'none',
                  opacity: 0,
                }}
              >
                {renderParagraph(para)}
              </p>
            );
          })}
        </div>

        {/* Boutons de téléchargement */}
        <div
          className="flex flex-col xs:flex-row flex-wrap gap-3 sm:gap-4 justify-center items-center"
          style={{
            animation: isVisible ? 'fadeInUp 0.6s ease-out forwards 1.3s' : 'none',
            opacity: 0,
          }}
        >
          <button
            onClick={() => handleDownloadCV('FR')}
            className={`w-full xs:w-auto group px-5 sm:px-8 py-3 sm:py-4 rounded-full font-semibold transition-all hover:scale-105 inline-flex items-center justify-center gap-2 text-sm sm:text-base ${
              theme === 'dark'
                ? 'bg-amber-600 hover:bg-amber-700 text-white'
                : 'bg-amber-600 text-white hover:shadow-lg hover:shadow-purple-500/50'
            }`}
          >
            <Download className="w-4 h-4 sm:w-5 sm:h-5 group-hover:animate-bounce" />
            <span>{t.cvFR}</span>
            <span className="px-2 py-0.5 bg-white/20 rounded text-xs font-bold">FR</span>
          </button>

          <button
            onClick={() => handleDownloadCV('EN')}
            className={`w-full xs:w-auto group px-5 sm:px-8 py-3 sm:py-4 rounded-full font-semibold transition-all hover:scale-105 inline-flex items-center justify-center gap-2 text-sm sm:text-base ${
              theme === 'dark'
                ? 'bg-white/10 hover:bg-white/20'
                : 'bg-gray-100 hover:bg-gray-200 border border-gray-300 hover:border-blue-500'
            }`}
          >
            <Download className="w-4 h-4 sm:w-5 sm:h-5 group-hover:animate-bounce" />
            <span>{t.cvEN}</span>
            <span className="px-2 py-0.5 bg-amber-500/20 text-amber-500 rounded text-xs font-bold">EN</span>
          </button>
        </div>

        <p
          className={`mt-4 sm:mt-6 text-xs sm:text-sm ${
            theme === 'dark' ? 'text-gray-500' : 'text-gray-500'
          }`}
          style={{
            animation: isVisible ? 'fadeInUp 0.6s ease-out forwards 1.5s' : 'none',
            opacity: 0,
          }}
        >
          {t.hint}
        </p>
      </div>

      <style>{`
        @keyframes aboutSlideFromLeft {
          0% { transform: translateX(-200px); opacity: 0; }
          100% { transform: translateX(0); opacity: 1; }
        }
        @keyframes aboutSlideFromRight {
          0% { transform: translateX(200px); opacity: 0; }
          100% { transform: translateX(0); opacity: 1; }
        }
        @keyframes paragraphSlideFromLeft {
          0% { transform: translateX(-60px); opacity: 0; }
          100% { transform: translateX(0); opacity: 1; }
        }
        @keyframes paragraphSlideFromRight {
          0% { transform: translateX(60px); opacity: 0; }
          100% { transform: translateX(0); opacity: 1; }
        }
        @keyframes fadeInUp {
          0% { transform: translateY(20px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
      `}</style>
    </section>
  );
}