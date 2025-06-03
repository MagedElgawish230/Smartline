
import React from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import GoAnywhereSection from '../components/GoAnywhereSection';
import RecentActivitySection from '../components/RecentActivitySection';
import DriveEarnSection from '../components/DriveEarnSection';
import EasierInAppsSection from '../components/EasierInAppsSection';
import AboutSection from '../components/AboutSection';
import FounderSection from '../components/FounderSection';
import DownloadSection from '../components/DownloadSection';
import PromotionsSection from '../components/PromotionsSection';
import TestimonialsSection from '../components/TestimonialsSection';
import FeedbackRatingSection from '../components/FeedbackRatingSection';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <GoAnywhereSection />
      <RecentActivitySection />
      <DriveEarnSection />
      <EasierInAppsSection />
      <AboutSection />
      <FounderSection />
      <DownloadSection />
      <PromotionsSection />
      <TestimonialsSection />
      <FeedbackRatingSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
