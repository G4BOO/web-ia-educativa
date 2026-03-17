"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const NAV_ITEMS = [
  { href: '/', icon: 'home', label: 'Inicio' },
  { href: '/playground', icon: 'smart_toy', label: 'Playground' },
  { href: '/guias', icon: 'auto_stories', label: 'Guías' },
  { href: '/blog', icon: 'newspaper', label: 'Blog' },
];

export function Sidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  const SidebarContent = () => (
    <>
      <div className="p-5 md:p-6">
        <Link href="/" className="flex items-center gap-3 text-primary mb-8" onClick={() => setMobileOpen(false)}>
          <span className="material-symbols-outlined text-3xl font-bold">school</span>
          <h1 className="text-xl font-bold tracking-tight">Otto AI</h1>
        </Link>
        <nav className="space-y-1.5">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all group ${
                isActive(item.href)
                  ? 'bg-primary/10 text-primary shadow-sm'
                  : 'text-slate-600 dark:text-zinc-400 hover:bg-primary/5 hover:text-primary'
              }`}
            >
              <span className="material-symbols-outlined">{item.icon}</span>
              <span>{item.label}</span>
              {isActive(item.href) && (
                <span className="ml-auto w-1.5 h-1.5 rounded-full bg-primary"></span>
              )}
            </Link>
          ))}
        </nav>
      </div>
      <div className="mt-auto p-5 md:p-6 border-t border-primary/5">
        <div className="flex items-center gap-3 px-2">
          <div className="size-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold overflow-hidden">
            <span className="material-symbols-outlined">person</span>
          </div>
          <div>
            <p className="text-sm font-semibold">Docente</p>
            <p className="text-xs text-slate-500">Cuenta de Educador</p>
          </div>
        </div>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile hamburger button */}
      <button
        type="button"
        onClick={() => setMobileOpen(!mobileOpen)}
        className="md:hidden fixed top-5 right-5 z-50 p-2 rounded-xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-700 shadow-lg shadow-black/5 cursor-pointer"
        aria-label="Toggle menu"
      >
        <span className="material-symbols-outlined text-primary">
          {mobileOpen ? 'close' : 'menu'}
        </span>
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/40 z-40 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile sidebar drawer */}
      <aside className={`
        md:hidden fixed left-0 top-0 bottom-0 z-40 w-72 
        bg-white dark:bg-zinc-900 border-r border-primary/10 
        flex flex-col h-full 
        transition-transform duration-300 ease-in-out
        ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <SidebarContent />
      </aside>

      {/* Desktop sidebar */}
      <aside className="hidden md:flex w-64 border-r border-primary/10 bg-white dark:bg-zinc-900 flex-col h-full shrink-0">
        <SidebarContent />
      </aside>
    </>
  );
}
