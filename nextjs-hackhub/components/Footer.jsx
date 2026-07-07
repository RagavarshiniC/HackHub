import Link from 'next/link';
import { Code2, Github, Twitter, Linkedin, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="mt-24 border-t bg-secondary/30">
      <div className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-2">
              <span className="w-9 h-9 rounded-xl brand-gradient-bg flex items-center justify-center">
                <Code2 className="w-5 h-5 text-white" />
              </span>
              <span className="font-extrabold text-lg tracking-tight">
                <span>Hack</span><span className="brand-gradient-text">Hub</span>
              </span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground max-w-sm">
              A modern platform for organizers to host world-class hackathons and for builders to
              turn ideas into shipped products — in a weekend.
            </p>
            <div className="mt-6 flex items-center gap-3">
              {[Github, Twitter, Linkedin, Mail].map((Icon, i) => (
                <a key={i} href="#" className="w-9 h-9 rounded-full border flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-4">Platform</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/explore" className="hover:text-foreground">Explore</Link></li>
              <li><Link href="/about" className="hover:text-foreground">About</Link></li>
              <li><Link href="/support" className="hover:text-foreground">Support</Link></li>
              <li><Link href="/login/admin" className="hover:text-foreground">Host a hackathon</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground">Guidelines</a></li>
              <li><a href="#" className="hover:text-foreground">Judging</a></li>
              <li><a href="#" className="hover:text-foreground">Sponsors</a></li>
              <li><a href="#" className="hover:text-foreground">API docs</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} HackHub. Built for builders.
          </p>
          <div className="flex items-center gap-6 text-xs text-muted-foreground">
            <a href="#" className="hover:text-foreground">Privacy</a>
            <a href="#" className="hover:text-foreground">Terms</a>
            <a href="#" className="hover:text-foreground">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
