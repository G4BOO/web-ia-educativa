"use client";

import { useIaModel } from '@/app/hooks/use-ia-model';
import { ScoreGauge } from './ScoreGauge';
// AI Elements de Vercel
import { Message, MessageContent, MessageResponse } from './ai-elements/message';
import { Reasoning, ReasoningTrigger, ReasoningContent } from './ai-elements/reasoning';
import { Suggestions, Suggestion } from './ai-elements/suggestion';
import { Shimmer } from './ai-elements/shimmer';
import { useState, useCallback } from 'react';
import { isReasoningUIPart } from 'ai';

const QUICK_SUGGESTIONS = [
  { label: '📝 Plan de Clase', prompt: 'Elabora un plan de clase de 45 minutos sobre fracciones para 4to grado.' },
  { label: '📊 Evaluación', prompt: 'Crea una rúbrica de evaluación para un ensayo argumentativo sobre cambio climático.' },
  { label: '♿ Resumen Adaptado', prompt: 'Resume este texto sobre la Revolución Francesa para alumnos con TDAH.' },
  { label: '🧪 Laboratorio', prompt: 'Diseña una actividad práctica de laboratorio sobre reacciones químicas para secundaria.' },
];

export function PromptEditor() {
  const { 
    messages,
    sendMessage,
    isLoading,
    handleClear,
    isStarted,
    setIsStarted,
    status,
    stop,
    getScore,
  } = useIaModel();

  const [input, setInput] = useState('');

  const onSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    setIsStarted(true);
    sendMessage({ text: input });
    setInput('');
  }, [input, isLoading, sendMessage, setIsStarted]);

  const onSuggestionClick = useCallback((suggestion: string) => {
    if (isLoading) return;
    setIsStarted(true);
    sendMessage({ text: suggestion });
  }, [isLoading, sendMessage, setIsStarted]);

  const score = getScore();

  // Extraer texto y reasoning del último mensaje del asistente
  const lastAssistant = [...messages].reverse().find(m => m.role === 'assistant');
  
  const assistantText = lastAssistant?.parts
    ?.filter((p) => p.type === 'text')
    .map(p => (p as { type: 'text'; text: string }).text)
    .join('') || '';

  const reasoningText = lastAssistant?.parts
    ?.filter((p) => isReasoningUIPart(p))
    .map(p => (p as { type: 'reasoning'; text: string }).text)
    .join('') || '';

  // Limpiar la línea de puntuación del texto del cuerpo
  const bodyText = assistantText.replace(/\*{0,2}PUNTUACI[ÓO]N:\s*\d+\s*\/\s*100\*{0,2}\n*/i, '').trim();

  const hasResponse = assistantText.length > 0 || reasoningText.length > 0;

  return (
    <section className="px-4 md:px-8 py-8 md:py-10">
      <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-primary/10 shadow-xl shadow-primary/5 overflow-hidden transition-all duration-300">
        
        {/* Top bar estilo IDE */}
        <div className="border-b border-primary/5 bg-linear-to-r from-primary/5 via-primary/3 to-transparent flex items-center px-4 py-2.5 gap-2">
          <span className="size-3 rounded-full bg-red-400/70 shadow-sm shadow-red-400/30"></span>
          <span className="size-3 rounded-full bg-amber-400/70 shadow-sm shadow-amber-400/30"></span>
          <span className="size-3 rounded-full bg-emerald-400/70 shadow-sm shadow-emerald-400/30"></span>
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em] ml-3">
            Playground IA Educativa
          </span>
          {isLoading && (
            <div className="ml-auto flex items-center gap-2 text-xs text-primary font-medium">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              <Shimmer duration={1.5}>Generando respuesta...</Shimmer>
            </div>
          )}
        </div>
        
        <div className="p-5 md:p-6">
          {/* Input Form */}
          <form className="block mb-4" onSubmit={onSubmit}>
            <div className="relative group">
              <textarea 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={isLoading}
                className="w-full min-h-[160px] p-5 md:p-6 text-base md:text-lg bg-slate-50/50 dark:bg-zinc-800/50 border-2 border-slate-100 dark:border-zinc-700/50 rounded-xl focus:border-primary/60 focus:bg-white dark:focus:bg-zinc-800 focus:outline-none focus:ring-4 focus:ring-primary/5 transition-all placeholder:text-slate-300 dark:placeholder:text-zinc-600 resize-none font-sans disabled:opacity-60 disabled:cursor-wait" 
                placeholder={"Escribe tu instrucción educativa aquí...\n\nEjemplo: 'Crea un plan de clase sobre fotosíntesis para 5to grado'"}
              ></textarea>
              
              <div className="absolute bottom-3 right-3 flex items-center gap-2">
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
                  className="bg-linear-to-r from-primary to-primary/80 hover:from-primary/95 hover:to-primary/85 disabled:opacity-40 disabled:cursor-not-allowed text-zinc-900 font-bold px-6 py-2.5 rounded-xl flex items-center gap-2 transition-all shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 active:scale-[0.97] cursor-pointer text-sm"
                >
                  <span className={`material-symbols-outlined text-[18px] ${isLoading ? 'animate-spin' : ''}`}>
                    {isLoading ? 'progress_activity' : 'auto_awesome'}
                  </span>
                  <span>{isLoading ? 'Analizando...' : 'Valorar Prompt'}</span>
                </button>
              </div>
            </div>
          </form>

          {/* Quick suggestions - AI Elements Suggestion component */}
          {!isStarted && (
            <div className="space-y-2">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Prueba con:</span>
              <Suggestions>
                {QUICK_SUGGESTIONS.map((s) => (
                  <Suggestion
                    key={s.label}
                    suggestion={s.prompt}
                    onClick={onSuggestionClick}
                    className="text-xs bg-slate-50 dark:bg-zinc-800 hover:bg-primary/5 hover:text-primary border-slate-100 dark:border-zinc-700 hover:border-primary/30"
                  >
                    {s.label}
                  </Suggestion>
                ))}
              </Suggestions>
            </div>
          )}

          {/* Evaluation Results - Using AI Elements */}
          {(hasResponse || isLoading) && (
            <div className="mt-6 space-y-4">
              {/* Score + Header Card */}
              <div className="bg-linear-to-br from-slate-50 via-white to-primary/5 dark:from-zinc-800 dark:via-zinc-900 dark:to-primary/5 border border-slate-100 dark:border-zinc-700/50 rounded-2xl p-5 md:p-6 shadow-xs">
                <div className="flex flex-col md:flex-row items-start md:items-center gap-5">
                  {/* Score Gauge */}
                  {score !== null ? (
                    <ScoreGauge score={score} />
                  ) : isLoading ? (
                    <div className="flex flex-col items-center justify-center gap-2 p-6 rounded-2xl bg-slate-100/50 dark:bg-zinc-800/50 min-w-[160px]">
                      <div className="relative w-32 h-32 flex items-center justify-center">
                        <span className="material-symbols-outlined text-5xl text-primary/40 animate-pulse">psychology</span>
                      </div>
                      <Shimmer duration={1.5}>Calculando puntuación...</Shimmer>
                    </div>
                  ) : null}

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className={`material-symbols-outlined text-primary ${isLoading ? 'animate-spin' : ''}`}>
                        {isLoading ? 'sync' : 'verified'}
                      </span>
                      <h4 className="text-base md:text-lg font-bold text-slate-800 dark:text-slate-100">
                        {isLoading && !hasResponse ? 'Evaluando tu prompt...' : 'Evaluación del Prompt'}
                      </h4>
                    </div>
                    <p className="text-xs text-slate-400 dark:text-zinc-500 font-medium flex items-center gap-1.5">
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                      Gemini 2.5 Flash · Google AI · Streaming
                    </p>
                    {score !== null && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-primary/10 text-primary">Pedagógico</span>
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-500">IA Ética</span>
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-violet-500/10 text-violet-500">Prompt Engineering</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Reasoning Section - AI Elements */}
              {(reasoningText || (isLoading && !assistantText)) && (
                <Reasoning isStreaming={isLoading && !assistantText}>
                  <ReasoningTrigger 
                    className="text-primary/70 hover:text-primary"
                    getThinkingMessage={(isStreaming, duration) => {
                      if (isStreaming || duration === 0) return <Shimmer duration={1}>Pensando...</Shimmer>;
                      if (duration === undefined) return <p>Pensó por unos segundos</p>;
                      return <p>Pensó por {duration} segundos</p>;
                    }}
                  />
                  {reasoningText && (
                    <ReasoningContent className="text-slate-500 dark:text-zinc-400 border-l-2 border-primary/20 pl-4">
                      {reasoningText}
                    </ReasoningContent>
                  )}
                </Reasoning>
              )}

              {/* Loading skeleton */}
              {isLoading && !hasResponse && (
                <div className="space-y-3 animate-pulse">
                  <div className="h-4 bg-slate-100 dark:bg-zinc-800 rounded-full w-3/4"></div>
                  <div className="h-4 bg-slate-100 dark:bg-zinc-800 rounded-full w-full"></div>
                  <div className="h-4 bg-slate-100 dark:bg-zinc-800 rounded-full w-5/6"></div>
                </div>
              )}

              {/* Response Body - AI Elements MessageResponse with Streamdown */}
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
                  <span className="inline-block w-1.5 h-4 bg-primary/60 rounded-full animate-pulse"></span>
                  <Shimmer duration={2}>Streaming respuesta en tiempo real...</Shimmer>
                </div>
              )}

              {/* Action buttons */}
              {!isLoading && hasResponse && (
                <div className="flex items-center justify-between pt-2">
                  <p className="text-[11px] text-slate-300 dark:text-zinc-600 font-medium">
                    Evaluación generada por IA — verifica siempre los resultados
                  </p>
                  <button type="button"
                    onClick={handleClear}
                    className="px-4 py-2 text-xs font-bold text-slate-400 hover:text-primary bg-slate-50 dark:bg-zinc-800 hover:bg-primary/5 rounded-lg border border-slate-100 dark:border-zinc-700 hover:border-primary/30 transition-all cursor-pointer flex items-center gap-1.5"
                  >
                    <span className="material-symbols-outlined text-[16px]">restart_alt</span>
                    Nuevo análisis
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
