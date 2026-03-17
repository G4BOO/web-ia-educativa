import Link from 'next/link';
import { blogPosts } from '@/lib/content-data';

export const metadata = {
  title: 'Blog - EducAI',
  description: 'Artículos sobre IA ética, prompts educativos y las mejores prácticas para docentes.',
};

function formatDate(dateStr: string): string {
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' });
}

export default function BlogPage() {
  return (
    <>
      {/* Header */}
      <header className="sticky top-0 z-10 px-4 md:px-8 py-6 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md">
        <div className="flex items-center gap-3 mb-1">
          <span className="material-symbols-outlined text-primary text-2xl">newspaper</span>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight text-slate-900 dark:text-slate-50">Blog</h2>
        </div>
        <p className="text-slate-500 dark:text-zinc-400 mt-1 font-medium text-sm md:text-base">Reflexiones, tips y artículos sobre IA ética en la educación.</p>
      </header>

      {/* Featured Post */}
      {blogPosts[0] && (
        <section className="px-4 md:px-8 py-4">
          <Link
            href={`/blog/${blogPosts[0].slug}`}
            className="group block bg-linear-to-br from-primary/5 via-white to-primary/10 dark:from-primary/10 dark:via-zinc-900 dark:to-primary/5 rounded-2xl border border-primary/20 p-6 md:p-8 hover:shadow-lg hover:shadow-primary/5 transition-all"
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-primary/10 text-primary">Destacado</span>
              <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-slate-100 dark:bg-zinc-800 text-slate-500">{blogPosts[0].category}</span>
            </div>
            <div className="flex flex-col md:flex-row items-start gap-5">
              <div className={`size-16 md:size-20 rounded-2xl flex items-center justify-center shrink-0 ${blogPosts[0].colorClass}`}>
                <span className="material-symbols-outlined text-3xl md:text-4xl">{blogPosts[0].coverIcon}</span>
              </div>
              <div className="flex-1">
                <h3 className="text-xl md:text-2xl font-bold mb-2 group-hover:text-primary transition-colors">{blogPosts[0].title}</h3>
                <p className="text-sm md:text-base text-slate-500 dark:text-zinc-400 leading-relaxed mb-3">{blogPosts[0].excerpt}</p>
                <div className="flex items-center gap-4 text-xs text-slate-400">
                  <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">person</span> {blogPosts[0].author}</span>
                  <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">calendar_month</span> {formatDate(blogPosts[0].date)}</span>
                  <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">schedule</span> {blogPosts[0].readTime}</span>
                </div>
              </div>
            </div>
          </Link>
        </section>
      )}

      {/* Rest of posts */}
      <section className="px-4 md:px-8 py-4">
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
          <span className="material-symbols-outlined text-primary text-xl">article</span>
          Todos los artículos
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 md:gap-6">
          {blogPosts.slice(1).map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group bg-white dark:bg-zinc-900 rounded-2xl border border-slate-100 dark:border-zinc-800 hover:border-primary/40 transition-all shadow-sm hover:shadow-lg hover:shadow-primary/5 p-5 md:p-6 flex flex-col"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`size-12 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform ${post.colorClass}`}>
                  <span className="material-symbols-outlined font-bold">{post.coverIcon}</span>
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-slate-50 dark:bg-zinc-800 text-slate-500 dark:text-zinc-400">
                  {post.category}
                </span>
              </div>

              <h4 className="text-base font-bold mb-2 group-hover:text-primary transition-colors leading-snug">{post.title}</h4>
              <p className="text-sm text-slate-500 dark:text-zinc-400 leading-relaxed flex-1">{post.excerpt}</p>

              <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-50 dark:border-zinc-800">
                <div className="flex items-center gap-3 text-xs text-slate-400">
                  <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">calendar_month</span>{formatDate(post.date)}</span>
                  <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">schedule</span>{post.readTime}</span>
                </div>
                <span className="material-symbols-outlined text-primary text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <div className="h-20"></div>
    </>
  );
}
