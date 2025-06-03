import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const AboutSection = () => {
  const { t, isRTL } = useLanguage();

  return (
    <section id="about" className="py-12 md:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 md:mb-16">
          <h2 className={`text-3xl md:text-4xl font-bold text-gray-900 mb-3 md:mb-4 ${isRTL ? 'font-cairo' : 'font-inter'}`}>
            {t('about.title')}
          </h2>
          <p className={`text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-4 md:px-0 ${isRTL ? 'font-cairo' : 'font-inter'}`}>
            {t('about.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          <div className="text-center p-4 md:p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <div className="w-14 h-14 md:w-16 md:h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
              <svg className="w-7 h-7 md:w-8 md:h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 className={`text-lg md:text-xl font-semibold text-gray-900 mb-2 md:mb-3 ${isRTL ? 'font-cairo' : 'font-inter'}`}>
              {t('about.safety.title')}
            </h3>
            <p className={`text-sm md:text-base text-gray-600 ${isRTL ? 'font-cairo' : 'font-inter'}`}>
              {t('about.safety.description')}
            </p>
          </div>

          <div className="text-center p-4 md:p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <div className="w-14 h-14 md:w-16 md:h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
              <svg className="w-7 h-7 md:w-8 md:h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className={`text-lg md:text-xl font-semibold text-gray-900 mb-2 md:mb-3 ${isRTL ? 'font-cairo' : 'font-inter'}`}>
              {t('about.speed.title')}
            </h3>
            <p className={`text-sm md:text-base text-gray-600 ${isRTL ? 'font-cairo' : 'font-inter'}`}>
              {t('about.speed.description')}
            </p>
          </div>

          <div className="text-center p-4 md:p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <div className="w-14 h-14 md:w-16 md:h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
              <svg className="w-7 h-7 md:w-8 md:h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
            <h3 className={`text-lg md:text-xl font-semibold text-gray-900 mb-2 md:mb-3 ${isRTL ? 'font-cairo' : 'font-inter'}`}>
              {t('about.affordable.title')}
            </h3>
            <p className={`text-sm md:text-base text-gray-600 ${isRTL ? 'font-cairo' : 'font-inter'}`}>
              {t('about.affordable.description')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
