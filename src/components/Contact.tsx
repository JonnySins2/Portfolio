import { useState } from 'react';
import { Send } from 'lucide-react';

interface ContactProps {
  theme: 'dark' | 'light';
}

export default function Contact({ theme }: ContactProps) {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    console.log('Formulaire soumis:', formData);
    alert('Message envoyé ! (Fonction de démonstration)');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <section id="contact" className={`py-32 px-6 ${
      theme === 'dark' ? 'bg-gray-900/50' : 'bg-gray-50'
    }`}>
      <div className="max-w-2xl mx-auto">
        <h2 className="text-5xl font-bold mb-16 text-center">Contact</h2>
        <div className="space-y-6">
          <div>
            <input 
              type="text" 
              placeholder="Nom"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className={`w-full px-6 py-4 rounded-xl border transition-colors focus:outline-none ${
                theme === 'dark'
                  ? 'bg-gray-900 border-gray-800 focus:border-blue-500'
                  : 'bg-white border-gray-200 focus:border-blue-500 shadow-sm'
              }`}
            />
          </div>
          <div>
            <input 
              type="email" 
              placeholder="Email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className={`w-full px-6 py-4 rounded-xl border transition-colors focus:outline-none ${
                theme === 'dark'
                  ? 'bg-gray-900 border-gray-800 focus:border-blue-500'
                  : 'bg-white border-gray-200 focus:border-blue-500 shadow-sm'
              }`}
            />
          </div>
          <div>
            <textarea 
              rows={6}
              placeholder="Votre message"
              value={formData.message}
              onChange={(e) => setFormData({...formData, message: e.target.value})}
              className={`w-full px-6 py-4 rounded-xl border transition-colors focus:outline-none resize-none ${
                theme === 'dark'
                  ? 'bg-gray-900 border-gray-800 focus:border-blue-500'
                  : 'bg-white border-gray-200 focus:border-blue-500 shadow-sm'
              }`}
            />
          </div>
          <button 
            onClick={handleSubmit}
            className="w-full px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all flex items-center justify-center gap-2"
          >
            <Send className="w-5 h-5" />
            Envoyer le message
          </button>
        </div>
      </div>
    </section>
  );
}