'use server';

import { revalidatePath } from 'next/cache';
import bcrypt from 'bcryptjs';
import { z } from 'zod';
import { prisma } from './prisma';
import { auth, signIn } from './auth';

const signupSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email'),
  password: z.string().min(6, 'Password must be at least 6 chars'),
  role: z.enum(['admin', 'contestant']).default('contestant'),
});

export async function signupAction(formData) {
  const parsed = signupSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
    role: formData.get('role') || 'contestant',
  });

  if (!parsed.success) {
    return { error: parsed.error.errors[0].message };
  }

  const { name, email, password, role } = parsed.data;

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) return { error: 'An account with this email already exists.' };

  const hashed = await bcrypt.hash(password, 10);
  await prisma.user.create({
    data: { name, email, password: hashed, role },
  });

  try {
    await signIn('credentials', {
      email,
      password,
      role,
      redirectTo: role === 'admin' ? '/admin/dashboard' : '/dashboard',
    });
  } catch (e) {
    // signIn throws a redirect error on success; re-throw so Next handles it.
    throw e;
  }
  return { ok: true };
}

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
  role: z.enum(['admin', 'contestant']).optional(),
});

export async function loginAction(formData) {
  const parsed = loginSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
    role: formData.get('role') || 'contestant',
  });
  if (!parsed.success) return { error: 'Please enter a valid email and password.' };

  try {
    await signIn('credentials', {
      ...parsed.data,
      redirectTo: parsed.data.role === 'admin' ? '/admin/dashboard' : '/dashboard',
    });
  } catch (e) {
    if (e?.type === 'CredentialsSignin') return { error: 'Invalid credentials or role.' };
    throw e;
  }
  return { ok: true };
}

export async function registerForHackathon(hackathonId) {
  const session = await auth();
  if (!session?.user) return { error: 'You must be signed in.' };

  const existing = await prisma.registration.findUnique({
    where: { userId_hackathonId: { userId: session.user.id, hackathonId } },
  });
  if (existing) return { error: 'You are already registered.' };

  await prisma.registration.create({
    data: { userId: session.user.id, hackathonId },
  });
  await prisma.hackathon.update({
    where: { id: hackathonId },
    data: { participants: { increment: 1 } },
  });

  revalidatePath(`/hackathon/[slug]`, 'page');
  return { ok: true };
}
