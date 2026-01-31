import { Download } from 'lucide-react';

interface AboutProps {
  theme: 'dark' | 'light';
}

export default function About({ theme }: AboutProps) {
  const handleDownloadCV = (language: 'FR' | 'EN') => {
    const link = document.createElement('a');
    link.href = `/CV_Julianot_RALAHIJAONINA_${language}.pdf`;
    link.download = `CV_Julianot_RALAHIJAONINA_${language}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="apropos" className="py-32 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-5xl font-bold mb-8">À Propos</h2>
        <p className={`text-xl leading-relaxed mb-8 ${
          theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
        }`}>
          Je m'appelle <strong>Julianot RALAHIJAONINA</strong>, développeur fullstack passionné avec plus de
          <strong> 3 ans d'expérience</strong> dans la conception et le développement d'applications web modernes.
          Titulaire d'une <strong>Licence en Informatique</strong>, je poursuis actuellement un
          <strong> Master à l'École Nationale de l'Informatique (E.N.I) Madagascar</strong>.
          <br /><br />
          Je travaille principalement avec des technologies comme
          <strong> React, Next.js, Node.js (NestJS), PHP (Laravel), Java (Spring Boot) et .NET</strong> pour le web,
          ainsi que <strong>Kotlin et React Native</strong> pour les applications mobiles,
          en mettant un point d'honneur sur la performance, la maintenabilité du code et l'expérience utilisateur.
          <br /><br />
          Curieux, rigoureux et orienté solution, j'aime transformer des idées en produits concrets et fiables.
          Je suis actuellement ouvert à des
          <strong> opportunités professionnelles, collaborations ou projets freelance</strong>.
        </p>

        {/* Boutons de téléchargement */}
        <div className="flex flex-wrap gap-4 justify-center">
          {/* CV Français */}
          <button 
            onClick={() => handleDownloadCV('FR')}
            className={`group px-8 py-4 rounded-full font-semibold transition-all hover:scale-105 inline-flex items-center gap-2 ${
              theme === 'dark'
                ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:shadow-lg hover:shadow-purple-500/50'
                : 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:shadow-lg hover:shadow-purple-500/50'
            }`}
          >
            <Download className="w-5 h-5 group-hover:animate-bounce" />
            <span>CV Français</span>
            <span className="px-2 py-0.5 bg-white/20 rounded text-xs font-bold">FR</span>
          </button>

          {/* CV Anglais */}
          <button 
            onClick={() => handleDownloadCV('EN')}
            className={`group px-8 py-4 rounded-full font-semibold transition-all hover:scale-105 inline-flex items-center gap-2 ${
              theme === 'dark'
                ? 'bg-white/10 hover:bg-white/20 border border-gray-700 hover:border-blue-500'
                : 'bg-gray-100 hover:bg-gray-200 border border-gray-300 hover:border-blue-500'
            }`}
          >
            <Download className="w-5 h-5 group-hover:animate-bounce" />
            <span>CV English</span>
            <span className="px-2 py-0.5 bg-blue-500/20 text-blue-500 rounded text-xs font-bold">EN</span>
          </button>
        </div>

        {/* Info supplémentaire */}
        <p className={`mt-6 text-sm ${
          theme === 'dark' ? 'text-gray-500' : 'text-gray-500'
        }`}>
          Téléchargez mon CV dans la langue de votre choix
        </p>
      </div>
    </section>
  );
}