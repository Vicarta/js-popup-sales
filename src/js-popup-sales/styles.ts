export const popupStyles = `
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

:host {
  --popup-primary: #f97316;
  --popup-bg: #ffffff;
  --popup-text: #1a1a1a;
  --popup-button-radius: 10px;
}

.js-popup-sales-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: transparent;
  backdrop-filter: none;
  z-index: 999999;
  display: none;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
  padding: 20px;
  pointer-events: none;
}

.js-popup-sales-overlay.modal {
  padding: 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
  pointer-events: auto;
}

.js-popup-sales-overlay.show {
  opacity: 1;
}

.js-popup-sales-overlay .js-popup-sales {
  pointer-events: auto;
}

.position-top-left { align-items: flex-start; justify-content: flex-start; }
.position-top-center { align-items: flex-start; justify-content: center; }
.position-top-right { align-items: flex-start; justify-content: flex-end; }
.position-center-left { align-items: center; justify-content: flex-start; }
.position-center-right { align-items: center; justify-content: flex-end; }
.position-bottom-left { align-items: flex-end; justify-content: flex-start; }
.position-bottom-center { align-items: flex-end; justify-content: center; }
.position-bottom-right { align-items: flex-end; justify-content: flex-end; }

.js-popup-sales {
  position: relative;
  background: var(--popup-bg, white);
  color: var(--popup-text, #1a1a1a);
  border-radius: 16px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  max-width: 480px;
  width: 90%;
  max-height: 90vh;
  overflow: hidden;
  transform: scale(0.9) translateY(20px);
  transition: transform 0.3s ease;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: 14px;
}

.js-popup-sales-overlay.show .js-popup-sales {
  transform: scale(1) translateY(0);
}

.js-popup-sales.theme-dark {
  background: #1a1a1a;
  color: #ffffff;
}

.js-popup-sales-close {
  position: absolute;
  top: 16px;
  right: 16px;
  width: 32px;
  height: 32px;
  border: none;
  background: rgba(0, 0, 0, 0.05);
  border-radius: var(--popup-button-radius, 8px);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  z-index: 10;
}

.js-popup-sales-close:hover {
  background: rgba(0, 0, 0, 0.1);
  transform: scale(1.05);
}

.theme-dark .js-popup-sales-close {
  background: rgba(255, 255, 255, 0.1);
}

.theme-dark .js-popup-sales-close:hover {
  background: rgba(255, 255, 255, 0.15);
}

.js-popup-sales-close svg {
  width: 18px;
  height: 18px;
  stroke: #333;
  stroke-width: 2;
}

.theme-dark .js-popup-sales-close svg {
  stroke: #fff;
}

.js-popup-sales-content {
  padding: 40px 32px 32px;
  overflow-y: auto;
  max-height: 90vh;
}

.js-popup-sales-image {
  width: 100%;
  height: auto;
  max-height: 300px;
  object-fit: contain;
  border-radius: 12px;
  margin-bottom: 24px;
}

.js-popup-sales-title {
  font-size: 22px;
  font-weight: 600;
  line-height: 1.3;
  margin-bottom: 10px;
  color: #1a1a1a;
}

.theme-dark .js-popup-sales-title {
  color: #ffffff;
}

.js-popup-sales-subtitle {
  font-size: 14px;
  line-height: 1.5;
  color: #666;
  margin-bottom: 16px;
}

.theme-dark .js-popup-sales-subtitle {
  color: #a0a0a0;
}

.js-popup-sales-features {
  list-style: none;
  margin: 0 0 20px 0;
  padding: 0;
}

.js-popup-sales-features li {
  padding: 8px 0;
  padding-left: 24px;
  position: relative;
  font-size: 14px;
  line-height: 1.4;
  color: #333;
}

.theme-dark .js-popup-sales-features li {
  color: #d0d0d0;
}

.js-popup-sales-features li:before {
  content: '✓';
  position: absolute;
  left: 0;
  color: #10b981;
  font-weight: 600;
  font-size: 16px;
}

/* Content alignment - wrapper for proper alignment */
.js-popup-sales.align-center .js-popup-sales-content {
  text-align: center;
}

.js-popup-sales.align-center .js-popup-sales-features {
  display: inline-block;
  text-align: left;
}

.js-popup-sales.align-right .js-popup-sales-content {
  text-align: right;
}

.js-popup-sales.align-right .js-popup-sales-features {
  display: inline-block;
  text-align: left;
}

.js-popup-sales-cta {
  display: block;
  width: 100%;
  padding: 14px 24px;
  background: var(--popup-primary, #f97316);
  color: white !important;
  text-decoration: none;
  text-align: center;
  border-radius: var(--popup-button-radius, 10px);
  font-weight: 600;
  font-size: 15px;
  transition: all 0.2s ease;
  border: none;
  cursor: pointer;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.js-popup-sales-cta:hover {
  opacity: 0.9;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.js-popup-sales-content a {
  color: var(--popup-primary, #f97316);
  text-decoration: underline;
}

.js-popup-sales-content strong {
  font-weight: 600;
}

.js-popup-sales-content em {
  font-style: italic;
}

.js-popup-sales-content del {
  text-decoration: line-through;
  opacity: 0.7;
}

/* Horizontal layout */
.js-popup-sales.layout-horizontal {
  max-width: 520px;
  display: flex;
  flex-direction: row;
  padding: 0;
}

.js-popup-sales.layout-horizontal .js-popup-sales-image-container {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 0;
  overflow: hidden;
}

.js-popup-sales.layout-horizontal .js-popup-sales-image {
  width: auto;
  height: 100%;
  object-fit: contain;
  object-position: left center;
  border-radius: 0;
  margin: 0 8px 0 0;
}

.js-popup-sales.layout-horizontal .js-popup-sales-content {
  flex: 1;
  min-width: 0;
  padding: 32px 32px 32px 32px;
  word-wrap: break-word;
  overflow-wrap: break-word;
}

/* Horizontal layout without image - equal padding, centered button */
.js-popup-sales.layout-horizontal.no-image {
  max-width: 420px !important;
  display: block !important;
}

.js-popup-sales.layout-horizontal.no-image .js-popup-sales-content {
  padding: 40px 32px 32px 32px !important;
}

.js-popup-sales.layout-horizontal.no-image .js-popup-sales-cta {
  display: block !important;
  width: 100% !important;
  margin: 0 auto !important;
}

/* Accessibility: Reduced motion */
@media (prefers-reduced-motion: reduce) {
  .js-popup-sales-overlay,
  .js-popup-sales,
  .js-popup-sales-close,
  .js-popup-sales-cta {
    transition: none !important;
    animation: none !important;
  }
  
  .js-popup-sales {
    transform: none !important;
  }
  
  .js-popup-sales-overlay.show .js-popup-sales {
    transform: none !important;
  }
}

@media (max-width: 640px) {
  .js-popup-sales.layout-horizontal {
    flex-direction: column;
    max-width: none;
  }
  
  /* Hide image for horizontal layout on mobile */
  .js-popup-sales.layout-horizontal .js-popup-sales-image-container {
    display: none;
  }
  
  .js-popup-sales.layout-horizontal .js-popup-sales-content {
    width: 100%;
    padding: 32px 24px 24px 24px;
  }
  
  /* General mobile styles */
  .js-popup-sales {
    width: 95%;
    max-width: none;
    border-radius: 12px;
  }
  
  .js-popup-sales-content {
    padding: 32px 24px 24px;
  }
  
  .js-popup-sales-title {
    font-size: 20px;
  }
  
  .js-popup-sales-overlay.position-bottom-right {
    padding: 12px;
  }
}

/* Landscape mobile - compact mode */
@media (max-height: 500px) and (orientation: landscape) {
  .js-popup-sales {
    max-height: 95vh;
    border-radius: 10px;
  }
  
  .js-popup-sales-content {
    padding: 16px 20px 16px;
    overflow-y: auto;
    max-height: calc(95vh - 20px);
  }
  
  /* Hide image in landscape */
  .js-popup-sales-image,
  .js-popup-sales-image-container {
    display: none !important;
  }
  
  .js-popup-sales-close {
    top: 8px;
    right: 8px;
    width: 28px;
    height: 28px;
  }
  
  .js-popup-sales-title {
    font-size: 18px;
    margin-bottom: 6px;
  }
  
  .js-popup-sales-subtitle {
    font-size: 13px;
    margin-bottom: 10px;
  }
  
  .js-popup-sales-features {
    margin-bottom: 12px;
  }
  
  .js-popup-sales-features li {
    padding: 4px 0;
    padding-left: 20px;
    font-size: 13px;
  }
  
  .js-popup-sales-cta {
    padding: 10px 20px;
    font-size: 14px;
  }
  
  .js-popup-sales.layout-horizontal .js-popup-sales-content {
    padding: 16px 20px 16px 20px;
  }
}
`;
