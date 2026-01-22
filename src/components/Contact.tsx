import { useState } from 'react';
import { Send, User, Mail, MessageSquare, Wifi, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

interface ContactProps {
  theme: 'dark' | 'light';
}

export default function Contact({ theme }: ContactProps) {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading'>('idle');

  // Fonction pour vérifier si l'email est valide
  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Fonction pour vérifier si l'email existe (vérification DNS basique)
  const checkEmailExists = async (email: string): Promise<boolean> => {
    try {
      // Extraction du domaine
      const domain = email.split('@')[1];
      
      // Vérification basique du format du domaine
      if (!domain || domain.length < 3 || !domain.includes('.')) {
        return false;
      }

      // Liste des domaines invalides communs
      const invalidDomains = ['test.com', 'example.com', 'fake.com', 'temp.com'];
      if (invalidDomains.includes(domain.toLowerCase())) {
        return false;
      }

      // Ici on pourrait faire une vraie vérification DNS mais c'est limité côté client
      // Pour une vraie vérification, il faudrait un backend
      return true;
    } catch (error) {
      return true; // En cas d'erreur, on accepte l'email
    }
  };

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();
    
    // Validation du nom
    if (!formData.name.trim()) {
      toast.error('Le nom est requis', {
        duration: 4000,
        icon: <User className="w-5 h-5" />,
      });
      return;
    }

    if (formData.name.trim().length < 2) {
      toast.error('Le nom doit contenir au moins 2 caractères', {
        duration: 4000,
        icon: <User className="w-5 h-5" />,
      });
      return;
    }

    if (formData.name.trim().length > 100) {
      toast.error('Le nom est trop long (maximum 100 caractères)', {
        duration: 4000,
        icon: <User className="w-5 h-5" />,
      });
      return;
    }

    // Validation de l'email
    if (!formData.email.trim()) {
      toast.error('L\'adresse email est requise', {
        duration: 4000,
        icon: <Mail className="w-5 h-5" />,
      });
      return;
    }

    if (!isValidEmail(formData.email)) {
      toast.error('L\'adresse email n\'est pas valide', {
        duration: 4000,
        icon: <Mail className="w-5 h-5" />,
      });
      return;
    }

    // Vérification de l'existence de l'email
    const emailExists = await checkEmailExists(formData.email);
    if (!emailExists) {
      toast.error('Le domaine de l\'email semble invalide', {
        duration: 4000,
        icon: <Mail className="w-5 h-5" />,
      });
      return;
    }

    // Validation du message
    if (!formData.message.trim()) {
      toast.error('Le message est requis', {
        duration: 4000,
        icon: <MessageSquare className="w-5 h-5" />,
      });
      return;
    }

    if (formData.message.trim().length < 10) {
      toast.error('Le message doit contenir au moins 10 caractères', {
        duration: 4000,
        icon: <MessageSquare className="w-5 h-5" />,
      });
      return;
    }

    if (formData.message.trim().length > 5000) {
      toast.error('Le message est trop long (maximum 5000 caractères)', {
        duration: 4000,
        icon: <MessageSquare className="w-5 h-5" />,
      });
      return;
    }

    setStatus('loading');
    const loadingToast = toast.loading('Envoi en cours...');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          access_key: 'd41b2005-bd72-4317-aa91-43c11606f6f2',
          name: formData.name.trim(),
          email: formData.email.trim(),
          message: formData.message.trim(),
          subject: `Nouveau message de ${formData.name.trim()} depuis votre portfolio`,
          from_name: 'Portfolio Contact Form',
        }),
      });

      const result = await response.json();

      toast.dismiss(loadingToast);

      if (result.success) {
        toast.success('Message envoyé avec succès ! 🎉\nJe vous répondrai dans les plus brefs délais.', {
          duration: 5000,
          icon: <CheckCircle className="w-5 h-5" />,
        });
        setFormData({ name: '', email: '', message: '' });
      } else {
        toast.error('Échec de l\'envoi du message.\nVeuillez réessayer ultérieurement.', {
          duration: 5000,
          icon: <XCircle className="w-5 h-5" />,
        });
      }
    } catch (error) {
      console.error('Erreur lors de l\'envoi:', error);
      toast.dismiss(loadingToast);
      toast.error('Erreur de connexion au serveur.\nVérifiez votre connexion internet et réessayez.', {
        duration: 5000,
        icon: <Wifi className="w-5 h-5" />,
      });
    } finally {
      setStatus('idle');
    }
  };

  return (
    <>
      {/* Toaster Configuration */}
      <Toaster
        position="bottom-left"
        reverseOrder={false}
        gutter={8}
        toastOptions={{
          // Styles par défaut
          duration: 4000,
          style: {
            background: theme === 'dark' ? '#1f2937' : '#ffffff',
            color: theme === 'dark' ? '#f3f4f6' : '#1f2937',
            border: 'none',
            padding: '16px',
            borderRadius: '12px',
            fontSize: '14px',
            fontWeight: '500',
            boxShadow: theme === 'dark' 
              ? '0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -2px rgba(0, 0, 0, 0.2)'
              : '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
          },
          // Styles pour les toasts de succès
          success: {
            style: {
              background: theme === 'dark' ? '#065f46' : '#d1fae5',
              border: 'none',
              color: theme === 'dark' ? '#d1fae5' : '#065f46',
            },
            iconTheme: {
              primary: '#10b981',
              secondary: theme === 'dark' ? '#065f46' : '#ffffff',
            },
          },
          // Styles pour les toasts d'erreur
          error: {
            style: {
              background: theme === 'dark' ? '#7f1d1d' : '#fee2e2',
              border: 'none',
              color: theme === 'dark' ? '#fecaca' : '#7f1d1d',
            },
            iconTheme: {
              primary: '#ef4444',
              secondary: theme === 'dark' ? '#7f1d1d' : '#ffffff',
            },
          },
          // Styles pour les toasts de chargement
          loading: {
            style: {
              background: theme === 'dark' ? '#1e3a8a' : '#dbeafe',
              border: 'none',
              color: theme === 'dark' ? '#bfdbfe' : '#1e3a8a',
            },
          },
        }}
      />

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

          <div className="space-y-6">
            {/* Champ Nom */}
            <div>
              <label className={`block mb-2 font-medium ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Nom complet <span className="text-red-500">*</span>
              </label>
              <input 
                type="text" 
                placeholder="Votre nom"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                disabled={status === 'loading'}
                required
                minLength={2}
                maxLength={100}
                className={`w-full px-6 py-4 rounded-xl border transition-all duration-200 focus:outline-none focus:ring-2 ${
                  theme === 'dark'
                    ? 'bg-gray-900 border-gray-800 focus:border-blue-500 focus:ring-blue-500/20'
                    : 'bg-white border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 shadow-sm'
                } ${status === 'loading' ? 'opacity-50 cursor-not-allowed' : ''}`}
              />
              <p className={`mt-1 text-xs ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>
                {formData.name.length}/100 caractères
              </p>
            </div>

            {/* Champ Email */}
            <div>
              <label className={`block mb-2 font-medium ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Adresse email <span className="text-red-500">*</span>
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
                Message <span className="text-red-500">*</span>
              </label>
              <textarea 
                rows={6}
                placeholder="Décrivez votre projet ou votre question..."
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                disabled={status === 'loading'}
                required
                minLength={10}
                maxLength={5000}
                className={`w-full px-6 py-4 rounded-xl border transition-all duration-200 focus:outline-none focus:ring-2 resize-none ${
                  theme === 'dark'
                    ? 'bg-gray-900 border-gray-800 focus:border-blue-500 focus:ring-blue-500/20'
                    : 'bg-white border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 shadow-sm'
                } ${status === 'loading' ? 'opacity-50 cursor-not-allowed' : ''}`}
              />
              <p className={`mt-1 text-xs ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>
                {formData.message.length}/5000 caractères (minimum 10)
              </p>
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
      </section>
    </>
  );
}