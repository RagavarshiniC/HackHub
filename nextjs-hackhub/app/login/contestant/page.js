import LoginPageClient from '@/components/LoginPageClient';

export const metadata = { title: 'Contestant sign in' };

export default function ContestantLogin() {
  return <LoginPageClient role="contestant" />;
}
