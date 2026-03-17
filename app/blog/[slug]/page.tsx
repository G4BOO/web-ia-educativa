import Link from 'next/link';
import { notFound } from 'next/navigation';
import { blogPosts, getBlogPostBySlug } from '@/lib/content-data';
import { MarkdownRenderer } from '@/components/MarkdownRenderer';

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  return {
    title: 'Blog - Otto AI',
    description: 'Artículo sobre IA ética en la educación.',
  };
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' });
}

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) notFound();

  return (
    <>
      {/* Sticky header with back nav */}
      <header className="sticky top-0 z-10 px-4 md:px-8 py-4 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-primary/5">
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-primary transition-colors mb-2"
        >
          <span className="material-symbols-outlined text-sm">arrow_back</span>
          Volver al blog
        </Link>
        <h1 className="text-xl md:text-2xl font-black tracking-tight text-slate-900 dark:text-slate-50 leading-snug">{post.title}</h1>
        <div className="flex flex-wrap items-center gap-3 mt-2">
          <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-primary/10 text-primary">{post.category}</span>
          <span className="text-xs text-slate-400 flex items-center gap-1">
            <span className="material-symbols-outlined text-xs">person</span> {post.author}
          </span>
          <span className="text-xs text-slate-400 flex items-center gap-1">
            <span className="material-symbols-outlined text-xs">calendar_month</span> {formatDate(post.date)}
          </span>
          <span className="text-xs text-slate-400 flex items-center gap-1">
            <span className="material-symbols-outlined text-xs">schedule</span> {post.readTime}
          </span>
        </div>
      </header>

      {/* Content */}
      <article className="px-4 md:px-8 py-6 md:py-8 max-w-4xl">
        <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-slate-100 dark:border-zinc-800 p-5 md:p-8 shadow-sm">
          <MarkdownRenderer content={post.content} />
        </div>

        {/* More posts */}
        <div className="mt-8">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">article</span>
            Más artículos
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {blogPosts.filter(p => p.slug !== post.slug).slice(0, 3).map(p => (
              <Link
                key={p.slug}
                href={`/blog/${p.slug}`}
                className="group bg-white dark:bg-zinc-900 rounded-xl border border-slate-100 dark:border-zinc-800 hover:border-primary/40 p-4 transition-all shadow-sm hover:shadow-md"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className={`size-9 rounded-lg flex items-center justify-center ${p.colorClass}`}>
                    <span className="material-symbols-outlined text-sm">{p.coverIcon}</span>
                  </div>
                  <h4 className="text-sm font-bold group-hover:text-primary transition-colors leading-snug">{p.title}</h4>
                </div>
                <p className="text-xs text-slate-400 line-clamp-2">{p.excerpt}</p>
              </Link>
            ))}
          </div>
        </div>
      </article>

      <div className="h-20"></div>
    </>
  );
}
