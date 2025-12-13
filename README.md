# JS Popup Sales

A lightweight, customizable popup widget designed to help website owners increase conversions without the complexity of heavy marketing tools.

Built with simplicity in mind, it requires no dependencies and works seamlessly with any website. Whether you're promoting a product, collecting leads, or announcing a sale — this widget has you covered.

## Features

- 🪶 **Lightweight** — No dependencies, minimal footprint
- 🎨 **Customizable** — Themes, layouts, positions, and more
- 📱 **Responsive** — Works on all devices
- 🔒 **Secure** — XSS protection with HTML sanitization
- ⚡ **Easy Integration** — Single script tag to add to any website

## Installation

### Via CDN

```html
<script src="https://your-cdn.com/popup-sales.min.js"></script>
```

### Via npm

```bash
npm install js-popup-sales
```

## Usage

```javascript
PopupSales.init({
  title: "Special Offer!",
  description: "Get 20% off your first order",
  ctaText: "Shop Now",
  ctaUrl: "https://example.com/shop",
  theme: "light",
  position: "bottom-right",
  trigger: "delay",
  triggerDelay: 3000
});
```

## Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `title` | string | - | Popup title |
| `description` | string | - | Popup description (supports markdown) |
| `ctaText` | string | - | Call-to-action button text |
| `ctaUrl` | string | - | CTA button link |
| `theme` | string | `"light"` | `"light"` or `"dark"` |
| `position` | string | `"bottom-right"` | `"bottom-right"`, `"bottom-left"`, `"top-right"`, `"top-left"` |
| `layout` | string | `"horizontal"` | `"horizontal"` or `"vertical"` |
| `trigger` | string | `"delay"` | `"delay"`, `"scroll"`, `"exit"` |
| `triggerDelay` | number | `3000` | Delay in ms (for delay trigger) |
| `imageUrl` | string | - | Optional image URL |

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Build standalone widget
npm run build:widget
```

## Demo

Visit the [demo page](/demo) to see the widget in action with live configuration.

## License

MIT

## Author

**Oleh Savytskyi** — Creator

---

The project is open-source and free to use. Contributions and feedback are always welcome!
