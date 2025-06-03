import React, { useState } from 'react';
import { Star } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client with environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables');
}

const supabase = createClient(supabaseUrl || '', supabaseAnonKey || '');

const FeedbackRatingSection = () => {
  const { t, isRTL } = useLanguage();
  const [rating, setRating] = useState<number>(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [feedback, setFeedback] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    if (rating === 0) {
      setError(t('feedback.selectRating'));
      setIsSubmitting(false);
      return;
    }

    try {
      const { error: supabaseError } = await supabase
        .from('feedback')
        .insert([{ 
          rating, 
          comment: feedback || '',
          created_at: new Date().toISOString()
        }]);

      if (supabaseError) {
        throw new Error(supabaseError.message);
      }
      
      setIsSubmitted(true);
      setRating(0);
      setFeedback('');
    } catch (error) {
      console.error('Error submitting feedback:', error);
      setError(t('feedback.error'));
    } finally {
      setIsSubmitting(false);
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

  if (isSubmitted) {
    return (
      <div className="text-center p-4">
        <h3 className="text-lg font-semibold text-green-600">Thank you for your feedback!</h3>
      </div>
    );
  }

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

        <div className="bg-gray-50 rounded-2xl p-8 max-w-2xl mx-auto">
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
              />
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <button
                type="submit"
                disabled={rating === 0 || isSubmitting}
                className="bg-primary-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {isSubmitting ? t('feedback.submitting') : t('feedback.submit')}
              </button>
            </div>

            {error && (
              <div className="text-center mt-4">
                <p className="text-red-600">{error}</p>
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
