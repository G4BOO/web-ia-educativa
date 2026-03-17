// ════════════════════════════════════════════════════════════════
// Datos centralizados de Guías y Blog de la plataforma
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

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  author: string;
  coverIcon: string;
  colorClass: string;
  content: string; // Markdown
}

// ────────────────────────────────────────────────────
// GUÍAS EDUCATIVAS
// ────────────────────────────────────────────────────

export const guides: Guide[] = [
  {
    slug: 'metodo-role',
    icon: 'person_search',
    title: 'Método ROLE para Prompts',
    description: 'Aprende a estructurar tus prompts con el framework ROLE: Rol, Objetivo, Limitaciones y Estilo para obtener respuestas precisas.',
    colorClass: 'bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400',
    category: 'Prompt Engineering',
    readTime: '8 min',
    content: `
## ¿Qué es el Método ROLE?

El método **ROLE** es un framework diseñado para que los docentes puedan construir prompts de alta calidad al interactuar con Inteligencia Artificial. Cada letra representa un componente clave:

### R — Rol
Define **quién** quieres que sea la IA. Darle un rol específico mejora la calidad de las respuestas hasta un 40%.

> **Ejemplo:** "Actúa como un pedagogo especialista en educación primaria con 15 años de experiencia."

### O — Objetivo
Describe **qué** necesitas que haga. Sé específico y claro sobre el resultado esperado.

> **Ejemplo:** "Necesito que diseñes un plan de clase de 45 minutos sobre fotosíntesis para estudiantes de 5to grado."

### L — Limitaciones
Establece las **restricciones** y el contexto. Esto incluye nivel educativo, tiempo, recursos disponibles, etc.

> **Ejemplo:** "Los estudiantes tienen acceso limitado a tecnología. Usa solo materiales físicos como plantas, papel y colores."

### E — Estilo de Respuesta
Indica el **formato** y tono de la respuesta.

> **Ejemplo:** "Responde con un plan estructurado en tabla con columnas: Tiempo, Actividad, Recursos y Evaluación."

---

## Ejemplo Completo

> **Prompt ROLE:** "Actúa como un pedagogo experto en ciencias naturales (R). Diseña un plan de clase de 45 minutos sobre el ciclo del agua para 4to grado (O). Los estudiantes tienen nivel básico de lectura y no hay acceso a proyector (L). Presenta el plan en formato tabla con actividades prácticas y una rúbrica de evaluación simple (E)."

## Errores Comunes

1. **Ser demasiado vago:** "Hazme un plan de clase" → No tiene contexto
2. **No dar restricciones:** Sin limitaciones, la IA puede sugerir recursos inaccesibles
3. **Olvidar el formato:** Sin indicar estilo, la respuesta puede ser un bloque de texto inútil

## Consideraciones Éticas

- ⚖️ **Nunca uses IA para reemplazar tu criterio pedagógico** — úsala como herramienta de apoyo
- 🔒 **No incluyas información personal de estudiantes** en los prompts
- ✅ **Siempre revisa y adapta** las respuestas de la IA antes de usarlas en clase
`,
  },
  {
    slug: 'creacion-rubricas',
    icon: 'fact_check',
    title: 'Creación de Rúbricas con IA',
    description: 'Genera rúbricas de evaluación detalladas y alineadas con los estándares educativos usando prompts efectivos.',
    colorClass: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400',
    category: 'Evaluación',
    readTime: '10 min',
    content: `
## ¿Por qué usar IA para crear rúbricas?

Crear rúbricas alineadas a estándares consume un promedio de **2-3 horas** por asignación. Con IA, puedes reducir ese tiempo a **15 minutos** sin sacrificar calidad.

### Componentes de una buena rúbrica

1. **Criterios claros** — ¿Qué aspectos evalúas?
2. **Niveles de desempeño** — Generalmente 4: Excelente, Bueno, Aceptable, Necesita Mejora
3. **Descriptores específicos** — ¿Qué significa exactamente "excelente" en cada criterio?
4. **Ponderación** — ¿Cuánto vale cada criterio?

### Prompt Modelo

> "Eres un experto en evaluación educativa. Crea una rúbrica analítica con 4 niveles de desempeño (Excelente, Bueno, Aceptable, En Desarrollo) para evaluar un ensayo argumentativo sobre cambio climático de estudiantes de 9no grado. Incluye los criterios: Tesis, Argumentación, Evidencia, Organización y Gramática. Formato: tabla con descriptores específicos para cada nivel."

### Consejos Éticos

- 🎯 **Personaliza siempre** la rúbrica al contexto de tus estudiantes
- 🔄 **La IA es un borrador** — no el producto final
- 📊 **Comparte la rúbrica** con estudiantes ANTES de la evaluación
- ⚖️ **Verifica el sesgo** — revisa que los criterios no discriminen
`,
  },
  {
    slug: 'feedback-formativo',
    icon: 'forum',
    title: 'Feedback Formativo con IA',
    description: 'Usa la IA para generar retroalimentación constructiva, personalizada y oportuna para tus estudiantes.',
    colorClass: 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400',
    category: 'Retroalimentación',
    readTime: '7 min',
    content: `
## El Arte del Feedback Formativo

El feedback formativo **no califica** — **guía**. La IA puede ayudarte a generar retroalimentación que motive al estudiante a mejorar.

### Principios del Buen Feedback

1. **Específico:** No "buen trabajo", sino "tu argumento sobre X es sólido porque..."
2. **Oportuno:** Lo más cercano posible al momento de la actividad
3. **Accionable:** Indica exactamente qué puede hacer el estudiante para mejorar
4. **Empático:** Reconoce el esfuerzo antes de señalar áreas de mejora

### Prompt para Feedback

> "Actúa como un tutor amable y experto. Un estudiante de 7mo grado escribió el siguiente párrafo sobre la independencia. Proporciona feedback formativo siguiendo el modelo: 1) Destaca algo positivo, 2) Identifica un área de mejora con ejemplo, 3) Sugiere un siguiente paso concreto. Tono: motivador y respetuoso."

### ⚠️ Precauciones Éticas

- **Nunca entregues feedback generado por IA sin revisarlo**
- **No copies y pegues directamente** — adapta el lenguaje a tu relación con el estudiante
- **Mantén la confidencialidad** — no incluyas nombres reales de estudiantes en los prompts
`,
  },
  {
    slug: 'adaptacion-curricular',
    icon: 'diversity_3',
    title: 'Adaptación Curricular',
    description: 'Adapta materiales educativos para necesidades especiales, diferentes niveles y estilos de aprendizaje.',
    colorClass: 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400',
    category: 'Inclusión',
    readTime: '9 min',
    content: `
## Inclusión Educativa con IA

La adaptación curricular es uno de los desafíos más grandes para los docentes. La IA puede ayudarte a crear **versiones diferenciadas** de un mismo material.

### Tipos de Adaptación

| Tipo | Descripción | Ejemplo con IA |
|------|-------------|----------------|
| **Contenido** | Simplificar o enriquecer el material | "Adapta este texto a nivel de lectura de 3er grado" |
| **Proceso** | Cambiar la forma de aprender | "Crea 3 actividades: visual, auditiva y kinestésica" |
| **Producto** | Diferentes maneras de demostrar aprendizaje | "Ofrece 5 opciones de proyecto final alternativas" |
| **Ambiente** | Ajustar el entorno | "Diseña instrucciones paso a paso con imágenes" |

### Prompt para TDAH

> "Necesito adaptar el siguiente texto (500 palabras) sobre la Revolución Francesa para un estudiante de 8vo grado con TDAH. Divide el contenido en secciones cortas (máximo 3 párrafos), agrega preguntas de comprensión entre secciones, usa negritas para conceptos clave y sugiere pausas activas cada 10 minutos."

### Consideraciones Éticas Fundamentales

- 🔒 **Nunca menciones diagnósticos específicos de estudiantes** al usar IA
- ❤️ **La adaptación es un derecho**, no una excepción
- 🧠 **Conoce a tu estudiante** — la IA no reemplaza tu observación directa
`,
  },
  {
    slug: 'gamificacion-educativa',
    icon: 'sports_esports',
    title: 'Gamificación Educativa',
    description: 'Transforma tus clases en experiencias de juego con mecánicas de gamificación diseñadas con IA.',
    colorClass: 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400',
    category: 'Metodología',
    readTime: '8 min',
    content: `
## Gamificación ≠ Juegos

La gamificación no es jugar en clase. Es aplicar **mecánicas de juego** (puntos, niveles, desafíos, narrativa) en contextos educativos para aumentar la motivación.

### Mecánicas Clave

- 🏆 **Puntos y recompensas** — Sistema de reconocimiento
- 📊 **Barras de progreso** — Visualización del avance
- 🎯 **Misiones y desafíos** — Tareas con narrativa
- 🤝 **Cooperación** — Trabajo en equipo con roles
- 🔓 **Desbloqueo de contenido** — Motivación por descubrimiento

### Prompt para Gamificar

> "Eres un diseñador de experiencias educativas. Gamifica una unidad de Matemáticas sobre fracciones para 6to grado que dure 2 semanas. Diseña: 1) Una narrativa envolvente (historia/tema), 2) Sistema de puntos y niveles, 3) Al menos 5 misiones progresivas, 4) Un desafío final. Los estudiantes no tienen acceso a tecnología — todo debe ser analógico."

### Ética en la Gamificación

- ⚖️ **No fomentes la competencia tóxica** — enfócate en superarse a sí mismo
- 🎮 **No priorices el juego sobre el aprendizaje**
- 🌟 **Asegúrate de que todos puedan ganar** — inclusividad en las mecánicas
`,
  },
  {
    slug: 'creatividad-aula',
    icon: 'lightbulb',
    title: 'Inyectar Creatividad',
    description: 'Usa la IA para generar analogías, metáforas y conexiones creativas que hagan tus clases más memorables.',
    colorClass: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400',
    category: 'Creatividad',
    readTime: '6 min',
    content: `
## La Creatividad como Herramienta Pedagógica

Los estudiantes retienen un **65% más de información** cuando se presenta a través de analogías y metáforas creativas.

### Tipos de Creatividad Asistida por IA

1. **Analogías:** "Explica las mitocondrias como si fueran la planta eléctrica de una ciudad"
2. **Historias:** "Crea un cuento corto donde los personajes son los elementos de la tabla periódica"
3. **Conexiones inesperadas:** "¿Qué tienen en común el fútbol y las ecuaciones lineales?"
4. **Visualizaciones:** "Describe cómo se vería el sistema solar si los planetas fueran frutas"

### Prompt para Analogías

> "Genera 5 analogías creativas y originales para explicar el concepto de 'democracia' a estudiantes de 7mo grado. Cada analogía debe usar elementos de la vida cotidiana del estudiante (deportes, redes sociales, videojuegos, familia, música). Incluye una breve explicación de por qué la analogía funciona."

### Uso Ético

- 🎨 **La creatividad de la IA inspira, no reemplaza**
- 📚 **Verifica la precisión científica** de las analogías generadas
- 🧒 **Asegúrate de que las analogías sean culturalmente apropiadas**
`,
  },
];

// ────────────────────────────────────────────────────
// ARTÍCULOS DEL BLOG
// ────────────────────────────────────────────────────

export const blogPosts: BlogPost[] = [
  {
    slug: 'etica-ia-educacion',
    title: '¿Qué significa usar IA de manera Ética en el Aula?',
    excerpt: 'Una guía introductoria para docentes sobre los principios éticos fundamentales al integrar IA en la enseñanza.',
    category: 'Ética',
    date: '2026-03-15',
    readTime: '12 min',
    author: 'Equipo Otto AI',
    coverIcon: 'balance',
    colorClass: 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400',
    content: `
## La IA llegó al aula — ¿Estamos preparados?

La Inteligencia Artificial ya no es ciencia ficción. Tus estudiantes la usan diariamente para tareas, investigaciones y proyectos. Como docentes, tenemos la responsabilidad de **modelar su uso ético**.

### Los 5 Principios de la IA Ética en Educación

#### 1. 🔍 Transparencia
**Qué significa:** Ser honesto sobre cuándo y cómo se usa la IA.

Los estudiantes deben saber cuándo un material fue generado o asistido por IA. El docente debe modelar esta transparencia usándola abiertamente y discutiendo sus limitaciones.

#### 2. ⚖️ Justicia y No Discriminación
**Qué significa:** Verificar que las herramientas de IA no perpetúen sesgos.

Los modelos de IA son entrenados con datos que pueden contener sesgos históricos. Es crucial que el docente revise las respuestas buscando estereotipos de género, raza o cultura.

#### 3. 🔒 Privacidad y Protección de Datos
**Qué significa:** Nunca ingresar información personal de estudiantes en herramientas de IA.

Esto incluye nombres, calificaciones, diagnósticos médicos, información familiar o cualquier dato que identifique a un menor.

#### 4. 🧠 Pensamiento Crítico sobre la IA
**Qué significa:** Enseñar a los estudiantes a cuestionar las respuestas de la IA.

La IA puede generar información incorrecta (alucinaciones). Los estudiantes deben aprender a verificar, comparar fuentes y desarrollar criterio propio.

#### 5. 🤝 La IA como Herramienta, No como Reemplazo
**Qué significa:** La IA potencia al docente, no lo sustituye.

El valor del docente está en la relación humana, la empatía, el conocimiento del contexto local y la capacidad de adaptación — cosas que ninguna IA puede replicar.

---

## ¿Cómo empezar?

1. **Explora** herramientas de IA en un ambiente seguro (como este Playground)
2. **Practica** creando prompts antes de usarlos en clase
3. **Dialoga** con tus estudiantes sobre qué es la IA y sus limitaciones
4. **Establece normas** claras sobre el uso de IA en tu aula
5. **Comparte** tus experiencias con otros docentes
`,
  },
  {
    slug: 'prompts-efectivos-docentes',
    title: '10 Prompts que todo Docente debería conocer',
    excerpt: 'Una colección curada de los prompts más útiles para planificación, evaluación y diferenciación educativa.',
    category: 'Prompts',
    date: '2026-03-10',
    readTime: '15 min',
    author: 'Equipo Otto AI',
    coverIcon: 'auto_awesome',
    colorClass: 'bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400',
    content: `
## Los 10 Prompts Esenciales para Docentes

Estos prompts han sido diseñados, probados y refinados por docentes reales. Cada uno incluye el contexto de uso y un ejemplo aplicable.

### 1. 📝 Planificación de Clase
> "Diseña un plan de clase de [duración] sobre [tema] para [nivel]. Incluye: objetivo de aprendizaje, actividad de apertura (5 min), desarrollo (30 min), cierre (10 min) y evaluación formativa. Los estudiantes son [contexto]."

### 2. 📊 Generador de Rúbricas
> "Crea una rúbrica analítica con 4 niveles para evaluar [tipo de trabajo] en [materia] de [grado]. Criterios: [lista]. Formato: tabla con descriptores específicos."

### 3. 🎯 Diferenciación
> "Tengo un grupo diverso de [grado]. Adapta el siguiente [material/actividad] en 3 versiones: nivel básico, intermedio y avanzado, manteniendo el mismo objetivo de aprendizaje."

### 4. 💬 Feedback Personalizado
> "Como tutor empático, proporciona retroalimentación formativa para este [tipo de trabajo] de un estudiante de [grado]. Sigue la estructura: fortaleza → área de mejora → siguiente paso."

### 5. 🧪 Actividades Prácticas
> "Diseña 3 actividades prácticas (hands-on) para enseñar [concepto] sin usar tecnología. Nivel: [grado]. Materiales: solo [lista de materiales disponibles]."

### 6. ❓ Banco de Preguntas
> "Genera 15 preguntas sobre [tema] para [grado] distribuidas así: 5 de conocimiento, 5 de comprensión y 5 de aplicación (Taxonomía de Bloom). Incluye las respuestas correctas."

### 7. 📖 Resumen Adaptado
> "Resume el siguiente texto sobre [tema] para que sea comprensible por estudiantes de [grado]. Usa vocabulario simple, oraciones cortas y agrega 3 preguntas de comprensión al final."

### 8. 🎮 Gamificación Express
> "Convierte este [tema/actividad] en un desafío gamificado de 20 minutos para [grado]. Incluye: misión, reglas, sistema de puntos y un premio simbólico."

### 9. 👨‍👩‍👧 Comunicación con Padres
> "Redacta un mensaje profesional y cálido para los padres de familia informando sobre [situación]. Tono: empático, claro y propositivo. Incluye sugerencias de apoyo en casa."

### 10. 🔄 Reflexión Docente
> "Ayúdame a reflexionar sobre mi práctica pedagógica. Hoy enseñé [tema] y noté que [observación]. ¿Qué estrategias podría implementar para mejorar la participación y comprensión?"

---

## 💡 Consejo Final

El secreto no es el prompt perfecto — es la **iteración**. Usa el Playground de Otto AI para probar, ajustar y perfeccionar tus prompts.
`,
  },
  {
    slug: 'ia-no-reemplaza-docente',
    title: 'La IA no reemplaza al Docente: un manifiesto pedagógico',
    excerpt: '¿Por qué la inteligencia artificial nunca podrá sustituir la conexión humana en el aula? Un análisis profundo.',
    category: 'Reflexión',
    date: '2026-03-05',
    readTime: '10 min',
    author: 'Equipo Otto AI',
    coverIcon: 'favorite',
    colorClass: 'bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400',
    content: `
## La conexión humana es irremplazable

En un mundo donde la IA puede generar planes de clase, corregir tareas y crear materiales en segundos, surge una pregunta legítima: **¿para qué necesitamos docentes?**

La respuesta es profunda y hermosa.

### Lo que la IA puede hacer

✅ Generar contenido educativo rápidamente
✅ Adaptar materiales a diferentes niveles
✅ Proporcionar retroalimentación inmediata
✅ Crear evaluaciones y rúbricas
✅ Sugerir estrategias pedagógicas

### Lo que la IA NO puede hacer

❌ **Mirar a un estudiante a los ojos** y saber que algo anda mal en casa
❌ **Celebrar genuinamente** cuando un estudiante comprende algo por primera vez
❌ **Adaptar el tono** en tiempo real porque nota que el grupo está cansado
❌ **Conocer el contexto cultural** de cada familia en la comunidad
❌ **Inspirar vocaciones** a través del ejemplo personal
❌ **Dar un abrazo** cuando un estudiante lo necesita

### El rol del docente en la era de la IA

El docente del siglo XXI no es un transmisor de información (eso lo hace Google desde hace años). Es un:

1. **Curador:** Selecciona, filtra y contextualiza información
2. **Mentor:** Guía el desarrollo personal y académico
3. **Diseñador:** Crea experiencias de aprendizaje significativas
4. **Mediador:** Facilita la construcción colectiva del conocimiento
5. **Modelo:** Demuestra valores, ética y pensamiento crítico

---

> *"La tecnología es una herramienta magnífica. Pero si el maestro no inspira, la mejor tecnología del mundo no servirá de nada."* — Adaptación libre

## Nuestra visión en Otto AI

Esta plataforma existe para **empoderar al docente**, no para reemplazarlo. Cada herramienta que construimos tiene un solo propósito: darte más tiempo y recursos para hacer lo que mejor sabes hacer — **enseñar con el corazón**.
`,
  },
  {
    slug: 'peligros-ia-aula',
    title: 'Los 7 peligros reales de la IA en el Aula (y cómo evitarlos)',
    excerpt: 'Conoce los riesgos concretos de usar inteligencia artificial en educación y las estrategias para mitigarlos.',
    category: 'Seguridad',
    date: '2026-02-28',
    readTime: '11 min',
    author: 'Equipo Otto AI',
    coverIcon: 'warning',
    colorClass: 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400',
    content: `
## No todo brilla en la IA

Creer ciegamente en la IA es tan peligroso como rechazarla completamente. Como docentes, necesitamos un enfoque **informado y crítico**.

### Peligro 1: 🤥 Alucinaciones
**Qué es:** La IA genera información falsa con total confianza.
**Cómo evitarlo:** Siempre verifica datos, fechas y cifras con fuentes confiables.

### Peligro 2: 🏷️ Sesgos Algorítmicos  
**Qué es:** Las respuestas reflejan estereotipos de los datos de entrenamiento.
**Cómo evitarlo:** Lee las respuestas con lente crítica buscando activamente sesgos de género, raza y cultura.

### Peligro 3: 📋 Dependencia Excesiva
**Qué es:** Dejar que la IA piense por nosotros. Los estudiantes dejan de desarrollar pensamiento crítico.
**Cómo evitarlo:** Usa la IA como punto de partida, nunca como producto final.

### Peligro 4: 🔓 Violación de Privacidad
**Qué es:** Compartir datos sensibles de estudiantes con herramientas de IA.
**Cómo evitarlo:** NUNCA incluyas nombres reales, diagnósticos o información personal.

### Peligro 5: 📉 Brecha Digital  
**Qué es:** La IA amplifica la desigualdad entre quienes tienen acceso y quienes no.
**Cómo evitarlo:** Diseña actividades que no dependan exclusivamente de tecnología.

### Peligro 6: ✏️ Plagio Sofisticado
**Qué es:** Los estudiantes usan IA para generar trabajos sin aprender.
**Cómo evitarlo:** Diseña evaluaciones procesuales, no solo de producto final.

### Peligro 7: 🎭 Sustitución de Relaciones Humanas
**Qué es:** Usar chatbots como sustituto de la interacción docente-estudiante.
**Cómo evitarlo:** La IA asiste la logística; tu presencia emocional es insustituible.

---

## Conclusión

La IA es una **herramienta poderosa** que, como toda herramienta, puede usarse bien o mal. La diferencia está en el docente que la maneja.
`,
  },
];

// ────────────────────────────────────────────────────
// HELPERS
// ────────────────────────────────────────────────────

export function getGuideBySlug(slug: string): Guide | undefined {
  return guides.find((g) => g.slug === slug);
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}
