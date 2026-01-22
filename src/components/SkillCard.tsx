interface Skill {
  name: string;
  logo: string;
  color: string;
}

interface SkillCardProps {
  name: string;
  skills: Skill[];
  theme: 'dark' | 'light';
}

export default function SkillCard({ name, skills, theme }: SkillCardProps) {
  return (
    <div className={`rounded-2xl p-6 border transition-all duration-300 hover:scale-105 ${
      theme === 'dark' 
        ? 'bg-gray-900 border-gray-800 hover:border-blue-500 hover:shadow-xl hover:shadow-blue-500/20' 
        : 'bg-white border-gray-200 hover:border-blue-400 shadow-lg hover:shadow-2xl'
    }`}>
      <h3 className="text-xl font-bold mb-6 text-center">{name}</h3>
      <div className="grid grid-cols-3 gap-4">
        {skills.map((skill, i) => (
          <div 
            key={i}
            className={`group relative flex flex-col items-center justify-center p-3 rounded-xl transition-all duration-300 ${
              theme === 'dark'
                ? 'hover:bg-white/5'
                : 'hover:bg-gray-50'
            }`}
          >
            <div className="relative">
              <img 
                src={skill.logo} 
                alt={skill.name}
                className="w-12 h-12 object-contain transition-transform duration-300 group-hover:scale-110"
              />
              {/* Glow effect on hover */}
              <div 
                className="absolute inset-0 rounded-full blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-300"
                style={{ backgroundColor: skill.color }}
              />
            </div>
            
            {/* Tooltip */}
            <div className={`absolute -bottom-8 left-1/2 transform -translate-x-1/2 px-2 py-1 rounded text-xs font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none ${
              theme === 'dark'
                ? 'bg-gray-800 text-white'
                : 'bg-gray-900 text-white'
            }`}>
              {skill.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}