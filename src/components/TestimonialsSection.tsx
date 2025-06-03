
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
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className={`text-3xl sm:text-4xl font-bold text-gray-900 mb-4 ${isRTL ? 'font-cairo' : 'font-inter'}`}>
            {t('testimonials.title')}
          </h2>
          <p className={`text-xl text-gray-600 max-w-3xl mx-auto ${isRTL ? 'font-cairo' : 'font-inter'}`}>
            {t('testimonials.subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-2xl p-8 relative animate-fade-in hover:bg-gray-100 transition-colors duration-300"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {/* Quote Icon */}
              <div className="absolute top-4 right-4 text-primary-200 text-4xl">
                "
              </div>
              
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center text-2xl mr-4 rtl:mr-0 rtl:ml-4">
                  {testimonial.avatar}
                </div>
                <div>
                  <h4 className={`font-bold text-gray-900 ${isRTL ? 'font-cairo' : 'font-inter'}`}>
                    {testimonial.name}
                  </h4>
                  <p className={`text-sm text-gray-600 ${isRTL ? 'font-cairo' : 'font-inter'}`}>
                    {testimonial.role}
                  </p>
                </div>
              </div>
              
              <p className={`text-gray-700 leading-relaxed ${isRTL ? 'font-cairo text-right' : 'font-inter'}`}>
                {testimonial.text}
              </p>
              
              {/* Star Rating */}
              <div className="flex mt-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-lg">⭐</span>
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
