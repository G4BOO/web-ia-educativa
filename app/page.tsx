import Link from 'next/link';
import { guides } from '@/lib/content-data';
import { BookOpen, ArrowRight, Sparkles, MessageSquare, Image as ImageIcon, Presentation, Search, PenLine, GraduationCap } from 'lucide-react';

const CATEGORY_ICONS = [
  { label: 'Contenido Visual', icon: ImageIcon, color: 'text-pink-500' },
  { label: 'Presentaciones', icon: Presentation, color: 'text-amber-500' },
  { label: 'Investigación', icon: MessageSquare, color: 'text-blue-500' },
  { label: 'Redacción', icon: PenLine, color: 'text-emerald-500' },
  { label: 'Docentes', icon: GraduationCap, color: 'text-purple-500' },
];

export default function Dashboard() {
  return (
    <>
      {/* Header */}
      <header className=" top-0 z-10 flex items-center justify-between px-4 md:px-8 py-6 bg-white/70 dark:bg-slate-950/70 backdrop-blur-xl border-b border-slate-200/50 dark:border-white/5">
        <div>
          <h2 className="text-3xl md:text-4xl font-black tracking-tight text-slate-900 dark:text-white">Hola, Docente.</h2>
          <p className="text-slate-500 dark:text-slate-400 mt-2 font-medium text-sm md:text-base">Descubre las herramientas de IA que transformarán tu forma de enseñar.</p>
        </div>
      </header>

      {/* Hero — Herramientas de IA */}
      <section className="px-4 md:px-8 py-8">
        <div className="bg-gradient-to-br from-primary/10 via-purple-500/10 to-transparent dark:from-primary/20 dark:via-purple-500/20 rounded-3xl p-6 md:p-10 border border-primary/20 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <Sparkles size={120} />
          </div>
          <div className="relative z-10 max-w-2xl">
            
            <h3 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white mb-4">Herramientas de IA para el Aula</h3>
            <p className="text-slate-600 dark:text-slate-300 text-lg mb-8 leading-relaxed">
              Explora las diferentes categorías de Inteligencia Artificial que puedes aprovechar como docente:
            </p>
            <div className="flex flex-wrap gap-3 mb-8">
              {CATEGORY_ICONS.map((cat) => {
                const Icon = cat.icon;
                return (
                  <div key={cat.label} className="flex items-center gap-2 bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm px-4 py-2 rounded-xl font-medium border border-slate-200/50 dark:border-white/10 shadow-sm text-sm">
                    <Icon size={16} className={cat.color} />
                    <span>{cat.label}</span>
                  </div>
                );
              })}
            </div>
            <Link href="/guias" className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-purple-600 text-white px-6 py-3 rounded-xl font-bold hover:shadow-lg hover:shadow-primary/30 transition-all hover:scale-105 active:scale-95">
              Explorar todas las guías
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      

      <div className="h-20" />
    </>
  );
}
