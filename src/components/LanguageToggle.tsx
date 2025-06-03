
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const LanguageToggle = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center space-x-2 rtl:space-x-reverse">
      <button
        onClick={() => setLanguage('en')}
        className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
          language === 'en'
            ? 'bg-primary-500 text-white shadow-lg'
            : 'text-gray-600 hover:text-primary-500 hover:bg-primary-50'
        }`}
      >
        EN
      </button>
      <button
        onClick={() => setLanguage('ar')}
        className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
          language === 'ar'
            ? 'bg-primary-500 text-white shadow-lg'
            : 'text-gray-600 hover:text-primary-500 hover:bg-primary-50'
        }`}
      >
        العربية
      </button>
    </div>
  );
};

export default LanguageToggle;
