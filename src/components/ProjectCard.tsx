interface ProjectCardProps {
  title: string;
  description: string;
  tech: string[];
  image: string;
  theme: 'dark' | 'light';
}

export default function ProjectCard({ title, description, tech, image, theme }: ProjectCardProps) {
  return (
    <div className={`group relative rounded-2xl overflow-hidden hover:transform hover:scale-105 transition-all duration-300 ${
      theme === 'dark' ? 'bg-gray-900' : 'bg-white shadow-xl'
    }`}>
      <div className="aspect-video overflow-hidden">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
      </div>
      <div className="p-6">
        <h3 className="text-2xl font-bold mb-2">{title}</h3>
        <p className={`mb-4 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
          {description}
        </p>
        <div className="flex flex-wrap gap-2">
          {tech.map((t, i) => (
            <span 
              key={i}
              className={`px-3 py-1 rounded-full text-sm ${
                theme === 'dark' 
                  ? 'bg-blue-500/20 text-blue-400' 
                  : 'bg-blue-100 text-blue-700'
              }`}
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}