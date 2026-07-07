// Seed script for HackHub Prisma / SQLite database.
// Run with: npm run db:seed

import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

const HACKATHONS = [
  {
    slug: 'web3-builders-weekend',
    title: 'Web3 Builders Weekend',
    description: 'Ship decentralized apps in 48 hours. Prizes for best DeFi, NFT, and DAO projects.',
    category: 'Web3',
    mode: 'Online',
    location: 'Online',
    date: new Date('2025-09-05'),
    endDate: new Date('2025-09-07'),
    prize: '\u20B94,00,000 + Mentorship',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&q=80',
    tags: 'DeFi,NFT,DAO',
    featured: true,
    participants: 1240,
  },
  {
    slug: 'ai-for-good-2025',
    title: 'AI For Good 2025',
    description: 'Build AI solutions for social impact challenges. Open to all skill levels.',
    category: 'AI/ML',
    mode: 'Hybrid',
    location: 'Bengaluru, IN',
    date: new Date('2025-08-15'),
    endDate: new Date('2025-08-17'),
    prize: '\u20B98,00,000 + Google Cloud Credits',
    image: 'https://images.unsplash.com/photo-1637073849667-91120a924221?w=1200&q=80',
    tags: 'AI,ML,Social Impact',
    featured: true,
    participants: 2870,
  },
  {
    slug: 'devops-arena',
    title: 'DevOps Arena',
    description: '72-hour challenge to automate cloud infra with modern DevOps tooling.',
    category: 'DevOps',
    mode: 'Online',
    location: 'Online',
    date: new Date('2025-10-12'),
    endDate: new Date('2025-10-15'),
    prize: '\u20B92,50,000',
    image: 'https://images.unsplash.com/photo-1632910121591-29e2484c0259?w=1200&q=80',
    tags: 'Cloud,Kubernetes,CI/CD',
    featured: false,
    participants: 640,
  },
  {
    slug: 'fintech-forge',
    title: 'FinTech Forge',
    description: 'Reimagine banking, lending, and payments with modern APIs and AI.',
    category: 'FinTech',
    mode: 'In-person',
    location: 'Mumbai, IN',
    date: new Date('2025-11-01'),
    endDate: new Date('2025-11-03'),
    prize: '\u20B95,00,000 + Internships',
    image: 'https://images.unsplash.com/photo-1653387300291-bfa1eeb90e16?w=1200&q=80',
    tags: 'FinTech,Payments,APIs',
    featured: false,
    participants: 980,
  },
  {
    slug: 'design-jam',
    title: 'Design Jam: Zero to One',
    description: 'A weekend for designers and devs to craft delightful product experiences.',
    category: 'Design',
    mode: 'Online',
    location: 'Online',
    date: new Date('2025-09-20'),
    endDate: new Date('2025-09-22'),
    prize: '\u20B91,50,000 + Figma Credits',
    image: 'https://images.pexels.com/photos/6424590/pexels-photo-6424590.jpeg?w=1200',
    tags: 'UI/UX,Product,Figma',
    featured: false,
    participants: 430,
  },
  {
    slug: 'green-code',
    title: 'Green Code Challenge',
    description: 'Build software that reduces carbon footprint or promotes sustainability.',
    category: 'ClimateTech',
    mode: 'Online',
    location: 'Online',
    date: new Date('2025-12-05'),
    endDate: new Date('2025-12-07'),
    prize: '\u20B93,00,000 + Grants',
    image: 'https://images.unsplash.com/photo-1629904853716-f0bc54eea481?w=1200&q=80',
    tags: 'Climate,Sustainability,Data',
    featured: false,
    participants: 720,
  },
];

async function main() {
  console.log('Seeding database...');

  // Admin user
  const adminHash = await bcrypt.hash('admin123', 10);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@hackhub.dev' },
    update: { role: 'admin' },
    create: {
      email: 'admin@hackhub.dev',
      name: 'Ada Admin',
      password: adminHash,
      role: 'admin',
    },
  });

  // Sample contestant
  const userHash = await bcrypt.hash('password', 10);
  await prisma.user.upsert({
    where: { email: 'you@hackhub.dev' },
    update: {},
    create: {
      email: 'you@hackhub.dev',
      name: 'Sample Contestant',
      password: userHash,
      role: 'contestant',
    },
  });

  for (const h of HACKATHONS) {
    await prisma.hackathon.upsert({
      where: { slug: h.slug },
      update: {},
      create: { ...h, organizerId: admin.id },
    });
  }

  console.log('Seed complete.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
