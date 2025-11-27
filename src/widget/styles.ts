export const widgetStyles = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap');

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.aibizmate-popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
  z-index: 999999;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.aibizmate-popup-overlay.show {
  opacity: 1;
}

/* Position variants */
.aibizmate-popup-overlay.position-top-left {
  align-items: flex-start;
  justify-content: flex-start;
  padding: 20px;
  background: transparent;
  backdrop-filter: none;
}

.aibizmate-popup-overlay.position-top-center {
  align-items: flex-start;
  justify-content: center;
  padding: 20px;
  background: transparent;
  backdrop-filter: none;
}

.aibizmate-popup-overlay.position-top-right {
  align-items: flex-start;
  justify-content: flex-end;
  padding: 20px;
  background: transparent;
  backdrop-filter: none;
}

.aibizmate-popup-overlay.position-center-left {
  align-items: center;
  justify-content: flex-start;
  padding: 20px;
  background: transparent;
  backdrop-filter: none;
}

.aibizmate-popup-overlay.position-center-right {
  align-items: center;
  justify-content: flex-end;
  padding: 20px;
  background: transparent;
  backdrop-filter: none;
}

.aibizmate-popup-overlay.position-bottom-left {
  align-items: flex-end;
  justify-content: flex-start;
  padding: 20px;
  background: transparent;
  backdrop-filter: none;
}

.aibizmate-popup-overlay.position-bottom-center {
  align-items: flex-end;
  justify-content: center;
  padding: 20px;
  background: transparent;
  backdrop-filter: none;
}

.aibizmate-popup-overlay.position-bottom-right {
  align-items: flex-end;
  justify-content: flex-end;
  padding: 20px;
  background: transparent;
  backdrop-filter: none;
}

.aibizmate-popup {
  position: relative;
  background: white;
  border-radius: 16px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  max-width: 480px;
  width: 90%;
  max-height: 90vh;
  overflow: hidden;
  transform: scale(0.9) translateY(20px);
  transition: transform 0.3s ease;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: 14px;
}

.aibizmate-popup-overlay.show .aibizmate-popup {
  transform: scale(1) translateY(0);
}

.aibizmate-popup.theme-dark {
  background: #1a1a1a;
  color: #ffffff;
}

.aibizmate-popup-close {
  position: absolute;
  top: 16px;
  right: 16px;
  width: 32px;
  height: 32px;
  border: none;
  background: rgba(0, 0, 0, 0.05);
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  z-index: 10;
}

.aibizmate-popup-close:hover {
  background: rgba(0, 0, 0, 0.1);
  transform: scale(1.05);
}

.theme-dark .aibizmate-popup-close {
  background: rgba(255, 255, 255, 0.1);
}

.theme-dark .aibizmate-popup-close:hover {
  background: rgba(255, 255, 255, 0.15);
}

.aibizmate-popup-close svg {
  width: 18px;
  height: 18px;
  stroke: #333;
  stroke-width: 2;
}

.theme-dark .aibizmate-popup-close svg {
  stroke: #fff;
}

.aibizmate-popup-content {
  padding: 40px 32px 32px;
  overflow-y: auto;
  max-height: 90vh;
}

.aibizmate-popup-image {
  width: 100%;
  height: auto;
  max-height: 300px;
  object-fit: contain;
  border-radius: 12px;
  margin-bottom: 24px;
}

.aibizmate-popup-title {
  font-size: 22px;
  font-weight: 600;
  line-height: 1.3;
  margin-bottom: 10px;
  color: #1a1a1a;
}

.theme-dark .aibizmate-popup-title {
  color: #ffffff;
}

.aibizmate-popup-subtitle {
  font-size: 14px;
  line-height: 1.5;
  color: #666;
  margin-bottom: 16px;
}

.theme-dark .aibizmate-popup-subtitle {
  color: #a0a0a0;
}

.aibizmate-popup-features {
  list-style: none;
  margin: 0 0 20px 0;
  padding: 0;
}

.aibizmate-popup-features li {
  padding: 8px 0;
  padding-left: 24px;
  position: relative;
  font-size: 14px;
  line-height: 1.4;
  color: #333;
}

.theme-dark .aibizmate-popup-features li {
  color: #d0d0d0;
}

.aibizmate-popup-features li:before {
  content: '✓';
  position: absolute;
  left: 0;
  color: #10b981;
  font-weight: 600;
  font-size: 16px;
}

.aibizmate-popup-cta {
  display: block;
  width: 100%;
  padding: 14px 24px;
  background: #f97316;
  color: white !important;
  text-decoration: none;
  text-align: center;
  border-radius: 10px;
  font-weight: 600;
  font-size: 15px;
  transition: all 0.2s ease;
  border: none;
  cursor: pointer;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.aibizmate-popup-cta:hover {
  background: #ea580c;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(249, 115, 22, 0.3);
}

.aibizmate-popup-content a {
  color: #f97316;
  text-decoration: underline;
}

.theme-dark .aibizmate-popup-content a {
  color: #fb923c;
}

.aibizmate-popup-content strong {
  font-weight: 600;
}

.aibizmate-popup-content em {
  font-style: italic;
}

.aibizmate-popup-content del {
  text-decoration: line-through;
  opacity: 0.7;
}

/* Horizontal layout */
.aibizmate-popup.layout-horizontal {
  max-width: 600px;
  display: flex;
  flex-direction: row;
  padding: 0;
}

.aibizmate-popup.layout-horizontal .aibizmate-popup-image-container {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 0;
  overflow: hidden;
}

.aibizmate-popup.layout-horizontal .aibizmate-popup-image {
  width: auto;
  height: 100%;
  object-fit: contain;
  object-position: left center;
  border-radius: 0;
  margin: 0 16px 0 0;
}

.aibizmate-popup.layout-horizontal .aibizmate-popup-content {
  flex: 1;
  padding: 32px 32px 32px 0;
}

@media (max-width: 640px) {
  .aibizmate-popup.layout-horizontal {
    flex-direction: column;
    max-width: none;
  }
  
  .aibizmate-popup.layout-horizontal .aibizmate-popup-image-container {
    width: 100%;
    padding: 24px 24px 0 24px;
  }
  
  .aibizmate-popup.layout-horizontal .aibizmate-popup-image {
    max-height: 180px;
    width: auto;
    max-width: 100%;
  }
  
  .aibizmate-popup.layout-horizontal .aibizmate-popup-content {
    width: 100%;
    padding: 16px 24px 24px 24px;
  }

@media (max-width: 640px) {
  .aibizmate-popup {
    width: 95%;
    max-width: none;
    border-radius: 12px;
  }
  
  .aibizmate-popup-content {
    padding: 32px 24px 24px;
  }
  
  .aibizmate-popup-title {
    font-size: 20px;
  }
  
  .aibizmate-popup-overlay.position-bottom-right {
    padding: 12px;
  }
}
`;
