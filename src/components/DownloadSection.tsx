import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const DownloadSection = () => {
  const { t, isRTL } = useLanguage();

  return (
    <section id="download-section" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className={`text-3xl sm:text-4xl font-bold text-gray-900 mb-4 ${isRTL ? 'font-cairo' : 'font-inter'}`}>
            {t('download.title')}
          </h2>
        </div>

        <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
          {/* Customer App Card */}
          <div
            className="relative w-full sm:w-96 h-72 rounded-2xl overflow-hidden shadow-xl flex flex-col justify-end mb-6 sm:mb-0"
            style={{ backgroundImage: `url('/lovable-uploads/Customer.jpg')`, backgroundSize: 'cover', backgroundPosition: 'center' }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-60" />
            <div className="relative z-10 p-8 flex flex-col h-full justify-end">
              <h3 className={`text-2xl font-bold text-white mb-4 ${isRTL ? 'font-cairo' : 'font-inter'}`}>{t('apps.smartline.title')}</h3>
              <a href="/apk/passanger.apk" download className="w-full">
                <button className="w-full bg-primary-600 hover:bg-primary-700 text-white py-2 rounded-lg font-semibold text-base transition-all duration-200 shadow-md mt-2">
                  Download
                </button>
              </a>
            </div>
          </div>

          {/* Driver App Card */}
          <div
            className="relative w-full sm:w-96 h-72 rounded-2xl overflow-hidden shadow-xl flex flex-col justify-end"
            style={{ backgroundImage: `url('/lovable-uploads/Captain.jpg')`, backgroundSize: 'cover', backgroundPosition: 'center' }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-60" />
            <div className="relative z-10 p-8 flex flex-col h-full justify-end">
              <h3 className={`text-2xl font-bold text-white mb-4 ${isRTL ? 'font-cairo' : 'font-inter'}`}>{t('apps.driver.title')}</h3>
              <a href="/apk/driver.apk" download className="w-full">
                <button className="w-full bg-primary-600 hover:bg-primary-700 text-white py-2 rounded-lg font-semibold text-base transition-all duration-200 shadow-md mt-2">
                  Download
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DownloadSection;
