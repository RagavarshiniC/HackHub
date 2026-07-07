import ExploreClient from '@/components/ExploreClient';
import { prisma } from '@/lib/prisma';

export const metadata = { title: 'Explore hackathons' };

// ISR — rebuild list every 60s
export const revalidate = 60;

export default async function ExplorePage() {
  const hackathons = await prisma.hackathon.findMany({
    orderBy: { date: 'asc' },
  }).catch(() => []);

  const plain = hackathons.map((h) => ({
    ...h,
    date: h.date.toISOString().slice(0, 10),
    endDate: h.endDate.toISOString().slice(0, 10),
    tags: h.tags ? h.tags.split(',') : [],
  }));

  return <ExploreClient hackathons={plain} />;
}
