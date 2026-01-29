import SkillCard from "./SkillCard";
import { useRef, useEffect } from "react";

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

export default function Skills({ theme, scrollY }: SkillsProps) {
  const bgRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);

    rafRef.current = requestAnimationFrame(() => {
      if (bgRef.current && sectionRef.current) {
        const section = sectionRef.current;
        const rect = section.getBoundingClientRect();
        
        // Calculer le parallax seulement quand la section est visible
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          // Position relative : quand la section est au centre de l'écran = 0
          const sectionCenter = rect.top + rect.height / 2;
          const viewportCenter = window.innerHeight / 2;
          const offset = (viewportCenter - sectionCenter) * 0.3;
          
          bgRef.current.style.transform = `translate3d(0, ${offset}px, 0)`;
        }
      }
    });

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [scrollY]);

  return (
    <section 
      ref={sectionRef}
      id="competences" 
      className="relative py-32 px-6 overflow-hidden transition-colors duration-300"
    >
      {/* Background image avec parallax */}
      <div
        ref={bgRef}
        className="absolute will-change-transform"
        style={{
          backgroundImage: 'url(/imgSkills.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat',
          top: '-15%',
          left: 0,
          right: 0,
          height: '130%',
        }}
      />

      {/* Overlay gradient */}
      <div 
        className="absolute inset-0"
        style={{
          background: theme === 'dark'
            ? 'rgba(0, 0, 0, 0.75)'
            : 'rgba(255, 255, 255, 0.85)',
        }}
      />

      {/* Contenu */}
      <div className="relative z-10 max-w-7xl mx-auto">
        <h2 className="text-5xl font-bold mb-4 text-center">Mes Compétences</h2>
        <p className={`text-center mb-16 text-lg ${
          theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
        }`}>
          Technologies et outils que je maîtrise
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {skillsData.map((category, index) => (
            <SkillCard key={index} {...category} theme={theme} />
          ))}
        </div>
      </div>
    </section>
  );
}