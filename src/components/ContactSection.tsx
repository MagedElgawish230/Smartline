import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Button } from './ui/button';
import { supabase } from '../integrations/supabase/client'; // Corrected import path

const ContactSection = () => {
  const { t, isRTL } = useLanguage();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(false);

    const { data, error } = await supabase
      .from('contact_messages')
      .insert([{
        name: name,
        email: email,
        message: message,
      }]);

    setIsSubmitting(false);

    if (error) {
      console.error('Error submitting message:', error);
      setSubmitError('Failed to send message. Please try again.');
    } else {
      console.log('Message sent successfully:', data);
      setSubmitSuccess(true);
      setName('');
      setEmail('');
      setMessage('');
      // Optionally clear success message after a few seconds
      setTimeout(() => setSubmitSuccess(false), 5000);
    }
  };

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className={`text-4xl font-bold text-gray-900 mb-4 ${isRTL ? 'font-cairo' : 'font-inter'}`}>
            {t('contact.title')}
          </h2>
          <p className={`text-xl text-gray-600 max-w-3xl mx-auto ${isRTL ? 'font-cairo' : 'font-inter'}`}>
            {t('contact.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h3 className={`text-2xl font-semibold text-gray-900 mb-6 ${isRTL ? 'font-cairo' : 'font-inter'}`}>
              {t('contact.info.title')}
            </h3>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4 rtl:space-x-reverse">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <h4 className={`text-lg font-medium text-gray-900 mb-1 ${isRTL ? 'font-cairo' : 'font-inter'}`}>
                    {t('contact.phone.title')}
                  </h4>
                  <p className={`text-gray-600 ${isRTL ? 'font-cairo' : 'font-inter'}`}>
                    {t('contact.phone.number')}
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4 rtl:space-x-reverse">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h4 className={`text-lg font-medium text-gray-900 mb-1 ${isRTL ? 'font-cairo' : 'font-inter'}`}>
                    {t('contact.email.title')}
                  </h4>
                  <p className={`text-gray-600 ${isRTL ? 'font-cairo' : 'font-inter'}`}>
                    {t('contact.email.address')}
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4 rtl:space-x-reverse">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className={`text-lg font-medium text-gray-900 mb-1 ${isRTL ? 'font-cairo' : 'font-inter'}`}>
                    {t('contact.address.title')}
                  </h4>
                  <p className={`text-gray-600 ${isRTL ? 'font-cairo' : 'font-inter'}`}>
                    {t('contact.address.location')}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className={`text-2xl font-semibold text-gray-900 mb-6 ${isRTL ? 'font-cairo' : 'font-inter'}`}>
              {t('contact.form.title')}
            </h3>
            
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name" className={`block text-sm font-medium text-gray-700 mb-2 ${isRTL ? 'font-cairo' : 'font-inter'}`}>
                  {t('contact.form.name')}
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder={t('contact.form.name.placeholder')}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className={`block text-sm font-medium text-gray-700 mb-2 ${isRTL ? 'font-cairo' : 'font-inter'}`}>
                  {t('contact.form.email')}
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder={t('contact.form.email.placeholder')}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div>
                <label htmlFor="message" className={`block text-sm font-medium text-gray-700 mb-2 ${isRTL ? 'font-cairo' : 'font-inter'}`}>
                  {t('contact.form.message')}
                </label>
                <textarea
                  id="message"
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-border-transparent"
                  placeholder={t('contact.form.message.placeholder')}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                ></textarea>
              </div>

              {submitError && (
                <p className="text-red-500 text-sm">{submitError}</p>
              )}

              {submitSuccess && (
                <p className="text-green-500 text-sm">{t('feedback.success')}</p>
              )}

              <Button 
                className="w-full bg-primary-600 hover:bg-primary-700 text-white py-3"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : t('contact.form.submit')}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
