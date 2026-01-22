import { useState } from 'react';
import { Send, CheckCircle, AlertCircle, X } from 'lucide-react';

interface ContactProps {
  theme: 'dark' | 'light';
}

export default function Contact({ theme }: ContactProps) {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();
    
    // Validation simple
    if (!formData.name || !formData.email || !formData.message) {
      alert('Veuillez remplir tous les champs');
      return;
    }

    setStatus('loading');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          access_key: 'd41b2005-bd72-4317-aa91-43c11606f6f2',
          name: formData.name,
          email: formData.email,
          message: formData.message,
          subject: `Nouveau message de ${formData.name} depuis votre portfolio`,
          from_name: 'Portfolio Contact Form',
        }),
      });

      const result = await response.json();

      if (result.success) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error('Erreur lors de l\'envoi:', error);
      setStatus('error');
    }

    // Réinitialiser le statut après 5 secondes
    setTimeout(() => setStatus('idle'), 5000);
  };

  const closeNotification = () => {
    setStatus('idle');
  };

  return (
    <section id="contact" className={`py-32 px-6 transition-colors duration-300 ${
      theme === 'dark' ? 'bg-gray-900/50' : 'bg-gray-50'
    }`}>
      <div className="max-w-2xl mx-auto">
        <h2 className="text-5xl font-bold mb-4 text-center">Contact</h2>
        <p className={`text-center mb-12 text-lg ${
          theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
        }`}>
          Une question ? Un projet ? N'hésitez pas à me contacter !
        </p>

        {/* Notification de succès avec animation */}
        {status === 'success' && (
          <div className="mb-6 relative overflow-hidden">
            <div className={`p-5 rounded-2xl flex items-start gap-4 ${
              theme === 'dark'
                ? 'bg-gradient-to-r from-green-500/20 to-emerald-500/20 border-2 border-green-500/30'
                : 'bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200'
            }`}
            style={{
              animation: 'slideInDown 0.5s cubic-bezier(0.34, 1.56, 0.64, 1), pulse 2s ease-in-out infinite'
            }}>
              {/* Icône animée */}
              <div className="flex-shrink-0">
                <div className="relative">
                  <CheckCircle className="w-7 h-7 text-green-500" 
                    style={{ animation: 'scaleIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) 0.3s both' }} 
                  />
                  {/* Cercles de propagation */}
                  <div className="absolute inset-0 rounded-full bg-green-500/30"
                    style={{ animation: 'ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite' }}
                  />
                </div>
              </div>
              
              {/* Texte */}
              <div className="flex-1">
                <h3 className="text-green-600 font-bold text-lg mb-1"
                  style={{ animation: 'slideInRight 0.5s ease-out 0.2s both' }}>
                  Message envoyé avec succès ! 🎉
                </h3>
                <p className="text-green-600/80 text-sm"
                  style={{ animation: 'slideInRight 0.5s ease-out 0.3s both' }}>
                  Je vous répondrai dans les plus brefs délais.
                </p>
              </div>

              {/* Bouton fermer */}
              <button 
                onClick={closeNotification}
                className="flex-shrink-0 text-green-600 hover:text-green-700 transition-colors p-1 rounded-lg hover:bg-green-500/10"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Barre de progression */}
              <div className="absolute bottom-0 left-0 h-1 bg-green-500 rounded-full"
                style={{ animation: 'progressBar 5s linear' }}
              />
            </div>
          </div>
        )}

        {/* Notification d'erreur avec animation */}
        {status === 'error' && (
          <div className="mb-6 relative overflow-hidden">
            <div className={`p-5 rounded-2xl flex items-start gap-4 ${
              theme === 'dark'
                ? 'bg-gradient-to-r from-red-500/20 to-rose-500/20 border-2 border-red-500/30'
                : 'bg-gradient-to-r from-red-50 to-rose-50 border-2 border-red-200'
            }`}
            style={{
              animation: 'shake 0.5s ease-in-out, slideInDown 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)'
            }}>
              {/* Icône animée */}
              <div className="flex-shrink-0">
                <div className="relative">
                  <AlertCircle className="w-7 h-7 text-red-500" 
                    style={{ animation: 'scaleIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) 0.3s both, wobble 1s ease-in-out infinite' }} 
                  />
                  {/* Cercles de propagation */}
                  <div className="absolute inset-0 rounded-full bg-red-500/30"
                    style={{ animation: 'ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite' }}
                  />
                </div>
              </div>
              
              {/* Texte */}
              <div className="flex-1">
                <h3 className="text-red-600 font-bold text-lg mb-1"
                  style={{ animation: 'slideInRight 0.5s ease-out 0.2s both' }}>
                  Erreur d'envoi ❌
                </h3>
                <p className="text-red-600/80 text-sm"
                  style={{ animation: 'slideInRight 0.5s ease-out 0.3s both' }}>
                  Une erreur s'est produite. Veuillez réessayer ou me contacter directement.
                </p>
              </div>

              {/* Bouton fermer */}
              <button 
                onClick={closeNotification}
                className="flex-shrink-0 text-red-600 hover:text-red-700 transition-colors p-1 rounded-lg hover:bg-red-500/10"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Barre de progression */}
              <div className="absolute bottom-0 left-0 h-1 bg-red-500 rounded-full"
                style={{ animation: 'progressBar 5s linear' }}
              />
            </div>
          </div>
        )}

        <div className="space-y-6">
          {/* Champ Nom */}
          <div>
            <label className={`block mb-2 font-medium ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Nom complet
            </label>
            <input 
              type="text" 
              placeholder="Votre nom"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              disabled={status === 'loading'}
              required
              className={`w-full px-6 py-4 rounded-xl border transition-all duration-200 focus:outline-none focus:ring-2 ${
                theme === 'dark'
                  ? 'bg-gray-900 border-gray-800 focus:border-blue-500 focus:ring-blue-500/20'
                  : 'bg-white border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 shadow-sm'
              } ${status === 'loading' ? 'opacity-50 cursor-not-allowed' : ''}`}
            />
          </div>

          {/* Champ Email */}
          <div>
            <label className={`block mb-2 font-medium ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Adresse email
            </label>
            <input 
              type="email" 
              placeholder="votre@email.com"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              disabled={status === 'loading'}
              required
              className={`w-full px-6 py-4 rounded-xl border transition-all duration-200 focus:outline-none focus:ring-2 ${
                theme === 'dark'
                  ? 'bg-gray-900 border-gray-800 focus:border-blue-500 focus:ring-blue-500/20'
                  : 'bg-white border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 shadow-sm'
              } ${status === 'loading' ? 'opacity-50 cursor-not-allowed' : ''}`}
            />
          </div>

          {/* Champ Message */}
          <div>
            <label className={`block mb-2 font-medium ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Message
            </label>
            <textarea 
              rows={6}
              placeholder="Décrivez votre projet ou votre question..."
              value={formData.message}
              onChange={(e) => setFormData({...formData, message: e.target.value})}
              disabled={status === 'loading'}
              required
              className={`w-full px-6 py-4 rounded-xl border transition-all duration-200 focus:outline-none focus:ring-2 resize-none ${
                theme === 'dark'
                  ? 'bg-gray-900 border-gray-800 focus:border-blue-500 focus:ring-blue-500/20'
                  : 'bg-white border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 shadow-sm'
              } ${status === 'loading' ? 'opacity-50 cursor-not-allowed' : ''}`}
            />
          </div>

          {/* Bouton Envoyer */}
          <button 
            onClick={handleSubmit}
            disabled={status === 'loading'}
            className={`w-full px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all hover:scale-105 flex items-center justify-center gap-2 ${
              status === 'loading' ? 'opacity-50 cursor-not-allowed hover:scale-100' : ''
            }`}
          >
            {status === 'loading' ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Envoi en cours...
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                Envoyer le message
              </>
            )}
          </button>
        </div>
      </div>

      {/* Animations CSS */}
      <style>{`
        @keyframes slideInDown {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes scaleIn {
          from {
            transform: scale(0);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }

        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-10px); }
          75% { transform: translateX(10px); }
        }

        @keyframes wobble {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(-5deg); }
          75% { transform: rotate(5deg); }
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.8; }
        }

        @keyframes ping {
          75%, 100% {
            transform: scale(2);
            opacity: 0;
          }
        }

        @keyframes progressBar {
          from {
            width: 100%;
          }
          to {
            width: 0%;
          }
        }
      `}</style>
    </section>
  );
}