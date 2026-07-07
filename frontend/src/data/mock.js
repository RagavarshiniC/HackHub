// Mock data for HackHub

export const HACKATHONS = [
  {
    id: 'web3-builders-weekend',
    title: 'Web3 Builders Weekend',
    description: 'Ship decentralized apps in 48 hours. Prizes for best DeFi, NFT, and DAO projects.',
    category: 'Web3',
    date: '2025-09-05',
    endDate: '2025-09-07',
    prize: '₹4,00,000 + Mentorship',
    prizeShort: '₹4,00,000 + Mentorsh',
    location: 'Online',
    mode: 'Online',
    participants: 1240,
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDN8MHwxfHNlYXJjaHwxfHxkZXZlbG9wZXJzJTIwdGVhbXxlbnwwfHx8fDE3ODM0NTU0MzZ8MA&ixlib=rb-4.1.0&q=85',
    tags: ['DeFi', 'NFT', 'DAO'],
    organizer: 'ChainCraft Labs',
    featured: true,
  },
  {
    id: 'ai-for-good-2025',
    title: 'AI For Good 2025',
    description: 'Build AI solutions for social impact challenges. Open to all skill levels.',
    category: 'AI/ML',
    date: '2025-08-15',
    endDate: '2025-08-17',
    prize: '₹8,00,000 + Google Cloud Credits',
    prizeShort: '₹8,00,000 + Google C',
    location: 'Bengaluru, IN',
    mode: 'Hybrid',
    participants: 2870,
    image: 'https://images.unsplash.com/photo-1637073849667-91120a924221?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzNTl8MHwxfHNlYXJjaHw0fHxoYWNrYXRob24lMjBjb2Rpbmd8ZW58MHx8fHwxNzgzNDU1NDMwfDA&ixlib=rb-4.1.0&q=85',
    tags: ['AI', 'ML', 'Social Impact'],
    organizer: 'OpenMinds Foundation',
    featured: true,
  },
  {
    id: 'devops-arena',
    title: 'DevOps Arena',
    description: '72-hour challenge to automate cloud infra with modern DevOps tooling.',
    category: 'DevOps',
    date: '2025-10-12',
    endDate: '2025-10-15',
    prize: '₹2,50,000',
    prizeShort: '₹2,50,000',
    location: 'Online',
    mode: 'Online',
    participants: 640,
    image: 'https://images.unsplash.com/photo-1632910121591-29e2484c0259?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzNTl8MHwxfHNlYXJjaHwzfHxoYWNrYXRob24lMjBjb2Rpbmd8ZW58MHx8fHwxNzgzNDU1NDMwfDA&ixlib=rb-4.1.0&q=85',
    tags: ['Cloud', 'Kubernetes', 'CI/CD'],
    organizer: 'CloudNova',
    featured: false,
  },
  {
    id: 'fintech-forge',
    title: 'FinTech Forge',
    description: 'Reimagine banking, lending, and payments with modern APIs and AI.',
    category: 'FinTech',
    date: '2025-11-01',
    endDate: '2025-11-03',
    prize: '₹5,00,000 + Internships',
    prizeShort: '₹5,00,000 + Interns',
    location: 'Mumbai, IN',
    mode: 'In-person',
    participants: 980,
    image: 'https://images.unsplash.com/photo-1653387300291-bfa1eeb90e16?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzNTl8MHwxfHNlYXJjaHwxfHxoYWNrYXRob24lMjBjb2Rpbmd8ZW58MHx8fHwxNzgzNDU1NDMwfDA&ixlib=rb-4.1.0&q=85',
    tags: ['FinTech', 'Payments', 'APIs'],
    organizer: 'Neo Capital',
    featured: false,
  },
  {
    id: 'design-jam',
    title: 'Design Jam: Zero to One',
    description: 'A weekend for designers and devs to craft delightful product experiences.',
    category: 'Design',
    date: '2025-09-20',
    endDate: '2025-09-22',
    prize: '₹1,50,000 + Figma Credits',
    prizeShort: '₹1,50,000 + Figma',
    location: 'Online',
    mode: 'Online',
    participants: 430,
    image: 'https://images.pexels.com/photos/6424590/pexels-photo-6424590.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    tags: ['UI/UX', 'Product', 'Figma'],
    organizer: 'PixelPulse',
    featured: false,
  },
  {
    id: 'green-code',
    title: 'Green Code Challenge',
    description: 'Build software that reduces carbon footprint or promotes sustainability.',
    category: 'ClimateTech',
    date: '2025-12-05',
    endDate: '2025-12-07',
    prize: '₹3,00,000 + Grants',
    prizeShort: '₹3,00,000 + Grants',
    location: 'Online',
    mode: 'Online',
    participants: 720,
    image: 'https://images.unsplash.com/photo-1629904853716-f0bc54eea481?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDN8MHwxfHNlYXJjaHw0fHxkZXZlbG9wZXJzJTIwdGVhbXxlbnwwfHx8fDE3ODM0NTU0MzZ8MA&ixlib=rb-4.1.0&q=85',
    tags: ['Climate', 'Sustainability', 'Data'],
    organizer: 'EarthByte',
    featured: false,
  },
];

export const FEATURES = [
  {
    icon: 'Rocket',
    color: 'from-violet-500 to-indigo-500',
    title: 'Host in minutes',
    body: 'Beautiful event pages, prize tiers, and schedules — all set up in under 5 minutes.',
  },
  {
    icon: 'Users',
    color: 'from-fuchsia-500 to-pink-500',
    title: 'Global community',
    body: '45,000+ builders across 90 countries — all searching for their next great team.',
  },
  {
    icon: 'Trophy',
    color: 'from-rose-500 to-red-500',
    title: 'Win real prizes',
    body: 'Cash, mentorship, internships, and life-changing career opportunities.',
  },
  {
    icon: 'Zap',
    color: 'from-amber-500 to-orange-500',
    title: 'One-click auth',
    body: 'Sign up with Google, GitHub, or email. Jump straight to building.',
  },
  {
    icon: 'Globe',
    color: 'from-sky-500 to-blue-500',
    title: 'Online or IRL',
    body: 'Filter by location or join hybrid hackathons from anywhere in the world.',
  },
  {
    icon: 'Award',
    color: 'from-emerald-500 to-teal-500',
    title: 'Get discovered',
    body: 'Build a public track record. Recruiters and sponsors browse winners daily.',
  },
];

export const STATS = [
  { value: '250+', label: 'HACKATHONS' },
  { value: '45k+', label: 'DEVELOPERS' },
  { value: '₹2Cr+', label: 'IN PRIZES' },
];

export const FAQS = [
  {
    q: 'Who can participate on HackHub?',
    a: 'Anyone — students, professionals, designers, engineers, and hobbyists. Most events are free to join.',
  },
  {
    q: 'How do organizers publish an event?',
    a: 'Sign in as an Admin, click "Host hackathon" and fill in event details, prize tiers, and judging criteria.',
  },
  {
    q: 'Are there team-formation tools?',
    a: 'Yes. Every event has a team-matching board with skills, timezones, and looking-for filters.',
  },
  {
    q: 'How are winners selected?',
    a: 'Judges score submissions on innovation, execution, and impact. Community upvotes also carry weight.',
  },
  {
    q: 'How do I contact support?',
    a: 'Head to the Support page or email hello@hackhub.dev — we respond within 24 hours.',
  },
];

export const TESTIMONIALS = [
  {
    name: 'Aarav Mehta',
    role: 'Founding Engineer, Cirq',
    quote: 'HackHub helped me find my co-founder. We shipped in 48 hours and raised a seed round 3 months later.',
    avatar: 'AM',
  },
  {
    name: 'Priya Rao',
    role: 'Product Designer, Loop',
    quote: 'The community is unreal. Every hackathon feels like a mini conference — the mentors are top tier.',
    avatar: 'PR',
  },
  {
    name: 'Kabir Shah',
    role: 'ML Engineer, Nimbus',
    quote: 'I landed my first internship after winning AI For Good. Recruiters actually browse the leaderboard!',
    avatar: 'KS',
  },
];

export const TIMELINE = [
  { step: '01', title: 'Discover', body: 'Browse hackathons filtered by tech, prize, and mode.' },
  { step: '02', title: 'Team up', body: 'Match with builders that complement your skills.' },
  { step: '03', title: 'Ship it', body: 'Build over the weekend with mentor office-hours.' },
  { step: '04', title: 'Win & grow', body: 'Get discovered by recruiters, sponsors, and investors.' },
];

export const MOCK_ADMIN = {
  email: 'admin@hackhub.dev',
  password: 'admin123',
};

export const MOCK_USER = {
  email: 'you@hackhub.dev',
  password: 'password',
};
