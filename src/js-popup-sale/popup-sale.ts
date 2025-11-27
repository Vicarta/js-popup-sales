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

  constructor(config: PopupConfig = {}) {
    this.config = {
      ...DEFAULT_CONFIG,
      ...config,
      dismissDays: config.dismissDays !== undefined ? config.dismissDays : DEFAULT_CONFIG.dismissDays,
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
      const imageContainer = document.createElement('div');
      imageContainer.className = 'js-popup-sale-image-container';
      imageContainer.innerHTML = `<img src="${this.config.image}" alt="" class="js-popup-sale-image">`;
      popup.appendChild(imageContainer);
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
      html += `<img src="${this.config.image}" alt="" class="js-popup-sale-image">`;
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
      html += `<a href="${this.config.ctaUrl}" class="js-popup-sale-cta" target="_blank">${parseMarkdown(this.config.ctaText)}</a>`;
    }
    
    return html;
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
    if (this.config.dismissDays > 0) {
      const dismissUntil = Date.now() + (this.config.dismissDays * 24 * 60 * 60 * 1000);
      localStorage.setItem(this.storageKey, dismissUntil.toString());
      console.log(`[JS Popup Sale] Dismissed for ${this.config.dismissDays} days`);
    } else {
      console.log('[JS Popup Sale] Dismissed (dismissDays=0, will show again on next trigger)');
    }
    this.hide();
  }

  destroy(): void {
    const container = document.getElementById('js-popup-sale-container');
    if (container) {
      container.remove();
    }
    this.overlay = null;
    this.shadowRoot = null;
  }
}

// Auto-initialize from script tag data attributes
function autoInit() {
  const scripts = document.querySelectorAll('script[src*="js-popup-sale"]');
  const script = scripts[scripts.length - 1] as HTMLScriptElement;
  
  if (script && script.dataset) {
    const config: PopupConfig = {
      trigger: (script.dataset.trigger as any) || 'delay',
      delay: parseInt(script.dataset.delay || '3000'),
      scrollPercent: parseInt(script.dataset.scrollPercent || '50'),
      dismissDays: script.dataset.dismissDays ? parseInt(script.dataset.dismissDays) : 7,
      title: script.dataset.title,
      subtitle: script.dataset.subtitle,
      features: script.dataset.features ? JSON.parse(script.dataset.features) : undefined,
      ctaText: script.dataset.ctaText,
      ctaUrl: script.dataset.ctaUrl,
      image: script.dataset.image,
      theme: (script.dataset.theme as any) || 'light',
      position: (script.dataset.position as any) || 'center',
      layout: (script.dataset.layout as 'vertical' | 'horizontal') || 'vertical',
      inheritFont: script.dataset.inheritFont === 'true',
      primaryColor: script.dataset.primaryColor,
      backgroundColor: script.dataset.backgroundColor,
      textColor: script.dataset.textColor,
    };
    
    const widget = new JSPopupSale(config);
    widget.init();
    
    // Expose to global scope for manual control
    (window as any).JSPopupSale = widget;
  }
}

// Auto-init when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', autoInit);
} else {
  autoInit();
}

export { JSPopupSale };
