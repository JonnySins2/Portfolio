import { useState, useRef, useEffect } from 'react';
import { Send, User, Mail, MessageSquare, Wifi, CheckCircle, XCircle } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

interface ContactProps {
  theme: 'dark' | 'light';
}

export default function Contact({ theme }: ContactProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading'>('idle');

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.7 && rect.bottom > 0) {
          if (!isVisible) setIsVisible(true);
        } else {
          if (isVisible) setIsVisible(false);
        }
      }
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isVisible]);

  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const checkEmailExists = async (email: string): Promise<boolean> => {
    try {
      const domain = email.split('@')[1];
      if (!domain || domain.length < 3 || !domain.includes('.')) return false;
      const invalidDomains = ['test.com', 'example.com', 'fake.com', 'temp.com'];
      if (invalidDomains.includes(domain.toLowerCase())) return false;
      return true;
    } catch {
      return true;
    }
  };

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      toast.error('Le nom est requis', { duration: 4000, icon: <User className="w-5 h-5" /> });
      return;
    }
    if (formData.name.trim().length < 2) {
      toast.error('Le nom doit contenir au moins 2 caractères', { duration: 4000, icon: <User className="w-5 h-5" /> });
      return;
    }
    if (formData.name.trim().length > 100) {
      toast.error('Le nom est trop long (maximum 100 caractères)', { duration: 4000, icon: <User className="w-5 h-5" /> });
      return;
    }
    if (!formData.email.trim()) {
      toast.error("L'adresse email est requise", { duration: 4000, icon: <Mail className="w-5 h-5" /> });
      return;
    }
    if (!isValidEmail(formData.email)) {
      toast.error("L'adresse email n'est pas valide", { duration: 4000, icon: <Mail className="w-5 h-5" /> });
      return;
    }
    const emailExists = await checkEmailExists(formData.email);
    if (!emailExists) {
      toast.error("Le domaine de l'email semble invalide", { duration: 4000, icon: <Mail className="w-5 h-5" /> });
      return;
    }
    if (!formData.message.trim()) {
      toast.error('Le message est requis', { duration: 4000, icon: <MessageSquare className="w-5 h-5" /> });
      return;
    }
    if (formData.message.trim().length < 10) {
      toast.error('Le message doit contenir au moins 10 caractères', { duration: 4000, icon: <MessageSquare className="w-5 h-5" /> });
      return;
    }
    if (formData.message.trim().length > 5000) {
      toast.error('Le message est trop long (maximum 5000 caractères)', { duration: 4000, icon: <MessageSquare className="w-5 h-5" /> });
      return;
    }

    setStatus('loading');
    const loadingToast = toast.loading('Envoi en cours...');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
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
        toast.error("Échec de l'envoi du message.\nVeuillez réessayer ultérieurement.", {
          duration: 5000,
          icon: <XCircle className="w-5 h-5" />,
        });
      }
    } catch (error) {
      console.error("Erreur lors de l'envoi:", error);
      toast.dismiss(loadingToast);
      toast.error('Erreur de connexion au serveur.\nVérifiez votre connexion internet et réessayez.', {
        duration: 5000,
        icon: <Wifi className="w-5 h-5" />,
      });
    } finally {
      setStatus('idle');
    }
  };

  const title = "Contact";
  const leftPart = title.slice(0, 3).split('');
  const rightPart = title.slice(3).split('');

  const inputClass = (extra = '') =>
    `w-full px-4 sm:px-6 py-3 sm:py-4 rounded-xl border transition-all duration-200 
     focus:outline-none focus:ring-2 text-sm sm:text-base
     ${theme === 'dark'
       ? 'bg-gray-900 border-gray-800 focus:border-amber-500 focus:ring-amber-500/20'
       : 'bg-white border-gray-200 focus:border-amber-500 focus:ring-amber-500/20 shadow-sm'
     }
     ${status === 'loading' ? 'opacity-50 cursor-not-allowed' : ''}
     ${extra}`;

  const labelClass = `block mb-1.5 sm:mb-2 font-medium text-sm sm:text-base ${
    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
  }`;

  const counterClass = `mt-1 text-xs ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`;

  return (
    <>
      <Toaster
        position="bottom-left"
        reverseOrder={false}
        gutter={8}
        toastOptions={{
          duration: 4000,
          style: {
            background: theme === 'dark' ? '#1f2937' : '#ffffff',
            color: theme === 'dark' ? '#f3f4f6' : '#1f2937',
            border: 'none',
            padding: '12px 16px',
            borderRadius: '12px',
            fontSize: '13px',
            fontWeight: '500',
            boxShadow: theme === 'dark'
              ? '0 10px 15px -3px rgba(0,0,0,0.3)'
              : '0 10px 15px -3px rgba(0,0,0,0.1)',
            maxWidth: '90vw',
          },
          success: {
            style: {
              background: theme === 'dark' ? '#065f46' : '#d1fae5',
              color: theme === 'dark' ? '#d1fae5' : '#065f46',
            },
            iconTheme: { primary: '#10b981', secondary: theme === 'dark' ? '#065f46' : '#ffffff' },
          },
          error: {
            style: {
              background: theme === 'dark' ? '#7f1d1d' : '#fee2e2',
              color: theme === 'dark' ? '#fecaca' : '#7f1d1d',
            },
            iconTheme: { primary: '#ef4444', secondary: theme === 'dark' ? '#7f1d1d' : '#ffffff' },
          },
          loading: {
            style: {
              background: theme === 'dark' ? '#1e3a8a' : '#dbeafe',
              color: theme === 'dark' ? '#bfdbfe' : '#1e3a8a',
            },
          },
        }}
      />

      <section
        ref={sectionRef}
        id="contact"
        className="relative min-h-screen flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 py-16 sm:py-20 overflow-hidden"
      >
        {/* Background */}
        <div
          className="absolute inset-0"
          style={{ background: theme === 'dark' ? 'rgb(0,0,0)' : 'rgb(255,255,255)' }}
        />

        <div className="relative z-10 w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-2xl mx-auto">

          {/* Titre animé */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 text-amber-500 flex justify-center">
            <span className="inline-flex">
              {leftPart.map((letter, index) => (
                <span
                  key={`left-${index}`}
                  className="inline-block"
                  style={{
                    animation: isVisible
                      ? `contactSlideFromLeft 0.5s ease-out forwards ${index * 0.05}s`
                      : 'none',
                    opacity: 0,
                  }}
                >
                  {letter === ' ' ? '\u00A0' : letter}
                </span>
              ))}
            </span>
            <span className="inline-flex">
              {rightPart.map((letter, index) => (
                <span
                  key={`right-${index}`}
                  className="inline-block"
                  style={{
                    animation: isVisible
                      ? `contactSlideFromRight 0.5s ease-out forwards ${index * 0.05}s`
                      : 'none',
                    opacity: 0,
                  }}
                >
                  {letter === ' ' ? '\u00A0' : letter}
                </span>
              ))}
            </span>
          </h2>

          {/* Sous-titre */}
          <p
            className={`text-center mb-6 sm:mb-10 text-sm sm:text-base md:text-lg ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
            }`}
            style={{
              animation: isVisible ? 'fadeInUp 0.6s ease-out forwards 0.3s' : 'none',
              opacity: 0,
            }}
          >
            Une question ? Un projet ? N'hésitez pas à me contacter !
          </p>

          {/* Formulaire */}
          <div
            className="space-y-4 sm:space-y-5 md:space-y-6"
            style={{
              animation: isVisible ? 'fadeInUp 0.6s ease-out forwards 0.5s' : 'none',
              opacity: 0,
            }}
          >
            {/* Nom */}
            <div>
              <label className={labelClass}>
                Nom complet <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Votre nom"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                disabled={status === 'loading'}
                required
                minLength={2}
                maxLength={100}
                className={inputClass()}
              />
              <p className={counterClass}>{formData.name.length}/100 caractères</p>
            </div>

            {/* Email */}
            <div>
              <label className={labelClass}>
                Adresse email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                placeholder="votre@email.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                disabled={status === 'loading'}
                required
                className={inputClass()}
              />
            </div>

            {/* Message */}
            <div>
              <label className={labelClass}>
                Message <span className="text-red-500">*</span>
              </label>
              <textarea
                rows={4}
                placeholder="Décrivez votre projet ou votre question..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                disabled={status === 'loading'}
                required
                minLength={10}
                maxLength={5000}
                className={inputClass('resize-none')}
              />
              <p className={counterClass}>
                {formData.message.length}/5000 caractères (minimum 10)
              </p>
            </div>

            {/* Bouton */}
            <button
              onClick={handleSubmit}
              disabled={status === 'loading'}
              className={`w-full px-6 sm:px-8 py-3 sm:py-4 bg-amber-600 hover:bg-amber-700 
                text-white rounded-xl font-semibold text-sm sm:text-base
                hover:shadow-lg hover:shadow-amber-500/50 transition-all hover:scale-105 
                flex items-center justify-center gap-2
                ${status === 'loading' ? 'opacity-50 cursor-not-allowed hover:scale-100' : ''}`}
            >
              {status === 'loading' ? (
                <>
                  <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Envoi en cours...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span>Envoyer le message</span>
                </>
              )}
            </button>
          </div>
        </div>

        <style>{`
          @keyframes contactSlideFromLeft {
            0% { transform: translateX(-200px); opacity: 0; }
            100% { transform: translateX(0); opacity: 1; }
          }
          @keyframes contactSlideFromRight {
            0% { transform: translateX(200px); opacity: 0; }
            100% { transform: translateX(0); opacity: 1; }
          }
          @keyframes fadeInUp {
            0% { transform: translateY(20px); opacity: 0; }
            100% { transform: translateY(0); opacity: 1; }
          }
        `}</style>
      </section>
    </>
  );
}