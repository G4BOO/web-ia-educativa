import { Sparkles, MessageSquare, Image as ImageIcon, Presentation, ArrowRight, ArrowBigDown, PresentationIcon, Search } from 'lucide-react';

const promptGuides = [
  {
    id: 'text',
    title: 'Prompts para Generación de Texto',
    icon: MessageSquare,
    color: 'from-blue-500 to-indigo-500',
    content: [
      {
        subtitle: 'Asigna un Rol Pedagógico',
        description: 'Haz que la IA adopte una identidad clara. Ejemplo: "Actúa como un tutor de matemáticas para 6° grado y explica las fracciones con analogías de pizzas". El rol define tono, vocabulario y ejemplos.'
      },
      {
        subtitle: 'Controla Formato y Longitud',
        description: 'Sé preciso: "Genera 5 preguntas de opción múltiple con 4 opciones cada una", "Escribe 3 párrafos de máximo 50 palabras cada uno", o "Crea una lista con 10 viñetas". Evita ambigüedades como "varios" o "unos pocos".'
      },
      {
        subtitle: 'Exige Razonamiento Paso a Paso',
        description: 'Para explicaciones complejas, usa Chain-of-Thought: "Primero define el concepto, luego da 2 ejemplos cotidianos, finalmente haz una pregunta de comprensión". Esto evita respuestas vagas o incompletas.'
      },
      {
        subtitle: 'Contextualiza a tu Audiencia',
        description: 'Especifica nivel educativo, conocimientos previos y propósito. Ejemplo: "Explica la fotosíntesis para niños de 10 años que ya saben qué son las plantas, con un tono entusiasta y usando dibujos imaginarios".'
      }
    ]
  },
  {
    id: 'image',
    title: 'Prompts para Generación de Imágenes',
    icon: ImageIcon,
    color: 'from-emerald-400 to-teal-500',
    content: [
      {
        subtitle: 'Estructura: Sujeto + Entorno + Estilo',
        description: 'Sigue esta fórmula de oro: "[Sujeto] haciendo [acción] en [entorno], estilo [técnica artística], [iluminación]". Ejemplo: "Un astronauta perro flotando en el espacio exterior, estilo ilustración digital vectorial, iluminación de neón azul".'
      },
      {
        subtitle: 'Sé Explícito con el Estilo Visual',
        description: 'Usa términos concretos: "fotorrealista", "acuarela", "dibujo infantil", "pixel art", "estudio Ghibli", "fotografía macro", "esquema etiquetado tipo libro escolar". Evita "bonito" o "moderno" (son subjetivos).'
      },
      {
        subtitle: 'Controla Iluminación y Composición',
        description: 'Añade precisión técnica: "luz natural de ventana", "atardecer dorado", "iluminación dramática de cine", "primer plano", "vista aérea", "ángulo contrapicado". La luz cambia drásticamente el resultado.'
      },
      {
        subtitle: 'Define Restricciones de Legibilidad',
        description: 'Para imágenes educativas, añade: "sin textos largos (máx 5 palabras por etiqueta)", "fondo blanco o liso", "colores de alto contraste", "flechas gruesas y visibles". Esto evita imágenes saturadas o ilegibles.'
      }
    ]
  },
  {
    id: 'presentation',
    title: 'Prompts para Presentaciones',
    icon: PresentationIcon,
    color: 'from-amber-400 to-orange-500',
    content: [
      {
        subtitle: 'Fija el Número Exacto de Diapositivas',
        description: 'Siempre especifica una cantidad concreta: "Crea 8 diapositivas sobre cambio climático". Si no lo haces, la IA asumirá 3-5 slides por defecto, perdiendo control sobre la profundidad del contenido.'
      },
      {
        subtitle: 'Define la Estructura de Cada Slide',
        description: 'Usa plantillas como: "Diapositiva X: [Título en 5 palabras] | 3 bullets de máximo 10 palabras cada uno | Sugerencia de imagen: [descripción breve]". Así obtienes contenido directamente usable.'
      },
      {
        subtitle: 'Separa Contenido Visual de Notas del Orador',
        description: 'Pide explícitamente: "Para cada diapositiva, dame dos cosas: (1) Texto breve que irá en la diapositiva (viñetas cortas), (2) Notas del orador con explicaciones detalladas, ejemplos y preguntas para la audiencia".'
      },
      {
        subtitle: 'Añade Tiempo y Ritmo',
        description: 'Controla la duración: "Diseña una presentación de 15 minutos totales, con aprox. 1.5 minutos por diapositiva". Esto fuerza a la IA a priorizar información clave y evitar sobrecarga de contenido.'
      }
    ]
  },
    {
    id: 'research',
    title: 'Prompts para Investigación',
    icon: Search, 
    color: 'from-purple-500 to-pink-500',
    content: [
      {
        subtitle: 'Exige Fuentes y Citas Verificables',
        description: 'Pide explícitamente referencias: "Basado en estudios científicos publicados después de 2020, explica los efectos del cambio climático en los arrecifes de coral. Incluye 3 citas con autor, año y título del estudio". Esto combate el "alucinamiento" de fuentes inventadas.'
      },
      {
        subtitle: 'Usa Chain-of-Thought para Análisis Crítico',
        description: 'Estructura el razonamiento: "Primero, extrae los 3 argumentos principales del texto. Segundo, evalúa sus fortalezas y debilidades. Tercero, compáralos con la teoría de [autor]. Finalmente, emite una conclusión balanceada".'
      },
      {
        subtitle: 'Delimita el Alcance y las Fuentes',
        description: 'Define límites claros: "Investiga solo en estudios revisados por pares (peer-reviewed)", "Utiliza exclusivamente bases de datos como PubMed, Scopus o Google Scholar", "Excluye blogs, opiniones personales y Wikipedia".'
      },
      {
        subtitle: 'Especifica la Ventana Temporal',
        description: 'Las IAs tienen fechas de corte de conocimiento. Pide: "Usa información actualizada hasta [mes/año actual]", o "Busca estudios publicados entre 2020 y 2025". Para temas actuales, pide "indicar si la información no está disponible en tu conocimiento".'
      },
      {
        subtitle: 'Solicita Síntesis y Contraste de Perspectivas',
        description: 'Para trabajos académicos: "Identifica 3 posturas diferentes sobre [tema]. Resume los argumentos clave de cada una, señala sus puntos de consenso y controversia, y sugiere preguntas abiertas para futura investigación".'
      },
      {
        subtitle: 'Exige Explicitación de Incertidumbre',
        description: 'En investigación educativa, la certeza absoluta es engañosa. Pide: "Señala cuándo la evidencia es débil, cuándo hay consenso científico y cuándo hay debate abierto. Usa frases como "sugiere", "probablemente", "no hay consenso".'
      }
    ]
  }
];

export default function PromptsPage() {
  return (
    <div className="min-h-screen pb-20">
      <header className="px-4 md:px-8 py-8 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md border-b border-slate-200 dark:border-white/5">
        <div className="flex items-center gap-4 mb-2">

          <div>
            <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">Guía de Prompts</h1>
            <p className="text-slate-500 dark:text-slate-400 mt-1 font-medium">Aprende a formular las instrucciones perfectas para la Inteligencia Artificial.</p>
          </div>
        </div>
      </header>

      <div className="px-4 md:px-8 py-8 space-y-12 max-w-5xl">
        {promptGuides.map((guide) => {
          const Icon = guide.icon;
          return (
            <section key={guide.id} className="scroll-mt-24">
              <div className="flex items-center gap-3 mb-6">
                <div className={`p-3 rounded-xl bg-gradient-to-br ${guide.color} text-white shadow-lg`}>
                  <Icon size={24} />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{guide.title}</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {guide.content.map((item, index) => (
                  <div key={index} className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-white/5 shadow-sm hover:shadow-md transition-shadow">
                    <div className=" font-bold text-xl mb-2 text-blue-800">0{index + 1}</div>
                    <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-3">{item.subtitle}</h3>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )
        })}
      </div>
    </div>
  );
}
