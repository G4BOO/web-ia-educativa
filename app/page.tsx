import Link from 'next/link';
import { guides, blogPosts } from '@/lib/content-data';
import { PromptEditor } from '@/components/PromptEditor';

function formatDate(dateStr: string): string {
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' });
}

export default function Dashboard() {
  return (
    <>
      {/* Header */}
      <header className="sticky top-0 z-10 flex items-center justify-between px-4 md:px-8 py-6 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-sm">
        <div>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight text-slate-900 dark:text-slate-50">Hola, Docente.</h2>
          <p className="text-slate-500 dark:text-zinc-400 mt-1 font-medium text-sm md:text-base">Usa la IA para generar analogías y conexiones creativas en temas difíciles.</p>
        </div>
        <div className="flex items-center gap-4">

        </div>
      </header>

      {/* Tarjetas de Guías Rápidas */}
      <section className="px-4 md:px-8 py-4">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">menu_book</span>
            <h3 className="text-lg md:text-xl font-bold tracking-tight">Tarjetas de Guías Rápidas</h3>
          </div>
          <Link className="text-primary text-sm font-bold hover:underline flex items-center gap-1" href="/guias">
            Ver todas
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {guides.slice(0, 6).map((guide) => (
            <Link
              key={guide.slug}
              href={`/guias/${guide.slug}`}
              className="group bg-white dark:bg-zinc-900 p-5 md:p-6 rounded-2xl border border-slate-100 dark:border-zinc-800 hover:border-primary/40 transition-all shadow-sm hover:shadow-md"
            >
              <div className={`size-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform ${guide.colorClass}`}>
                <span className="material-symbols-outlined font-bold">{guide.icon}</span>
              </div>
              <h4 className="text-base md:text-lg font-bold mb-2 group-hover:text-primary transition-colors">{guide.title}</h4>
              <p className="text-sm text-slate-500 dark:text-zinc-400 leading-relaxed mb-4 line-clamp-2">{guide.description}</p>
              <span className="text-sm font-bold text-primary flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                Aplicar ahora <span className="material-symbols-outlined text-xs">arrow_forward</span>
              </span>
            </Link>
          ))}
        </div>
      </section>


      {/* Blog Posts Preview */}
      <section className="px-4 md:px-8 py-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">newspaper</span>
            <h3 className="text-lg md:text-xl font-bold tracking-tight">Artículos Recientes</h3>
          </div>
          <Link className="text-primary text-sm font-bold hover:underline flex items-center gap-1" href="/blog">
            Ver todos
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-5">
          {blogPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group bg-white dark:bg-zinc-900 rounded-2xl border border-slate-100 dark:border-zinc-800 hover:border-primary/40 transition-all shadow-sm hover:shadow-md overflow-hidden"
            >
              {/* Mini cover */}
              <div className={`h-24 flex items-center justify-center ${post.colorClass}`}>
                <span className="material-symbols-outlined text-4xl opacity-70 group-hover:scale-110 transition-transform">{post.coverIcon}</span>
              </div>
              <div className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-50 dark:bg-zinc-800 text-slate-500">{post.category}</span>
                  <span className="text-[9px] text-slate-400">{formatDate(post.date)}</span>
                </div>
                <h4 className="text-sm font-bold group-hover:text-primary transition-colors leading-snug mb-1.5 line-clamp-2">{post.title}</h4>
                <p className="text-xs text-slate-400 line-clamp-2">{post.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <div className="h-20"></div>
    </>
  );
}
