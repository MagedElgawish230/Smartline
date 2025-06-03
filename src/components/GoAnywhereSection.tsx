
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const GoAnywhereSection = () => {
  const { t, isRTL } = useLanguage();

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className={`${isRTL ? 'lg:order-2' : ''}`}>
            <h2 className={`text-4xl font-bold text-gray-900 mb-8 ${isRTL ? 'font-cairo text-right' : 'font-inter'}`}>
              {t('go.title')}
            </h2>
            
            <div className="bg-white rounded-lg shadow-lg p-6 space-y-4">
              {/* Pickup Location */}
              <div className="relative">
                <div className="flex items-center space-x-3 rtl:space-x-reverse">
                  <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                  <input
                    type="text"
                    placeholder={t('go.pickup')}
                    className={`w-full px-4 py-3 border-0 text-gray-900 placeholder-gray-500 focus:outline-none text-lg ${isRTL ? 'text-right font-cairo' : 'font-inter'}`}
                  />
                </div>
              </div>

              {/* Divider */}
              <div className="border-l-2 border-gray-200 h-4 ml-6 rtl:mr-6"></div>

              {/* Dropoff Location */}
              <div className="relative">
                <div className="flex items-center space-x-3 rtl:space-x-reverse">
                  <div className="w-3 h-3 bg-gray-900 rounded-sm"></div>
                  <input
                    type="text"
                    placeholder={t('go.dropoff')}
                    className={`w-full px-4 py-3 border-0 text-gray-900 placeholder-gray-500 focus:outline-none text-lg ${isRTL ? 'text-right font-cairo' : 'font-inter'}`}
                  />
                </div>
              </div>

              {/* Date and Time */}
              <div className="flex gap-4 pt-4">
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                  </svg>
                  <span className={`text-gray-700 ${isRTL ? 'font-cairo' : 'font-inter'}`}>{t('go.today')}</span>
                </div>
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                  <span className={`text-gray-700 ${isRTL ? 'font-cairo' : 'font-inter'}`}>{t('go.now')}</span>
                  <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <button className={`bg-primary-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors ${isRTL ? 'font-cairo' : 'font-inter'}`}>
                  {t('go.see_prices')}
                </button>
                <button className={`text-gray-700 underline px-6 py-3 hover:text-gray-900 transition-colors ${isRTL ? 'font-cairo' : 'font-inter'}`}>
                  {t('go.login_activity')}
                </button>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className={`${isRTL ? 'lg:order-1' : ''}`}>
            <div className="relative">
              <img
                src="/lovable-uploads/017993f4-959f-4c9c-8b3a-ef124d31bbf5.png"
                alt={t('go.image.alt')}
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GoAnywhereSection;
