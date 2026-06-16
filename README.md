# JS Popup Sales Widget

A lightweight, customizable pop-up widget for advertising messages and announcements. Built on vanilla JavaScript, with no dependencies and using Shadow DOM for style isolation.

## DEMO & Live Configurator

Try the live demo and configure the widget directly in your browser:
https://js-popup-sales.pages.dev/

You are also welcome to use the production-ready script hosted on Cloudflare:
https://js-popup-sales.pages.dev/js-popup-sales.js

Legacy-compatible script path:
https://js-popup-sales.pages.dev/js-popup-sale.js

## Features

- 🎨 **Customizable themes** — Light, Dark, or Auto (system preference)
- 📍 **9 position options** — Center, corners, and edges
- 📐 **2 layouts** — Vertical (image on top) or Horizontal (image on left)
- ✍️ **Markdown support** — Bold, italic, strikethrough, links
- 📊 **GTM integration** — dataLayer events for analytics
- ⌨️ **Accessibility** — ARIA attributes, focus trap, keyboard navigation
- 🎯 **Multiple triggers** — Delay, scroll percentage, exit-intent, manual
- 🔒 **Shadow DOM** — Isolated styles, no CSS conflicts
- 📱 **Responsive** — Mobile-friendly with landscape support

## Installation

### Build the widget

1. Run the build:

```bash
npm run build:js-popup-sales
```

2. Output:

- `dist/js-popup-sales.js` — canonical file
- `dist/js-popup-sale.js` — legacy-compatible alias

### Deploy

Upload `js-popup-sales.js` to your CDN or static hosting. If an older tag expects `js-popup-sale.js`, upload the alias too.

## Usage

### Method 1: Global Config (Recommended for GTM)

```html
<script>
  window.JSPopupSalesConfig = {
    trigger: "delay",
    delay: 3000,
    dismissDays: 7,
    title: "Don't lose customers! 🚀",
    subtitle: "**AIbizMate** helps you find _missed leads_ in your inbox",
    features: ["✅ Automatic scanning", "🤖 AI-powered analysis", "📧 Instant notifications"],
    ctaText: "Find for free",
    ctaUrl: "https://aibizmate.com",
    theme: "light",
    position: "center",
    layout: "vertical",
    inheritFont: false,
    buttonColor: "#f97316",
    backgroundColor: "#ffffff",
    textColor: "#1a1a1a",
    buttonRadius: 10,
    contentAlign: "left",
    enableTracking: true,
    popupId: "js_popup_sales",
    closeOnCtaClick: true,
    modal: false,
    debug: false
  };
</script>
<script src="https://yourdomain.com/js-popup-sales.js"></script>
```

### Method 2: Data Attributes (Direct HTML only, NOT for GTM)

```html
<script
  src="https://yourdomain.com/js-popup-sales.js"
  data-js-popup-sales
  data-trigger="delay"
  data-delay="3000"
  data-title="Special Offer! 🎉"
  data-subtitle="Get 50% off today"
  data-cta-text="Shop Now"
  data-cta-url="https://example.com"
  data-theme="auto"
  data-position="bottom-right"
></script>
```

**⚠️ Note:** Data attributes do NOT work in Google Tag Manager. Use Method 1 for GTM.

## Configuration Options

| Parameter         | Type     | Default                      | Description                                        |
| ----------------- | -------- | ---------------------------- | -------------------------------------------------- |
| `trigger`         | string   | `"delay"`                    | `"delay"`, `"scroll"`, `"exit-intent"`, `"manual"` |
| `delay`           | number   | `3000`                       | Delay in ms (100-60000)                            |
| `scrollPercent`   | number   | `50`                         | Scroll percentage trigger (1-100)                  |
| `dismissDays`     | number   | `7`                          | Days to hide after dismiss (0 = always show)       |
| `title`           | string   | `"Don't lose customers! 🚀"` | Popup title (supports markdown)                    |
| `subtitle`        | string   | —                            | Subtitle text (supports markdown)                  |
| `features`        | string[] | —                            | List of features (supports markdown)               |
| `ctaText`         | string   | `"Find for free"`            | CTA button text                                    |
| `ctaUrl`          | string   | —                            | CTA button URL                                     |
| `image`           | string   | —                            | Image URL                                          |
| `theme`           | string   | `"light"`                    | `"light"`, `"dark"`, `"auto"`                      |
| `position`        | string   | `"center"`                   | See positions below                                |
| `layout`          | string   | `"vertical"`                 | `"vertical"`, `"horizontal"`                       |
| `inheritFont`     | boolean  | `false`                      | Use website font instead of Inter                  |
| `buttonColor`     | string   | `"#f97316"`                  | Button color (HEX, RGB, HSL)                       |
| `backgroundColor` | string   | `"#ffffff"`                  | Popup background color                             |
| `textColor`       | string   | `"#1a1a1a"`                  | Text color                                         |
| `buttonRadius`    | number   | `10`                         | Button border radius in px (0-100)                 |
| `contentAlign`    | string   | `"left"`                     | `"left"`, `"center"`, `"right"`                    |
| `enableTracking`  | boolean  | `false`                      | Enable GTM dataLayer events                        |
| `popupId`         | string   | `"js_popup_sales"`           | Unique ID for tracking                             |
| `closeOnCtaClick` | boolean  | `true`                       | Close popup when CTA clicked                       |
| `modal`           | boolean  | `false`                      | Block page interaction behind the popup            |
| `debug`           | boolean  | `false`                      | Enable console logging                             |

### Positions

- `center` (default)
- `top-left`, `top-center`, `top-right`
- `center-left`, `center-right`
- `bottom-left`, `bottom-center`, `bottom-right`

### Theme: Auto

When `theme: "auto"`, the widget detects system preference using `prefers-color-scheme` media query:

- Dark mode system → Dark theme
- Light mode system → Light theme (default)

## Markdown Support

The widget supports a subset of Markdown in title, subtitle, features, and CTA text:

| Syntax        | Result                  |
| ------------- | ----------------------- |
| `**text**`    | **bold**                |
| `_text_`      | _italic_                |
| `**_text_**`  | **_bold italic_**       |
| `~~text~~`    | ~~strikethrough~~       |
| `[text](url)` | [link](url)             |
| Emoji         | 🚀✨🎉 (native support) |

**Note:** `*text*` is NOT supported for italic. Use `_text_` instead.

## Callbacks API

Execute custom JavaScript when popup events occur:

```javascript
window.JSPopupSalesConfig = {
  // ...other options
  onShow: () => {
    console.log('Popup shown!');
  },
  onHide: () => {
    console.log('Popup hidden!');
  },
  onCtaClick: () => {
    gtag('event', 'cta_click', { popup_id: 'my_popup' });
  }
};
```

## Programmatic Control

### Global Functions (Recommended)

```javascript
// Show popup
showJSPopupSales();

// Show with custom config override
showJSPopupSales({ title: 'New Title!' });

// Hide popup
hideJSPopupSales();

// Dismiss popup (respects dismissDays)
dismissJSPopupSales();
```

### Instance Control

```javascript
// Access the auto-initialized instance
jsPopupSalesInstance.show();
jsPopupSalesInstance.hide();
jsPopupSalesInstance.dismiss();

// Create a new instance manually
const popup = new JSPopupSales({ trigger: 'manual', title: 'Hello!' });
popup.init();
popup.show();
```

## GTM Integration

### dataLayer Events

When `enableTracking: true`, these events are pushed to `window.dataLayer`:

| Event                          | Description        | Extra Data                                 |
| ------------------------------ | ------------------ | ------------------------------------------ |
| `js_popup_sales_shown`         | Popup displayed    | —                                          |
| `js_popup_sales_primary_click` | CTA button clicked | —                                          |
| `js_popup_sales_closed`        | Popup closed       | `close_type`: "cross", "outside", "escape" |
| `js_popup_sales_error`         | Error occurred     | `error_type`, `error_message`              |

All events include `popup_id` for identification.

### GTM Tag Setup

1. Create a new **Custom HTML** tag
2. Paste the code with `window.JSPopupSalesConfig`
3. Set trigger (e.g., "All Pages" or specific page)
4. Publish container

### GTM Variables for Dynamic Content

Create GTM variables (Constants or Data Layer Variables) and use them:

```html
<script>
  window.JSPopupSalesConfig = {
    title: "{{Popup Title}}",
    ctaUrl: "{{Popup CTA URL}}",
    delay: {{Popup Delay}}
  };
</script>
<script src="https://yourdomain.com/js-popup-sales.js"></script>
```

## Debug Mode

Enable debug mode to see detailed logs in browser console:

```javascript
window.JSPopupSalesConfig = {
  debug: true,
  // ...other options
};
```

When disabled (default), no console logs are produced in production.

## Image Guidelines

| Layout     | Recommended Size | Aspect Ratio |
| ---------- | ---------------- | ------------ |
| Vertical   | 480 × 200 px     | 2.4:1        |
| Horizontal | 150 × 350 px     | 1:2.3        |

## Accessibility

- ARIA `role="dialog"` and `aria-modal` reflect modal mode
- `aria-labelledby` references popup title
- Focus trap when `modal: true`
- `Escape` key closes popup
- `prefers-reduced-motion` support
- Links have `rel="noopener noreferrer"`

## Browser Support

- Chrome 60+
- Firefox 55+
- Safari 11+
- Edge 79+

## Troubleshooting

### Popup doesn't appear

1. Check browser console for errors
2. Enable `debug: true` to see logs
3. Reset dismiss: `localStorage.removeItem('js_popup_sales_dismissed')`
4. Verify script URL is accessible

### Styles are broken

- The widget uses Shadow DOM — external CSS cannot affect it
- Check if `inheritFont: true` is causing font issues
- Verify custom colors are valid CSS colors

### GTM issues

- Data attributes don't work in GTM — use `window.JSPopupSalesConfig`
- Ensure script loads after config is set
- Check GTM preview mode for tag firing

## License

MIT License with restrictions on sale. See [LICENSE](LICENSE) for details.

You are free to use, modify, and distribute this software, but you may not sell it as a standalone product.

The project was vibecoded with Lovable)
