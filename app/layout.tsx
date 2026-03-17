import type { Metadata } from 'next';
import { Lexend, Geist } from 'next/font/google';
import './globals.css';
import { Sidebar } from '@/components/Sidebar';
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  title: 'AI Educa Otto - Dashboard Docente',
  description: 'Plataforma web educativa para docentes usando IA.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={cn("light", "font-sans", geist.variable)}>
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      </head>
      <body className={`${geist.variable} font-sans bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 min-h-screen antialiased`}>
        <div className="flex h-screen overflow-hidden">
          <Sidebar />
          <main className="flex-1 overflow-y-auto custom-scrollbar">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
