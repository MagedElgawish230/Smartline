import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const DriveEarnSection = () => {
  const { t, isRTL } = useLanguage();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleGetStarted = () => {
    if (!user) {
      navigate('/auth?mode=login');
    } else {
      navigate('/driver-register');
    }
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className={`${isRTL ? 'lg:order-2' : ''}`}>
            <div className="relative">
              <img
                src="/lovable-uploads/driver.jpg"
                alt={t('drive.image.alt')}
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
          </div>

          {/* Content */}
          <div className={`${isRTL ? 'lg:order-1 font-cairo text-right' : 'font-inter'}`}>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              {t('drive.title')}
            </h2>
            
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              {t('drive.description')}
            </p>

            <div className="space-y-4">
              <button
                className="bg-primary-600 text-white px-8 py-4 rounded-lg font-medium hover:bg-primary-700 transition-colors text-lg"
                onClick={handleGetStarted}
              >
                Get Started
              </button>
              
              <p className="text-gray-600">
                {t('drive.signin.text')} <span className="underline cursor-pointer hover:text-gray-900">{t('drive.signin.link')}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DriveEarnSection;
