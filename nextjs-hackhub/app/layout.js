import './globals.css';
import { Providers } from './providers';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata = {
  title: {
    default: 'HackHub — Where innovators ship the future',
    template: '%s | HackHub',
  },
  description:
    'Host and join world-class hackathons on HackHub. Ship ideas, meet builders, and win real prizes.',
  keywords: ['hackathon', 'developers', 'students', 'prizes', 'AI', 'Web3'],
  openGraph: {
    title: 'HackHub',
    description: 'Where innovators ship the future.',
    url: 'https://hackhub.dev',
    siteName: 'HackHub',
    type: 'website',
  },
  twitter: { card: 'summary_large_image', title: 'HackHub' },
};

export const viewport = {
  themeColor: '#7c3aed',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen flex flex-col">
        <Providers>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
