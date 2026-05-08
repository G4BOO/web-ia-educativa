import { PromptEditor } from '@/components/PromptEditor';

export const metadata = {
  title: 'EducAI Playground',
  description: 'Evalúa y mejora tus prompts educativos con Inteligencia Artificial.',
};

export default function PlaygroundPage() {
  return (
    <>
      <header className="sticky top-0 z-10 flex items-center justify-between px-4 md:px-8 py-5 bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl border-b border-slate-200/50 dark:border-white/5">
        <div className="flex items-center gap-3">
          
          <div>
            <h2 className="text-xl md:text-2xl font-black tracking-tight text-slate-900 dark:text-slate-50">Playground</h2>
            <p className="text-slate-400 dark:text-zinc-500 font-medium text-xs md:text-sm">Evalúa y mejora tus prompts educativos</p>
          </div>
        </div>
      </header>
      <PromptEditor />
      <div className="h-20"></div>
    </>
  );
}
