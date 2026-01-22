import { Download } from 'lucide-react';

interface AboutProps {
  theme: 'dark' | 'light';
}

export default function About({ theme }: AboutProps) {
  const handleDownloadCV = () => {
    // Méthode 1: Télécharger depuis le dossier public
    const link = document.createElement('a');
    link.href = '/CV_Julianot_RALAHIJAONINA.pdf'; // Votre CV dans /public
    link.download = 'CV_Julianot_RALAHIJAONINA.pdf'; // Nom du fichier téléchargé
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

        {/* Bouton avec téléchargement */}
        <button 
          onClick={handleDownloadCV}
          className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all hover:scale-105 inline-flex items-center gap-2"
        >
          <Download className="w-5 h-5" />
          Télécharger mon CV
        </button>
      </div>
    </section>
  );
}