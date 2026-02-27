import SkillCard from "./SkillCard";
import { useRef, useEffect, useState } from "react";

interface SkillsProps {
  scrollY: number;
  theme: 'dark' | 'light';
}

const skillsData = [
  { 
    name: "Languages", 
    skills: [
      { name: "C#", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg", color: "#239120" },
      { name: "JavaScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg", color: "#F7DF1E" },
      { name: "TypeScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg", color: "#3178C6" },
      { name: "Kotlin", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg", color: "#7F52FF" },
      { name: "Java", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg", color: "#007396" },
      { name: "PHP", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg", color: "#777BB4" }
    ]
  },
  { 
    name: "Frameworks", 
    skills: [
      { name: "React", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", color: "#61DAFB" },
      { name: "Next.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg", color: "#000000" },
      { name: "NestJS", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nestjs/nestjs-original.svg", color: "#E0234E" },
      { name: "Spring Boot", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg", color: "#6DB33F" },
      { name: "Laravel", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg", color: "#FF2D20" }
    ]
  },
  { 
    name: "SGBD", 
    skills: [
      { name: "MongoDB", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg", color: "#47A248" },
      { name: "MySQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg", color: "#4479A1" },
      { name: "PostgreSQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg", color: "#336791" }
    ]
  },  
  { 
    name: "Outils", 
    skills: [
      { name: "Git", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg", color: "#F05032" },
      { name: "Figma", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg", color: "#F24E1E" },
      { name: "Tailwind", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg", color: "#06B6D4" },
      { name: "Maven", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/maven/maven-original.svg", color: "#C71A36" },
      { name: "Gradle", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/gradle/gradle-original.svg", color: "#02303A" }
    ]
  }
];

export default function Skills({ theme }: SkillsProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [animationPlayed, setAnimationPlayed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        
        if (rect.top < window.innerHeight * 0.7 && rect.bottom > 0) {
          if (!isVisible) {
            setIsVisible(true);
            setTimeout(() => setAnimationPlayed(true), 1100);
          }
        } else {
          if (isVisible) {
            setIsVisible(false);
            setAnimationPlayed(false);
          }
        }
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isVisible]);

  const title = "Mes Compétences";
  const leftPart = title.slice(0, 4).split('');
  const rightPart = title.slice(4).split('');   

  return (
    <section 
      ref={sectionRef}
      id="competences" 
      className="relative min-h-screen flex flex-col justify-center items-center px-4 sm:px-6 py-16 sm:py-20 overflow-hidden"
    >
      {/* Background solid */}
      <div 
        className="absolute inset-0"
        style={{
          background: theme === 'dark'
            ? 'rgb(0, 0, 0)'
            : 'rgb(255, 255, 255)',
        }}
      />

      {/* Contenu */}
      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col items-center">
        {/* Titre animé */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl text-amber-500 font-bold mb-8 sm:mb-12 md:mb-16 text-center flex justify-center">
          <span className="inline-flex">
            {leftPart.map((letter, index) => (
              <span
                key={`left-${index}`}
                className="inline-block"
                style={{
                  animation: isVisible ? `slideFromLeftLetter 0.5s ease-out forwards ${index * 0.05}s` : 'none',
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
                  animation: isVisible ? `slideFromRightLetter 0.5s ease-out forwards ${index * 0.05}s` : 'none',
                  opacity: 0,
                }}
              >
                {letter === ' ' ? '\u00A0' : letter}
              </span>
            ))}
          </span>
        </h2>

        {/* Grille des compétences */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 w-full max-w-6xl">
          {skillsData.map((category, index) => {
            const isLeftSide = index < 2; 
            const animationName = animationPlayed 
              ? 'floating' 
              : isLeftSide
                ? 'slideInFromLeftCard' 
                : 'slideInFromRightCard';
            
            return (
              <div
                key={index}
                className="w-full"
                style={{
                  animation: isVisible 
                    ? animationPlayed
                      ? `${animationName} 3s ease-in-out infinite`
                      : `${animationName} 0.6s ease-out forwards ${0.2 + (isLeftSide ? index : index - 2) * 0.15}s`
                    : 'none',
                  opacity: isVisible && !animationPlayed ? 0 : 1,
                  animationDelay: animationPlayed ? `${index * 0.6}s` : undefined,
                }}
              >
                <SkillCard {...category} theme={theme} />
              </div>
            );
          })}
        </div>
      </div>

      {/* Animations CSS */}
      <style>{`
        @keyframes slideFromLeftLetter {
          0% {
            transform: translateX(-200px);
            opacity: 0;
          }
          100% {
            transform: translateX(0);
            opacity: 1;
          }
        }

        @keyframes slideFromRightLetter {
          0% {
            transform: translateX(200px);
            opacity: 0;
          }
          100% {
            transform: translateX(0);
            opacity: 1;
          }
        }

        @keyframes slideInFromLeftCard {
          0% {
            transform: translateX(-100px);
            opacity: 0;
          }
          100% {
            transform: translateX(0);
            opacity: 1;
          }
        }

        @keyframes slideInFromRightCard {
          0% {
            transform: translateX(100px);
            opacity: 0;
          }
          100% {
            transform: translateX(0);
            opacity: 1;
          }
        }

        @keyframes floating {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
      `}</style>
    </section>
  );
}