import { popupStyles } from './styles';
import { parseMarkdown, DEFAULT_CONFIG } from './utils';

interface PopupConfig {
  trigger?: 'delay' | 'scroll' | 'exit-intent' | 'manual';
  delay?: number;
  scrollPercent?: number;
  dismissDays?: number;
  title?: string;
  subtitle?: string;
  features?: string[];
  ctaText?: string;
  ctaUrl?: string;
  image?: string;
  theme?: 'light' | 'dark';
  position?: 'center' | 'top-left' | 'top-center' | 'top-right' | 'center-left' | 'center-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';
  layout?: 'vertical' | 'horizontal';
  inheritFont?: boolean;
  primaryColor?: string;
  backgroundColor?: string;
  textColor?: string;
}

class JSPopupSale {
  private config: Required<PopupConfig>;
  private overlay: HTMLElement | null = null;
  private shadowRoot: ShadowRoot | null = null;
  private storageKey = 'js_popup_sale_dismissed';
  private scrollHandler: (() => void) | null = null;
  private exitIntentHandler: ((e: MouseEvent) => void) | null = null;

  constructor(config: PopupConfig = {}) {
    // Захист від NaN в dismissDays
    let dismissDays = config.dismissDays !== undefined ? config.dismissDays : DEFAULT_CONFIG.dismissDays;
    if (isNaN(dismissDays)) {
      console.warn('[JS Popup Sale] Invalid dismissDays value, using default:', DEFAULT_CONFIG.dismissDays);
      dismissDays = DEFAULT_CONFIG.dismissDays;
    }
    
    this.config = {
      ...DEFAULT_CONFIG,
      ...config,
      // Гарантуємо, що features завжди масив
      features: Array.isArray(config.features) ? config.features : DEFAULT_CONFIG.features,
      dismissDays,
    } as Required<PopupConfig>;
  }

  init(): void {
    if (!this.shouldShow()) {
      console.log('[JS Popup Sale] Popup dismissed by user');
      return;
    }

    this.createPopup();
    this.setupTrigger();
  }

  private shouldShow(): boolean {
    // If dismissDays is 0, always show
    if (this.config.dismissDays === 0) return true;
    
    const dismissedUntil = this.safeGetItem(this.storageKey);
    if (!dismissedUntil) return true;
    
    const now = Date.now();
    const dismissTime = parseInt(dismissedUntil, 10);
    
    // Захист від NaN
    if (isNaN(dismissTime)) {
      this.safeRemoveItem(this.storageKey);
      return true;
    }
    
    if (now > dismissTime) {
      this.safeRemoveItem(this.storageKey);
      return true;
    }
    
    return false;
  }
  
  private safeGetItem(key: string): string | null {
    try {
      return localStorage.getItem(key);
    } catch (e) {
      console.warn('[JS Popup Sale] localStorage.getItem failed:', e);
      return null;
    }
  }
  
  private safeSetItem(key: string, value: string): void {
    try {
      localStorage.setItem(key, value);
    } catch (e) {
      console.warn('[JS Popup Sale] localStorage.setItem failed:', e);
    }
  }
  
  private safeRemoveItem(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch (e) {
      console.warn('[JS Popup Sale] localStorage.removeItem failed:', e);
    }
  }

  private createPopup(): void {
    // Захист від повторної ініціалізації - видалити існуючий контейнер
    const existing = document.getElementById('js-popup-sale-container');
    if (existing) {
      existing.remove();
    }
    
    // Create container
    const container = document.createElement('div');
    container.id = 'js-popup-sale-container';
    
    // Create shadow DOM for style isolation
    this.shadowRoot = container.attachShadow({ mode: 'open' });
    
    // Add styles with dynamic CSS variables
    const style = document.createElement('style');
    
    // Add font import only if not inheriting
    if (!this.config.inheritFont) {
      style.textContent = `@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap');\n`;
      style.textContent += popupStyles.replace(
        'font-family: -apple-system',
        "font-family: 'Inter', -apple-system"
      );
    } else {
      style.textContent = popupStyles + `\n.js-popup-sale { font-family: inherit !important; }`;
    }
    
    this.shadowRoot.appendChild(style);
    
    // Create overlay
    this.overlay = document.createElement('div');
    this.overlay.className = `js-popup-sale-overlay position-${this.config.position}`;
    this.overlay.style.display = 'none';
    
    // Create popup with custom CSS variables
    const popup = document.createElement('div');
    popup.className = `js-popup-sale theme-${this.config.theme} layout-${this.config.layout}`;
    
    // Apply custom colors via CSS variables
    if (this.config.primaryColor) popup.style.setProperty('--popup-primary', this.config.primaryColor);
    if (this.config.backgroundColor) popup.style.setProperty('--popup-bg', this.config.backgroundColor);
    if (this.config.textColor) popup.style.setProperty('--popup-text', this.config.textColor);
    
    // Close button
    const closeBtn = document.createElement('button');
    closeBtn.className = 'js-popup-sale-close';
    closeBtn.innerHTML = '<svg viewBox="0 0 24 24" fill="none"><path d="M18 6L6 18M6 6l12 12" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    closeBtn.onclick = () => this.dismiss();
    
    popup.appendChild(closeBtn);
    
    // Add image for horizontal layout
    if (this.config.layout === 'horizontal' && this.config.image) {
      const safeImageUrl = this.sanitizeUrl(this.config.image);
      if (safeImageUrl) {
        const imageContainer = document.createElement('div');
        imageContainer.className = 'js-popup-sale-image-container';
        imageContainer.innerHTML = `<img src="${safeImageUrl}" alt="" class="js-popup-sale-image">`;
        popup.appendChild(imageContainer);
      }
    }
    
    // Build content HTML
    const content = document.createElement('div');
    content.className = 'js-popup-sale-content';
    content.innerHTML = this.buildContentHtml();

    
    popup.appendChild(content);
    this.overlay.appendChild(popup);
    this.shadowRoot.appendChild(this.overlay);
    
    document.body.appendChild(container);
  }

  private buildContentHtml(): string {
    let html = '';
    
    // Image (vertical layout only)
    if (this.config.layout === 'vertical' && this.config.image) {
      const safeImageUrl = this.sanitizeUrl(this.config.image);
      if (safeImageUrl) {
        html += `<img src="${safeImageUrl}" alt="" class="js-popup-sale-image">`;
      }
    }
    
    // Title
    if (this.config.title) {
      html += `<h2 class="js-popup-sale-title">${parseMarkdown(this.config.title)}</h2>`;
    }
    
    // Subtitle
    if (this.config.subtitle) {
      html += `<p class="js-popup-sale-subtitle">${parseMarkdown(this.config.subtitle)}</p>`;
    }
    
    // Features
    if (this.config.features.length > 0) {
      html += '<ul class="js-popup-sale-features">';
      this.config.features.forEach(feature => {
        html += `<li>${parseMarkdown(feature)}</li>`;
      });
      html += '</ul>';
    }
    
    // CTA
    if (this.config.ctaText && this.config.ctaUrl) {
      const safeCtaUrl = this.sanitizeUrl(this.config.ctaUrl);
      if (safeCtaUrl) {
        html += `<a href="${safeCtaUrl}" class="js-popup-sale-cta" target="_blank">${parseMarkdown(this.config.ctaText)}</a>`;
      }
    }
    
    return html;
  }
  
  private sanitizeUrl(url: string): string {
    if (!url) return '';
    
    // Блокуємо потенційно небезпечні протоколи
    const trimmedUrl = url.trim().toLowerCase();
    if (trimmedUrl.startsWith('javascript:') || trimmedUrl.startsWith('data:text')) {
      console.warn('[JS Popup Sale] Potentially unsafe URL blocked:', url);
      return '';
    }
    
    return url.trim();
  }

  private setupTrigger(): void {
    switch (this.config.trigger) {
      case 'delay':
        setTimeout(() => this.show(), this.config.delay);
        break;
      case 'scroll':
        this.setupScrollTrigger();
        break;
      case 'exit-intent':
        this.setupExitIntentTrigger();
        break;
      case 'manual':
        // Manual trigger - user calls show() themselves
        break;
    }
  }

  private setupScrollTrigger(): void {
    this.scrollHandler = () => {
      const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
      
      // Захист від division by zero - якщо сторінка не скролиться
      if (scrollableHeight <= 0) {
        this.show();
        if (this.scrollHandler) {
          window.removeEventListener('scroll', this.scrollHandler);
          this.scrollHandler = null;
        }
        return;
      }
      
      const scrollPercent = (window.scrollY / scrollableHeight) * 100;
      
      if (scrollPercent >= this.config.scrollPercent) {
        this.show();
        if (this.scrollHandler) {
          window.removeEventListener('scroll', this.scrollHandler);
          this.scrollHandler = null;
        }
      }
    };
    
    window.addEventListener('scroll', this.scrollHandler);
  }

  private setupExitIntentTrigger(): void {
    let triggered = false;
    
    this.exitIntentHandler = (e: MouseEvent) => {
      if (e.clientY <= 0 && !triggered) {
        triggered = true;
        this.show();
        if (this.exitIntentHandler) {
          document.removeEventListener('mouseleave', this.exitIntentHandler);
          this.exitIntentHandler = null;
        }
      }
    };
    
    document.addEventListener('mouseleave', this.exitIntentHandler);
  }

  show(): void {
    if (this.overlay) {
      this.overlay.style.display = 'flex';
      // Trigger reflow for animation
      void this.overlay.offsetHeight;
      this.overlay.classList.add('show');
    }
  }

  hide(): void {
    if (this.overlay) {
      this.overlay.classList.remove('show');
      setTimeout(() => {
        if (this.overlay) {
          this.overlay.style.display = 'none';
        }
      }, 300);
    }
  }

  dismiss(): void {
    if (this.config.dismissDays > 0) {
      const dismissUntil = Date.now() + (this.config.dismissDays * 24 * 60 * 60 * 1000);
      this.safeSetItem(this.storageKey, dismissUntil.toString());
      console.log(`[JS Popup Sale] Dismissed for ${this.config.dismissDays} days`);
    } else {
      console.log('[JS Popup Sale] Dismissed (dismissDays=0, will show again on next trigger)');
    }
    this.hide();
  }

  destroy(): void {
    // Очищення event listeners
    if (this.scrollHandler) {
      window.removeEventListener('scroll', this.scrollHandler);
      this.scrollHandler = null;
    }
    if (this.exitIntentHandler) {
      document.removeEventListener('mouseleave', this.exitIntentHandler);
      this.exitIntentHandler = null;
    }
    
    const container = document.getElementById('js-popup-sale-container');
    if (container) {
      container.remove();
    }
    this.overlay = null;
    this.shadowRoot = null;
  }
}

// Утилітна функція для безпечного парсингу чисел
function safeParseInt(value: string | undefined, defaultValue?: number): number | undefined {
  if (value === undefined || value === '') return defaultValue;
  const parsed = parseInt(value, 10);
  if (isNaN(parsed)) {
    if (defaultValue !== undefined) {
      console.warn('[JS Popup Sale] Invalid number value, using default:', value, '→', defaultValue);
    }
    return defaultValue;
  }
  return parsed;
}

// Перевірка чи є корисна конфігурація в dataset
function hasValidConfig(dataset: DOMStringMap): boolean {
  const configKeys = ['trigger', 'delay', 'scrollPercent', 'title', 'subtitle', 'ctaText', 'ctaUrl', 'features', 'image', 'theme', 'position', 'layout'];
  return configKeys.some(key => key in dataset && dataset[key]);
}

// Безпечний парсер конфігурації зі скрипт-тега
function parseConfigFromScript(script: HTMLScriptElement): PopupConfig {
  const data = script.dataset || {};
  
  // Безпечний парсинг features
  let features: string[] | undefined;
  if (data.features) {
    try {
      features = JSON.parse(data.features);
      if (!Array.isArray(features)) {
        console.warn('[JS Popup Sale] Invalid features JSON (not an array):', data.features);
        features = undefined;
      }
    } catch (e) {
      console.warn('[JS Popup Sale] Invalid features JSON:', data.features, e);
      features = undefined;
    }
  }
  
  return {
    trigger: (data.trigger as any) || undefined,
    delay: safeParseInt(data.delay),
    scrollPercent: safeParseInt(data.scrollPercent),
    dismissDays: data.dismissDays !== undefined ? safeParseInt(data.dismissDays, 0) : undefined,
    title: data.title,
    subtitle: data.subtitle,
    features,
    ctaText: data.ctaText,
    ctaUrl: data.ctaUrl,
    image: data.image,
    theme: data.theme as any,
    position: data.position as any,
    layout: data.layout as any,
    inheritFont: data.inheritFont === 'true',
    primaryColor: data.primaryColor,
    backgroundColor: data.backgroundColor,
    textColor: data.textColor,
  };
}

// Зберігаємо посилання на скрипт ДО того, як воно стане null
const currentScriptRef = document.currentScript as HTMLScriptElement | null;

// Auto-initialize з підтримкою GTM та fallback стратегіями
function autoInit(savedScript?: HTMLScriptElement | null) {
  console.log('[JS Popup Sale] AutoInit started');
  
  // ПРІОРИТЕТ 1: Перевірка глобальної змінної window.JSPopupSaleConfig (для GTM)
  if ((window as any).JSPopupSaleConfig) {
    const config = (window as any).JSPopupSaleConfig as PopupConfig;
    console.log('[JS Popup Sale] ==========================================');
    console.log('[JS Popup Sale] ✓ Found config via window.JSPopupSaleConfig');
    console.log('[JS Popup Sale] Config:', config);
    console.log('[JS Popup Sale] ==========================================');
    
    const widget = new JSPopupSale(config);
    widget.init();
    
    // Expose both class and instance to global scope
    (window as any).JSPopupSale = JSPopupSale;
    (window as any).jsPopupSaleInstance = widget;
    
    // Helper методи для зручності
    (window as any).showJSPopupSale = () => widget?.show();
    (window as any).hideJSPopupSale = () => widget?.hide();
    (window as any).dismissJSPopupSale = () => widget?.dismiss();
    return;
  }
  
  // ПРІОРИТЕТ 2: Функція пошуку скрипта з data-* атрибутами
  const findScript = (): HTMLScriptElement | null => {
    console.log('[JS Popup Sale] Searching for script tag...');
    
    // Стратегія 1: Збережений currentScript (переданий як параметр)
    if (savedScript && savedScript.dataset && hasValidConfig(savedScript.dataset)) {
      console.log('[JS Popup Sale] ✓ Found script via savedScript');
      return savedScript;
    }
    
    // Стратегія 2: Пошук ВСІХ скриптів з js-popup-sale.js (для GTM)
    const allScripts = Array.from(document.querySelectorAll('script'));
    console.log(`[JS Popup Sale] Checking ${allScripts.length} script tags...`);
    
    for (const candidate of allScripts) {
      const scriptEl = candidate as HTMLScriptElement;
      const src = scriptEl.src || scriptEl.getAttribute('data-gtmsrc') || '';
      
      if (src.includes('js-popup-sale')) {
        console.log('[JS Popup Sale] Found js-popup-sale script, checking dataset...', scriptEl.dataset);
        if (hasValidConfig(scriptEl.dataset || {})) {
          console.log('[JS Popup Sale] ✓ Found script via src/data-gtmsrc with valid config');
          return scriptEl;
        } else {
          console.warn('[JS Popup Sale] Script found but dataset is invalid or empty');
        }
      }
    }
    
    // Стратегія 3: Пошук за data-js-popup-sale маркером (fallback)
    const markedScripts = document.querySelectorAll('script[data-js-popup-sale]');
    if (markedScripts.length > 0) {
      const candidate = markedScripts[markedScripts.length - 1] as HTMLScriptElement;
      console.log('[JS Popup Sale] Found marked script, checking dataset...', candidate.dataset);
      if (hasValidConfig(candidate.dataset || {})) {
        console.log('[JS Popup Sale] ✓ Found script via data-js-popup-sale marker');
        return candidate;
      }
    }
    
    console.warn('[JS Popup Sale] ✗ No valid script tag found');
    return null;
  };
  
  const script = findScript();
  
  // Якщо скрипт не знайдено або немає корисної конфігурації
  if (!script || !hasValidConfig(script.dataset || {})) {
    console.warn('[JS Popup Sale] ==========================================');
    console.warn('[JS Popup Sale] Script tag not found or has no valid configuration.');
    console.warn('[JS Popup Sale] ==========================================');
    console.warn('[JS Popup Sale] For GTM: ensure your script tag has data-* attributes:');
    console.warn('[JS Popup Sale]   <script src="..." data-trigger="delay" data-title="..." ...>');
    console.warn('[JS Popup Sale] Or add data-js-popup-sale marker to your script tag');
    console.warn('[JS Popup Sale] For manual use: call window.showJSPopupSale({...config})');
    console.warn('[JS Popup Sale] ==========================================');
    
    // Експортуємо клас та helper функції для ручної ініціалізації
    (window as any).JSPopupSale = JSPopupSale;
    
    // Helper функції для створення і показу попапу без autoInit
    (window as any).showJSPopupSale = (customConfig?: Partial<PopupConfig>) => {
      const config = customConfig || {};
      console.log('[JS Popup Sale] Manual showJSPopupSale called with config:', config);
      const widget = new JSPopupSale(config);
      widget.init();
      widget.show();
      (window as any).jsPopupSaleInstance = widget;
      return widget;
    };
    return;
  }
  
  // Парсинг конфігурації з захистом від помилок
  const config: PopupConfig = parseConfigFromScript(script);
  
  console.log('[JS Popup Sale] ==========================================');
  console.log('[JS Popup Sale] ✓ Initializing with config:', config);
  console.log('[JS Popup Sale] ==========================================');
  
  const widget = new JSPopupSale(config);
  widget.init();
  
  // Expose both class and instance to global scope
  (window as any).JSPopupSale = JSPopupSale;  // Клас для ручного створення
  (window as any).jsPopupSaleInstance = widget;  // Екземпляр для керування
  
  // Helper методи для зручності
  (window as any).showJSPopupSale = () => widget?.show();
  (window as any).hideJSPopupSale = () => widget?.hide();
  (window as any).dismissJSPopupSale = () => widget?.dismiss();
}

// Auto-init when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => autoInit(currentScriptRef));
} else {
  // Для GTM та динамічно завантажених скриптів - додаємо невелику затримку
  setTimeout(() => autoInit(currentScriptRef), 100);
}

export { JSPopupSale };
