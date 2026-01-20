import { type LucideIcon } from 'lucide-react';

interface SkillCardProps {
  name: string;
  items: string[];
  icon: LucideIcon;
  iconColor: string;
  theme: 'dark' | 'light';
}

export default function SkillCard({ name, items, icon: Icon, iconColor, theme }: SkillCardProps) {
  return (
    <div className={`rounded-2xl p-8 border transition-colors ${
      theme === 'dark' 
        ? 'bg-gray-900 border-gray-800 hover:border-blue-500' 
        : 'bg-white border-gray-200 hover:border-blue-400 shadow-xl'
    }`}>
      <div className="flex items-center gap-4 mb-6">
        <Icon className={`w-8 h-8 ${iconColor}`} />
        <h3 className="text-2xl font-bold">{name}</h3>
      </div>
      <ul className="space-y-3">
        {items.map((skill, i) => (
          <li key={i} className={`flex items-center gap-2 ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}>
            <span className={`w-2 h-2 rounded-full ${
              theme === 'dark' ? 'bg-blue-400' : 'bg-blue-600'
            }`}></span>
            {skill}
          </li>
        ))}
      </ul>
    </div>
  );
}