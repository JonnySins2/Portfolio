interface FooterProps {
  theme: 'dark' | 'light';
  lang: 'FR' | 'EN';
}

const content = {
  FR: 'Merci d\'avoir visité mon portfolio.',
  EN: 'Thanks for visiting my portfolio.',
};

export default function Footer({ theme, lang }: FooterProps) {
  const year = new Date().getFullYear();
  return (
    <footer className={`py-8 px-6 border-t text-center ${
      theme === 'dark' 
        ? 'border-gray-800 text-gray-400' 
        : 'border-gray-200 text-gray-600'
    }`}>
      <p>© {year} Portfolio. {content[lang]}</p>
    </footer>
  );
}