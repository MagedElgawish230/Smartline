import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { ArrowRight, ArrowLeft } from 'lucide-react';

const EasierInAppsSection = () => {
  const { t, isRTL } = useLanguage();
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className={`text-4xl font-bold text-gray-900 mb-4 ${isRTL ? 'font-cairo' : 'font-inter'}`}>
            {t('apps.title')}
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* SmartLine App */}
          <div className="bg-gray-50 rounded-xl p-8 hover:shadow-lg transition-shadow cursor-pointer group">
            <div className="flex items-center justify-between mb-4">
              <h3 className={`text-2xl font-bold text-gray-900 ${isRTL ? 'font-cairo' : 'font-inter'}`}>{t('apps.smartline.title')}</h3>
              <ArrowIcon className="w-6 h-6 text-gray-400 group-hover:text-primary-600 transition-colors" />
            </div>
            
            {/* App Image */}
            <a href="/apk/passanger.apk" download>
              <div className="w-24 h-24 bg-white border-2 border-gray-200 rounded-lg flex items-center justify-center mb-6 overflow-hidden">
                <img src="/lovable-uploads/Passanger App.png" alt="SmartLine App QR" className="object-contain w-full h-full" />
              </div>
            </a>
          </div>

          {/* Driver App */}
          <div className="bg-gray-50 rounded-xl p-8 hover:shadow-lg transition-shadow cursor-pointer group">
            <div className="flex items-center justify-between mb-4">
              <h3 className={`text-2xl font-bold text-gray-900 ${isRTL ? 'font-cairo' : 'font-inter'}`}>{t('apps.driver.title')}</h3>
              <ArrowIcon className="w-6 h-6 text-gray-400 group-hover:text-primary-600 transition-colors" />
            </div>
            
            {/* App Image */}
            <a href="/apk/driver.apk" download>
              <div className="w-24 h-24 bg-white border-2 border-gray-200 rounded-lg flex items-center justify-center mb-6 overflow-hidden">
                <img src="/lovable-uploads/Driver App.png" alt="Driver App QR" className="object-contain w-full h-full" />
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EasierInAppsSection;
