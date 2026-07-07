import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-32 text-center">
      <div className="text-6xl font-extrabold brand-gradient-text">404</div>
      <h1 className="mt-4 text-3xl font-bold">Page not found</h1>
      <p className="mt-2 text-muted-foreground">
        The page you are looking for doesn\u2019t exist or was moved.
      </p>
      <Link
        href="/"
        className="mt-6 inline-flex items-center h-11 px-6 rounded-full brand-gradient-bg text-white"
      >
        Back to home
      </Link>
    </div>
  );
}
