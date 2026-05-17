'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { motion } from 'framer-motion';
import { Menu, X, Film, UserCircle } from 'lucide-react';

import { getDashboardUrlByRole } from '@/lib/auth/get-dashboard-url';
import AuthLogoutButton from '@/components/shared/auth-logout-button';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session, status } = useSession();
  const isAuthenticated = status === 'authenticated' && Boolean(session?.user);
  const dashboardUrl = getDashboardUrlByRole(session?.user?.role);

  const menuItems = [
    { label: 'Apa Itu Cineku', href: '#about' },
    { label: 'Untuk Siapa', href: '#target' },
    { label: 'Fitur', href: '#features' },
    { label: 'Cara Kerja', href: '#how' },
    { label: 'Roadmap', href: '#roadmap' },
  ];

  return (
    <motion.nav 
      className="navbar fixed w-full top-0 z-50 bg-slate-950/95 backdrop-blur-md border-b border-slate-800/50"
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="#" className="flex items-center gap-2 group">
            <Film className="w-6 h-6 text-amber-400 group-hover:text-amber-300 transition-colors" />
            <span className="font-bold text-lg text-white">Cineku</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-slate-400 hover:text-amber-400 transition-colors text-sm font-medium"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated ? (
              <>
                <Link
                  href={dashboardUrl}
                  className="inline-flex items-center gap-2 rounded-lg bg-amber-500 px-5 py-2 text-sm font-semibold text-slate-950 transition-colors hover:bg-amber-400"
                >
                  {session?.user?.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={session.user.image} alt="" className="h-5 w-5 rounded-full object-cover" />
                  ) : (
                    <UserCircle className="h-5 w-5" aria-hidden="true" />
                  )}
                  Dashboard
                </Link>
                <AuthLogoutButton className="w-auto rounded-lg px-4 py-2" />
              </>
            ) : (
              <Link
                href="/login"
                className="rounded-lg bg-amber-500 px-6 py-2 font-semibold text-slate-950 transition-colors hover:bg-amber-400"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-slate-400 hover:text-white transition-colors"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 border-t border-slate-800">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block py-3 text-slate-400 hover:text-amber-400 transition-colors text-sm font-medium"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            {isAuthenticated ? (
              <div className="mt-4 space-y-3">
                <Link
                  href={dashboardUrl}
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-amber-500 px-6 py-2 font-semibold text-slate-950 transition-colors hover:bg-amber-400"
                  onClick={() => setIsOpen(false)}
                >
                  {session?.user?.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={session.user.image} alt="" className="h-5 w-5 rounded-full object-cover" />
                  ) : (
                    <UserCircle className="h-5 w-5" aria-hidden="true" />
                  )}
                  Dashboard
                </Link>
                <AuthLogoutButton className="rounded-lg border-slate-700 bg-slate-900/80 py-2" />
              </div>
            ) : (
              <Link
                href="/login"
                className="mt-4 block w-full rounded-lg bg-amber-500 px-6 py-2 text-center font-semibold text-slate-950 transition-colors hover:bg-amber-400"
                onClick={() => setIsOpen(false)}
              >
                Login
              </Link>
            )}
          </div>
        )}
      </div>
    </motion.nav>
  );
}
