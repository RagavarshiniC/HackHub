'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
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


// ------- Admin: create a new hackathon --------
function slugify(title) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 60);
}

const createHackathonSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  category: z.string().min(1, 'Category is required'),
  mode: z.enum(['Online', 'Hybrid', 'In-person'], { message: 'Pick a valid mode' }),
  location: z.string().min(1, 'Location is required'),
  date: z.string().min(1, 'Start date is required'),
  endDate: z.string().min(1, 'End date is required'),
  prize: z.string().min(1, 'Prize is required'),
  image: z.string().url('Image must be a valid URL'),
  tags: z.string().optional().default(''),
  featured: z.boolean().optional().default(false),
});

export async function createHackathon(prevState, formData) {
  const session = await auth();
  if (!session?.user || session.user.role !== 'admin') {
    return { error: 'You must be signed in as an admin.' };
  }

  const parsed = createHackathonSchema.safeParse({
    title: formData.get('title'),
    description: formData.get('description'),
    category: formData.get('category'),
    mode: formData.get('mode'),
    location: formData.get('location'),
    date: formData.get('date'),
    endDate: formData.get('endDate'),
    prize: formData.get('prize'),
    image: formData.get('image'),
    tags: formData.get('tags') || '',
    featured: formData.get('featured') === 'on',
  });

  if (!parsed.success) {
    return { error: parsed.error.errors[0].message };
  }

  const d = parsed.data;
  const start = new Date(d.date);
  const end = new Date(d.endDate);
  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) {
    return { error: 'Invalid date(s) provided.' };
  }
  if (end < start) {
    return { error: 'End date cannot be before start date.' };
  }

  // Ensure unique slug
  const base = slugify(d.title) || 'hackathon';
  let slug = base;
  let i = 1;
  // eslint-disable-next-line no-await-in-loop
  while (await prisma.hackathon.findUnique({ where: { slug } })) {
    slug = `${base}-${i++}`;
  }

  await prisma.hackathon.create({
    data: {
      slug,
      title: d.title,
      description: d.description,
      category: d.category,
      mode: d.mode,
      location: d.location,
      date: start,
      endDate: end,
      prize: d.prize,
      image: d.image,
      tags: d.tags,
      featured: d.featured,
      participants: 0,
      organizerId: session.user.id,
    },
  });

  revalidatePath('/admin/dashboard');
  revalidatePath('/explore');
  revalidatePath('/');
  redirect(`/hackathon/${slug}`);
}
