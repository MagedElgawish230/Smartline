import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'ar';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  isRTL: boolean;
}

const translations = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.contact': 'Contact',
    
    // Hero Section
    'hero.title': 'Your Smart Ride Solution',
    'hero.subtitle': 'Experience the future of transportation with SmartLine',
    'hero.description': 'Safe, reliable, and affordable transportation at your fingertips. Book your ride in seconds and travel with confidence.',
    'hero.cta': 'Get Started',
    'hero.download': 'Download App',
    
    // Go Anywhere Section
    'go.title': 'Go anywhere with SmartLine',
    'go.pickup': 'Pickup location',
    'go.dropoff': 'Dropoff location',
    'go.today': 'Today',
    'go.now': 'Now',
    'go.see_prices': 'See prices',
    'go.login_activity': 'Log in to see your recent activity',
    'go.image.alt': 'Go anywhere illustration',
    
    // Recent Activity Section
    'recent.title': 'Log in to see your recent activity',
    'recent.description': 'View past trips, tailored suggestions, support resources, and more.',
    'recent.login': 'Log in to your account',
    'recent.signup.text': "Don't have a SmartLine account?",
    'recent.signup.link': 'Sign up',
    'recent.image.alt': 'Recent activity illustration',
    'recent.welcome': 'Welcome back,',
    'recent.ready': 'Ready to book your next ride?',
    'recent.book': 'Book a Ride',
    'recent.profile': 'View Profile',
    
    // Drive and Earn Section
    'drive.title': 'Drive when you want, make what you need',
    'drive.description': 'Make money on your schedule with deliveries or rides—or both. You can use your own car or choose a rental through SmartLine.',
    'drive.cta': 'Get started',
    'drive.signin.text': 'Already have an account?',
    'drive.signin.link': 'Sign in',
    'drive.image.alt': 'Drive and earn illustration',
    
    // Apps Section
    'apps.title': "It's easier in the apps",
    'apps.smartline.title': 'Download the SmartLine app',
    'apps.driver.title': 'Download the Driver app',
    'apps.scan': 'Scan to download',
    
    // About Section
    'about.title': 'About SmartLine',
    'about.subtitle': 'We are committed to providing safe, reliable, and affordable transportation solutions for everyone.',
    'about.safety.title': 'Safety First',
    'about.safety.description': 'Your safety is our top priority. All drivers are background-checked and vehicles are regularly inspected.',
    'about.speed.title': 'Fast & Reliable',
    'about.speed.description': 'Get a ride in minutes with our advanced matching algorithm and extensive driver network.',
    'about.affordable.title': 'Affordable Prices',
    'about.affordable.description': 'Transparent pricing with no hidden fees. Pay what you see upfront.',
    
    // Founder Section
    'founder.title': 'About the Founder',
    'founder.question': 'Who is the founder of SmartLine Smart Transportation Company?',
    'founder.intro': 'Behind every successful project is an idea, and behind every strong idea is a founder who believes in it.',
    'founder.bio': 'Dr. Mina Saad is the founder of SmartLine Smart Transportation Company, a young Egyptian from Assiut Governorate who is only 25 years old, but he has managed to make his mark in one of the most vital sectors in Egypt, which is the smart transportation sector.',
    'founder.vision': 'With an ambitious vision and constant pursuit of development, Dr. Mina founded SmartLine with the goal of becoming the first 100% Egyptian smart transportation company, competing strongly and creating a qualitative shift in the style of transportation within Egypt. His vision is not limited to success in Cairo only, but includes the spread of the company in all governorates of Egypt, especially the Upper Egypt governorates that really need safe, fast and smart transportation solutions.',
    'founder.goal.title': '🚗 Our Goal at SmartLine',
    'founder.goal.description': 'We strive at SmartLine to provide distinguished service to captains and customers, with a professional system that supports the driver and rewards his diligence, and provides the customer with a smart, comfortable, and safe journey.',
    'founder.mission.title': '🌍 Our Vision',
    'founder.mission.description': 'To be the leading Egyptian company in the field of smart transportation, and to contribute effectively to the development of the transportation system, while providing decent job opportunities for young people and achieving an advanced transportation experience worthy of the Egyptian citizen.',
    
    // Download Section
    'download.title': 'Download SmartLine',
    'download.subtitle': 'Get the app and start your journey',
    'download.description': 'Available on all platforms. Download now and get your first ride free!',
    'download.ios': 'Download on the App Store',
    'download.android': 'Get it on Google Play',
    
    // Promotions Section
    'promo.title': 'Special Offers',
    'promo.subtitle': 'Exclusive deals for SmartLine users',
    'promo.first.title': 'First Ride Free',
    'promo.first.description': 'New users get their first ride completely free. Use code: WELCOME',
    'promo.weekend.title': '20% Off Weekends',
    'promo.weekend.description': 'Enjoy 20% discount on all weekend rides. Valid Friday to Sunday.',
    'promo.premium.title': 'Premium Member Benefits',
    'promo.premium.description': 'Join Premium and get priority booking, luxury cars, and exclusive discounts.',
    
    // Testimonials Section
    'testimonials.title': 'What Our Users Say',
    'testimonials.subtitle': 'Real experiences from real people',
    'testimonials.user1.name': 'Sarah Johnson',
    'testimonials.user1.role': 'Business Professional',
    'testimonials.user1.text': 'SmartLine has transformed my daily commute. Always on time, professional drivers, and great prices!',
    'testimonials.user2.name': 'Ahmed Al-Rashid',
    'testimonials.user2.role': 'University Student',
    'testimonials.user2.text': 'The app is so easy to use and the student discounts are amazing. Highly recommended!',
    'testimonials.user3.name': 'Maria Garcia',
    'testimonials.user3.role': 'Healthcare Worker',
    'testimonials.user3.text': 'Safe, reliable rides even during late hours. SmartLine gives me peace of mind.',
    
    // Contact Section
    'contact.title': 'Get in Touch',
    'contact.subtitle': 'Have questions? We\'re here to help you 24/7.',
    'contact.info.title': 'Contact Information',
    'contact.phone.title': 'Phone',
    'contact.phone.number': '+201069503922',
    'contact.email.title': 'Email',
    'contact.email.address': 'smartline179@gmail.com',
    'contact.address.title': 'Address',
    'contact.address.location': 'Alexandria – Agami – Hanoville – Off Al-Khulafa Al-Rashideen Street – Next to Al-Nawras Lab',
    'contact.form.title': 'Send us a Message',
    'contact.form.name': 'Full Name',
    'contact.form.name.placeholder': 'Enter your full name',
    'contact.form.email': 'Email Address',
    'contact.form.email.placeholder': 'Enter your email address',
    'contact.form.message': 'Message',
    'contact.form.message.placeholder': 'How can we help you?',
    'contact.form.submit': 'Send Message',
    
    // Footer
    'footer.company': 'Company',
    'footer.about': 'About Us',
    'footer.careers': 'Careers',
    'footer.press': 'Press',
    'footer.support': 'Support',
    'footer.help': 'Help Center',
    'footer.safety': 'Safety',
    'footer.contact': 'Contact Us',
    'footer.legal': 'Legal',
    'footer.terms': 'Terms of Service',
    'footer.privacy': 'Privacy Policy',
    'footer.cookies': 'Cookie Policy',
    'footer.follow': 'Follow Us',
    'footer.rights': '© 2024 SmartLine. All rights reserved.',
    'footer.tagline': 'Your Smart Ride Solution',
    
    // Feedback Section
    'feedback.title': 'Share Your Feedback',
    'feedback.subtitle': 'Help us improve SmartLine by sharing your experience and rating our service',
    'feedback.rate': 'Rate Your Experience',
    'feedback.message': 'Your Feedback',
    'feedback.placeholder': 'Tell us about your experience with SmartLine...',
    'feedback.submit': 'Submit Feedback',
    'feedback.thanks': 'Thank You!',
    'feedback.success': 'Thank you for your feedback! We appreciate your input.',
    'feedback.help': 'Your feedback helps us provide better service to all our users',
    
    // Driver Registration
    'driver.title': 'Driver Registration',
    'driver.firstName': 'First Name',
    'driver.lastName': 'Last Name',
    'driver.email': 'Email',
    'driver.phone': 'Phone Number',
    'driver.idType': 'ID Type',
    'driver.idNumber': 'ID Number',
    'driver.password': 'Password',
    'driver.confirmPassword': 'Confirm Password',
    'driver.driverPhoto': 'Driver Photo',
    'driver.drivingLicense': 'Driving License',
    'driver.leadershipLicense': 'Leadership License',
    'driver.driverCard': 'Driver Card',
    'driver.carFront': 'Car Front Photo',
    'driver.carBack': 'Car Back Photo',
    'driver.criminalRecord': 'Criminal Record',
    'driver.submit': 'Submit Application',
    'driver.chooseFile': 'Choose File',
    'driver.selectIdType': 'Select ID Type',
    'driver.nationalId': 'National ID',
    'driver.passport': 'Passport',
    'driver.driverLicense': 'Driver License',
    
    // Info Cards Section
    'info.cards.1.title': 'Fastest Smart Scooter in Egypt 🚀',
    'info.cards.1.desc': '\nUnbeatable price: 4 EGP/km! 🛵\nOrder it from SmartLine and save your time and money',
    'info.cards.2.title': '🚗 Smart Pro Car',
    'info.cards.2.desc': 'Make your ride stylish and affordable! Comfort and elegance at a price that suits you!',
    'info.cards.3.title': '🚘 Smart VIP Car',
    'info.cards.3.desc': 'Got an occasion? Don\'t hesitate for a second! A car that will impress and always keep you in the spotlight 😉',
  },
  ar: {
    // Navigation
    'nav.home': 'الرئيسية',
    'nav.about': 'عن الشركة',
    'nav.contact': 'اتصل بنا',
    
    // Hero Section
    'hero.title': 'حلك الذكي للتنقل',
    'hero.subtitle': 'اختبر مستقبل المواصلات مع سمارت لاين',
    'hero.description': 'رحلات آمنة وموثوقة وبأسعار معقولة في متناول يدك. احجز رحلتك في ثوانٍ وسافر بثقة.',
    'hero.cta': 'ابدأ الآن',
    'hero.download': 'تحميل التطبيق',
    
    // Go Anywhere Section
    'go.title': 'اذهب إلى أي مكان مع سمارت لاين',
    'go.pickup': 'نقطة الانطلاق',
    'go.dropoff': 'نقطة الوصول',
    'go.today': 'اليوم',
    'go.now': 'الآن',
    'go.see_prices': 'عرض الأسعار',
    'go.login_activity': 'تسجيل الدخول لعرض نشاطك الأخير',
    'go.image.alt': 'اذهب إلى أي مكان',
    
    // Recent Activity Section
    'recent.title': 'سجل الدخول لعرض نشاطك الأخير',
    'recent.description': 'اعرض الرحلات السابقة والاقتراحات المخصصة وموارد الدعم والمزيد.',
    'recent.login': 'تسجيل الدخول إلى حسابك',
    'recent.signup.text': 'ليس لديك حساب سمارت لاين؟',
    'recent.signup.link': 'إنشاء حساب',
    'recent.image.alt': 'النشاط الأخير',
    'recent.welcome': 'مرحباً بعودتك،',
    'recent.ready': 'جاهز لحجز رحلتك القادمة؟',
    'recent.book': 'احجز رحلة',
    'recent.profile': 'الملف الشخصي',
    
    // Drive and Earn Section
    'drive.title': 'قد متى تريد، اكسب ما تحتاج',
    'drive.description': 'اكسب المال وفقاً لجدولك الزمني مع التوصيل أو الركوب - أو كليهما. يمكنك استخدام سيارتك الخاصة أو اختيار استئجار واحدة من خلال سمارت لاين.',
    'drive.cta': 'ابدأ الآن',
    'drive.signin.text': 'لديك حساب بالفعل؟',
    'drive.signin.link': 'تسجيل الدخول',
    'drive.image.alt': 'اقد واكسب',
    
    // Apps Section
    'apps.title': 'الأمر أسهل في التطبيقات',
    'apps.smartline.title': 'تحميل تطبيق سمارت لاين',
    'apps.driver.title': 'تحميل تطبيق السائق',
    'apps.scan': 'امسح للتحميل',
    
    // About Section
    'about.title': 'عن سمارت لاين',
    'about.subtitle': 'نحن ملتزمون بتوفير حلول نقل آمنة وموثوقة وبأسعار معقولة للجميع.',
    'about.safety.title': 'الأمان أولاً',
    'about.safety.description': 'سلامتك أولويتنا القصوى. جميع السائقين يخضعون لفحص خلفية والمركبات تُفحص بانتظام.',
    'about.speed.title': 'سريع وموثوق',
    'about.speed.description': 'احصل على رحلة في دقائق مع خوارزمية المطابقة المتقدمة وشبكة السائقين الواسعة.',
    'about.affordable.title': 'أسعار معقولة',
    'about.affordable.description': 'تسعير شفاف بدون رسوم خفية. ادفع ما تراه مقدماً.',
    
    // Founder Section
    'founder.title': 'عن المؤسس',
    'founder.question': 'من هو مؤسس شركة سمارت لاين للنقل الذكي؟',
    'founder.intro': 'وراء كل مشروع ناجح فكرة، ووراء كل فكرة قوية مؤسس مؤمن بها.',
    'founder.bio': 'دكتور مينا سعد هو مؤسس شركة سمارت لاين للنقل الذكي، شاب مصري من محافظة أسيوط يبلغ من العمر 25 سنة فقط، لكنه استطاع أن يضع بصمته في واحدة من أهم القطاعات الحيوية في مصر وهو قطاع النقل الذكي.',
    'founder.vision': 'برؤية طموحة وسعي دائم للتطوير، أسس دكتور مينا شركة سمارت لاين بهدف أن تصبح أول شركة نقل ذكي مصرية 100%، تنافس بقوة وتُحدث نقلة نوعية في أسلوب التنقل داخل مصر. رؤيته لا تقتصر على النجاح في القاهرة فقط، بل تشمل انتشار الشركة في جميع محافظات مصر، وخاصة محافظات الصعيد التي تحتاج بالفعل إلى حلول نقل آمنة وسريعة وذكية.',
    'founder.goal.title': '🚗 هدفنا في سمارت لاين',
    'founder.goal.description': 'نسعى في سمارت لاين لتقديم خدمة مميزة للكباتن والعملاء، بنظام احترافي يدعم السائق ويكافئ اجتهاده، ويقدّم للعميل رحلة ذكية، مريحة، وآمنة.',
    'founder.mission.title': '🌍 رؤيتنا',
    'founder.mission.description': 'أن نكون الشركة المصرية الرائدة في مجال النقل الذكي، وأن نساهم بشكل فعّال في تطوير منظومة النقل، مع توفير فرص عمل محترمة للشباب وتحقيق تجربة تنقل متطورة تليق بالمواطن المصري',
    
    // Download Section
    'download.title': 'تحميل سمارت لاين',
    'download.subtitle': 'احصل على التطبيق وابدأ رحلتك',
    'download.description': 'متوفر على جميع المنصات. حمل الآن واحصل على رحلتك الأولى مجاناً!',
    'download.ios': 'التحميل من App Store',
    'download.android': 'التحميل من Google Play',
    
    // Promotions Section
    'promo.title': 'عروض خاصة',
    'promo.subtitle': 'عروض حصرية لمستخدمي سمارت لاين',
    'promo.first.title': 'أول رحلة مجانية',
    'promo.first.description': 'يحصل المستخدمون الجدد على رحلتهم الأولى مجاناً بالكامل. استخدم الكود: WELCOME',
    'promo.weekend.title': 'خصم 20% في عطلة نهاية الأسبوع',
    'promo.weekend.description': 'استمتع بخصم 20% على جميع رحلات نهاية الأسبوع. ساري من الجمعة إلى الأحد.',
    'promo.premium.title': 'مزايا العضوية المميزة',
    'promo.premium.description': 'انضم إلى العضوية المميزة واحصل على أولوية في الحجز، سيارات فاخرة، وخصومات حصرية.',
    
    // Testimonials Section
    'testimonials.title': 'ماذا يقول مستخدمونا',
    'testimonials.subtitle': 'تجارب حقيقية من أشخاص حقيقيين',
    'testimonials.user1.name': 'سارة جونسون',
    'testimonials.user1.role': 'اخصائية اعمال',
    'testimonials.user1.text': 'لقد غيرت سمارت لاين تنقلاتي اليومية. دائماً في الوقت المحدد، سائقون محترفون، وأسعار رائعة!',
    'testimonials.user2.name': 'أحمد الرشيد',
    'testimonials.user2.role': 'طالب جامعي',
    'testimonials.user2.text': 'التطبيق سهل الاستخدام للغاية وخصومات الطلاب مدهشة. أوصي به بشدة!',
    'testimonials.user3.name': 'ماريا جارسيا',
    'testimonials.user3.role': 'عاملة رعاية صحية',
    'testimonials.user3.text': 'رحلات آمنة وموثوقة حتى في ساعات متأخرة. سمارت لاين يمنحني راحة البال.',
    
    // Contact Section
    'contact.title': 'تواصل معنا',
    'contact.subtitle': 'هل لديك أسئلة؟ نحن هنا لمساعدتك على مدار الساعة طوال أيام الأسبوع.',
    'contact.info.title': 'معلومات الاتصال',
    'contact.phone.title': 'الهاتف',
    'contact.phone.number': '+201069503922',
    'contact.email.title': 'البريد الإلكتروني',
    'contact.email.address': 'smartline179@gmail.com',
    'contact.address.title': 'العنوان',
    'contact.address.location': 'الاسكندريه-العجمي-الهانوفيل- متفرع من الخلفاء الراشدين-بجوار معمل النورس',
    'contact.form.title': 'أرسل لنا رسالة',
    'contact.form.name': 'الاسم الكامل',
    'contact.form.name.placeholder': 'أدخل اسمك الكامل',
    'contact.form.email': 'عنوان البريد الإلكتروني',
    'contact.form.email.placeholder': 'أدخل عنوان بريدك الإلكتروني',
    'contact.form.message': 'الرسالة',
    'contact.form.message.placeholder': 'كيف يمكننا مساعدتك؟',
    'contact.form.submit': 'إرسال الرسالة',
    
    // Footer
    'footer.company': 'الشركة',
    'footer.about': 'عن الشركة',
    'footer.careers': 'الوظائف',
    'footer.press': 'الصحافة',
    'footer.support': 'الدعم',
    'footer.help': 'مركز المساعدة',
    'footer.safety': 'الأمان',
    'footer.contact': 'اتصل بنا',
    'footer.legal': 'قانوني',
    'footer.terms': 'شروط الخدمة',
    'footer.privacy': 'سياسة الخصوصية',
    'footer.cookies': 'سياسة ملفات تعريف الارتباط',
    'footer.follow': 'تابعنا',
    'footer.rights': '© 2024 سمارت لاين. جميع الحقوق محفوظة.',
    'footer.tagline': 'حلك الذكي للتنقل',
    
    // Feedback Section
    'feedback.title': 'شارك رأيك',
    'feedback.subtitle': 'ساعدنا في تحسين سمارت لاين من خلال مشاركة تجربتك وتقييم خدمتنا',
    'feedback.rate': 'قيم تجربتك',
    'feedback.message': 'رأيك',
    'feedback.placeholder': 'أخبرنا عن تجربتك مع سمارت لاين...',
    'feedback.submit': 'إرسال الرأي',
    'feedback.thanks': 'شكراً لك!',
    'feedback.success': 'شكراً لك على رأيك! نحن نقدر مساهمتك.',
    'feedback.help': 'ملاحظاتك تساعدنا على تقديم خدمة أفضل لجميع مستخدمينا.',
    
    // Driver Registration
    'driver.title': 'تسجيل السائق',
    'driver.firstName': 'الاسم الأول',
    'driver.lastName': 'الاسم الأخير',
    'driver.email': 'البريد الإلكتروني',
    'driver.phone': 'رقم الهاتف',
    'driver.idType': 'نوع الهوية',
    'driver.idNumber': 'رقم الهوية',
    'driver.password': 'كلمة المرور',
    'driver.confirmPassword': 'تأكيد كلمة المرور',
    'driver.driverPhoto': 'صورة السائق',
    'driver.drivingLicense': 'رخصة القيادة',
    'driver.leadershipLicense': 'رخصة القيادة الدولية',
    'driver.driverCard': 'بطاقة السائق',
    'driver.carFront': 'صورة مقدمة السيارة',
    'driver.carBack': 'صورة خلفية السيارة',
    'driver.criminalRecord': 'صحيفة الحالة الجنائية',
    'driver.submit': 'إرسال الطلب',
    'driver.chooseFile': 'اختيار ملف',
    'driver.selectIdType': 'اختر نوع الهوية',
    'driver.nationalId': 'الهوية الوطنية',
    'driver.passport': 'جواز السفر',
    'driver.driverLicense': 'رخصة القيادة',
    
    // Info Cards Section
    'info.cards.1.title': 'أسرع سمارت سكوتر في مصر 🚀',
    'info.cards.1.desc': '\nبسعر خرافي 4 جنيه للكيلو! 🛵\nاطلبه من SmartLine ووفّر وقتك وفلوسك',
    'info.cards.2.title': '🚗 سيارة سمارت برو',
    'info.cards.2.desc': 'هتخلي مشوارك شيك وعلى قد جيبك بـجد!راحة وأناقة بسعر يناسبك!',
    'info.cards.3.title': '🚘 سيارة سمارت VIP',
    'info.cards.3.desc': 'عندك مناسبة؟ متترددش لحظة!\nعربية هتشرفك وتخليك دايمًا في الصورة 😉',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('ar');

  const t = (key: string): string => {
    const [section, k] = key.split('.');
    // Check if the key exists in the current language, fallback to English if not
    // Also handle potential missing sections or keys gracefully
    return translations[language]?.[key] ?? translations['en'][key] ?? key;
  };

  const isRTL = language === 'ar';

  useEffect(() => {
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language, isRTL]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isRTL }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
