import { Code, Palette, Zap } from 'lucide-react';
import SkillCard from './SkillCard';

interface SkillsProps {
  theme: 'dark' | 'light';
}

const skillsData = [
  { 
    name: "Frontend", 
    items: ["React", "Vue.js", "TypeScript", "Tailwind CSS"], 
    icon: Palette,
    iconColor: "text-blue-500"
  },
  { 
    name: "Backend", 
    items: ["Node.js", "Express", "Python", "PostgreSQL"], 
    icon: Code,
    iconColor: "text-purple-500"
  },
  { 
    name: "Outils", 
    items: ["Git", "Docker", "AWS", "Figma"], 
    icon: Zap,
    iconColor: "text-pink-500"
  }
];

export default function Skills({ theme }: SkillsProps) {
  return (
    <section id="competences" className={`py-32 px-6 ${
      theme === 'dark' ? 'bg-gray-900/50' : 'bg-gray-50'
    }`}>
      <div className="max-w-7xl mx-auto">
        <h2 className="text-5xl font-bold mb-16 text-center">Compétences</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {skillsData.map((skill, index) => (
            <SkillCard key={index} {...skill} theme={theme} />
          ))}
        </div>
      </div>
    </section>
  );
}