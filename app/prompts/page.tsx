"use client";

import { useState } from 'react';
import { Sparkles, MessageSquare, Image as ImageIcon, Presentation, Search, ChevronDown } from 'lucide-react';

const promptGuides = [
  {
    id: 'text',
    title: 'Prompts para Generación de Texto',
    icon: MessageSquare,
    color: 'from-blue-500 to-indigo-500',
    accentBorder: 'border-blue-500/30',
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
    accentBorder: 'border-emerald-500/30',
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
    icon: Presentation,
    color: 'from-amber-400 to-orange-500',
    accentBorder: 'border-amber-500/30',
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
    accentBorder: 'border-purple-500/30',
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

// ────────────────────────────────────────────────────
// Componente de item individual colapsable
// ────────────────────────────────────────────────────

function PromptItem({ item, index, isOpen, onToggle }: {
  item: { subtitle: string; description: string };
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      className={`border rounded-xl transition-all duration-200 ${
        isOpen
          ? 'border-primary/20 bg-white dark:bg-slate-900/80 shadow-sm'
          : 'border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-slate-900/30 hover:border-slate-200 dark:hover:border-white/10'
      }`}
    >
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center gap-3 px-4 py-3.5 text-left cursor-pointer group"
      >
        <span className={`text-xs font-black tabular-nums rounded-lg w-7 h-7 flex items-center justify-center shrink-0 transition-colors duration-200 ${
          isOpen
            ? 'bg-primary/10 text-primary'
            : 'bg-slate-100 dark:bg-slate-800 text-slate-400'
        }`}>
          {String(index + 1).padStart(2, '0')}
        </span>
        <span className={`font-semibold text-sm transition-colors duration-200 ${
          isOpen ? 'text-slate-900 dark:text-white' : 'text-slate-600 dark:text-slate-300'
        }`}>
          {item.subtitle}
        </span>
        <ChevronDown
          size={16}
          className={`ml-auto shrink-0 text-slate-400 transition-transform duration-300 ease-out ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>
      <div
        className="grid transition-all duration-300 ease-out"
        style={{
          gridTemplateRows: isOpen ? '1fr' : '0fr',
        }}
      >
        <div className="overflow-hidden">
          <p className="px-4 pb-4 pt-0 text-sm text-slate-500 dark:text-slate-400 leading-relaxed pl-14">
            {item.description}
          </p>
        </div>
      </div>
    </div>
  );
}

// ────────────────────────────────────────────────────
// Componente de sección (categoría) colapsable
// ────────────────────────────────────────────────────

function PromptSection({ guide }: { guide: typeof promptGuides[number] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [openItems, setOpenItems] = useState<Set<number>>(new Set());
  const Icon = guide.icon;

  const toggleItem = (index: number) => {
    setOpenItems((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  return (
    <div
      className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
        isOpen
          ? `border-slate-200 dark:border-white/10 shadow-lg shadow-black/[0.03] dark:shadow-black/20`
          : 'border-slate-100 dark:border-white/5 hover:border-slate-200 dark:hover:border-white/10 hover:shadow-md hover:shadow-black/[0.02]'
      }`}
    >
      {/* Cabecera de la sección */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center gap-4 px-5 py-4 text-left cursor-pointer group bg-white dark:bg-slate-900/50 hover:bg-slate-50/80 dark:hover:bg-slate-900/70 transition-colors"
      >
        <div className={`p-2.5 rounded-xl bg-gradient-to-br ${guide.color} text-white shadow-md transition-transform duration-300 ${isOpen ? 'scale-110' : 'group-hover:scale-105'}`}>
          <Icon size={20} />
        </div>

        <div className="flex-1 min-w-0">
          <h2 className="text-base font-bold text-slate-900 dark:text-white truncate">{guide.title}</h2>
          <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">
            {guide.content.length} {guide.content.length === 1 ? 'consejo' : 'consejos'}
          </p>
        </div>

        <div className={`flex items-center justify-center w-8 h-8 rounded-full transition-all duration-300 ${
          isOpen
            ? 'bg-primary/10 text-primary rotate-180'
            : 'bg-slate-100 dark:bg-slate-800 text-slate-400 group-hover:bg-slate-200 dark:group-hover:bg-slate-700'
        }`}>
          <ChevronDown size={18} />
        </div>
      </button>

      {/* Contenido colapsable */}
      <div
        className="grid transition-all duration-400 ease-out"
        style={{
          gridTemplateRows: isOpen ? '1fr' : '0fr',
        }}
      >
        <div className="overflow-hidden">
          <div className="px-5 pb-5 pt-2 space-y-2">
            {guide.content.map((item, index) => (
              <PromptItem
                key={index}
                item={item}
                index={index}
                isOpen={openItems.has(index)}
                onToggle={() => toggleItem(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ────────────────────────────────────────────────────
// Página principal
// ────────────────────────────────────────────────────

export default function PromptsPage() {
  const [allOpen, setAllOpen] = useState(false);

  return (
    <div className="min-h-screen pb-20">
      <header className="px-4 md:px-8 py-8 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md border-b border-slate-200 dark:border-white/5">
        <div className="flex items-center justify-between gap-4 mb-2 max-w-5xl">
          <div>
            <h1 className="text-xl font-black tracking-tight text-slate-900 dark:text-white">Guía de Prompts</h1>
            <p className="text-slate-500 dark:text-slate-400 mt-1 font-medium">Aprende a formular las instrucciones perfectas para la Inteligencia Artificial.</p>
          </div>
        </div>
      </header>

      <div className="px-4 md:px-8 py-8 space-y-3 max-w-5xl">
        {promptGuides.map((guide) => (
          <PromptSection key={guide.id} guide={guide} />
        ))}
      </div>
    </div>
  );
}
