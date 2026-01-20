import { useEffect, useRef } from 'react';
import ProjectCard from './ProjectCard';

interface ProjectsProps {
  theme: 'dark' | 'light';
  scrollY: number;
}

const projectsData = [
  {
    title: "Application E-commerce",
    description: "Plateforme complète avec panier, paiement et gestion des commandes",
    tech: ["React", "Node.js", "MongoDB"],
    image: "https://images.unsplash.com/photo-1557821552-17105176677c?w=800&h=500&fit=crop"
  },
  {
    title: "Dashboard Analytics",
    description: "Interface interactive pour visualiser des données en temps réel",
    tech: ["Vue.js", "D3.js", "Firebase"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop"
  },
  {
    title: "Application Mobile",
    description: "App native cross-platform pour la gestion de tâches",
    tech: ["React Native", "Redux", "API REST"],
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=500&fit=crop"
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

      {/* Overlay gradient pour visibilité du contenu */}
      <div 
        className="absolute inset-0"
        style={{
          background: theme === 'dark'
            ? 'rgba(0, 0, 0, 0.65)'
            : 'rgba(255, 255, 255, 0.6)',
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