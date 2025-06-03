
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';

interface AuthModalProps {
  children?: React.ReactNode;
  isOpen?: boolean;
  onClose?: () => void;
  mode?: 'login' | 'signup';
}

const AuthModal = ({ children, isOpen, onClose, mode = 'login' }: AuthModalProps) => {
  const [internalOpen, setInternalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState(mode === 'signup' ? 'signup' : 'signin');
  const { signIn, signUp } = useAuth();
  const { isRTL } = useLanguage();

  // Use controlled state if provided, otherwise use internal state
  const open = isOpen !== undefined ? isOpen : internalOpen;
  const setOpen = onClose !== undefined ? onClose : setInternalOpen;

  const [signInData, setSignInData] = useState({
    email: '',
    password: '',
  });

  const [signUpData, setSignUpData] = useState({
    fullName: '',
    email: '',
    password: '',
  });

  const translations = {
    en: {
      welcome: 'Welcome to SmartLine',
      signIn: 'Sign In',
      signUp: 'Sign Up',
      email: 'Email',
      password: 'Password',
      fullName: 'Full Name',
      signingIn: 'Signing In...',
      creatingAccount: 'Creating Account...',
      needFullFeatures: 'Need driver registration or full features?',
      goToFullPage: 'Go to full signup page'
    },
    ar: {
      welcome: 'مرحباً بك في سمارت لاين',
      signIn: 'تسجيل الدخول',
      signUp: 'إنشاء حساب',
      email: 'البريد الإلكتروني',
      password: 'كلمة المرور',
      fullName: 'الاسم الكامل',
      signingIn: 'جاري تسجيل الدخول...',
      creatingAccount: 'جاري إنشاء الحساب...',
      needFullFeatures: 'تحتاج لتسجيل سائق أو ميزات كاملة؟',
      goToFullPage: 'اذهب لصفحة التسجيل الكاملة'
    }
  };

  const currentLang = isRTL ? 'ar' : 'en';

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signIn(signInData.email, signInData.password);
      setOpen(false);
      setSignInData({ email: '', password: '' });
    } catch (error) {
      console.error('Sign in error:', error);
    }
    setLoading(false);
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signUp(signUpData.email, signUpData.password, signUpData.fullName, 'passenger');
      setOpen(false);
      setSignUpData({ fullName: '', email: '', password: '' });
    } catch (error) {
      console.error('Sign up error:', error);
    }
    setLoading(false);
  };

  const ContentComponent = () => (
    <>
      <DialogHeader>
        <DialogTitle className={isRTL ? 'font-cairo' : 'font-inter'}>
          {translations[currentLang].welcome}
        </DialogTitle>
      </DialogHeader>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="signin" className={isRTL ? 'font-cairo' : 'font-inter'}>
            {translations[currentLang].signIn}
          </TabsTrigger>
          <TabsTrigger value="signup" className={isRTL ? 'font-cairo' : 'font-inter'}>
            {translations[currentLang].signUp}
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="signin" className="space-y-4">
          <form onSubmit={handleSignIn} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="signin-email" className={isRTL ? 'font-cairo' : 'font-inter'}>
                {translations[currentLang].email}
              </Label>
              <Input
                id="signin-email"
                type="email"
                value={signInData.email}
                onChange={(e) => setSignInData({ ...signInData, email: e.target.value })}
                required
                className={isRTL ? 'font-cairo text-right' : 'font-inter'}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="signin-password" className={isRTL ? 'font-cairo' : 'font-inter'}>
                {translations[currentLang].password}
              </Label>
              <Input
                id="signin-password"
                type="password"
                value={signInData.password}
                onChange={(e) => setSignInData({ ...signInData, password: e.target.value })}
                required
                className={isRTL ? 'font-cairo text-right' : 'font-inter'}
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? translations[currentLang].signingIn : translations[currentLang].signIn}
            </Button>
          </form>
        </TabsContent>
        
        <TabsContent value="signup" className="space-y-4">
          <form onSubmit={handleSignUp} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="signup-name" className={isRTL ? 'font-cairo' : 'font-inter'}>
                {translations[currentLang].fullName}
              </Label>
              <Input
                id="signup-name"
                type="text"
                value={signUpData.fullName}
                onChange={(e) => setSignUpData({ ...signUpData, fullName: e.target.value })}
                required
                className={isRTL ? 'font-cairo text-right' : 'font-inter'}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="signup-email" className={isRTL ? 'font-cairo' : 'font-inter'}>
                {translations[currentLang].email}
              </Label>
              <Input
                id="signup-email"
                type="email"
                value={signUpData.email}
                onChange={(e) => setSignUpData({ ...signUpData, email: e.target.value })}
                required
                className={isRTL ? 'font-cairo text-right' : 'font-inter'}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="signup-password" className={isRTL ? 'font-cairo' : 'font-inter'}>
                {translations[currentLang].password}
              </Label>
              <Input
                id="signup-password"
                type="password"
                value={signUpData.password}
                onChange={(e) => setSignUpData({ ...signUpData, password: e.target.value })}
                required
                className={isRTL ? 'font-cairo text-right' : 'font-inter'}
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? translations[currentLang].creatingAccount : translations[currentLang].signUp}
            </Button>
          </form>
          
          {/* Link to full signup page */}
          <div className="text-center pt-4 border-t">
            <p className={`text-sm text-gray-600 mb-2 ${isRTL ? 'font-cairo' : 'font-inter'}`}>
              {translations[currentLang].needFullFeatures}
            </p>
            <Button
              variant="link"
              onClick={() => {
                setOpen(false);
                window.location.href = '/auth?mode=signup';
              }}
              className="text-primary-600 hover:text-primary-700 font-medium"
            >
              {translations[currentLang].goToFullPage}
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </>
  );

  // If children are provided, use trigger pattern
  if (children) {
    return (
      <Dialog open={internalOpen} onOpenChange={setInternalOpen}>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent className="sm:max-w-[500px]">
          <ContentComponent />
        </DialogContent>
      </Dialog>
    );
  }

  // Otherwise use controlled pattern
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[500px]">
        <ContentComponent />
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
