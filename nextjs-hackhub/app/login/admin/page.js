import LoginPageClient from '@/components/LoginPageClient';

export const metadata = { title: 'Admin sign in' };

export default function AdminLogin() {
  return <LoginPageClient role="admin" />;
}
