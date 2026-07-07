import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';
import NewHackathonForm from '@/components/NewHackathonForm';

export const metadata = { title: 'Host a new hackathon' };

export default async function NewHackathonPage() {
  const session = await auth();
  if (!session?.user) redirect('/login/admin?callbackUrl=/admin/new');
  if (session.user.role !== 'admin') redirect('/dashboard');

  return <NewHackathonForm />;
}
