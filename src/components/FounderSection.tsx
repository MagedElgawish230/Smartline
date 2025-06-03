
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const FounderSection = () => {
  const { t, isRTL } = useLanguage();

  return (
    <section id="founder" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className={`text-4xl font-bold text-gray-900 mb-4 ${isRTL ? 'font-cairo' : 'font-inter'}`}>
            {t('founder.title')}
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Founder Image */}
          <div className={`flex justify-center ${isRTL ? 'lg:order-2' : 'lg:order-1'}`}>
            <div className="relative">
              <div className="w-80 h-80 rounded-full overflow-hidden shadow-2xl">
                <img
                  src="/lovable-uploads/a341f18f-946b-4f7d-99b0-76fe005c8c4d.png"
                  alt="Dr. Mina Saad - Founder of SmartLine"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-primary-500 rounded-full opacity-80"></div>
              <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-primary-300 rounded-full opacity-60"></div>
            </div>
          </div>

          {/* Founder Content */}
          <div className={`${isRTL ? 'lg:order-1 text-right' : 'lg:order-2 text-left'}`}>
            <div className="space-y-6">
              <h3 className={`text-2xl font-bold text-primary-600 mb-4 ${isRTL ? 'font-cairo' : 'font-inter'}`}>
                {t('founder.question')}
              </h3>
              
              <p className={`text-lg text-gray-700 leading-relaxed ${isRTL ? 'font-cairo' : 'font-inter'}`}>
                {t('founder.intro')}
              </p>
              
              <p className={`text-lg text-gray-700 leading-relaxed ${isRTL ? 'font-cairo' : 'font-inter'}`}>
                {t('founder.bio')}
              </p>
              
              <p className={`text-lg text-gray-700 leading-relaxed ${isRTL ? 'font-cairo' : 'font-inter'}`}>
                {t('founder.vision')}
              </p>
              
              <div className="bg-primary-50 rounded-lg p-6 mt-8">
                <h4 className={`text-xl font-bold text-gray-900 mb-3 ${isRTL ? 'font-cairo' : 'font-inter'}`}>
                  {t('founder.goal.title')}
                </h4>
                <p className={`text-gray-700 leading-relaxed ${isRTL ? 'font-cairo' : 'font-inter'}`}>
                  {t('founder.goal.description')}
                </p>
              </div>
              
              <div className="bg-primary-50 rounded-lg p-6">
                <h4 className={`text-xl font-bold text-gray-900 mb-3 ${isRTL ? 'font-cairo' : 'font-inter'}`}>
                  {t('founder.mission.title')}
                </h4>
                <p className={`text-gray-700 leading-relaxed ${isRTL ? 'font-cairo' : 'font-inter'}`}>
                  {t('founder.mission.description')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FounderSection;
