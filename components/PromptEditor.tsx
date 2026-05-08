"use client";

import { useIaModel, type PlaygroundMode } from '@/app/hooks/use-ia-model';
import { ScoreGauge } from './ScoreGauge';
import { Message, MessageContent, MessageResponse } from './ai-elements/message';
import { Reasoning, ReasoningTrigger, ReasoningContent } from './ai-elements/reasoning';
import { Shimmer } from './ai-elements/shimmer';
import { useState, useCallback, useRef, useEffect } from 'react';
import { isReasoningUIPart } from 'ai';

// ────────────────────────────────────────────────────
// Constantes
// ────────────────────────────────────────────────────

const MODE_CONFIG = {
  text: {
    label: 'Texto',
    icon: 'message',
    activeColor: 'text-blue-600',
    activeBg: 'bg-blue-50 dark:bg-blue-500/10',
    activeBorder: 'border-blue-200 dark:border-blue-500/20',
    placeholder:
      "Escribe tu instrucción educativa aquí...\n\nEjemplo: 'Crea un plan de clase sobre fotosíntesis para 5to grado'",
  },
  image: {
    label: 'Imágenes',
    icon: 'image',
    activeColor: 'text-emerald-600',
    activeBg: 'bg-emerald-50 dark:bg-emerald-500/10',
    activeBorder: 'border-emerald-200 dark:border-emerald-500/20',
    placeholder:
      "Describe la imagen que deseas...\n\nEjemplo: 'Un profesor robot enseñando matemáticas en una pizarra interactiva, estilo Pixar'",
  },
  presentation: {
    label: 'Presentaciones',
    icon: 'slideshow',
    activeColor: 'text-amber-600',
    activeBg: 'bg-amber-50 dark:bg-amber-500/10',
    activeBorder: 'border-amber-200 dark:border-amber-500/20',
    placeholder:
      "Describe tu presentación...\n\nEjemplo: 'Crea el esquema para una presentación de 5 diapositivas sobre Energías Renovables con notas de orador'",
  },
} as const;

const MODES = Object.keys(MODE_CONFIG) as PlaygroundMode[];

// ────────────────────────────────────────────────────
// Helpers para extraer datos del asistente
// ────────────────────────────────────────────────────

function extractAssistantParts(messages: ReturnType<typeof useIaModel>['messages']) {
  const lastAssistant = [...messages].reverse().find((m) => m.role === 'assistant');

  const assistantText =
    lastAssistant?.parts
      ?.filter((p) => p.type === 'text')
      .map((p) => (p as { type: 'text'; text: string }).text)
      .join('') || '';

  const reasoningText =
    lastAssistant?.parts
      ?.filter((p) => isReasoningUIPart(p))
      .map((p) => (p as { type: 'reasoning'; text: string }).text)
      .join('') || '';

  const bodyText = assistantText
    .replace(/\*{0,2}PUNTUACI[ÓO]N:\s*\d+\s*\/\s*100\*{0,2}\n*/i, '')
    .trim();

  const hasResponse = assistantText.length > 0 || reasoningText.length > 0;

  return { assistantText, reasoningText, bodyText, hasResponse };
}

// ────────────────────────────────────────────────────
// Auto-resize textarea hook
// ────────────────────────────────────────────────────

function useAutoResize(value: string) {
  const ref = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = `${Math.min(el.scrollHeight, 280)}px`;
  }, [value]);

  return ref;
}

// ────────────────────────────────────────────────────
// Componente
// ────────────────────────────────────────────────────

export function PromptEditor() {
  const [mode, setMode] = useState<PlaygroundMode>('text');
  const [input, setInput] = useState('');
  const textareaRef = useAutoResize(input);

  const {
    messages,
    sendMessage,
    isLoading,
    handleClear,
    setIsStarted,
    stop,
    getScore,
  } = useIaModel(mode);

  const onSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!input.trim() || isLoading) return;
      setIsStarted(true);
      sendMessage({ text: input });
      setInput('');
    },
    [input, isLoading, sendMessage, setIsStarted],
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        if (!input.trim() || isLoading) return;
        setIsStarted(true);
        sendMessage({ text: input });
        setInput('');
      }
    },
    [input, isLoading, sendMessage, setIsStarted],
  );

  const score = getScore();
  const { reasoningText, bodyText, hasResponse, assistantText } =
    extractAssistantParts(messages);
  const currentMode = MODE_CONFIG[mode];

  return (
    <section className="px-4 md:px-8 py-6 md:py-8">
      {/* ═══════════════════════════════════════════
          INPUT CARD — Estilo ChatGPT / Claude
          ═══════════════════════════════════════════ */}
      <div className="max-w-4xl mx-auto">
        <form onSubmit={onSubmit}>
          <div className="relative bg-white dark:bg-zinc-900 rounded-2xl border border-slate-200/80 dark:border-zinc-700/60 shadow-xl shadow-black/[0.04] dark:shadow-black/30 transition-all duration-300 focus-within:border-primary/40 focus-within:shadow-2xl focus-within:shadow-primary/[0.06]">
            {/* Textarea principal */}
            <div className="px-4 pt-4 pb-2">
              <textarea
                ref={textareaRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={isLoading}
                rows={1}
                className="w-full text-[15px] leading-relaxed bg-transparent border-none focus:outline-none focus:ring-0 resize-none placeholder:text-slate-300 dark:placeholder:text-zinc-600 text-slate-800 dark:text-zinc-200 disabled:opacity-50 disabled:cursor-wait min-h-[56px]"
                placeholder={currentMode.placeholder}
              />
            </div>

            {/* Barra inferior de controles */}
            <div className="flex items-center justify-between px-3 py-2.5 border-t border-slate-100/80 dark:border-zinc-800/60">
              {/* Mode selector — pill style */}
              <div className="flex items-center gap-1 p-0.5 bg-slate-50 dark:bg-zinc-800/60 rounded-lg">
                {MODES.map((m) => {
                  const cfg = MODE_CONFIG[m];
                  const isActive = mode === m;
                  return (
                    <button
                      key={m}
                      type="button"
                      onClick={() => setMode(m)}
                      className={`px-3 py-1.5 text-xs font-semibold rounded-md flex items-center gap-1.5 transition-all duration-200 cursor-pointer ${
                        isActive
                          ? `bg-white dark:bg-zinc-700 ${cfg.activeColor} shadow-sm border ${cfg.activeBorder}`
                          : 'text-slate-400 dark:text-zinc-500 hover:text-slate-600 dark:hover:text-zinc-300'
                      }`}
                      title={`Modo: ${cfg.label}`}
                    >
                      <span className="material-symbols-outlined text-[15px]">{cfg.icon}</span>
                      <span className="hidden sm:inline">{cfg.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Action buttons */}
              <div className="flex items-center gap-2">
                {isLoading && (
                  <button
                    type="button"
                    onClick={() => stop()}
                    className="p-2 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors cursor-pointer"
                    title="Detener generación"
                  >
                    <span className="material-symbols-outlined text-[20px]">stop_circle</span>
                  </button>
                )}

                {!isLoading && hasResponse && (
                  <button
                    type="button"
                    onClick={handleClear}
                    className="p-2 rounded-lg text-slate-400 hover:text-primary hover:bg-primary/5 transition-colors cursor-pointer"
                    title="Nuevo análisis"
                  >
                    <span className="material-symbols-outlined text-[20px]">restart_alt</span>
                  </button>
                )}

                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className={`p-2.5 rounded-xl transition-all duration-200 cursor-pointer disabled:cursor-not-allowed ${
                    input.trim() && !isLoading
                      ? 'bg-primary text-white shadow-md shadow-primary/25 hover:shadow-lg hover:shadow-primary/30 hover:scale-105 active:scale-95'
                      : 'bg-slate-100 dark:bg-zinc-800 text-slate-300 dark:text-zinc-600'
                  }`}
                  title="Valorar Prompt"
                >
                  <span className={`material-symbols-outlined text-[20px] ${isLoading ? 'animate-spin' : ''}`}>
                    {isLoading ? 'progress_activity' : 'arrow_upward'}
                  </span>
                </button>
              </div>
            </div>

            {/* Loading indicator bar */}
            {isLoading && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 rounded-b-2xl overflow-hidden">
                <div className="h-full bg-gradient-to-r from-primary via-purple-500 to-primary bg-[length:200%_100%] animate-[shimmer_1.5s_ease-in-out_infinite]" />
              </div>
            )}
          </div>
        </form>

        {/* Hint text */}
        {!hasResponse && !isLoading && (
          <p className="text-center text-xs text-slate-400 dark:text-zinc-600 mt-3 flex items-center justify-center gap-1.5">
            <span className="material-symbols-outlined text-[14px]">info</span>
            Escribe un prompt educativo y presiona Enter o el botón para evaluarlo con IA
          </p>
        )}
      </div>

      {/* ═══════════════════════════════════════════
          RESULTADOS
          ═══════════════════════════════════════════ */}
      {(hasResponse || isLoading) && (
        <div className="max-w-4xl mx-auto mt-8 space-y-5">
          {/* Score Card */}
          <div className="bg-gradient-to-br from-slate-50 via-white to-primary/5 dark:from-zinc-900 dark:via-zinc-900 dark:to-primary/5 border border-slate-200/80 dark:border-zinc-700/50 rounded-2xl p-5 md:p-6 shadow-sm">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-5">
              {score !== null ? (
                <ScoreGauge score={score} />
              ) : isLoading ? (
                <div className="flex flex-col items-center justify-center gap-2 p-6 rounded-2xl bg-slate-100/50 dark:bg-zinc-800/50 min-w-[160px]">
                  <div className="relative w-15 h-15 flex items-center justify-center">
                    <span className="material-symbols-outlined text-7xl text-primary/40 animate-pulse">psychology</span>
                  </div>
                  <Shimmer duration={1.5}>Calculando puntuación...</Shimmer>
                </div>
              ) : null}

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className={`material-symbols-outlined text-primary ${isLoading ? 'animate-spin' : ''}`}>
                    {isLoading ? 'sync' : 'verified'}
                  </span>
                  <h4 className="text-base md:text-lg font-bold text-slate-800 dark:text-slate-100">
                    {isLoading && !hasResponse ? 'Evaluando tu prompt...' : 'Evaluación del Prompt'}
                  </h4>
                </div>

                {score !== null && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-primary/10 text-primary">Pedagógico</span>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-violet-500/10 text-violet-500">Prompt Engineering</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Loading skeleton */}
          {isLoading && !hasResponse && (
            <div className="space-y-3 animate-pulse">
              <div className="h-4 bg-slate-100 dark:bg-zinc-800 rounded-full w-3/4" />
              <div className="h-4 bg-slate-100 dark:bg-zinc-800 rounded-full w-full" />
              <div className="h-4 bg-slate-100 dark:bg-zinc-800 rounded-full w-5/6" />
            </div>
          )}

          {/* Response Body */}
          {bodyText && (
            <Message from="assistant">
              <MessageContent className="bg-white dark:bg-zinc-900/50 border border-slate-100 dark:border-zinc-800 rounded-2xl p-5 md:p-6 max-w-full w-full">
                <MessageResponse isAnimating={isLoading}>
                  {bodyText}
                </MessageResponse>
              </MessageContent>
            </Message>
          )}

          {/* Streaming cursor */}
          {isLoading && hasResponse && (
            <div className="flex items-center gap-2 text-xs text-slate-400 px-1">
              <span className="inline-block w-1.5 h-4 bg-primary/60 rounded-full animate-pulse" />
              <Shimmer duration={2}>Streaming respuesta en tiempo real...</Shimmer>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
