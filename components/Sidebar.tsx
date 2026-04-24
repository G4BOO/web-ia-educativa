"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Home, Bot, BookOpen, Sparkles, Menu, X, GraduationCap } from 'lucide-react';

const NAV_ITEMS = [
  { href: '/', icon: Home, label: 'Inicio' },
  { href: '/playground', icon: Bot, label: 'Playground' },
  { href: '/prompts', icon: Sparkles, label: 'Prompts' },
  { href: '/guias', icon: BookOpen, label: 'Guías' },

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
          <div className="bg-gradient-to-br from-primary to-purple-600 text-white p-2 rounded-xl shadow-lg shadow-primary/20">
          </div>
          <h1 className="text-xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-400">EducAI</h1>
        </Link>
        <nav className="space-y-2">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-3 px-4 py-3.5 rounded-lg transition-all group ${
                  isActive(item.href)
                    ? 'text-primary  border border-primary/10 font-semibold'

                    : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Icon size={20} className={isActive(item.href) ? 'text-primary' : 'text-slate-400 group-hover:text-primary transition-colors'} />
                <span>{item.label}</span>
                {isActive(item.href) && (
                  <span className="ml-auto w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px_rgba(var(--color-primary),0.8)]"></span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>
      
    </>
  );

  return (
    <>
      {/* Mobile hamburger button */}
      <button
        type="button"
        onClick={() => setMobileOpen(!mobileOpen)}
        className="md:hidden fixed top-5 right-5 z-50 p-2.5 rounded-2xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200 dark:border-slate-800 shadow-xl shadow-black/5 cursor-pointer text-slate-700 dark:text-slate-200 hover:text-primary transition-colors"
        aria-label="Toggle menu"
      >
        {mobileOpen ? <X size={24} /> : <Menu size={24} />}
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
        bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl border-r border-slate-200/50 dark:border-white/5
        flex flex-col h-full 
        transition-transform duration-300 ease-out
        ${mobileOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'}
      `}>
        <SidebarContent />
      </aside>

      {/* Desktop sidebar */}
      <aside className="hidden md:flex w-72 border-r border-slate-200 dark:border-white/5 bg-white/50 dark:bg-slate-950/50 backdrop-blur-xl flex-col h-full shrink-0">
        <SidebarContent />
      </aside>
    </>
  );
}
