import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Link } from 'react-router-dom';

const Hero = () => {
  const { t, isRTL } = useLanguage();

  return (
    <section id="home" className="relative min-h-[90vh] md:min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary-50 via-white to-primary-100">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 md:top-20 left-10 md:left-20 w-24 md:w-32 h-24 md:h-32 bg-primary-300 rounded-full blur-xl animate-float"></div>
        <div className="absolute bottom-10 md:bottom-20 right-10 md:right-20 w-32 md:w-40 h-32 md:h-40 bg-primary-400 rounded-full blur-xl animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 md:w-64 h-48 md:h-64 bg-primary-200 rounded-full blur-2xl animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 md:pt-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Content */}
          <div className={`text-center lg:text-${isRTL ? 'right' : 'left'} animate-fade-in order-2 lg:order-1`}>
            <h1 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 md:mb-6 leading-tight ${isRTL ? 'font-cairo' : 'font-inter'}`}>
              <span className="text-primary-600">SmartLine</span>
              <br />
              {t('hero.title')}
            </h1>
            
            <p className={`text-lg md:text-xl text-gray-600 mb-6 md:mb-8 max-w-2xl mx-auto lg:mx-0 ${isRTL ? 'font-cairo' : 'font-inter'}`}>
              {t('hero.description')}
            </p>

            <div className={`flex flex-col sm:flex-row gap-4 justify-center ${isRTL ? 'lg:justify-end' : 'lg:justify-start'}`}>
              <Link to="/auth" className="w-full sm:w-auto">
                <button className="w-full sm:w-auto bg-primary-600 hover:bg-primary-700 text-white px-6 md:px-8 py-3 md:py-4 rounded-xl font-semibold text-base md:text-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                  Get Started
                </button>
              </Link>
              <button
                className="w-full sm:w-auto border-2 border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white px-6 md:px-8 py-3 md:py-4 rounded-xl font-semibold text-base md:text-lg transition-all duration-200"
                onClick={() => {
                  const el = document.getElementById('download-section');
                  if (el) {
                    el.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                {t('hero.download')}
              </button>
            </div>
          </div>

          {/* Phone Mockup */}
          <div className="relative flex justify-center lg:justify-end animate-fade-in order-1 lg:order-2 mb-8 lg:mb-0" style={{ animationDelay: '0.3s' }}>
            <div className="relative w-64 md:w-80 h-80 md:h-96 bg-gray-900 rounded-3xl p-2 shadow-2xl">
              <div className="w-full h-full bg-gradient-to-br from-primary-500 to-primary-700 rounded-2xl flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="text-5xl md:text-6xl mb-4">📱</div>
                  <div className="text-lg md:text-xl font-bold">SmartLine App</div>
                  <div className="text-xs md:text-sm opacity-80 mt-2">Your ride awaits</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
