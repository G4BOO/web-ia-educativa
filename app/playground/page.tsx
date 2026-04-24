import { PromptEditor } from '@/components/PromptEditor';

export const metadata = {
  title: 'EducAI Playground',
  description: 'Evalúa y mejora tus prompts educativos con Inteligencia Artificial.',
};

export default function PlaygroundPage() {
  return (
    <>
      <header className="sticky top-0 z-10 flex items-center justify-between px-4 md:px-8 py-6 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md">
        <div>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight text-slate-900 dark:text-slate-50">EducAI Playground</h2>
          <p className="text-slate-500 dark:text-zinc-400 mt-1 font-medium text-sm md:text-base">Evalúa y mejora tus prompts educativos con inteligencia artificial.</p>
        </div>
      </header>
      <PromptEditor />
      <div className="h-20"></div>
    </>
  );
}
