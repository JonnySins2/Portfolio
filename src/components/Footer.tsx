interface FooterProps {
  theme: 'dark' | 'light';
}

export default function Footer({ theme }: FooterProps) {
  const year = new Date().getFullYear();
  return (
    <footer className={`py-8 px-6 border-t text-center ${
      theme === 'dark' 
        ? 'border-gray-800 text-gray-400' 
        : 'border-gray-200 text-gray-600'
    }`}>
      <p>© {year} Portfolio. Tous droits réservés.</p>
    </footer>
  );
}