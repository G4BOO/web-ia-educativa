import Link from 'next/link';
import { guides } from '@/lib/content-data';

export const metadata = {
  title: 'Guías Educativas - Otto AI',
  description: 'Guías prácticas para usar IA de manera ética y efectiva en la enseñanza.',
};

export default function GuiasPage() {
  return (
    <>
      {/* Header */}
      <header className="sticky top-0 z-10 px-4 md:px-8 py-6 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md">
        <div className="flex items-center gap-3 mb-1">
          <span className="material-symbols-outlined text-primary text-2xl">auto_stories</span>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight text-slate-900 dark:text-slate-50">Guías Educativas</h2>
        </div>
        <p className="text-slate-500 dark:text-zinc-400 mt-1 font-medium text-sm md:text-base">Aprende a usar la IA de manera ética y efectiva en tu aula.</p>
      </header>

      {/* Grid de Guías */}
      <section className="px-4 md:px-8 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 md:gap-6">
          {guides.map((guide) => (
            <Link
              key={guide.slug}
              href={`/guias/${guide.slug}`}
              className="group bg-white dark:bg-zinc-900 rounded-2xl border border-slate-100 dark:border-zinc-800 hover:border-primary/40 transition-all shadow-sm hover:shadow-lg hover:shadow-primary/5 p-5 md:p-6 flex flex-col"
            >
              {/* Icon + Category */}
              <div className="flex items-center justify-between mb-4">
                <div className={`size-12 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform ${guide.colorClass}`}>
                  <span className="material-symbols-outlined font-bold">{guide.icon}</span>
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-slate-50 dark:bg-zinc-800 text-slate-500 dark:text-zinc-400">
                  {guide.category}
                </span>
              </div>

              {/* Title + Description */}
              <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">{guide.title}</h3>
              <p className="text-sm text-slate-500 dark:text-zinc-400 leading-relaxed flex-1">{guide.description}</p>

              {/* Footer */}
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-50 dark:border-zinc-800">
                <span className="text-xs text-slate-400 flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">schedule</span>
                  {guide.readTime} de lectura
                </span>
                <span className="text-sm font-bold text-primary flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Leer guía <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <div className="h-20"></div>
    </>
  );
}
