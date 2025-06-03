import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import BookRideModal from './BookRideModal';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';

const RecentActivitySection = () => {
  const { t, isRTL } = useLanguage();
  const { user } = useAuth();

  return (
    <section className="py-12 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Content */}
          <div className={`${isRTL ? 'font-cairo text-right' : 'font-inter'} order-2 lg:order-1`}>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 md:mb-6">
              {user ? `Welcome back, ${user.email}!` : t('recent.title')}
            </h2>
            
            <p className="text-lg md:text-xl text-gray-600 mb-6 md:mb-8 leading-relaxed">
              {user ? 'Ready to book your next ride?' : t('recent.description')}
            </p>

            <div className="space-y-4">
              {user ? (
                <div className="flex flex-col sm:flex-row gap-4">
                  <BookRideModal>
                    <Button className="w-full sm:w-auto bg-primary-600 text-white px-6 md:px-8 py-3 md:py-4 rounded-lg font-medium hover:bg-primary-700 transition-colors text-base md:text-lg">
                      Book a Ride
                    </Button>
                  </BookRideModal>
                  <Link to="/dashboard" className="w-full sm:w-auto">
                    <Button variant="outline" className="w-full sm:w-auto px-6 md:px-8 py-3 md:py-4 rounded-lg font-medium text-base md:text-lg">
                      View Profile
                    </Button>
                  </Link>
                </div>
              ) : (
                <>
                  <Link to="/auth" className="block w-full sm:w-auto">
                    <Button className="w-full sm:w-auto bg-primary-600 text-white px-6 md:px-8 py-3 md:py-4 rounded-lg font-medium hover:bg-primary-700 transition-colors text-base md:text-lg">
                      {t('recent.login')}
                    </Button>
                  </Link>
                  
                  <p className="text-gray-600 text-base md:text-lg">
                    {t('recent.signup.text')} 
                    <Link to="/auth" className="underline hover:text-gray-900 ml-1">
                      {t('recent.signup.link')}
                    </Link>
                  </p>
                </>
              )}
            </div>
          </div>

          {/* Image */}
          <div className="order-1 lg:order-2 mb-8 lg:mb-0">
            <div className="relative">
              <img
                src="/lovable-uploads/Login.jpg"
                alt={t('recent.image.alt')}
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RecentActivitySection;
