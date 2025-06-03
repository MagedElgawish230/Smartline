import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const offerImages = [
  '/lovable-uploads/Offer 1.jpg',
  '/lovable-uploads/Offer 2.jpg',
  '/lovable-uploads/Offer 3.jpg',
];

const PromotionsSection = () => {
  const { isRTL } = useLanguage();

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className={`text-3xl sm:text-4xl font-bold text-gray-900 mb-4 ${isRTL ? 'font-cairo' : 'font-inter'}`}>
            Special Offers
          </h2>
          <p className={`text-xl text-gray-600 max-w-3xl mx-auto ${isRTL ? 'font-cairo' : 'font-inter'}`}>
            Exclusive deals for SmartLine users
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {offerImages.map((img, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 animate-fade-in flex items-center justify-center"
              style={{ animationDelay: `${index * 0.2}s`, minHeight: '320px' }}
            >
              <img
                src={img}
                alt={`Offer ${index + 1}`}
                className="object-cover rounded-xl w-full h-full max-h-80"
                style={{ maxWidth: '100%', maxHeight: '320px' }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PromotionsSection;
