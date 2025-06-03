
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const PromotionsSection = () => {
  const { t, isRTL } = useLanguage();

  const promotions = [
    {
      title: t('promo.first.title'),
      description: t('promo.first.description'),
      icon: '🎉',
      color: 'from-green-400 to-green-600'
    },
    {
      title: t('promo.weekend.title'),
      description: t('promo.weekend.description'),
      icon: '🎯',
      color: 'from-blue-400 to-blue-600'
    },
    {
      title: t('promo.premium.title'),
      description: t('promo.premium.description'),
      icon: '👑',
      color: 'from-purple-400 to-purple-600'
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className={`text-3xl sm:text-4xl font-bold text-gray-900 mb-4 ${isRTL ? 'font-cairo' : 'font-inter'}`}>
            {t('promo.title')}
          </h2>
          <p className={`text-xl text-gray-600 max-w-3xl mx-auto ${isRTL ? 'font-cairo' : 'font-inter'}`}>
            {t('promo.subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {promotions.map((promo, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 animate-fade-in"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${promo.color} flex items-center justify-center text-2xl mb-6 mx-auto`}>
                {promo.icon}
              </div>
              <h3 className={`text-xl font-bold text-gray-900 mb-4 text-center ${isRTL ? 'font-cairo' : 'font-inter'}`}>
                {promo.title}
              </h3>
              <p className={`text-gray-600 text-center leading-relaxed ${isRTL ? 'font-cairo' : 'font-inter'}`}>
                {promo.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PromotionsSection;
