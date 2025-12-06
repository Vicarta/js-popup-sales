// Utility functions for popup sale widget

/**
 * Sanitize HTML to prevent XSS attacks
 */
function sanitizeHtml(html: string): string {
  const div = document.createElement('div');
  div.textContent = html;
  return div.innerHTML;
}

/**
 * Lightweight markdown parser with XSS protection
 */
export function parseMarkdown(text: string): string {
  if (!text) return '';
  
  return text
    // Strikethrough: ~~text~~
    .replace(/~~(.+?)~~/g, (_, content) => `<del>${sanitizeHtml(content)}</del>`)
    // Bold: **text** or __text__
    .replace(/\*\*(.+?)\*\*/g, (_, content) => `<strong>${sanitizeHtml(content)}</strong>`)
    .replace(/__(.+?)__/g, (_, content) => `<strong>${sanitizeHtml(content)}</strong>`)
    // Italic: *text* or _text_
    .replace(/\*(.+?)\*/g, (_, content) => `<em>${sanitizeHtml(content)}</em>`)
    .replace(/_(.+?)_/g, (_, content) => `<em>${sanitizeHtml(content)}</em>`)
    // Links: [text](url) - sanitize both text and URL
    .replace(/\[(.+?)\]\((.+?)\)/g, (_, text, url) => {
      const sanitizedText = sanitizeHtml(text);
      const sanitizedUrl = sanitizeHtml(url);
      return `<a href="${sanitizedUrl}" target="_blank" rel="noopener noreferrer">${sanitizedText}</a>`;
    })
    // Line breaks
    .replace(/\n/g, '<br>');
}

/**
 * Default configuration for popup sale widget
 */
export const DEFAULT_CONFIG = {
  trigger: 'delay' as const,
  delay: 3000,
  scrollPercent: 50,
  dismissDays: 7,
  title: 'Не втрачайте клієнтів! 🚀',
  subtitle: 'AIbizMate допоможе знайти пропущені ліди у вашій пошті',
  features: ['✅ Автоматичне сканування', '🤖 AI-аналіз листів', '📧 Миттєві сповіщення'],
  ctaText: 'Спробувати безкоштовно',
  ctaUrl: 'https://aibizmate.com',
  image: '',
  theme: 'light' as const,
  position: 'center' as const,
  layout: 'vertical' as const,
  inheritFont: false,
  primaryColor: '#f97316',
  backgroundColor: '',
  textColor: '',
  buttonRadius: 10,
  contentAlign: 'left' as const,
};
