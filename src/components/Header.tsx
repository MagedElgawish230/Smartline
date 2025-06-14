import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import LanguageToggle from './LanguageToggle';
import { Button } from '@/components/ui/button';
import { Settings, User, LogOut, Menu, X } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const Header = () => {
  const { t, isRTL } = useLanguage();
  const { user, signOut, profile } = useAuth();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isAdmin = profile?.role === 'admin';

  const translations = {
    en: {
      home: 'Home',
      about: 'About',
      contact: 'Contact',
      login: 'Sign In',
      signup: 'Sign Up',
      dashboard: 'Dashboard',
      adminDashboard: 'Admin Dashboard',
      profile: 'Profile',
      settings: 'Settings',
      logout: 'Sign Out'
    },
    ar: {
      home: 'الرئيسية',
      about: 'عن الشركة',
      contact: 'اتصل بنا',
      login: 'تسجيل الدخول',
      signup: 'إنشاء حساب',
      dashboard: 'لوحة التحكم',
      adminDashboard: 'لوحة الإدارة',
      profile: 'الملف الشخصي',
      settings: 'الإعدادات',
      logout: 'تسجيل الخروج'
    }
  };

  const currentLang = isRTL ? 'ar' : 'en';

  const handleLogin = () => {
    navigate('/auth?mode=login');
    setIsMobileMenuOpen(false);
  };

  const handleSignup = () => {
    navigate('/auth?mode=signup');
    setIsMobileMenuOpen(false);
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className={`bg-white shadow-sm sticky top-0 z-50 ${isRTL ? 'font-cairo' : 'font-inter'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-bold text-primary-600">
              SmartLine
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden p-2 rounded-md text-gray-700 hover:text-primary-600 hover:bg-gray-100 focus:outline-none"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link
              to="/"
              className="text-gray-700 hover:text-primary-600 px-3 py-2 text-sm font-medium transition-colors"
            >
              {translations[currentLang].home}
            </Link>
            <a
              href="#about"
              className="text-gray-700 hover:text-primary-600 px-3 py-2 text-sm font-medium transition-colors"
            >
              {translations[currentLang].about}
            </a>
            <a
              href="#contact"
              className="text-gray-700 hover:text-primary-600 px-3 py-2 text-sm font-medium transition-colors"
            >
              {translations[currentLang].contact}
            </a>
          </nav>

          {/* Desktop Right side */}
          <div className="hidden md:flex items-center space-x-4">
            <LanguageToggle />
            
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center space-x-2">
                    <User className="h-4 w-4" />
                    <span>{user.email}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  {/* Only show Dashboard link if user is admin */}
                  {isAdmin && (
                    <DropdownMenuItem onClick={() => navigate('/dashboard')}>
                      <User className="h-4 w-4 mr-2" />
                      {translations[currentLang].dashboard}
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem onClick={handleSignOut}>
                    <LogOut className="h-4 w-4 mr-2" />
                    {translations[currentLang].logout}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  onClick={handleLogin}
                  className="text-gray-700 hover:text-primary-600"
                >
                  {translations[currentLang].login}
                </Button>
                <Button
                  onClick={handleSignup}
                  className="bg-primary-600 hover:bg-primary-700 text-white"
                >
                  {translations[currentLang].signup}
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link
                to="/"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {translations[currentLang].home}
              </Link>
              <a
                href="#about"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {translations[currentLang].about}
              </a>
              <a
                href="#contact"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {translations[currentLang].contact}
              </a>
            </div>
            <div className="pt-4 pb-3 border-t border-gray-200">
              <div className="flex items-center px-5">
                <LanguageToggle />
              </div>
              <div className="mt-3 px-2 space-y-1">
                {user ? (
                  <>
                    {/* Only show Dashboard link if user is admin (mobile) */}
                    {isAdmin && (
                      <button
                        onClick={() => {
                          navigate('/dashboard');
                          setIsMobileMenuOpen(false);
                        }}
                        className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50"
                      >
                        {translations[currentLang].dashboard}
                      </button>
                    )}
                    <button
                      onClick={handleSignOut}
                      className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50"
                    >
                      {translations[currentLang].logout}
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={handleLogin}
                      className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50"
                    >
                      {translations[currentLang].login}
                    </button>
                    <button
                      onClick={handleSignup}
                      className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-primary-600 hover:text-primary-700 hover:bg-gray-50"
                    >
                      {translations[currentLang].signup}
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
