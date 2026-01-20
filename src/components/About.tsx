interface AboutProps {
  theme: 'dark' | 'light';
}

export default function About({ theme }: AboutProps) {
  return (
    <section id="apropos" className="py-32 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-5xl font-bold mb-8">À Propos</h2>
        <p className={`text-xl leading-relaxed mb-8 ${
          theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
        }`}>
          Développeur passionné avec plus de 3 ans d'expérience dans la création 
          d'applications web modernes. Je transforme des idées en solutions digitales 
          performantes et élégantes. Mon approche combine créativité et rigueur technique 
          pour livrer des produits qui dépassent les attentes.
        </p>
        <button className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all">
          Télécharger mon CV
        </button>
      </div>
    </section>
  );
}