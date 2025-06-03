import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const InfoCardsSection = () => {
  const { t, isRTL } = useLanguage();

  const cards = [
    {
      img: '/lovable-uploads/motorcycley.jpg',
      title: t('info.cards.1.title'),
      desc: t('info.cards.1.desc'),
    },
    {
      img: '/lovable-uploads/Car 1.jpg',
      title: t('info.cards.2.title'),
      desc: t('info.cards.2.desc'),
    },
    {
      img: '/lovable-uploads/Car 2.jpg',
      title: t('info.cards.3.title'),
      desc: t('info.cards.3.desc'),
    },
  ];

  return (
    <section className="py-12 md:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {cards.map((card, idx) => (
            <div
              key={idx}
              className={`bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-6 flex flex-col items-center text-center ${isRTL ? 'font-cairo text-right' : 'font-inter'}`}
            >
              <img src={card.img} alt={card.title} className="w-48 h-32 object-contain mb-6" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">{card.title}</h3>
              <p className="text-gray-600 text-base">{card.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InfoCardsSection; 