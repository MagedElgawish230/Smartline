import React, { useState } from 'react';
import { Star } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { supabase } from '../integrations/supabase/client';
import { useAuth } from '../contexts/AuthContext';

const FeedbackRatingSection = () => {
  const { t, isRTL } = useLanguage();
  const { user } = useAuth();
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    try {
      const { error } = await supabase
        .from('feedback')
        .insert([{ rating, comment: feedback }]);
      if (error) {
        console.error('Error submitting feedback:', error.message);
      } else {
        setSubmitted(true);
        setFeedback('');
        setRating(0);
        setTimeout(() => setSubmitted(false), 3000);
      }
    } catch (err) {
      console.error('Unexpected error submitting feedback:', err);
    }
  };

  const renderStars = () => {
    return [...Array(5)].map((_, index) => {
      const starValue = index + 1;
      return (
        <Star
          key={index}
          size={32}
          className={`cursor-pointer transition-colors ${
            starValue <= (hoveredRating || rating)
              ? 'fill-yellow-400 text-yellow-400'
              : 'text-gray-300 hover:text-yellow-400'
          }`}
          onClick={() => setRating(starValue)}
          onMouseEnter={() => setHoveredRating(starValue)}
          onMouseLeave={() => setHoveredRating(0)}
        />
      );
    });
  };

  const getRatingText = () => {
    const ratings = {
      en: {
        1: 'Poor',
        2: 'Fair', 
        3: 'Good',
        4: 'Very Good',
        5: 'Excellent'
      },
      ar: {
        1: 'ضعيف',
        2: 'مقبول',
        3: 'جيد', 
        4: 'جيد جداً',
        5: 'ممتاز'
      }
    };
    
    const currentLang = isRTL ? 'ar' : 'en';
    return ratings[currentLang][rating as keyof typeof ratings['en']];
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className={`text-3xl sm:text-4xl font-bold text-gray-900 mb-4 ${isRTL ? 'font-cairo' : 'font-inter'}`}>
            {t('feedback.title')}
          </h2>
          <p className={`text-xl text-gray-600 max-w-2xl mx-auto ${isRTL ? 'font-cairo' : 'font-inter'}`}>
            {t('feedback.subtitle')}
          </p>
        </div>

        {/* Feedback Image */}
        <div className="flex justify-center mb-8">
          <img src="/lovable-uploads/Feedback.jpg" alt="Feedback" className="w-48 md:w-64 rounded-xl shadow-lg object-contain" />
        </div>

        <div className="bg-gray-50 rounded-2xl p-8 max-w-2xl mx-auto">
          {!user && (
            <div className="text-center mb-6">
              <p className="text-red-600 font-semibold text-lg">{t('feedback.login_required')}</p>
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Star Rating */}
            <div className="text-center">
              <label className={`block text-lg font-medium text-gray-900 mb-4 ${isRTL ? 'font-cairo' : 'font-inter'}`}>
                {t('feedback.rate')}
              </label>
              <div className={`flex justify-center space-x-2 mb-2 ${isRTL ? 'space-x-reverse' : ''}`}>
                {renderStars()}
              </div>
              {rating > 0 && (
                <p className={`text-sm text-gray-600 ${isRTL ? 'font-cairo' : 'font-inter'}`}>
                  {getRatingText()}
                </p>
              )}
            </div>

            {/* Feedback Text */}
            <div>
              <label htmlFor="feedback" className={`block text-lg font-medium text-gray-900 mb-2 ${isRTL ? 'font-cairo' : 'font-inter'}`}>
                {t('feedback.message')}
              </label>
              <textarea
                id="feedback"
                rows={4}
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder={t('feedback.placeholder')}
                className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none ${isRTL ? 'font-cairo text-right' : 'font-inter'}`}
                disabled={!user}
              />
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <button
                type="submit"
                disabled={!user || rating === 0 || !feedback.trim()}
                className="bg-primary-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {submitted ? t('feedback.thanks') : t('feedback.submit')}
              </button>
            </div>

            {submitted && (
              <div className="text-center">
                <p className={`text-green-600 font-medium ${isRTL ? 'font-cairo' : 'font-inter'}`}>
                  {t('feedback.success')}
                </p>
              </div>
            )}
          </form>
        </div>

        {/* Additional Info */}
        <div className="text-center mt-8">
          <p className={`text-gray-500 text-sm ${isRTL ? 'font-cairo' : 'font-inter'}`}>
            {t('feedback.help')}
          </p>
        </div>
      </div>
    </section>
  );
};

export default FeedbackRatingSection;
