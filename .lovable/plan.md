

## Non-modal behavior for non-center popup positions

### Current state
- The dark semi-transparent backdrop already only appears for `position: center` (non-center positions already have `background: transparent` and `backdrop-filter: none`).
- However, the overlay still covers the entire page and blocks all clicks/interactions, even for non-center positions.
- Focus is always trapped inside the popup, and `aria-modal="true"` is always set.

### Goal
For any position other than `center`, the popup should be **non-modal**: users can click and interact with the page freely while the popup remains visible on screen. The dark backdrop remains only for `center` -- this will not change.

### Changes

**File 1: `src/js-popup-sales/styles.ts`**

Add `pointer-events: none` to the non-center overlay rule so clicks pass through to the page. Add `pointer-events: auto` on the popup card itself so it remains interactive.

```css
/* Existing rule -- add pointer-events: none */
.js-popup-sales-overlay[class*="position-"]:not(.js-popup-sales-overlay.position-center) {
  padding: 20px;
  background: transparent;
  backdrop-filter: none;
  pointer-events: none;  /* NEW: clicks pass through to page */
}

/* NEW rule: popup card stays interactive */
.js-popup-sales-overlay[class*="position-"]:not(.js-popup-sales-overlay.position-center) .js-popup-sales {
  pointer-events: auto;
}
```

**File 2: `src/js-popup-sales/popup-sales.ts`**

Add a helper property and use it to conditionally control modal behavior:

1. Add `isModal` getter:
```typescript
private get isModal(): boolean {
  return this.config.position === 'center';
}
```

2. In `createPopup()` -- set `aria-modal` conditionally:
```typescript
popup.setAttribute('aria-modal', this.isModal ? 'true' : 'false');
```

3. In `show()` -- only set up focus trap for modal popups:
```typescript
if (this.isModal) {
  this.previousActiveElement = document.activeElement;
  this.setupFocusTrap();
}
```

4. In `hide()` -- only restore focus for modal popups:
```typescript
if (this.isModal) {
  if (this.focusTrapHandler && this.shadowRoot) {
    this.shadowRoot.removeEventListener('keydown', this.focusTrapHandler);
    this.focusTrapHandler = null;
  }
  if (this.previousActiveElement instanceof HTMLElement) {
    this.previousActiveElement.focus();
  }
  this.previousActiveElement = null;
}
```

5. Escape key and close button continue to work for all positions (no changes needed).

### Behavior summary

| Feature | Center (modal) | Other positions (non-modal) |
|---------|---------------|---------------------------|
| Dark backdrop | Yes | No (unchanged) |
| Page interaction blocked | Yes | No |
| Focus trapped in popup | Yes | No |
| Auto-focus popup | Yes | No |
| Escape closes popup | Yes | Yes |
| Close button works | Yes | Yes |
| Popup stays on screen | Until dismissed | Until dismissed |

