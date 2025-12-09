import { popupStyles } from './styles';
import { 
  parseMarkdown, 
  DEFAULT_CONFIG, 
  validateEnum,
  clampNumber,
  validateColor,
  VALID_TRIGGERS,
  VALID_THEMES,
  VALID_POSITIONS,
  VALID_LAYOUTS,
  VALID_ALIGNS,
  MAX_FEATURES
} from './utils';

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
  theme?: 'light' | 'dark' | 'auto';
  position?: 'center' | 'top-left' | 'top-center' | 'top-right' | 'center-left' | 'center-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';
  layout?: 'vertical' | 'horizontal';
  inheritFont?: boolean;
  buttonColor?: string;
  backgroundColor?: string;
  textColor?: string;
  buttonRadius?: number;
  contentAlign?: 'left' | 'center' | 'right';
  // GTM dataLayer tracking
  enableTracking?: boolean;
  popupId?: string;
  // Behavior
  closeOnCtaClick?: boolean;
  // Debug mode
  debug?: boolean;
  // Callbacks
  onShow?: () => void;
  onHide?: () => void;
  onCtaClick?: () => void;
}

// Animation duration constant (ms)
const ANIMATION_DURATION = 300;

class JSPopupSale {
  private config: Required<Omit<PopupConfig, 'onShow' | 'onHide' | 'onCtaClick'>> & Pick<PopupConfig, 'onShow' | 'onHide' | 'onCtaClick'>;
  private overlay: HTMLElement | null = null;
  private shadowRoot: ShadowRoot | null = null;
  private storageKey = 'js_popup_sale_dismissed';
  private scrollHandler: (() => void) | null = null;
  private exitIntentHandler: ((e: MouseEvent) => void) | null = null;
  private keyHandler: ((e: KeyboardEvent) => void) | null = null;
  private focusTrapHandler: ((e: KeyboardEvent) => void) | null = null;
  private isVisible: boolean = false;
  private scrollTicking: boolean = false;
  private previousActiveElement: Element | null = null;
  private resolvedTheme: 'light' | 'dark' = 'light';

  constructor(config: PopupConfig = {}) {
    // Validate numeric values with clamping
    const delay = clampNumber(config.delay, 100, 60000, DEFAULT_CONFIG.delay);
    const scrollPercent = clampNumber(config.scrollPercent, 1, 100, DEFAULT_CONFIG.scrollPercent);
    const buttonRadius = clampNumber(config.buttonRadius, 0, 100, DEFAULT_CONFIG.buttonRadius);
    
    // Validate dismissDays (allow 0 for "always show")
    let dismissDays = config.dismissDays !== undefined ? config.dismissDays : DEFAULT_CONFIG.dismissDays;
    if (isNaN(dismissDays) || dismissDays < 0) {
      this.warn('Invalid dismissDays value, using default:', DEFAULT_CONFIG.dismissDays);
      dismissDays = DEFAULT_CONFIG.dismissDays;
    }
    
    // Validate enum values
    const trigger = validateEnum(config.trigger, VALID_TRIGGERS, DEFAULT_CONFIG.trigger);
    const theme = validateEnum(config.theme, VALID_THEMES, DEFAULT_CONFIG.theme);
    const position = validateEnum(config.position, VALID_POSITIONS, DEFAULT_CONFIG.position);
    const layout = validateEnum(config.layout, VALID_LAYOUTS, DEFAULT_CONFIG.layout);
    const contentAlign = validateEnum(config.contentAlign, VALID_ALIGNS, DEFAULT_CONFIG.contentAlign);
    
    // Resolve 'auto' theme to actual theme based on system preference
    if (theme === 'auto') {
      this.resolvedTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    } else {
      this.resolvedTheme = theme;
    }
    
    // Validate colors
    const buttonColor = validateColor(config.buttonColor) || DEFAULT_CONFIG.buttonColor;
    const backgroundColor = validateColor(config.backgroundColor) || DEFAULT_CONFIG.backgroundColor;
    const textColor = validateColor(config.textColor) || DEFAULT_CONFIG.textColor;
    
    // Limit features array size
    let features = Array.isArray(config.features) ? config.features : DEFAULT_CONFIG.features;
    if (features.length > MAX_FEATURES) {
      this.warn(`Too many features (${features.length}), limiting to ${MAX_FEATURES}`);
      features = features.slice(0, MAX_FEATURES);
    }
    
    this.config = {
      ...DEFAULT_CONFIG,
      ...config,
      trigger,
      theme,
      position,
      layout,
      contentAlign,
      features,
      dismissDays,
      delay,
      scrollPercent,
      buttonRadius,
      buttonColor,
      backgroundColor,
      textColor,
      // Callbacks (optional, not required)
      onShow: config.onShow,
      onHide: config.onHide,
      onCtaClick: config.onCtaClick,
    };
  }
  
  // Logging helpers (only log when debug mode is enabled)
  private log(...args: unknown[]): void {
    if (this.config.debug) {
      console.log('[JS Popup Sale]', ...args);
    }
  }
  
  private warn(...args: unknown[]): void {
    // Safe check: config may not be initialized yet in constructor
    if (this.config?.debug === false) return;
    console.warn('[JS Popup Sale]', ...args);
  }

  init(): void {
    try {
      // Clean up previous listeners before re-initializing
      this.cleanup();
      
      if (!this.shouldShow()) {
        this.log('Popup dismissed by user');
        return;
      }

      this.createPopup();
      this.setupTrigger();
      this.setupKeyboardHandler();
    } catch (e) {
      this.trackError('init', e);
    }
  }
  
  private cleanup(): void {
    if (this.scrollHandler) {
      window.removeEventListener('scroll', this.scrollHandler);
      this.scrollHandler = null;
    }
    if (this.exitIntentHandler) {
      document.removeEventListener('mouseleave', this.exitIntentHandler);
      this.exitIntentHandler = null;
    }
    if (this.keyHandler) {
      document.removeEventListener('keydown', this.keyHandler);
      this.keyHandler = null;
    }
    if (this.focusTrapHandler && this.shadowRoot) {
      this.shadowRoot.removeEventListener('keydown', this.focusTrapHandler);
      this.focusTrapHandler = null;
    }
    this.scrollTicking = false;
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

  // GTM dataLayer tracking
  private trackEvent(eventName: string, extra?: Record<string, unknown>): void {
    if (this.config.enableTracking !== true) return;
    
    try {
      (window as unknown as { dataLayer: unknown[] }).dataLayer = (window as unknown as { dataLayer: unknown[] }).dataLayer || [];
      (window as unknown as { dataLayer: unknown[] }).dataLayer.push({
        event: eventName,
        popup_id: this.config.popupId,
        ...extra
      });
      this.log(`Tracked: ${eventName}`, extra || '');
    } catch (e) {
      this.warn('Tracking failed:', e);
    }
  }

  // Error tracking to dataLayer
  private trackError(errorType: string, error: unknown): void {
    console.error(`[JS Popup Sale] ${errorType} error:`, error);
    
    try {
      (window as unknown as { dataLayer: unknown[] }).dataLayer = (window as unknown as { dataLayer: unknown[] }).dataLayer || [];
      (window as unknown as { dataLayer: unknown[] }).dataLayer.push({
        event: 'js_popup_sale_error',
        popup_id: this.config?.popupId || 'js_popup_sale',
        error_type: errorType,
        error_message: (error as Error)?.message || String(error)
      });
    } catch (e) {
      // Ignore tracking errors
    }
  }
  
  private setupKeyboardHandler(): void {
    this.keyHandler = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && this.isVisible) {
        this.trackEvent('js_popup_sale_closed', { close_type: 'escape' });
        this.dismiss();
      }
    };
    document.addEventListener('keydown', this.keyHandler);
  }

  private createPopup(): void {
    try {
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
      popup.className = `js-popup-sale theme-${this.resolvedTheme} layout-${this.config.layout} align-${this.config.contentAlign}`;
      
      // ARIA attributes for accessibility
      popup.setAttribute('role', 'dialog');
      popup.setAttribute('aria-modal', 'true');
      popup.setAttribute('aria-labelledby', 'js-popup-sale-title');
      
      // Apply custom colors via CSS variables
      if (this.config.buttonColor) popup.style.setProperty('--popup-primary', this.config.buttonColor);
      if (this.config.backgroundColor) popup.style.setProperty('--popup-bg', this.config.backgroundColor);
      if (this.config.textColor) popup.style.setProperty('--popup-text', this.config.textColor);
      if (this.config.buttonRadius !== undefined) popup.style.setProperty('--popup-button-radius', `${this.config.buttonRadius}px`);
      
      // Close button
      const closeBtn = document.createElement('button');
      closeBtn.className = 'js-popup-sale-close';
      closeBtn.setAttribute('aria-label', 'Close popup');
      closeBtn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M18 6L6 18M6 6l12 12" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/></svg>';
      closeBtn.onclick = () => {
        this.trackEvent('js_popup_sale_closed', { close_type: 'cross' });
        this.dismiss();
      };
      
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
      
      // Build content
      const content = document.createElement('div');
      content.className = 'js-popup-sale-content';
      this.buildContent(content);

      
      popup.appendChild(content);
      this.overlay.appendChild(popup);
      this.shadowRoot.appendChild(this.overlay);
      
      document.body.appendChild(container);
    } catch (e) {
      this.trackError('createPopup', e);
    }
  }

  private buildContent(container: HTMLElement): void {
    // Image (vertical layout only)
    if (this.config.layout === 'vertical' && this.config.image) {
      const safeImageUrl = this.sanitizeUrl(this.config.image);
      if (safeImageUrl) {
        const img = document.createElement('img');
        img.src = safeImageUrl;
        img.alt = '';
        img.className = 'js-popup-sale-image';
        container.appendChild(img);
      }
    }
    
    // Title
    if (this.config.title) {
      const title = document.createElement('h2');
      title.className = 'js-popup-sale-title';
      title.id = 'js-popup-sale-title';
      title.innerHTML = parseMarkdown(this.config.title);
      container.appendChild(title);
    }
    
    // Subtitle
    if (this.config.subtitle) {
      const subtitle = document.createElement('p');
      subtitle.className = 'js-popup-sale-subtitle';
      subtitle.innerHTML = parseMarkdown(this.config.subtitle);
      container.appendChild(subtitle);
    }
    
    // Features
    if (this.config.features.length > 0) {
      const ul = document.createElement('ul');
      ul.className = 'js-popup-sale-features';
      this.config.features.forEach(feature => {
        const li = document.createElement('li');
        li.innerHTML = parseMarkdown(feature);
        ul.appendChild(li);
      });
      container.appendChild(ul);
    }
    
    // CTA Button
    if (this.config.ctaText && this.config.ctaUrl) {
      const safeCtaUrl = this.sanitizeUrl(this.config.ctaUrl);
      if (safeCtaUrl) {
        const cta = document.createElement('a');
        cta.href = safeCtaUrl;
        cta.className = 'js-popup-sale-cta';
        cta.target = '_blank';
        cta.rel = 'noopener noreferrer';
        cta.innerHTML = parseMarkdown(this.config.ctaText);
        
        // Track CTA click with delay for GTM processing before navigation
        cta.addEventListener('click', (e) => {
          e.preventDefault();
          
          const url = cta.getAttribute('href');
          const target = cta.getAttribute('target');
          
          // Track event first
          this.trackEvent('js_popup_sale_primary_click');
          
          // Call onCtaClick callback
          this.config.onCtaClick?.();
          
          if (this.config.closeOnCtaClick !== false) {
            this.dismiss();
          }
          
          // Delay navigation to allow GTM to process the event
          setTimeout(() => {
            if (url) {
              if (target === '_blank') {
                window.open(url, '_blank', 'noopener,noreferrer');
              } else {
                window.location.href = url;
              }
            }
          }, 150);
        });
        
        container.appendChild(cta);
      }
    }
  }
  
  private sanitizeUrl(url: string): string {
    if (!url) return '';
    
    const trimmedUrl = url.trim().toLowerCase();
    
    // Whitelist approach: only allow http(s) and relative paths
    const isRelative = !trimmedUrl.includes(':');
    const isHttp = trimmedUrl.startsWith('http://') || trimmedUrl.startsWith('https://');
    
    if (!isRelative && !isHttp) {
      this.warn('URL blocked (only http/https or relative paths allowed):', url);
      return '';
    }
    
    return url.trim();
  }

  private setupTrigger(): void {
    try {
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
    } catch (e) {
      this.trackError('setupTrigger', e);
    }
  }

  private setupScrollTrigger(): void {
    this.scrollHandler = () => {
      // Throttle using requestAnimationFrame
      if (this.scrollTicking) return;
      this.scrollTicking = true;
      
      requestAnimationFrame(() => {
        this.scrollTicking = false;
        
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
      });
    };
    
    window.addEventListener('scroll', this.scrollHandler, { passive: true });
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
    try {
      // Prevent double-show
      if (this.isVisible) return;
      
      if (this.overlay) {
        this.isVisible = true;
        
        // Save current focus for restoration
        this.previousActiveElement = document.activeElement;
        
        this.overlay.style.display = 'flex';
        // Trigger reflow for animation
        void this.overlay.offsetHeight;
        this.overlay.classList.add('show');
        
        // Setup focus trap and focus first element
        this.setupFocusTrap();
        
        // Track popup shown
        this.trackEvent('js_popup_sale_shown');
        
        // Call onShow callback
        this.config.onShow?.();
      }
    } catch (e) {
      this.trackError('show', e);
    }
  }
  
  private setupFocusTrap(): void {
    if (!this.shadowRoot) return;
    
    const focusableSelector = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    const focusableElements = this.shadowRoot.querySelectorAll(focusableSelector);
    
    if (focusableElements.length === 0) return;
    
    const firstFocusable = focusableElements[0] as HTMLElement;
    const lastFocusable = focusableElements[focusableElements.length - 1] as HTMLElement;
    
    // Focus first element
    firstFocusable?.focus();
    
    // Setup tab trap
    this.focusTrapHandler = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;
      
      if (e.shiftKey) {
        // Shift + Tab
        if (this.shadowRoot?.activeElement === firstFocusable) {
          e.preventDefault();
          lastFocusable?.focus();
        }
      } else {
        // Tab
        if (this.shadowRoot?.activeElement === lastFocusable) {
          e.preventDefault();
          firstFocusable?.focus();
        }
      }
    };
    
    this.shadowRoot.addEventListener('keydown', this.focusTrapHandler);
  }

  hide(): void {
    try {
      // Prevent double-hide
      if (!this.isVisible) return;
      
      if (this.overlay) {
        this.isVisible = false;
        this.overlay.classList.remove('show');
        
        // Clean up focus trap
        if (this.focusTrapHandler && this.shadowRoot) {
          this.shadowRoot.removeEventListener('keydown', this.focusTrapHandler);
          this.focusTrapHandler = null;
        }
        
        // Restore focus to previous element
        if (this.previousActiveElement && this.previousActiveElement instanceof HTMLElement) {
          this.previousActiveElement.focus();
        }
        this.previousActiveElement = null;
        
        setTimeout(() => {
          if (this.overlay) {
            this.overlay.style.display = 'none';
          }
        }, ANIMATION_DURATION);
        
        // Call onHide callback
        this.config.onHide?.();
      }
    } catch (e) {
      this.trackError('hide', e);
    }
  }

  dismiss(): void {
    if (this.config.dismissDays > 0) {
      const dismissUntil = Date.now() + (this.config.dismissDays * 24 * 60 * 60 * 1000);
      this.safeSetItem(this.storageKey, dismissUntil.toString());
      this.log(`Dismissed for ${this.config.dismissDays} days`);
    } else {
      this.log('Dismissed (dismissDays=0, will show again on next trigger)');
    }
    this.hide();
  }

  destroy(): void {
    // Clean up all event listeners
    this.cleanup();
    
    const container = document.getElementById('js-popup-sale-container');
    if (container) {
      container.remove();
    }
    this.overlay = null;
    this.shadowRoot = null;
    this.isVisible = false;
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
  const configKeys = ['trigger', 'delay', 'scrollPercent', 'title', 'subtitle', 'ctaText', 'ctaUrl', 'features', 'image', 'theme', 'position', 'layout', 'enableTracking', 'popupId'];
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
    trigger: (data.trigger as PopupConfig['trigger']) || undefined,
    delay: safeParseInt(data.delay),
    scrollPercent: safeParseInt(data.scrollPercent),
    dismissDays: data.dismissDays !== undefined ? safeParseInt(data.dismissDays, 0) : undefined,
    title: data.title,
    subtitle: data.subtitle,
    features,
    ctaText: data.ctaText,
    ctaUrl: data.ctaUrl,
    image: data.image,
    theme: data.theme as PopupConfig['theme'],
    position: data.position as PopupConfig['position'],
    layout: data.layout as PopupConfig['layout'],
    inheritFont: data.inheritFont === 'true',
    buttonColor: data.buttonColor,
    backgroundColor: data.backgroundColor,
    textColor: data.textColor,
    buttonRadius: safeParseInt(data.buttonRadius),
    contentAlign: data.contentAlign as PopupConfig['contentAlign'],
    enableTracking: data.enableTracking === 'true',
    popupId: data.popupId,
    closeOnCtaClick: data.closeOnCtaClick !== 'false',
    debug: data.debug === 'true',
  };
}

// Зберігаємо посилання на скрипт ДО того, як воно стане null
const currentScriptRef = document.currentScript as HTMLScriptElement | null;

// Auto-initialize з підтримкою GTM та fallback стратегіями
function autoInit(savedScript?: HTMLScriptElement | null) {
  try {
    // Only log if debug mode is explicitly enabled
    const debugMode = (window as unknown as { JSPopupSaleConfig?: PopupConfig }).JSPopupSaleConfig?.debug === true;
    const log = (...args: unknown[]) => { if (debugMode) console.log('[JS Popup Sale]', ...args); };
    
    log('AutoInit started');
    
    // ПРІОРИТЕТ 1: Перевірка глобальної змінної window.JSPopupSaleConfig (для GTM)
    if ((window as unknown as { JSPopupSaleConfig?: PopupConfig }).JSPopupSaleConfig) {
      const config = (window as unknown as { JSPopupSaleConfig: PopupConfig }).JSPopupSaleConfig;
      log('==========================================');
      log('✓ Found config via window.JSPopupSaleConfig');
      log('Config:', config);
      log('==========================================');
      
      const widget = new JSPopupSale(config);
      widget.init();
      
      // Expose both class and instance to global scope
      (window as unknown as { JSPopupSale: typeof JSPopupSale }).JSPopupSale = JSPopupSale;
      (window as unknown as { jsPopupSaleInstance: JSPopupSale }).jsPopupSaleInstance = widget;
      
      // Helper методи для зручності
      (window as unknown as { showJSPopupSale: () => void }).showJSPopupSale = () => widget?.show();
      (window as unknown as { hideJSPopupSale: () => void }).hideJSPopupSale = () => widget?.hide();
      (window as unknown as { dismissJSPopupSale: () => void }).dismissJSPopupSale = () => widget?.dismiss();
      return;
    }
    
    // ПРІОРИТЕТ 2: Функція пошуку скрипта з data-* атрибутами
    const findScript = (): HTMLScriptElement | null => {
      log('Searching for script tag...');
      
      // Стратегія 1: Збережений currentScript (переданий як параметр)
      if (savedScript && savedScript.dataset && hasValidConfig(savedScript.dataset)) {
        log('✓ Found script via savedScript');
        return savedScript;
      }
      
      // Стратегія 2: Пошук ВСІХ скриптів з js-popup-sale.js (для GTM)
      const allScripts = Array.from(document.querySelectorAll('script'));
      log(`Checking ${allScripts.length} script tags...`);
      
      for (const candidate of allScripts) {
        const scriptEl = candidate as HTMLScriptElement;
        const src = scriptEl.src || scriptEl.getAttribute('data-gtmsrc') || '';
        
        if (src.includes('js-popup-sale')) {
          log('Found js-popup-sale script, checking dataset...', scriptEl.dataset);
          if (hasValidConfig(scriptEl.dataset || {})) {
            log('✓ Found script via src/data-gtmsrc with valid config');
            return scriptEl;
          } else {
            if (debugMode) console.warn('[JS Popup Sale] Script found but dataset is invalid or empty');
          }
        }
      }
      
      // Стратегія 3: Пошук за data-js-popup-sale маркером (fallback)
      const markedScripts = document.querySelectorAll('script[data-js-popup-sale]');
      if (markedScripts.length > 0) {
        const candidate = markedScripts[markedScripts.length - 1] as HTMLScriptElement;
        log('Found marked script, checking dataset...', candidate.dataset);
        if (hasValidConfig(candidate.dataset || {})) {
          log('✓ Found script via data-js-popup-sale marker');
          return candidate;
        }
      }
      
      if (debugMode) console.warn('[JS Popup Sale] ✗ No valid script tag found');
      return null;
    };
    
    const script = findScript();
    
    // Якщо скрипт не знайдено або немає корисної конфігурації
    if (!script || !hasValidConfig(script.dataset || {})) {
      if (debugMode) {
        console.warn('[JS Popup Sale] ==========================================');
        console.warn('[JS Popup Sale] Script tag not found or has no valid configuration.');
        console.warn('[JS Popup Sale] ==========================================');
        console.warn('[JS Popup Sale] For GTM: ensure your script tag has data-* attributes:');
        console.warn('[JS Popup Sale]   <script src="..." data-trigger="delay" data-title="..." ...>');
        console.warn('[JS Popup Sale] Or add data-js-popup-sale marker to your script tag');
        console.warn('[JS Popup Sale] For manual use: call window.showJSPopupSale({...config})');
        console.warn('[JS Popup Sale] ==========================================');
      }
      
      // Експортуємо клас та helper функції для ручної ініціалізації
      (window as unknown as { JSPopupSale: typeof JSPopupSale }).JSPopupSale = JSPopupSale;
      
      // Helper функції для створення і показу попапу без autoInit
      (window as unknown as { showJSPopupSale: (config?: Partial<PopupConfig>) => JSPopupSale }).showJSPopupSale = (customConfig?: Partial<PopupConfig>) => {
        const config = customConfig || {};
        if (config.debug) console.log('[JS Popup Sale] Manual showJSPopupSale called with config:', config);
        const widget = new JSPopupSale(config);
        widget.init();
        widget.show();
        (window as unknown as { jsPopupSaleInstance: JSPopupSale }).jsPopupSaleInstance = widget;
        return widget;
      };
      return;
    }
    
    // Парсинг конфігурації з захистом від помилок
    const config: PopupConfig = parseConfigFromScript(script);
    
    log('==========================================');
    log('✓ Initializing with config:', config);
    log('==========================================');
    
    const widget = new JSPopupSale(config);
    widget.init();
    
    // Expose both class and instance to global scope
    (window as unknown as { JSPopupSale: typeof JSPopupSale }).JSPopupSale = JSPopupSale;
    (window as unknown as { jsPopupSaleInstance: JSPopupSale }).jsPopupSaleInstance = widget;
    
    // Helper методи для зручності
    (window as unknown as { showJSPopupSale: () => void }).showJSPopupSale = () => widget?.show();
    (window as unknown as { hideJSPopupSale: () => void }).hideJSPopupSale = () => widget?.hide();
    (window as unknown as { dismissJSPopupSale: () => void }).dismissJSPopupSale = () => widget?.dismiss();
  } catch (e) {
    console.error('[JS Popup Sale] Init error:', e);
    // Send error to dataLayer
    try {
      (window as unknown as { dataLayer: unknown[] }).dataLayer = (window as unknown as { dataLayer: unknown[] }).dataLayer || [];
      (window as unknown as { dataLayer: unknown[] }).dataLayer.push({
        event: 'js_popup_sale_error',
        error_type: 'init',
        error_message: (e as Error)?.message || String(e)
      });
    } catch (trackingError) {
      // Ignore tracking errors
    }
  }
}

// Auto-init when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => autoInit(currentScriptRef));
} else {
  // Для GTM та динамічно завантажених скриптів - додаємо невелику затримку
  setTimeout(() => autoInit(currentScriptRef), 100);
}

export { JSPopupSale };
