import Link from 'next/link';
import { notFound } from 'next/navigation';
import { guides, getGuideBySlug } from '@/lib/content-data';
import { MarkdownRenderer } from '@/components/MarkdownRenderer';

export function generateStaticParams() {
  return guides.map((g) => ({ slug: g.slug }));
}

export function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  // This is handled synchronously based on static params
  return {
    title: 'Guía Educativa - EducAI',
    description: 'Guía práctica sobre uso ético de IA en la educación.',
  };
}

export default async function GuideDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);

  if (!guide) notFound();

  return (
    <>
      {/* Sticky header with back nav */}
      <header className="sticky top-0 z-10 px-4 md:px-8 py-4 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-primary/5">
        <Link
          href="/guias"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-primary transition-colors mb-2"
        >
          <span className="material-symbols-outlined text-sm">arrow_back</span>
          Volver a guías
        </Link>
        <div className="flex items-center gap-3">
          <div className={`size-10 rounded-xl flex items-center justify-center ${guide.colorClass}`}>
            <span className="material-symbols-outlined">{guide.icon}</span>
          </div>
          <div>
            <h1 className="text-xl md:text-2xl font-black tracking-tight text-slate-900 dark:text-slate-50">{guide.title}</h1>
            <div className="flex items-center gap-3 mt-0.5">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-primary/10 text-primary">{guide.category}</span>
              <span className="text-xs text-slate-400 flex items-center gap-1">
                <span className="material-symbols-outlined text-xs">schedule</span>
                {guide.readTime} de lectura
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <article className="px-4 md:px-8 py-6 md:py-8 max-w-4xl">
        <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-slate-100 dark:border-zinc-800 p-5 md:p-8 shadow-sm">
          <MarkdownRenderer content={guide.content} />
        </div>

        {/* Related guides */}
        <div className="mt-8">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">grid_view</span>
            Más guías
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {guides.filter(g => g.slug !== guide.slug).slice(0, 3).map(g => (
              <Link
                key={g.slug}
                href={`/guias/${g.slug}`}
                className="group bg-white dark:bg-zinc-900 rounded-xl border border-slate-100 dark:border-zinc-800 hover:border-primary/40 p-4 transition-all shadow-sm hover:shadow-md"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className={`size-9 rounded-lg flex items-center justify-center ${g.colorClass}`}>
                    <span className="material-symbols-outlined text-sm">{g.icon}</span>
                  </div>
                  <h4 className="text-sm font-bold group-hover:text-primary transition-colors">{g.title}</h4>
                </div>
                <p className="text-xs text-slate-400 line-clamp-2">{g.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </article>

      <div className="h-20"></div>
    </>
  );
}
