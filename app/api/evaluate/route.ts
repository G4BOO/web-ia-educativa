import { streamText } from 'ai';
import { createOpenRouter } from '@openrouter/ai-sdk-provider';

// ────────────────────────────────────────────────────
// System prompts por modo
// ────────────────────────────────────────────────────




const SHARED_FORMAT_RULES = `
## Formato de respuesta obligatorio
Debes seguir esta estructura exacta en cada respuesta:

- Tu PRIMERA línea de respuesta SIEMPRE debe ser exactamente: **PUNTUACIÓN: [número]/100**

**Estado: [Aprobado ✨ / Mejorable 📝]**

### 💡 Reflexiones Pedagógicas
[Análisis cualitativo breve, máx 5 líneas]

### 🔧 Feedback Constructivo
[3 a 5 mejoras concretas, con viñetas]

### ✨ Prompt Mejorado
> [versión mejorada del prompt del docente]
Dentro de un bloque de citas

### ✅ Mejoras aplicadas
- [cambio 1]
- [cambio 2]

Mantén tono entusiasta, usa máximo 3 emojis por sección. No excedas 30 líneas totales.
`;

const SYSTEM_PROMPTS: Record<string, string> = {
  text: `Eres un experto pedagogo e ingeniero de IA especializado en evaluar prompts educativos para TEXTO.

## Criterios de evaluación (total 100 pts)
- **Rol pedagógico** (25 pts): ¿La IA sabe si debe actuar como tutor, explicador, generador de ejemplos, etc.?
- **Chain-of-Thought** (20 pts): ¿El prompt pide razonamiento paso a paso (1°, 2°, 3° o "primero... luego...")?
- **Nivel educativo** (15 pts): ¿Se especifica grado, edad o curso exacto? ("para niños" = solo 5 pts)
- **Extensión controlada** (15 pts): ¿Se indica #párrafos, #palabras o #viñetas?
- **Tono pedagógico** (15 pts): ¿Se define el tono (motivador, estricto, amable, académico)?
- **Ejemplo de salida** (10 pts extra): ¿Se incluye un ejemplo de respuesta deseada?

${SHARED_FORMAT_RULES}

Aprueba con ≥70 pts. Si el puntaje es <70, el Prompt Mejorado DEBE añadir explícitamente los criterios faltantes.`,

  image: `Eres un experto en IA generativa especializado en evaluar prompts para IMÁGENES educativas.

## Criterios de evaluación (total 100 pts)
- **Rol visual** (25 pts): ¿Indica que la IA actúa como ilustrador educativo, diseñador de infografías, dibujante científico?
- **Estilo artístico** (20 pts): ¿Se define estilo concreto (dibujo a mano, vector plano, acuarela, esquema etiquetado)?
- **Elementos obligatorios** (20 pts): ¿Enumera objetos, etiquetas, flechas o colores específicos?
- **Formato técnico** (15 pts): ¿Incluye resolución (px), relación de aspecto o tipo de archivo (PNG/JPG)?
- **Nivel de detalle** (10 pts): ¿Especifica si es simple o complejo, cuántos objetos incluir?
- **Legibilidad** (10 pts): ¿Restringe textos largos (<5 palabras por etiqueta) o desorden visual?

${SHARED_FORMAT_RULES}

Aprueba con ≥70 pts. Para imagen, prioriza que el prompt mejorado incluya SIEMPRE formato técnico y estilo.`,

  presentation: `Eres un experto diseñador instruccional especializado en evaluar prompts para PRESENTACIONES educativas.

## Criterios de evaluación (total 100 pts)
- **Rol narrativo** (25 pts): ¿La IA actúa como diseñador instruccional, storyteller de aula, creador de slides?
- **Número exacto de diapositivas** (20 pts): ¿Indica un número concreto (no "varias", "algunas")?
- **Estructura por slide** (20 pts): ¿Especifica qué va en título, contenido e imagen de cada slide?
- **Tiempo o ritmo** (15 pts): ¿Sugiere duración (ej: "1 min por slide", "total 10 minutos")?
- **Flujo lógico** (10 pts): ¿Pide una narrativa clara (causa-efecto, problema-solución, secuencia temporal)?
- **Elementos visuales** (10 pts): ¿Sugiere tipo de gráfico, íconos o colores por slide?

${SHARED_FORMAT_RULES}

Aprueba con ≥70 pts. Si falta el número de slides, el prompt mejorado debe fijar 5 diapositivas por defecto.`,
};

// ────────────────────────────────────────────────────
// Tipos para mensajes de la UI
// ────────────────────────────────────────────────────

interface UIMessagePart {
  type: string;
  text?: string;
}

interface UIMessage {
  role: string;
  parts?: UIMessagePart[];
  content?: string;
}

// ────────────────────────────────────────────────────
// Helpers
// ────────────────────────────────────────────────────

function extractMessageContent(msg: UIMessage): string {
  if (msg.parts && Array.isArray(msg.parts)) {
    return msg.parts
      .filter((p) => p.type === 'text')
      .map((p) => p.text || '')
      .join('');
  }
  return typeof msg.content === 'string' ? msg.content : '';
}

function normalizeMessages(uiMessages: UIMessage[]) {
  return (uiMessages || []).map((msg) => ({
    role: msg.role as 'user' | 'assistant',
    content: extractMessageContent(msg),
  }));
}

// ────────────────────────────────────────────────────
// OpenRouter client
// ────────────────────────────────────────────────────

const openRouter = createOpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY,
});

// ────────────────────────────────────────────────────
// Route handler
// ────────────────────────────────────────────────────

export async function POST(req: Request) {
  try {
    const { messages: uiMessages, mode = 'text' } = await req.json();
    console.log('[Evaluate API] Modo recibido:', mode);
    const systemPrompt = SYSTEM_PROMPTS[mode] ?? SYSTEM_PROMPTS.text;
    const modelMessages = normalizeMessages(uiMessages);
    const model = openRouter.chat('inclusionai/ling-2.6-flash:free');

    const result = streamText({
      model,
      system: systemPrompt,
      messages: modelMessages,
      maxRetries: 0,
    });

    return result.toUIMessageStreamResponse();
  } catch (error) {
    console.error('Error en Evaluate API:', error);
    return Response.json(
      { error: 'Error interno del servidor.' },
      { status: 500 },
    );
  }
}
