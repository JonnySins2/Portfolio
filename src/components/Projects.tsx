import { useEffect, useRef } from 'react';
import ProjectCard from './ProjectCard';

interface ProjectsProps {
  theme: 'dark' | 'light';
  scrollY: number;
}

const projectsData = [
  {
    title: "Plateforme du ministère",
    description: "Plateforme pour gérer les demandes de congés et permissions de tout les personnels du Ministere de la jeunesse et des sports",
    tech: ["ReactJS", "Laravel", "MySQL"],
    image: "captureRH.png"
  },
  {
    title: "Site FPTSD",
    description: "Conception d’un site vitrine pour l’Université FPTSD Madagascar, accompagné d’un back-office dédié à la gestion des contenus.",
    tech: ["Figma","ReactJS", "NestJS", "PostgreSQL"],
    image: "captureFPTSD.png"
  },
  {
    title: "iKandra",
    description: "Une plateforme pour pour freelancers et clients à Madagascar",
    tech: ["ReactJS", "Spring boot", "PostgreSQL"],
    image: "captureIkandra.png"
  },
  {
    title: "Site d'inscription universitaire",
    description: "Un site web pour faire l'inscription en ligne pour les étudiants pour la Faculté de Sciences Fianarantsoa",
    tech: ["ReactJS", "ASP.NET Core", "Mongo DB"],
    image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&h=500&fit=crop"
  },
  {
    title: "Mi-ZARA",
    description: "une application mobile pour repartir les factures JIRAMA de mon appartement entre mes colocataires",
    tech: ["Kotlin", "Gradle", "XML"],
    image: "imgCardMiZARA.png"
  }
  

];

export default function Projects({ theme, scrollY }: ProjectsProps) {
  const bgRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const rafRef = useRef<number | null>(null);

  // Parallax fluide avec calcul relatif à la section
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
      id="projets" 
      className="relative py-32 px-6 overflow-hidden"
    >
      {/* Background image avec parallax - Agrandi pour couvrir même avec déplacement */}
      <div
        ref={bgRef}
        className="absolute will-change-transform"
        style={{
          backgroundImage: 'url(/imgProjects.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat',
          // Agrandir la zone pour compenser le parallax
          top: '-15%',
          left: 0,
          right: 0,
          height: '130%',
        }}
      />

      <div 
        className="absolute inset-0"
        style={{
          background: theme === 'dark'
            ? 'rgba(0, 0, 0, 0.5)'
            : 'rgba(255, 255, 255, 0.5)',
        }}
      />

      {/* Contenu */}
      <div className="relative z-10 max-w-7xl mx-auto">
        <h2 className="text-5xl font-bold mb-16 text-center">Mes Projets</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projectsData.map((project, index) => (
            <ProjectCard key={index} {...project} theme={theme} />
          ))}
        </div>
      </div>
    </section>
  );
}