
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import LanguageToggle from './LanguageToggle';
import { Button } from '@/components/ui/button';
import { Settings, User, LogOut } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const Header = () => {
  const { t, isRTL } = useLanguage();
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  // TODO: Replace with actual admin check from user profile
  const isAdmin = user?.email === 'admin@smartline.com'; // Temporary admin check

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
  };

  const handleSignup = () => {
    navigate('/auth?mode=signup');
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
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

          {/* Navigation */}
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

          {/* Right side */}
          <div className="flex items-center space-x-4">
            <LanguageToggle />
            
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center space-x-2">
                    <User className="h-4 w-4" />
                    <span className="hidden sm:inline">{user.email}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem onClick={() => navigate('/dashboard')}>
                    <User className="h-4 w-4 mr-2" />
                    {translations[currentLang].dashboard}
                  </DropdownMenuItem>
                  {isAdmin && (
                    <DropdownMenuItem onClick={() => navigate('/admin-dashboard')}>
                      <Settings className="h-4 w-4 mr-2" />
                      {translations[currentLang].adminDashboard}
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
      </div>
    </header>
  );
};

export default Header;
