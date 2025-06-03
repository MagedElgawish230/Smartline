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
            <p className={`text-gray-600 mb-6 ${isRTL ? 'font-cairo' : 'font-inter'}`}>{t('apps.scan')}</p>
            
            {/* QR Code placeholder */}
            <a href="/apk/passanger.apk" download>
              <div className="w-24 h-24 bg-white border-2 border-gray-200 rounded-lg flex items-center justify-center mb-6">
                <div className="grid grid-cols-3 gap-1">
                  {[...Array(9)].map((_, i) => (
                    <div key={i} className="w-2 h-2 bg-gray-800 rounded-sm"></div>
                  ))}
                </div>
              </div>
            </a>
          </div>

          {/* Driver App */}
          <div className="bg-gray-50 rounded-xl p-8 hover:shadow-lg transition-shadow cursor-pointer group">
            <div className="flex items-center justify-between mb-4">
              <h3 className={`text-2xl font-bold text-gray-900 ${isRTL ? 'font-cairo' : 'font-inter'}`}>{t('apps.driver.title')}</h3>
              <ArrowIcon className="w-6 h-6 text-gray-400 group-hover:text-primary-600 transition-colors" />
            </div>
            <p className={`text-gray-600 mb-6 ${isRTL ? 'font-cairo' : 'font-inter'}`}>{t('apps.scan')}</p>
            
            {/* QR Code placeholder */}
            <a href="/apk/driver.apk" download>
              <div className="w-24 h-24 bg-white border-2 border-gray-200 rounded-lg flex items-center justify-center mb-6">
                <div className="grid grid-cols-3 gap-1">
                  {[...Array(9)].map((_, i) => (
                    <div key={i} className="w-2 h-2 bg-gray-800 rounded-sm"></div>
                  ))}
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EasierInAppsSection;
