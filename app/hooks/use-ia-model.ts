import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport } from 'ai';
import { useState, useCallback, useMemo, useRef, useEffect } from 'react';

export type PlaygroundMode = 'text' | 'image' | 'presentation';

/**
 * Hook que conecta el playground con la API de evaluación.
 *
 * El modo se envía como `body` en cada llamada a `sendMessage`,
 * que es la forma correcta de pasar datos dinámicos en AI SDK v6.
 * Usar `body` en DefaultChatTransport captura el valor por closure
 * y puede quedarse "stale".
 */
export function useIaModel(mode: PlaygroundMode = 'text') {
  const [isStarted, setIsStarted] = useState(false);

  // Ref para tener siempre el valor actual del modo sin stale closures
  const modeRef = useRef(mode);
  useEffect(() => {
    modeRef.current = mode;
  }, [mode]);

  const transport = useMemo(
    () => new DefaultChatTransport({ api: '/api/evaluate' }),
    [],
  );

  const {
    messages,
    setMessages,
    sendMessage: rawSendMessage,
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

  // Wrapper que inyecta el modo actual en cada request
  const sendMessage = useCallback(
    (params: { text: string }) => {
      return rawSendMessage(params, {
        body: { mode: modeRef.current },
      });
    },
    [rawSendMessage],
  );

  const handleClear = useCallback(() => {
    stop();
    setMessages([]);
    setIsStarted(false);
  }, [stop, setMessages]);

  /** Extrae la puntuación numérica de la respuesta del asistente */
  const getScore = useCallback((): number | null => {
    const lastAssistant = [...messages].reverse().find((m) => m.role === 'assistant');
    if (!lastAssistant) return null;

    const text =
      lastAssistant.parts
        ?.filter((p) => p.type === 'text')
        .map((p) => (p as { type: 'text'; text: string }).text)
        .join('') || '';

    const match = text.match(/\*{0,2}PUNTUACI[ÓO]N:\s*(\d+)\s*\/\s*100\*{0,2}/i);
    return match ? parseInt(match[1], 10) : null;
  }, [messages]);

  return {
    messages,
    setMessages,
    sendMessage,
    isLoading,
    handleClear,
    isStarted,
    setIsStarted,
    status,
    stop,
    error,
    getScore,
  };
}
