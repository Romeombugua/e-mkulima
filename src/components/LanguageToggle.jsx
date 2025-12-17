import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

function LanguageToggle() {
  const { language, toggleLanguage } = useLanguage();

  const handleClick = () => {
    console.log('Language toggle clicked, current:', language);
    toggleLanguage();
  };

  return (
    <button 
      className="language-toggle"
      onClick={handleClick}
      aria-label="Toggle language"
      title={language === 'en' ? 'Switch to Arabic' : 'Switch to English'}
    >
      {language === 'en' ? '🌐 عربي' : '🌐 English'}
    </button>
  );
}

export default LanguageToggle;
