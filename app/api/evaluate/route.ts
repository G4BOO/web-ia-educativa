import { streamText } from 'ai';
import { google } from '@ai-sdk/google';

const SYSTEM_PROMPT = `Eres un experto pedagogo e ingeniero de IA especializado en evaluar prompts educativos.
Tienes que contestar de manera precisa y concisa, no te excedas demasiado para no aburrir al usuario.
REGLAS DE FORMATO OBLIGATORIAS:
- Tu PRIMERA línea de respuesta SIEMPRE debe ser exactamente: **PUNTUACIÓN: [número]/100**
- Luego una línea en blanco.

Después continúa con el análisis completo:

## 🔍 Reflexiones Pedagógicas
Analiza qué funciona bien, qué falta, cuál es la intención del docente, y el nivel de claridad.

## 📊 Feedback Constructivo
Brinda retroalimentación detallada sobre cómo mejorar el prompt. Sé específico con ejemplos.

## ✨ Prompt Mejorado
Proporciona una versión mejorada del prompt dentro de un bloque de cita (>) para que el docente pueda copiarlo directamente.

Mantén un tono entusiasta, profesional e inspirador. Usa emojis moderadamente para hacer el texto más visual.`;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { messages: uiMessages } = body;

    const model = google('gemini-2.5-flash');

    // Convertir UIMessage[] (formato useChat v6) a ModelMessage[]
    // UIMessage: { id, role, parts: [{ type: 'text', text: '...' }] }
    // ModelMessage: { role, content: string }
    const modelMessages = (uiMessages || []).map((msg: { role: string; parts?: { type: string; text?: string }[]; content?: string }) => {
      let content = '';
      if (msg.parts && Array.isArray(msg.parts)) {
        content = msg.parts
          .filter((p: { type: string }) => p.type === 'text')
          .map((p: { text?: string }) => p.text || '')
          .join('');
      } else if (typeof msg.content === 'string') {
        content = msg.content;
      }

      return {
        role: msg.role as 'user' | 'assistant',
        content,
      };
    });

    const result = streamText({
      model,
      system: SYSTEM_PROMPT,
      messages: modelMessages,
    });

    return result.toUIMessageStreamResponse();
  } catch (error) {
    console.error('Error en Evaluate API:', error);
    return Response.json(
      { error: 'Error interno del servidor.' },
      { status: 500 }
    );
  }
}
