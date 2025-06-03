import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const Footer = () => {
  const { t, isRTL } = useLanguage();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <h3 className="text-xl md:text-2xl font-bold text-primary-400 mb-3 md:mb-4">SmartLine</h3>
            <p className={`text-sm md:text-base text-gray-400 mb-4 md:mb-6 ${isRTL ? 'font-cairo' : 'font-inter'}`}>
              {t('footer.tagline')}
            </p>
            <div className="flex space-x-4 rtl:space-x-reverse">
              {/* Facebook Link */}
              <a href="https://www.facebook.com/share/1FkxYjhEVH/?mibextid=wwXIfr" className="text-gray-400 hover:text-primary-400 transition-colors" target="_blank" rel="noopener noreferrer">
                <svg className="w-5 h-5 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.77 7.46H14.5v-1.9c0-.9.6-1.1 1-1.1h3V.5h-4.33C10.24.5 9.5 3.44 9.5 5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4z"/>
                </svg>
              </a>
              {/* Instagram Link */}
              <a href="https://www.instagram.com/smart_line.1?igsh=cG15ZTZyZzhoNG9q" className="text-gray-400 hover:text-primary-400 transition-colors" target="_blank" rel="noopener noreferrer">
                <svg className="w-5 h-5 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.178 0 3.576.013 4.85.067 1.29.055 1.986.172 2.405.335.423.164.724.39.99.66.265.266.496.567.66 1.004.163.42.28 1.116.334 2.415.054 1.274.067 1.672.067 4.85s-.013 3.578-.067 4.85c-.054 1.29-.172 1.986-.334 2.405-.164.423-.39.724-.66 1.004-.266.265-.567.496-1.004.66-.42.163-1.116.28-2.415.334-1.274.054-1.672.067-4.85.067s-3.577-.013-4.85-.067c-1.29-.054-1.985-.172-2.404-.334-.423-.164-.724-.39-1.004-.66-.265-.266-.496-.567-.66-1.004-.163-.42-.28-1.116-.334-2.415C2.176 15.577 2.163 15.179 2.163 12s.013-3.578.067-4.85c.054-1.29.172-1.986.334-2.405.164-.423.39-.724.66-1.004.266-.265.567-.496 1.004-.66.42-.163 1.116-.28 2.415-.334C8.422 2.175 8.82 2.163 12 2.163zm0 3.148c-3.64 0-4.078.016-5.202.064-1.127.048-1.726.161-2.074.293-.349.133-.587.322-.837.566-.25.244-.434.489-.567.837-.131.348-.245.947-.293 2.074-.048 1.127-.064 1.562-.064 5.201s.016 4.077.064 5.202c.048 1.127.161 1.726.293 2.074.133.349.322.587.566.837.244.25.489.434.837.567.348.131.947.245 2.074.293 1.127.048 1.562.064 5.201.064s4.077-.016 5.202-.064c1.127-.048 1.726-.161 2.074-.293.349-.133.587-.322.837-.566.25-.244.434-.489.567-.837.131-.348.245-.947.293-2.074.048-1.127.064-1.562.064-5.201s-.016-4.077-.064-5.202c-.048-1.127-.161-1.726-.293-2.074-.133-.349-.322-.587-.566-.837-.244-.25-.489-.434-.837-.567-.348-.131-.947-.245-2.074-.293-1.127-.048-1.562-.064-5.201-.064zm0 1.396c3.023 0 3.39.011 4.592.062 1.199.051 1.83.152 2.125.26.298.109.487.245.654.41.168.167.302.356.41.654.108.295.21.926.26 2.125.051 1.2.062 1.569.062 4.592s-.011 3.39-.062 4.592c-.051 1.199-.152 1.83-.26 2.125-.109.298-.245.487-.41.654-.167.168-.356.302-.654.41-.295.108-.926.21-2.125.26-1.2.051-1.569.062-4.592.062s-3.39-.011-4.592-.062c-1.199-.051-1.83-.152-2.125-.26-.298-.109-.487-.245-.654-.41-.168-.167-.302-.356-.41-.654-.108-.295-.21-.926-.26-2.125-.051-1.2-.062-1.569-.062-4.592s.011-3.39.062-4.592c.051-1.199.152-1.83.26-2.125.109-.298.245-.487.41-.654.167-.168.356-.302.654-.41.295-.108.926-.21 2.125-.26 1.2-.051 1.569-.062 4.592-.062zm0 3.152a3.502 3.502 0 100 7.004 3.502 3.502 0 000-7.004zm0 5.72a2.217 2.217 0 110-4.435 2.217 2.217 0 010 4.435zm6.406-10.63a.896.896 0 100 1.792.896.896 0 000-1.792z"/>
                </svg>
              </a>
              {/* TikTok Link */}
              <a href="https://www.tiktok.com/@smartlien?_t=ZS-8wr45jMmBpC&_r=1" className="text-gray-400 hover:text-primary-400 transition-colors" target="_blank" rel="noopener noreferrer">
                <svg className="w-5 h-5 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h4 className={`text-sm md:text-base font-semibold mb-3 md:mb-4 ${isRTL ? 'font-cairo' : 'font-inter'}`}>
              {t('footer.company')}
            </h4>
            <ul className="space-y-2">
              <li><a href="#" className={`text-sm md:text-base text-gray-400 hover:text-white transition-colors ${isRTL ? 'font-cairo' : 'font-inter'}`}>{t('footer.about')}</a></li>
              <li><a href="#" className={`text-sm md:text-base text-gray-400 hover:text-white transition-colors ${isRTL ? 'font-cairo' : 'font-inter'}`}>{t('footer.careers')}</a></li>
              <li><a href="#" className={`text-sm md:text-base text-gray-400 hover:text-white transition-colors ${isRTL ? 'font-cairo' : 'font-inter'}`}>{t('footer.press')}</a></li>
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className={`text-sm md:text-base font-semibold mb-3 md:mb-4 ${isRTL ? 'font-cairo' : 'font-inter'}`}>
              {t('footer.support')}
            </h4>
            <ul className="space-y-2">
              <li><a href="#" className={`text-sm md:text-base text-gray-400 hover:text-white transition-colors ${isRTL ? 'font-cairo' : 'font-inter'}`}>{t('footer.help')}</a></li>
              <li><a href="#" className={`text-sm md:text-base text-gray-400 hover:text-white transition-colors ${isRTL ? 'font-cairo' : 'font-inter'}`}>{t('footer.safety')}</a></li>
              <li><a href="#" className={`text-sm md:text-base text-gray-400 hover:text-white transition-colors ${isRTL ? 'font-cairo' : 'font-inter'}`}>{t('footer.contact')}</a></li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className={`text-sm md:text-base font-semibold mb-3 md:mb-4 ${isRTL ? 'font-cairo' : 'font-inter'}`}>
              {t('footer.legal')}
            </h4>
            <ul className="space-y-2">
              <li><a href="#" className={`text-sm md:text-base text-gray-400 hover:text-white transition-colors ${isRTL ? 'font-cairo' : 'font-inter'}`}>{t('footer.terms')}</a></li>
              <li><a href="#" className={`text-sm md:text-base text-gray-400 hover:text-white transition-colors ${isRTL ? 'font-cairo' : 'font-inter'}`}>{t('footer.privacy')}</a></li>
              <li><a href="#" className={`text-sm md:text-base text-gray-400 hover:text-white transition-colors ${isRTL ? 'font-cairo' : 'font-inter'}`}>{t('footer.cookies')}</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 md:mt-12 pt-6 md:pt-8">
          <p className={`text-center text-sm md:text-base text-gray-400 ${isRTL ? 'font-cairo' : 'font-inter'}`}>
            {t('footer.rights')}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
