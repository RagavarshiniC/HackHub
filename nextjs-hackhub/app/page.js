import Hero from '@/components/Hero';
import RocketShowcase from '@/components/RocketShowcase';
import FeaturesGrid from '@/components/FeaturesGrid';
import TrendingSection from '@/components/TrendingSection';
import TimelineSection from '@/components/TimelineSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import CTASection from '@/components/CTASection';
import { prisma } from '@/lib/prisma';

// Static generation with hourly revalidation (ISR)
export const revalidate = 3600;

export default async function HomePage() {
  const trending = await prisma.hackathon.findMany({
    where: { featured: true },
    orderBy: { date: 'asc' },
    take: 2,
  }).catch(() => []);

  return (
    <div>
      <Hero />
      <RocketShowcase />
      <FeaturesGrid />
      <TrendingSection hackathons={trending} />
      <TimelineSection />
      <TestimonialsSection />
      <CTASection />
    </div>
  );
}
