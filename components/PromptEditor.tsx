"use client";

import { useIaModel, type PlaygroundMode } from '@/app/hooks/use-ia-model';
import { ScoreGauge } from './ScoreGauge';
import { Message, MessageContent, MessageResponse } from './ai-elements/message';
import { Reasoning, ReasoningTrigger, ReasoningContent } from './ai-elements/reasoning';
import { Shimmer } from './ai-elements/shimmer';
import { useState, useCallback } from 'react';
import { isReasoningUIPart } from 'ai';

// ────────────────────────────────────────────────────
// Constantes
// ────────────────────────────────────────────────────

const MODE_CONFIG = {
  text: {
    label: 'Texto',
    icon: 'message',
    activeColor: 'text-blue-600',
    placeholder:
      "Escribe tu instrucción educativa aquí...\n\nEjemplo: 'Crea un plan de clase sobre fotosíntesis para 5to grado'",
  },
  image: {
    label: 'Imágenes',
    icon: 'image',
    activeColor: 'text-emerald-600',
    placeholder:
      "Describe la imagen que deseas...\n\nEjemplo: 'Un profesor robot enseñando matemáticas en una pizarra interactiva, estilo Pixar'",
  },
  presentation: {
    label: 'Presentaciones',
    icon: 'slideshow',
    activeColor: 'text-amber-600',
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
// Componente
// ────────────────────────────────────────────────────

export function PromptEditor() {
  const [mode, setMode] = useState<PlaygroundMode>('text');
  const [input, setInput] = useState('');

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

  const score = getScore();
  const { reasoningText, bodyText, hasResponse, assistantText } =
    extractAssistantParts(messages);
  const currentMode = MODE_CONFIG[mode];

  return (
    <section className="px-4 md:px-8 py-8 md:py-10">
      <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-primary/10 shadow-xl shadow-primary/5 overflow-hidden transition-all duration-300">

        {/* Top bar estilo IDE */}
        <div className="border-b border-primary/5 bg-linear-to-r from-primary/5 via-primary/3 to-transparent flex items-center px-4 py-2.5 gap-2">
         
          {isLoading && (
            <div className="ml-auto flex items-center gap-2 text-xs text-primary font-medium">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
              </span>
              <Shimmer duration={1.5}>Generando respuesta...</Shimmer>
            </div>
          )}
        </div>

        <div className="p-5 md:p-6">
          {/* Selector de modo */}
          <div className="flex flex-wrap gap-2 mb-6 p-1.5 bg-slate-100 dark:bg-zinc-800/50 rounded-xl w-fit">
            {MODES.map((m) => {
              const cfg = MODE_CONFIG[m];
              const isActive = mode === m;
              return (
                <button
                  key={m}
                  type="button"
                  onClick={() => setMode(m)}
                  className={`px-4 py-2 text-sm font-bold rounded-lg flex items-center gap-2 transition-all cursor-pointer ${
                    isActive
                      ? `bg-white dark:bg-zinc-700 ${cfg.activeColor} shadow-sm`
                      : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                  }`}
                >
                  <span className="material-symbols-outlined text-[18px]">{cfg.icon}</span>
                  {cfg.label}
                </button>
              );
            })}
          </div>

          {/* Formulario de entrada */}
          <form className="block mb-4" onSubmit={onSubmit}>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={isLoading}
              className="w-full min-h-[160px] p-5 md:p-6 text-base md:text-lg bg-slate-50/50 dark:bg-zinc-800/50 border-2 border-slate-100 dark:border-zinc-700/50 rounded-xl focus:border-primary/60 focus:bg-white dark:focus:bg-zinc-800 focus:outline-none focus:ring-4 focus:ring-primary/5 transition-all placeholder:text-slate-300 dark:placeholder:text-zinc-600 resize-none font-sans disabled:opacity-60 disabled:cursor-wait"
              placeholder={currentMode.placeholder}
            />

            <div className="flex justify-end items-center gap-2 mt-2">
              {isLoading && (
                <button
                  type="button"
                  onClick={() => stop()}
                  className="px-3 py-2 text-xs font-bold text-red-500 bg-red-50 dark:bg-red-500/10 hover:bg-red-100 rounded-lg border border-red-200 dark:border-red-500/20 transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-[16px]">stop_circle</span>
                  Detener
                </button>
              )}

              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="px-4 py-2 text-xs font-bold text-slate-400 hover:text-primary bg-slate-50 dark:bg-zinc-800 hover:bg-primary/5 rounded-lg border border-slate-100 dark:border-zinc-700 hover:border-primary/30 transition-all cursor-pointer flex items-center gap-1.5 disabled:cursor-not-allowed"
              >
                <span className={`material-symbols-outlined text-[18px] ${isLoading ? 'animate-spin' : ''}`}>
                  {isLoading ? 'progress_activity' : 'auto_awesome'}
                </span>
                <span>{isLoading ? 'Analizando...' : 'Valorar Prompt'}</span>
              </button>

              {!isLoading && hasResponse && (
                <button
                  type="button"
                  onClick={handleClear}
                  className="px-4 py-2 text-xs font-bold text-slate-400 hover:text-primary bg-slate-50 dark:bg-zinc-800 hover:bg-primary/5 rounded-lg border border-slate-100 dark:border-zinc-700 hover:border-primary/30 transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-[16px]">restart_alt</span>
                  Nuevo análisis
                </button>
              )}
            </div>
          </form>

          {/* Resultados de la evaluación */}
          {(hasResponse || isLoading) && (
            <div className="mt-6 space-y-4">
              {/* Score + Header Card */}
              <div className="bg-linear-to-br from-slate-50 via-white to-primary/5 dark:from-zinc-800 dark:via-zinc-900 dark:to-primary/5 border border-slate-100 dark:border-zinc-700/50 rounded-2xl p-5 md:p-6 shadow-xs">
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

              {/* Reasoning Section */}
              

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
        </div>
      </div>
    </section>
  );
}
