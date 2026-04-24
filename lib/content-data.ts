// ════════════════════════════════════════════════════════════════
// Datos centralizados de Guías de la plataforma IA Educativa
// ════════════════════════════════════════════════════════════════

export interface Guide {
  slug: string;
  icon: string;
  title: string;
  description: string;
  colorClass: string;
  category: string;
  readTime: string;
  content: string; // Markdown
}

// ────────────────────────────────────────────────────
// GUÍAS — CATEGORÍAS DE IA PARA DOCENTES
// ────────────────────────────────────────────────────

export const guides: Guide[] = [
  {
    slug: 'ia-contenido-visual',
    icon: 'palette',
    title: 'IA para Contenido Visual',
    description: 'Genera imágenes, ilustraciones y diseños gráficos de forma automática a partir de descripciones escritas.',
    colorClass: 'bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400',
    category: 'Contenido Visual',
    readTime: '6 min',
    content: `
## IA para Crear Contenido Visual

Herramientas como **Canva**, **DALL·E** y **Midjourney** permiten generar imágenes, ilustraciones, diseños gráficos y contenido visual de manera automática a partir de descripciones escritas (prompts).

### ¿Para qué sirve?

Este tipo de inteligencia artificial es ampliamente utilizada en:

- 🎨 **Marketing digital** — Creación de banners, posts y anuncios
- 🖌️ **Diseño gráfico** — Ilustraciones personalizadas sin conocimientos avanzados
- 📱 **Redes sociales** — Contenido visual atractivo y rápido
- 📚 **Educación** — Material didáctico visual para clases

### Ventajas Clave

| Ventaja | Descripción |
|---------|-------------|
| **Ahorro de tiempo** | Crea imágenes en segundos, no en horas |
| **Sin conocimientos técnicos** | No necesitas ser diseñador |
| **Múltiples variaciones** | Genera diferentes versiones de una misma idea |
| **Potencia la creatividad** | Explora estilos y conceptos rápidamente |

### Herramientas Recomendadas

1. **Canva** — Diseños con plantillas + IA generativa integrada
2. **DALL·E** (OpenAI) — Generación de imágenes desde texto
3. **Midjourney** — Imágenes artísticas de alta calidad
4. **Adobe Firefly** — Integrada en el ecosistema Adobe

### Ejemplo de Prompt para Imagen Educativa

> "Crea una ilustración colorida estilo infografía que muestre el ciclo del agua para estudiantes de primaria. Incluye flechas, etiquetas claras y un fondo azul cielo. Estilo: plano, amigable, educativo."

### Consideraciones Éticas

- ⚖️ **Verifica derechos de uso** de las imágenes generadas antes de publicarlas
- 🔍 **Revisa sesgos visuales** — La IA puede perpetuar estereotipos en las representaciones
- 📌 **Cita la herramienta** usada cuando compartas contenido generado por IA
`,
  },
  {
    slug: 'ia-presentaciones',
    icon: 'slideshow',
    title: 'IA para Gráficos y Presentaciones',
    description: 'Genera presentaciones, infografías y gráficos de forma automatizada con diseño profesional.',
    colorClass: 'bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400',
    category: 'Presentaciones',
    readTime: '7 min',
    content: `
## IA para Crear Gráficos y Presentaciones

Plataformas como **Beautiful.ai**, **Tome** y **Canva** ayudan a generar presentaciones, infografías y gráficos de forma automatizada.

### ¿Cómo Funciona?

Estas herramientas utilizan inteligencia artificial para:

- 📐 **Organizar la información** automáticamente en diapositivas
- 🎨 **Seleccionar diseños adecuados** según el contenido
- ✨ **Mejorar la estética** del material visual
- 📊 **Generar gráficos** a partir de datos crudos

### ¿Dónde es más útil?

Son especialmente útiles en **entornos académicos y profesionales**, ya que permiten comunicar ideas complejas de manera clara, visual y estructurada, reduciendo el esfuerzo en el diseño manual.

### Herramientas Recomendadas

1. **Beautiful.ai** — Presentaciones con diseño inteligente automático
2. **Tome** — Narrativas visuales generadas por IA
3. **Canva Presentaciones** — Plantillas + generación asistida
4. **Gamma** — Presentaciones y documentos desde un prompt

### Ejemplo de Prompt

> "Crea una presentación de 6 diapositivas sobre el calentamiento global para estudiantes de secundaria. Incluye datos estadísticos, gráficos de temperatura y sugerencias de imágenes. Diseño moderno y limpio."

### Consejos para Docentes

- 📝 **Revisa siempre el contenido generado** — la IA puede incluir datos inexactos
- 🎯 **Adapta al nivel de tus estudiantes** — simplifica o enriquece según necesidad
- 🖼️ **Complementa con recursos propios** — usa las presentaciones como base, no como producto final
`,
  },
//   {
//     slug: 'ia-paginas-web',
//     icon: 'language',
//     title: 'IA para Crear Páginas Web',
//     description: 'Diseña y desarrolla sitios web sin necesidad de conocimientos en programación.',
//     colorClass: 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400',
//     category: 'Desarrollo Web',
//     readTime: '6 min',
//     content: `
// ## IA para Crear Páginas Web

// Herramientas como **Wix ADI**, **Bookmark AiDA** y **10Web** permiten diseñar y desarrollar sitios web sin necesidad de conocimientos en programación.

// ### ¿Cómo Funciona?

// Estas plataformas analizan las necesidades del usuario y generan automáticamente:

// - 🏗️ **Estructuras web** completas
// - 🎨 **Diseños personalizados** según el tipo de sitio
// - 📝 **Contenido textual** adaptado al propósito
// - ⚙️ **Funcionalidades** como formularios, galerías y más

// ### ¿Por qué es importante?

// Esto **democratiza el acceso al desarrollo web**, permitiendo que estudiantes, emprendedores y docentes puedan crear sus propias páginas de forma rápida y eficiente.

// ### Herramientas Recomendadas

// 1. **Wix ADI** — Sitios web generados automáticamente con IA
// 2. **Bookmark AiDA** — Diseño web en minutos
// 3. **10Web** — Sitios WordPress generados por IA
// 4. **Framer** — Diseño web profesional con IA

// ### Aplicación Educativa

// > Los docentes pueden crear portafolios digitales, páginas de clase o micrositios para proyectos estudiantiles sin necesidad de saber programar.

// ### Consideraciones

// - 🔒 **Protege la privacidad** de tus estudiantes al crear sitios públicos
// - 📱 **Verifica la responsividad** — asegúrate de que se vea bien en celulares
// - ♿ **Accesibilidad** — revisa que el sitio sea usable para todos
// `,
//   },
  {
    slug: 'ia-investigacion',
    icon: 'search',
    title: 'IA para Investigación',
    description: 'Busca, resume, analiza y explica información en segundos con herramientas de IA.',
    colorClass: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400',
    category: 'Investigación',
    readTime: '8 min',
    content: `
## IA para Investigación y Búsqueda de Información

Herramientas como **ChatGPT**, **Google Gemini** y **Perplexity AI** facilitan la investigación al permitir buscar, resumir, analizar y explicar información en segundos.

### ¿Por qué es clave en educación?

Este tipo de IA es fundamental en el ámbito académico, ya que ayuda a los estudiantes y docentes a:

- 🔍 **Comprender temas complejos** — Explicaciones adaptadas al nivel
- 💡 **Generar ideas** — Brainstorming para proyectos e investigaciones
- 📋 **Estructurar trabajos** — Esquemas, índices y marcos teóricos
- ⚡ **Acceder a información** de forma rápida y sintetizada

### Herramientas Recomendadas

1. **ChatGPT** (OpenAI) — Asistente conversacional para investigación
2. **Google Gemini** — Búsqueda inteligente con IA de Google
3. **Perplexity AI** — Motor de búsqueda con respuestas citadas
4. **Consensus** — Búsqueda de papers académicos con IA

### Ejemplo de Prompt para Investigación

> "Explica las causas principales de la Revolución Industrial en un lenguaje comprensible para estudiantes de 2do de secundaria. Organiza la información en 4 secciones con subtítulos claros e incluye 3 fuentes recomendadas para profundizar."

### ⚠️ Pensamiento Crítico

Es **fundamental** desarrollar pensamiento crítico para validar la información obtenida:

- 🤔 **La IA puede alucinar** — siempre verifica datos, fechas y cifras
- 📚 **Cruza con fuentes confiables** — no dependas de una sola herramienta
- 🧠 **Enséñale a tus estudiantes** a cuestionar, no solo a copiar
- 📖 **Cita correctamente** — la IA no es una fuente primaria
`,
  },
  {
    slug: 'ia-redaccion',
    icon: 'edit_note',
    title: 'IA para Redacción y Textos',
    description: 'Genera textos, corrige errores gramaticales y mejora la calidad de la escritura.',
    colorClass: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400',
    category: 'Redacción',
    readTime: '7 min',
    content: `
## IA para Redacción y Creación de Textos

Herramientas como **Grammarly**, **Jasper AI** y **ChatGPT** permiten generar textos, corregir errores gramaticales y mejorar la calidad de la escritura.

### ¿Para qué sirven?

Son útiles para:

- 📝 **Redactar ensayos** — Estructura y contenido asistido
- 📧 **Correos electrónicos** — Comunicación profesional rápida
- 📊 **Informes** — Documentos claros y bien organizados
- 🌐 **Contenido digital** — Blogs, publicaciones y materiales web

### Beneficios en Educación

Estas herramientas ayudan a mejorar la:

| Aspecto | Cómo ayuda la IA |
|---------|-----------------|
| **Coherencia** | Mantiene el hilo lógico del texto |
| **Cohesión** | Conecta ideas con transiciones adecuadas |
| **Claridad** | Simplifica oraciones complejas |
| **Gramática** | Corrige errores ortográficos y sintácticos |

### Herramientas Recomendadas

1. **Grammarly** — Corrección gramatical y de estilo en tiempo real
2. **Jasper AI** — Generación de contenido creativo y profesional
3. **ChatGPT** — Asistente versátil para todo tipo de textos
4. **QuillBot** — Parafraseo y mejora de textos

### Ejemplo de Prompt

> "Revisa el siguiente párrafo de un ensayo sobre cambio climático escrito por un estudiante de preparatoria. Corrige errores gramaticales, mejora la claridad y sugiere cómo fortalecer los argumentos. Mantén la voz del estudiante."

### Uso Responsable

- ✅ **Úsala como herramienta de aprendizaje**, no como sustituto del esfuerzo
- 🔄 **Revisa y personaliza** siempre el texto generado
- 📖 **Enseña a tus estudiantes** a escribir primero y luego usar IA para mejorar
`,
  },
  {
    slug: 'ia-educacion-docentes',
    icon: 'school',
    title: 'IA para Educación y Docentes',
    description: 'Herramientas diseñadas para crear planes de clase, actividades, evaluaciones y contenidos educativos.',
    colorClass: 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400',
    category: 'Educación',
    readTime: '9 min',
    content: `
## IA para Educación y Docentes

Herramientas como **MagicSchool AI**, **Eduaide.AI** y **Curipod** están diseñadas **específicamente** para apoyar a los docentes en su labor diaria.

### ¿Qué pueden hacer?

Estas plataformas permiten:

- 📋 **Crear planes de clase** — Estructurados y alineados a estándares
- 🎮 **Generar actividades** — Interactivas, gamificadas y diferenciadas
- 📊 **Diseñar evaluaciones** — Rúbricas, exámenes y quizzes automáticos
- 🔄 **Adaptar contenidos** — Material personalizado para diferentes niveles

### Beneficios para el Docente

| Beneficio | Descripción |
|-----------|-------------|
| **Eficiencia** | Reduce horas de planificación |
| **Innovación** | Introduce dinámicas nuevas al aula |
| **Personalización** | Adapta contenido a cada estudiante |
| **Creatividad** | Genera ideas frescas para enseñar |

### Herramientas Recomendadas

1. **MagicSchool AI** — Plataforma integral para docentes con 50+ herramientas
2. **Eduaide.AI** — Generador de recursos educativos por competencias
3. **Curipod** — Presentaciones interactivas con retroalimentación en vivo
4. **Diffit** — Adaptación de textos por nivel de lectura

### Ejemplo de Prompt para Planificación

> "Diseña un plan de clase de 50 minutos sobre fracciones equivalentes para 5to grado. Incluye: objetivo de aprendizaje alineado a SEP, actividad de apertura con material concreto, desarrollo con trabajo colaborativo, cierre con evaluación formativa y tarea para casa."

### Impacto en el Aula

Su uso mejora la **eficiencia docente** y favorece la **innovación en el aula**, facilitando una enseñanza más dinámica y personalizada. El tiempo que ahorras en planificación lo puedes invertir en lo más importante: **estar presente para tus estudiantes**.
`,
  },
];

// ────────────────────────────────────────────────────
// HELPERS
// ────────────────────────────────────────────────────

export function getGuideBySlug(slug: string): Guide | undefined {
  return guides.find((g) => g.slug === slug);
}
