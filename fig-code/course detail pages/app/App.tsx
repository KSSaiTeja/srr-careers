import { useState } from 'react';
import SapFicoCourseDetailPageDesignDraft from '../imports/SapFicoCourseDetailPageDesignDraft/SapFicoCourseDetailPageDesignDraft';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { CourseOverview } from './components/CourseOverview';
import { WhoIsItFor } from './components/WhoIsItFor';
import { Syllabus } from './components/Syllabus';
import { AlsoOffered } from './components/AlsoOffered';
import { CTASection } from './components/CTASection';
import { Testimonials } from './components/Testimonials';
import { FAQs } from './components/FAQs';
import { BookDemo } from './components/BookDemo';
import { Footer } from './components/Footer';

export default function App() {
  return (
    <div className="relative w-full min-h-screen bg-white overflow-x-hidden">
      <Header />
      <HeroSection />
      <CourseOverview />
      <WhoIsItFor />
      <Syllabus />
      <AlsoOffered />
      <CTASection />
      <Testimonials />
      <FAQs />
      <BookDemo />
      <Footer />
    </div>
  );
}
