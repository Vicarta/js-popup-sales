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
 * Supports: **bold**, *italic*, ***bold italic***, ~~strikethrough~~, [links](url)
 * Also supports nested bold inside italic: *italic **bold** italic*
 */
export function parseMarkdown(text: string): string {
  if (!text) return '';
  
  let result = text;
  
  // Step 1: Strikethrough: ~~text~~
  result = result.replace(/~~(.+?)~~/g, (_, content) => `<del>${sanitizeHtml(content)}</del>`);
  
  // Step 2: Bold-italic: ***text*** or ___text___
  result = result.replace(/\*\*\*(.+?)\*\*\*/g, (_, content) => `<strong><em>${sanitizeHtml(content)}</em></strong>`);
  result = result.replace(/___(.+?)___/g, (_, content) => `<strong><em>${sanitizeHtml(content)}</em></strong>`);
  
  // Step 3: Bold first: **text** or __text__
  result = result.replace(/\*\*(.+?)\*\*/g, (_, content) => `<strong>${sanitizeHtml(content)}</strong>`);
  result = result.replace(/__(.+?)__/g, (_, content) => `<strong>${sanitizeHtml(content)}</strong>`);
  
  // Step 4: Italic: *text* or _text_ (now safe - bold already processed)
  result = result.replace(/\*([^*]+)\*/g, (_, content) => `<em>${sanitizeHtml(content)}</em>`);
  result = result.replace(/_([^_]+)_/g, (_, content) => `<em>${sanitizeHtml(content)}</em>`);
  
  // Step 5: Links: [text](url)
  result = result.replace(/\[(.+?)\]\((.+?)\)/g, (_, linkText, url) => {
    const sanitizedText = sanitizeHtml(linkText);
    const sanitizedUrl = sanitizeHtml(url);
    return `<a href="${sanitizedUrl}" target="_blank" rel="noopener noreferrer">${sanitizedText}</a>`;
  });
  
  // Step 6: Line breaks
  result = result.replace(/\n/g, '<br>');
  
  return result;
}

/**
 * Valid enum values for popup configuration
 */
export const VALID_TRIGGERS = ['delay', 'scroll', 'exit-intent', 'manual'] as const;
export const VALID_THEMES = ['light', 'dark'] as const;
export const VALID_POSITIONS = ['center', 'top-left', 'top-center', 'top-right', 'center-left', 'center-right', 'bottom-left', 'bottom-center', 'bottom-right'] as const;
export const VALID_LAYOUTS = ['vertical', 'horizontal'] as const;
export const VALID_ALIGNS = ['left', 'center', 'right'] as const;

/**
 * Validate enum value with fallback to default
 */
export function validateEnum<T extends string>(
  value: string | undefined, 
  validValues: readonly T[], 
  defaultValue: T
): T {
  if (value && (validValues as readonly string[]).includes(value)) {
    return value as T;
  }
  if (value) {
    console.warn(`[JS Popup Sale] Invalid value "${value}", using default: ${defaultValue}`);
  }
  return defaultValue;
}

/**
 * Clamp number to min/max range with fallback to default
 */
export function clampNumber(value: number | undefined, min: number, max: number, defaultValue: number): number {
  if (value === undefined || isNaN(value)) return defaultValue;
  return Math.max(min, Math.min(max, value));
}

/**
 * Validate CSS color format (hex, rgb, hsl, named colors)
 * Returns the color if valid, otherwise undefined
 */
export function validateColor(color: string | undefined): string | undefined {
  if (!color) return undefined;
  
  const trimmed = color.trim();
  if (!trimmed) return undefined;
  
  // Test using CSS.supports if available
  if (typeof CSS !== 'undefined' && CSS.supports) {
    if (CSS.supports('color', trimmed)) {
      return trimmed;
    }
    console.warn(`[JS Popup Sale] Invalid color "${color}", ignoring`);
    return undefined;
  }
  
  // Fallback: basic validation patterns
  const hexPattern = /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6}|[0-9A-Fa-f]{8})$/;
  const rgbPattern = /^rgba?\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*(,\s*[\d.]+)?\s*\)$/;
  const hslPattern = /^hsla?\(\s*\d+\s*,\s*[\d.]+%\s*,\s*[\d.]+%\s*(,\s*[\d.]+)?\s*\)$/;
  const namedColors = ['black', 'white', 'red', 'green', 'blue', 'yellow', 'orange', 'purple', 'pink', 'gray', 'grey', 'transparent', 'inherit', 'currentColor'];
  
  if (hexPattern.test(trimmed) || rgbPattern.test(trimmed) || hslPattern.test(trimmed) || namedColors.includes(trimmed.toLowerCase())) {
    return trimmed;
  }
  
  console.warn(`[JS Popup Sale] Invalid color "${color}", ignoring`);
  return undefined;
}

/**
 * Maximum number of features to prevent DOM bloat
 */
export const MAX_FEATURES = 20;

/**
 * Default configuration for popup sale widget
 */
export const DEFAULT_CONFIG = {
  trigger: 'delay' as const,
  delay: 3000,
  scrollPercent: 50,
  dismissDays: 7,
  title: "Don't lose customers! 🚀",
  subtitle: 'AIbizMate helps you find missed leads in your inbox',
  features: ['✅ Automatic scanning', '🤖 AI-powered analysis', '📧 Instant notifications'],
  ctaText: 'Try for free',
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
  // GTM dataLayer tracking
  enableTracking: false,
  popupId: 'js_popup_sale',
  // Close popup on CTA click
  closeOnCtaClick: true,
  // Debug mode
  debug: false,
};
