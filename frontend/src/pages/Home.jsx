import React from 'react';
import Hero from '../components/Hero';
import RocketShowcase from '../components/RocketShowcase';
import FeaturesGrid from '../components/FeaturesGrid';
import TrendingSection from '../components/TrendingSection';
import TimelineSection from '../components/TimelineSection';
import TestimonialsSection from '../components/TestimonialsSection';
import CTASection from '../components/CTASection';

const Home = () => {
  return (
    <div>
      <Hero />
      <RocketShowcase />
      <FeaturesGrid />
      <TrendingSection />
      <TimelineSection />
      <TestimonialsSection />
      <CTASection />
    </div>
  );
};

export default Home;
