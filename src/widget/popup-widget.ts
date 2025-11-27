import { widgetStyles } from './styles';
import { parseMarkdown } from './markdown-parser';

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
  position?: 'center' | 'bottom-right';
  inheritFont?: boolean;
}

class PopupWidget {
  private config: Required<PopupConfig>;
  private overlay: HTMLElement | null = null;
  private shadowRoot: ShadowRoot | null = null;
  private storageKey = 'aibizmate_popup_dismissed';

  constructor(config: PopupConfig = {}) {
    this.config = {
      trigger: config.trigger || 'delay',
      delay: config.delay || 3000,
      scrollPercent: config.scrollPercent || 50,
      dismissDays: config.dismissDays || 7,
      title: config.title || 'Не втрачайте клієнтів! 🚀',
      subtitle: config.subtitle || 'AIbizMate допоможе знайти пропущені ліди у вашій пошті',
      features: config.features || ['✅ Автоматичне сканування', '🤖 AI-аналіз листів', '📧 Миттєві сповіщення'],
      ctaText: config.ctaText || 'Спробувати безкоштовно',
      ctaUrl: config.ctaUrl || 'https://aibizmate.com',
      image: config.image || '',
      theme: config.theme || 'light',
      position: config.position || 'center',
      inheritFont: config.inheritFont || false,
    };
  }

  init(): void {
    if (!this.shouldShow()) {
      console.log('[AIbizMate Widget] Popup dismissed by user');
      return;
    }

    this.createPopup();
    this.setupTrigger();
  }

  private shouldShow(): boolean {
    const dismissedUntil = localStorage.getItem(this.storageKey);
    if (!dismissedUntil) return true;
    
    const now = Date.now();
    const dismissTime = parseInt(dismissedUntil);
    
    if (now > dismissTime) {
      localStorage.removeItem(this.storageKey);
      return true;
    }
    
    return false;
  }

  private createPopup(): void {
    // Create container
    const container = document.createElement('div');
    container.id = 'aibizmate-popup-widget';
    
    // Create shadow DOM for style isolation
    this.shadowRoot = container.attachShadow({ mode: 'open' });
    
    // Add styles
    const style = document.createElement('style');
    style.textContent = widgetStyles;
    
    // Override font if inheritFont is true
    if (this.config.inheritFont) {
      style.textContent += `
        .aibizmate-popup {
          font-family: inherit !important;
        }
      `;
    }
    
    this.shadowRoot.appendChild(style);
    
    // Create overlay
    this.overlay = document.createElement('div');
    this.overlay.className = `aibizmate-popup-overlay position-${this.config.position}`;
    
    // Create popup
    const popup = document.createElement('div');
    popup.className = `aibizmate-popup theme-${this.config.theme}`;
    
    // Close button
    const closeBtn = document.createElement('button');
    closeBtn.className = 'aibizmate-popup-close';
    closeBtn.innerHTML = '<svg viewBox="0 0 24 24" fill="none"><path d="M18 6L6 18M6 6l12 12" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    closeBtn.onclick = () => this.dismiss();
    
    // Content
    const content = document.createElement('div');
    content.className = 'aibizmate-popup-content';
    
    let html = '';
    
    // Image
    if (this.config.image) {
      html += `<img src="${this.config.image}" alt="" class="aibizmate-popup-image">`;
    }
    
    // Title
    if (this.config.title) {
      html += `<h2 class="aibizmate-popup-title">${parseMarkdown(this.config.title)}</h2>`;
    }
    
    // Subtitle
    if (this.config.subtitle) {
      html += `<p class="aibizmate-popup-subtitle">${parseMarkdown(this.config.subtitle)}</p>`;
    }
    
    // Features
    if (this.config.features.length > 0) {
      html += '<ul class="aibizmate-popup-features">';
      this.config.features.forEach(feature => {
        html += `<li>${parseMarkdown(feature)}</li>`;
      });
      html += '</ul>';
    }
    
    // CTA
    if (this.config.ctaText && this.config.ctaUrl) {
      html += `<a href="${this.config.ctaUrl}" class="aibizmate-popup-cta" target="_blank">${parseMarkdown(this.config.ctaText)}</a>`;
    }
    
    content.innerHTML = html;
    
    popup.appendChild(closeBtn);
    popup.appendChild(content);
    this.overlay.appendChild(popup);
    this.shadowRoot.appendChild(this.overlay);
    
    document.body.appendChild(container);
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
    const checkScroll = () => {
      const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      
      if (scrollPercent >= this.config.scrollPercent) {
        this.show();
        window.removeEventListener('scroll', checkScroll);
      }
    };
    
    window.addEventListener('scroll', checkScroll);
  }

  private setupExitIntentTrigger(): void {
    let triggered = false;
    
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !triggered) {
        triggered = true;
        this.show();
        document.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
    
    document.addEventListener('mouseleave', handleMouseLeave);
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
    const dismissUntil = Date.now() + (this.config.dismissDays * 24 * 60 * 60 * 1000);
    localStorage.setItem(this.storageKey, dismissUntil.toString());
    console.log(`[AIbizMate Widget] Dismissed for ${this.config.dismissDays} days`);
    this.hide();
  }

  destroy(): void {
    const container = document.getElementById('aibizmate-popup-widget');
    if (container) {
      container.remove();
    }
    this.overlay = null;
    this.shadowRoot = null;
  }
}

// Auto-initialize from script tag data attributes
function autoInit() {
  const scripts = document.querySelectorAll('script[src*="widget"]');
  const script = scripts[scripts.length - 1] as HTMLScriptElement;
  
  if (script && script.dataset) {
    const config: PopupConfig = {
      trigger: (script.dataset.trigger as any) || 'delay',
      delay: parseInt(script.dataset.delay || '3000'),
      scrollPercent: parseInt(script.dataset.scrollPercent || '50'),
      dismissDays: parseInt(script.dataset.dismissDays || '7'),
      title: script.dataset.title,
      subtitle: script.dataset.subtitle,
      features: script.dataset.features ? JSON.parse(script.dataset.features) : undefined,
      ctaText: script.dataset.ctaText,
      ctaUrl: script.dataset.ctaUrl,
      image: script.dataset.image,
      theme: (script.dataset.theme as any) || 'light',
      position: (script.dataset.position as any) || 'center',
      inheritFont: script.dataset.inheritFont === 'true',
    };
    
    const widget = new PopupWidget(config);
    widget.init();
    
    // Expose to global scope for manual control
    (window as any).AIbizMatePopup = widget;
  }
}

// Auto-init when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', autoInit);
} else {
  autoInit();
}

export { PopupWidget };
