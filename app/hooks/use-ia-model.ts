import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport } from 'ai';
import { useState, useCallback, useMemo } from 'react';

/**
 * Hook que conecta el playground con la API de evaluación.
 * Usa useChat de @ai-sdk/react v6 con DefaultChatTransport
 * para manejar streaming, mensajes y reasoning de manera nativa.
 */
export function useIaModel() {
  const [isStarted, setIsStarted] = useState(false);

  // En AI SDK v6, useChat usa transport en vez de api
  const transport = useMemo(() => new DefaultChatTransport({
    api: '/api/evaluate',
  }), []);

  const {
    messages,
    setMessages,
    sendMessage,
    status,
    stop,
    error,
  } = useChat({
    transport,
    onError: (err) => {
      console.error('Error en la comunicación con el modelo de IA:', err);
    },
  });

  const isLoading = status === 'streaming' || status === 'submitted';

  const handleSubmit = useCallback(
    async (e?: React.FormEvent<HTMLFormElement>, promptFromCard?: string) => {
      if (e && typeof e.preventDefault === 'function') {
        e.preventDefault();
      }

      const text = promptFromCard;
      if (text) {
        if (!text.trim() || isLoading) return;
        setIsStarted(true);
        sendMessage({ text });
      }
    },
    [isLoading, sendMessage]
  );

  const handleClear = useCallback(() => {
    stop();
    setMessages([]);
    setIsStarted(false);
  }, [stop, setMessages]);

  /** Extrae la puntuación de la respuesta */
  const getScore = useCallback((): number | null => {
    const lastAssistant = [...messages].reverse().find(m => m.role === 'assistant');
    if (!lastAssistant) return null;

    const text = lastAssistant.parts
      ?.filter((p) => p.type === 'text')
      .map(p => (p as { type: 'text'; text: string }).text)
      .join('') || '';

    // Flexible: con o sin ** bold markers
    const match = text.match(/\*{0,2}PUNTUACI[ÓO]N:\s*(\d+)\s*\/\s*100\*{0,2}/i);
    return match ? parseInt(match[1], 10) : null;
  }, [messages]);

  return {
    messages,
    setMessages,
    sendMessage,
    isLoading,
    handleSubmit,
    handleClear,
    isStarted,
    setIsStarted,
    status,
    stop,
    error,
    getScore,
  };
}
