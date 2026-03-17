"use client";

/**
 * Renderizador de Markdown ligero para contenido estático.
 * Convierte markdown básico a HTML con estilos de Tailwind Typography.
 * No usa dependencias externas — parse inline.
 */
export function MarkdownRenderer({ content }: { content: string }) {
  return (
    <div
      className="prose prose-slate dark:prose-invert max-w-none
        prose-headings:font-bold prose-headings:tracking-tight
        prose-h2:text-xl prose-h2:mt-8 prose-h2:mb-3 prose-h2:border-b prose-h2:border-primary/10 prose-h2:pb-2
        prose-h3:text-lg prose-h3:mt-6 prose-h3:mb-2
        prose-h4:text-base prose-h4:mt-4
        prose-p:leading-relaxed prose-p:text-slate-600 dark:prose-p:text-zinc-400
        prose-li:text-slate-600 dark:prose-li:text-zinc-400
        prose-strong:text-slate-800 dark:prose-strong:text-slate-200
        prose-blockquote:border-l-primary prose-blockquote:bg-primary/5 prose-blockquote:py-2 prose-blockquote:px-4 prose-blockquote:rounded-r-lg prose-blockquote:not-italic
        prose-blockquote:text-slate-700 dark:prose-blockquote:text-zinc-300
        prose-code:bg-slate-100 dark:prose-code:bg-zinc-800 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:font-normal
        prose-table:text-sm
        prose-th:bg-slate-50 dark:prose-th:bg-zinc-800 prose-th:px-3 prose-th:py-2
        prose-td:px-3 prose-td:py-2
        prose-hr:border-primary/10
        prose-a:text-primary prose-a:no-underline hover:prose-a:underline"
      dangerouslySetInnerHTML={{ __html: parseMarkdown(content) }}
    />
  );
}

/**
 * Minimal markdown parser: supports headings, bold, italic, links,
 * blockquotes, lists, tables, hr, inline code and paragraphs.
 */
function parseMarkdown(md: string): string {
  const lines = md.split('\n');
  let html = '';
  let inList = false;
  let listType: 'ul' | 'ol' = 'ul';
  let inTable = false;
  let tableHeaderDone = false;
  let inBlockquote = false;

  for (let i = 0; i < lines.length; i++) {
    let line = lines[i];

    // Empty line — close open blocks
    if (line.trim() === '') {
      if (inList) { html += `</${listType}>`; inList = false; }
      if (inTable) { html += '</tbody></table>'; inTable = false; tableHeaderDone = false; }
      if (inBlockquote) { html += '</blockquote>'; inBlockquote = false; }
      continue;
    }

    // Horizontal rule
    if (/^---+$/.test(line.trim())) {
      if (inList) { html += `</${listType}>`; inList = false; }
      html += '<hr />';
      continue;
    }

    // Table row
    if (line.trim().includes('|') && line.trim().startsWith('|')) {
      const cells = line.trim().split('|').filter(c => c.trim() !== '');

      // Separator row
      if (cells.every(c => /^[\s:-]+$/.test(c))) {
        tableHeaderDone = true;
        continue;
      }

      if (!inTable) {
        inTable = true;
        tableHeaderDone = false;
        html += '<table><thead><tr>';
        cells.forEach(c => { html += `<th>${inlineFormat(c.trim())}</th>`; });
        html += '</tr></thead><tbody>';
        continue;
      }

      html += '<tr>';
      cells.forEach(c => { html += `<td>${inlineFormat(c.trim())}</td>`; });
      html += '</tr>';
      continue;
    }

    // Close table if non-table line
    if (inTable && !line.trim().startsWith('|')) {
      html += '</tbody></table>';
      inTable = false;
      tableHeaderDone = false;
    }

    // Headings
    const headingMatch = line.match(/^(#{1,4})\s+(.+)/);
    if (headingMatch) {
      if (inList) { html += `</${listType}>`; inList = false; }
      const level = headingMatch[1].length;
      html += `<h${level}>${inlineFormat(headingMatch[2])}</h${level}>`;
      continue;
    }

    // Blockquote
    if (line.trim().startsWith('>')) {
      const text = line.trim().replace(/^>\s*/, '');
      if (!inBlockquote) {
        inBlockquote = true;
        html += '<blockquote>';
      }
      html += `<p>${inlineFormat(text)}</p>`;
      continue;
    } else if (inBlockquote) {
      html += '</blockquote>';
      inBlockquote = false;
    }

    // Unordered list
    if (/^[\s]*[-*]\s+/.test(line)) {
      const text = line.replace(/^[\s]*[-*]\s+/, '');
      if (!inList || listType !== 'ul') {
        if (inList) html += `</${listType}>`;
        html += '<ul>';
        inList = true;
        listType = 'ul';
      }
      html += `<li>${inlineFormat(text)}</li>`;
      continue;
    }

    // Ordered list
    if (/^[\s]*\d+\.\s+/.test(line)) {
      const text = line.replace(/^[\s]*\d+\.\s+/, '');
      if (!inList || listType !== 'ol') {
        if (inList) html += `</${listType}>`;
        html += '<ol>';
        inList = true;
        listType = 'ol';
      }
      html += `<li>${inlineFormat(text)}</li>`;
      continue;
    }

    // Close list if we hit a non-list line
    if (inList) {
      html += `</${listType}>`;
      inList = false;
    }

    // Regular paragraph
    html += `<p>${inlineFormat(line)}</p>`;
  }

  // Close any open blocks
  if (inList) html += `</${listType}>`;
  if (inTable) html += '</tbody></table>';
  if (inBlockquote) html += '</blockquote>';

  return html;
}

/** Inline formatting: bold, italic, code, links, emojis */
function inlineFormat(text: string): string {
  return text
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/\*([^*]+)\*/g, '<em>$1</em>')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
}
