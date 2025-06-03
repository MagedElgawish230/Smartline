import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const TestimonialsSection = () => {
  const { t, isRTL } = useLanguage();

  const testimonials = [
    {
      name: t('testimonials.user1.name'),
      role: t('testimonials.user1.role'),
      text: t('testimonials.user1.text'),
      avatar: '👩‍💼'
    },
    {
      name: t('testimonials.user2.name'),
      role: t('testimonials.user2.role'),
      text: t('testimonials.user2.text'),
      avatar: '👨‍🎓'
    },
    {
      name: t('testimonials.user3.name'),
      role: t('testimonials.user3.role'),
      text: t('testimonials.user3.text'),
      avatar: '👩‍⚕️'
    }
  ];

  return (
    <section className="py-12 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 md:mb-16">
          <h2 className={`text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 md:mb-4 ${isRTL ? 'font-cairo' : 'font-inter'}`}>
            {t('testimonials.title')}
          </h2>
          <p className={`text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-4 md:px-0 ${isRTL ? 'font-cairo' : 'font-inter'}`}>
            {t('testimonials.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-xl md:rounded-2xl p-6 md:p-8 relative animate-fade-in hover:bg-gray-100 transition-colors duration-300 shadow-sm hover:shadow-md"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {/* Quote Icon */}
              <div className="absolute top-3 md:top-4 right-3 md:right-4 text-primary-200 text-3xl md:text-4xl">
                "
              </div>
              
              <div className="flex items-center mb-4 md:mb-6">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-primary-100 rounded-full flex items-center justify-center text-xl md:text-2xl mr-3 md:mr-4 rtl:mr-0 rtl:ml-3 md:rtl:ml-4">
                  {testimonial.avatar}
                </div>
                <div>
                  <h4 className={`text-sm md:text-base font-bold text-gray-900 ${isRTL ? 'font-cairo' : 'font-inter'}`}>
                    {testimonial.name}
                  </h4>
                  <p className={`text-xs md:text-sm text-gray-600 ${isRTL ? 'font-cairo' : 'font-inter'}`}>
                    {testimonial.role}
                  </p>
                </div>
              </div>
              
              <p className={`text-sm md:text-base text-gray-700 leading-relaxed ${isRTL ? 'font-cairo text-right' : 'font-inter'}`}>
                {testimonial.text}
              </p>
              
              {/* Star Rating */}
              <div className="flex mt-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-base md:text-lg">⭐</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
