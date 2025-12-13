import { useState } from "react";
import { Footer } from "@/components/Footer";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Copy, Check, Eye } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const JsPopupSaleDemo = () => {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  const [config, setConfig] = useState({
    trigger: "delay",
    delay: "3000",
    scrollPercent: "50",
    dismissDays: "0",
    title: "Don't lose customers! 🚀",
    subtitle: "**AIbizMate** helps you find _missed leads_ in your Spam and Inbox",
    features: "✅ Automatic scanning\n🤖 AI-powered analysis\n📧 Instant notifications",
    ctaText: "Try for free",
    ctaUrl: "https://aibizmate.com",
    image: "https://js-popup-sales.pages.dev/blonde_red_dress_359x663.webp",
    theme: "light",
    position: "center",
    layout: "horizontal",
    inheritFont: "false",
    buttonColor: "#f97316",
    backgroundColor: "#ffffff",
    textColor: "#1a1a1a",
    buttonRadius: "10",
    contentAlign: "left",
    // GTM tracking
    enableTracking: false,
    popupId: "js_popup_sales",
    // Behavior
    closeOnCtaClick: true,
    // Debug
    debug: false,
    // Domain for generated code
    domain: "https://js-popup-sales.pages.dev",
  });

  const generateCode = () => {
    const featuresArray = config.features.split("\n").filter((f) => f.trim());

    // Generate full config with all parameters - always include all values
    const configObj: Record<string, unknown> = {
      trigger: config.trigger,
      delay: parseInt(config.delay),
      scrollPercent: parseInt(config.scrollPercent),
      dismissDays: parseInt(config.dismissDays),
      title: config.title,
      subtitle: config.subtitle,
      features: featuresArray,
      ctaText: config.ctaText,
      ctaUrl: config.ctaUrl,
      theme: config.theme,
      position: config.position,
      layout: config.layout,
      inheritFont: config.inheritFont === "true",
      buttonColor: config.buttonColor,
      backgroundColor: config.backgroundColor,
      textColor: config.textColor,
      buttonRadius: parseInt(config.buttonRadius),
      contentAlign: config.contentAlign,
      enableTracking: config.enableTracking,
      popupId: config.popupId,
      closeOnCtaClick: config.closeOnCtaClick,
      debug: config.debug,
    };

    // Add optional image only if it has content
    if (config.image) {
      configObj.image = config.image;
    }

    // Format JSON for readability
    const configJson = JSON.stringify(configObj, null, 2)
      .split("\n")
      .map((line, i) => (i === 0 ? line : "  " + line))
      .join("\n");

    // Use configured domain
    const domain = config.domain.trim().replace(/^https?:\/\//, '') || "js-popup-sales.pages.dev";

    // Generate code with window.JSPopupSalesConfig
    let code = `<!-- JS Popup Sales - GTM Recommended Method -->
<script>
  window.JSPopupSalesConfig = ${configJson};
  
  // Optional: Callbacks (uncomment to use)
  // window.JSPopupSalesConfig.onShow = () => console.log('Popup shown!');
  // window.JSPopupSalesConfig.onHide = () => console.log('Popup hidden!');
  // window.JSPopupSalesConfig.onCtaClick = () => gtag('event', 'cta_click');
</script>
<script src="https://${domain}/js-popup-sales.js"></script>`;

    return code;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generateCode());
    setCopied(true);
    toast({
      title: "Code copied!",
      description: "You can now paste it on your website",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePreview = () => {
    // Clear any existing widget
    const existing = document.getElementById("js-popup-sales-container");
    if (existing) existing.remove();

    // Import and show widget
    import("@/js-popup-sales/popup-sales").then(({ JSPopupSales }) => {
      const widget = new JSPopupSales({
        trigger: "manual",
        dismissDays: parseInt(config.dismissDays),
        title: config.title,
        subtitle: config.subtitle,
        features: config.features.split("\n").filter((f) => f.trim()),
        ctaText: config.ctaText,
        ctaUrl: config.ctaUrl,
        image: config.image || undefined,
        theme: config.theme as "light" | "dark" | "auto",
        position: config.position as
          | "center"
          | "top-left"
          | "top-center"
          | "top-right"
          | "center-left"
          | "center-right"
          | "bottom-left"
          | "bottom-center"
          | "bottom-right",
        layout: config.layout as "vertical" | "horizontal",
        inheritFont: config.inheritFont === "true",
        buttonColor: config.buttonColor || undefined,
        backgroundColor: config.backgroundColor || undefined,
        textColor: config.textColor || undefined,
        buttonRadius: parseInt(config.buttonRadius),
        contentAlign: config.contentAlign as "left" | "center" | "right",
        enableTracking: config.enableTracking,
        popupId: config.popupId,
        closeOnCtaClick: config.closeOnCtaClick,
        debug: config.debug,
      });
      widget.init();
      widget.show();
    });
  };

  return (
    <div className="min-h-screen bg-background overflow-x-hidden flex flex-col">
      <header className="border-b border-border py-4 px-4">
        <div className="container mx-auto flex items-center justify-between">
          <Link to="/" className="text-xl font-bold hover:text-primary transition-colors">
            JS Popup Sales Demo
          </Link>
          <a
            href="https://github.com/Vicarta/js-popup-sales"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            GitHub →
          </a>
        </div>
      </header>

      <main className="flex-1 w-full px-3 sm:px-4 lg:px-8 py-8 sm:py-12 lg:py-24">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-6 sm:mb-8 lg:mb-12">
            <h1 className="text-xl sm:text-2xl lg:text-4xl font-bold mb-2 sm:mb-3 lg:mb-4">JS Popup Sales Demo</h1>
            <p className="text-muted-foreground text-xs sm:text-sm lg:text-lg px-2">
              Configure widget parameters and get the code to embed on your website for free
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
            {/* Configuration */}
            <Card className="p-3 sm:p-4 lg:p-6 space-y-3 sm:space-y-4 lg:space-y-6">
              <div>
                <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Configuration</h2>
              </div>

              <div className="space-y-3 sm:space-y-4">
                <div>
                  <Label>Display Trigger</Label>
                  <Select value={config.trigger} onValueChange={(v) => setConfig({ ...config, trigger: v })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="delay">delay (default)</SelectItem>
                      <SelectItem value="scroll">scroll</SelectItem>
                      <SelectItem value="exit-intent">exit-intent</SelectItem>
                      <SelectItem value="manual">manual</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {config.trigger === "delay" && (
                  <div>
                    <Label>Delay (ms)</Label>
                    <Input
                      type="number"
                      value={config.delay}
                      onChange={(e) => setConfig({ ...config, delay: e.target.value })}
                    />
                  </div>
                )}

                {config.trigger === "scroll" && (
                  <div>
                    <Label>Page Scroll (%)</Label>
                    <Input
                      type="number"
                      value={config.scrollPercent}
                      onChange={(e) => setConfig({ ...config, scrollPercent: e.target.value })}
                    />
                  </div>
                )}

                <div>
                  <Label>Hide after dismiss (days)</Label>
                  <Input
                    type="number"
                    value={config.dismissDays}
                    onChange={(e) => setConfig({ ...config, dismissDays: e.target.value })}
                  />
                  <p className="text-xs text-muted-foreground mt-1">0 = always show</p>
                </div>

                <div>
                  <Label>Title (already bold, supports markdown and emoji)</Label>
                  <Input
                    value={config.title}
                    onChange={(e) => setConfig({ ...config, title: e.target.value })}
                    placeholder="**Bold** _italic_ and emoji 🚀"
                  />
                </div>

                <div>
                  <Label>Subtitle</Label>
                  <Textarea
                    value={config.subtitle}
                    onChange={(e) => setConfig({ ...config, subtitle: e.target.value })}
                    rows={2}
                  />
                </div>

                <div>
                  <Label>Features (one per line)</Label>
                  <Textarea
                    value={config.features}
                    onChange={(e) => setConfig({ ...config, features: e.target.value })}
                    rows={4}
                  />
                </div>

                <div>
                  <Label>Button Text</Label>
                  <Input value={config.ctaText} onChange={(e) => setConfig({ ...config, ctaText: e.target.value })} />
                </div>

                <div>
                  <Label>Button URL</Label>
                  <Input value={config.ctaUrl} onChange={(e) => setConfig({ ...config, ctaUrl: e.target.value })} />
                </div>

                <div>
                  <Label>Image URL (optional)</Label>
                  <Input
                    value={config.image}
                    onChange={(e) => setConfig({ ...config, image: e.target.value })}
                    placeholder="https://..."
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    {config.layout === "vertical"
                      ? "Horizontal image (480×200 px, 2.4:1)"
                      : "Vertical image (150×350 px, 1:2.3)"}
                  </p>
                </div>

                <div>
                <Label>Layout: vertical (image on top) or horizontal (image on left)</Label>
                  <Select value={config.layout} onValueChange={(v) => setConfig({ ...config, layout: v })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="horizontal">horizontal (default)</SelectItem>
                      <SelectItem value="vertical">vertical</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <Label>Theme</Label>
                    <Select value={config.theme} onValueChange={(v) => setConfig({ ...config, theme: v })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="light">light (default)</SelectItem>
                        <SelectItem value="dark">dark</SelectItem>
                        <SelectItem value="auto">auto (system)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Position</Label>
                    <Select value={config.position} onValueChange={(v) => setConfig({ ...config, position: v })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="center">center (default)</SelectItem>
                        <SelectItem value="top-left">top-left</SelectItem>
                        <SelectItem value="top-center">top-center</SelectItem>
                        <SelectItem value="top-right">top-right</SelectItem>
                        <SelectItem value="center-left">center-left</SelectItem>
                        <SelectItem value="center-right">center-right</SelectItem>
                        <SelectItem value="bottom-left">bottom-left</SelectItem>
                        <SelectItem value="bottom-center">bottom-center</SelectItem>
                        <SelectItem value="bottom-right">bottom-right</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label>Use Website Font: false (Inter font will be used), true (font of the site will be used)</Label>
                  <Select value={config.inheritFont} onValueChange={(v) => setConfig({ ...config, inheritFont: v })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="false">false (default)</SelectItem>
                      <SelectItem value="true">true</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Button Color (HEX)</Label>
                  <Input
                    value={config.buttonColor}
                    onChange={(e) => setConfig({ ...config, buttonColor: e.target.value })}
                    placeholder="#f97316"
                  />
                </div>

                <div>
                  <Label>Background Color (HEX)</Label>
                  <Input
                    value={config.backgroundColor}
                    onChange={(e) => setConfig({ ...config, backgroundColor: e.target.value })}
                    placeholder="#ffffff"
                  />
                </div>

                <div>
                  <Label>Text Color (HEX)</Label>
                  <Input
                    value={config.textColor}
                    onChange={(e) => setConfig({ ...config, textColor: e.target.value })}
                    placeholder="#000000"
                  />
                </div>

                <div>
                  <Label>Button Radius (px)</Label>
                  <Input
                    type="number"
                    value={config.buttonRadius}
                    onChange={(e) => setConfig({ ...config, buttonRadius: e.target.value })}
                    placeholder="10"
                  />
                </div>

                <div>
                  <Label>Content Alignment</Label>
                  <Select value={config.contentAlign} onValueChange={(v) => setConfig({ ...config, contentAlign: v })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="left">left (default)</SelectItem>
                      <SelectItem value="center">center</SelectItem>
                      <SelectItem value="right">right</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Behavior Section */}
                <div className="pt-3 sm:pt-4 border-t">
                  <h3 className="font-semibold mb-3">Behavior</h3>

                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="closeOnCtaClick"
                        checked={config.closeOnCtaClick}
                        onCheckedChange={(checked) => setConfig({ ...config, closeOnCtaClick: checked as boolean })}
                      />
                      <Label htmlFor="closeOnCtaClick" className="cursor-pointer">
                        Close popup on CTA click
                      </Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="debug"
                        checked={config.debug}
                        onCheckedChange={(checked) => setConfig({ ...config, debug: checked as boolean })}
                      />
                      <Label htmlFor="debug" className="cursor-pointer">
                        Enable debug mode (console logs)
                      </Label>
                    </div>
                  </div>
                </div>

                {/* GTM Tracking Section */}
                <div className="pt-3 sm:pt-4 border-t">
                  <h3 className="font-semibold mb-3">GTM Tracking</h3>

                  <div className="flex items-center space-x-2 mb-3">
                    <Checkbox
                      id="enableTracking"
                      checked={config.enableTracking}
                      onCheckedChange={(checked) => setConfig({ ...config, enableTracking: checked as boolean })}
                    />
                    <Label htmlFor="enableTracking" className="cursor-pointer">
                      Enable dataLayer tracking
                    </Label>
                  </div>

                  {config.enableTracking && (
                    <div>
                      <Label>Popup ID</Label>
                      <Input
                        value={config.popupId}
                        onChange={(e) => setConfig({ ...config, popupId: e.target.value })}
                        placeholder="js_popup_sales"
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Unique identifier for this popup in dataLayer events
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Button onClick={handlePreview} className="w-full" size="lg">
                  <Eye className="w-4 h-4 mr-2" />
                  Preview
                </Button>
                <Button
                  onClick={() => {
                    localStorage.removeItem("js_popup_sales_dismissed");
                    toast({
                      title: "Dismiss reset",
                      description: "The widget will now show again",
                    });
                  }}
                  variant="outline"
                  className="w-full"
                  size="lg"
                >
                  Reset Dismiss
                </Button>
              </div>
            </Card>

            {/* Generated Code */}
            <Card className="p-3 sm:p-4 lg:p-6 overflow-hidden">
              <div className="mb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <h2 className="text-lg sm:text-xl font-semibold">Generated Code</h2>
                <Button onClick={handleCopy} variant="outline" size="sm">
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 mr-2" />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 mr-2" />
                      Copy
                    </>
                  )}
                </Button>
              </div>

              {/* Domain Input */}
              <div className="mb-4">
                <Label>Script Domain</Label>
                <Input
                  value={config.domain}
                  onChange={(e) => setConfig({ ...config, domain: e.target.value })}
                  placeholder="https://js-popup-sales.pages.dev"
                />
                <p className="text-xs text-muted-foreground mt-1">Domain where js-popup-sales.js is hosted</p>
              </div>

              <div className="bg-muted rounded-lg p-3 sm:p-4 overflow-x-auto max-w-full">
                <pre className="text-[10px] sm:text-xs lg:text-sm whitespace-pre-wrap break-all sm:whitespace-pre sm:break-normal">
                  <code>{generateCode()}</code>
                </pre>
              </div>

              <div className="mt-4 sm:mt-6 space-y-4">
                <div className="p-3 sm:p-4 bg-primary/5 border border-primary/20 rounded-lg">
                  <h3 className="font-semibold mb-2 flex items-center gap-2 text-sm sm:text-base">
                    📦 Building JS Popup Sales
                  </h3>
                  <div className="bg-background rounded p-2 sm:p-3 mb-2">
                    <code className="text-xs sm:text-sm font-mono">npm run build:js-popup-sales</code>
                  </div>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    First, add this script to <code>package.json</code>:
                  </p>
                  <div className="bg-background rounded p-2 sm:p-3 mt-2 mb-2 overflow-x-auto max-w-full">
                    <code className="text-[10px] sm:text-xs font-mono break-all">
                      "build:js-popup-sales": "vite build --config vite.js-popup-sales.config.ts"
                    </code>
                  </div>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    Output: <code className="font-mono">dist-js-popup-sales/js-popup-sales.js</code>
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2 text-sm sm:text-base">Markdown Support</h3>
                  <ul className="text-xs sm:text-sm text-muted-foreground space-y-1">
                    <li>
                      <code>**text**</code> — bold text
                    </li>
                    <li>
                      <code>_text_</code> — italic
                    </li>
                    <li>
                      <code>**_text_**</code> — bold italic
                    </li>
                    <li>
                      <code>~~text~~</code> — strikethrough
                    </li>
                    <li>
                      <code>[text](url)</code> — link
                    </li>
                    <li>Emoji supported natively 🚀✨🎉</li>
                  </ul>
                </div>

                {/* Debug Mode Documentation */}
                <div className="p-3 sm:p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                  <h3 className="font-semibold mb-2 flex items-center gap-2 text-sm sm:text-base">🐛 Debug Mode</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground mb-2">
                    Enable debug mode to see detailed logs in the browser console:
                  </p>
                  <div className="bg-background rounded p-2">
                    <code className="text-xs">debug: true</code>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    When disabled (default), no console logs are produced in production.
                  </p>
                </div>

                {/* Callbacks Documentation */}
                <div className="p-3 sm:p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                  <h3 className="font-semibold mb-2 flex items-center gap-2 text-sm sm:text-base">🔗 Callbacks API</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground mb-2">
                    Execute custom JavaScript when popup events occur:
                  </p>
                  <div className="space-y-2 text-xs sm:text-sm">
                    <div className="bg-background rounded p-2">
                      <code className="font-semibold">onShow: () =&gt; {"{...}"}</code>
                      <p className="text-xs text-muted-foreground mt-1">Called when popup is displayed</p>
                    </div>
                    <div className="bg-background rounded p-2">
                      <code className="font-semibold">onHide: () =&gt; {"{...}"}</code>
                      <p className="text-xs text-muted-foreground mt-1">Called when popup is hidden</p>
                    </div>
                    <div className="bg-background rounded p-2">
                      <code className="font-semibold">onCtaClick: () =&gt; {"{...}"}</code>
                      <p className="text-xs text-muted-foreground mt-1">Called when CTA button is clicked</p>
                    </div>
                  </div>
                  <div className="mt-3 bg-muted rounded p-2 overflow-x-auto max-w-full">
                    <pre className="text-[10px] sm:text-xs whitespace-pre-wrap break-all sm:whitespace-pre sm:break-normal">
                      <code>{`window.JSPopupSalesConfig = {
  // ...other options
  onShow: () => console.log('Popup shown!'),
  onCtaClick: () => gtag('event', 'cta_click')
};`}</code>
                    </pre>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-2 text-sm sm:text-base">Programmatic Control</h3>
                  <div className="bg-muted rounded p-2 sm:p-3 space-y-2 text-xs sm:text-sm">
                    <div className="font-medium text-muted-foreground mb-1">Via global functions (recommended):</div>
                    <div>
                      <code>showJSPopupSales()</code> — show popup
                    </div>
                    <div>
                      <code>hideJSPopupSales()</code> — hide popup
                    </div>
                    <div>
                      <code>dismissJSPopupSales()</code> — dismiss forever
                    </div>
                    <div className="font-medium text-muted-foreground mt-3 mb-1">
                      Via instance (if autoInit worked):
                    </div>
                    <div>
                      <code>jsPopupSalesInstance.show()</code>
                    </div>
                    <div>
                      <code>jsPopupSalesInstance.hide()</code>
                    </div>
                    <div className="text-xs text-muted-foreground mt-2">
                      Or create new: <code>new JSPopupSales(config).init()</code>
                    </div>
                  </div>
                </div>

                {/* dataLayer Events Documentation */}
                <div className="p-3 sm:p-4 bg-purple-500/10 border border-purple-500/20 rounded-lg">
                  <h3 className="font-semibold mb-2 flex items-center gap-2 text-sm sm:text-base">
                    📊 dataLayer Events
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground mb-3">
                    When tracking is enabled, the following events are pushed to{" "}
                    <code className="bg-muted px-1 py-0.5 rounded">window.dataLayer</code>:
                  </p>
                  <div className="space-y-2 sm:space-y-3 text-xs sm:text-sm">
                    <div className="bg-background rounded p-2">
                      <code className="text-green-600 font-semibold">js_popup_sales_shown</code>
                      <p className="text-xs text-muted-foreground mt-1">Fired when popup is displayed</p>
                    </div>
                    <div className="bg-background rounded p-2">
                      <code className="text-blue-600 font-semibold">js_popup_sales_primary_click</code>
                      <p className="text-xs text-muted-foreground mt-1">Fired when user clicks the CTA button</p>
                    </div>
                    <div className="bg-background rounded p-2">
                      <code className="text-orange-600 font-semibold">js_popup_sales_closed</code>
                      <p className="text-xs text-muted-foreground mt-1">
                        Fired when popup is closed. Includes <code className="bg-muted px-1 rounded">close_type</code>:
                        <span className="ml-1">"cross", "outside", or "escape"</span>
                      </p>
                    </div>
                    <div className="bg-background rounded p-2">
                      <code className="text-red-600 font-semibold">js_popup_sales_error</code>
                      <p className="text-xs text-muted-foreground mt-1">
                        Fired on error. Includes <code className="bg-muted px-1 rounded">error_type</code> and{" "}
                        <code className="bg-muted px-1 rounded">error_message</code>
                      </p>
                    </div>
                  </div>
                  <div className="mt-3 text-xs text-muted-foreground">
                    All events include <code className="bg-muted px-1 py-0.5 rounded">popup_id</code> for identification
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* GTM Instructions */}
          <Card className="p-4 sm:p-6 mt-6 lg:mt-8">
            <div className="space-y-4 sm:space-y-6">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold mb-2">📊 Google Tag Manager Integration</h2>
                <p className="text-sm sm:text-base text-muted-foreground">
                  Detailed instructions for setting up the widget via GTM for dynamic management without changing
                  website code
                </p>
              </div>

              <div className="space-y-4 sm:space-y-6">
                <div className="space-y-3">
                  <h3 className="text-base sm:text-lg font-semibold flex items-center gap-2">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm">
                      1
                    </span>
                    Creating a Tag in GTM
                  </h3>
                  <ol className="space-y-2 ml-8 text-xs sm:text-sm">
                    <li className="flex gap-2">
                      <span className="text-muted-foreground">1.1</span>
                      <span>Open your container in Google Tag Manager</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-muted-foreground">1.2</span>
                      <span>
                        Go to <strong>Tags</strong> → <strong>New</strong>
                      </span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-muted-foreground">1.3</span>
                      <span>
                        Name the tag, e.g.: <code className="bg-muted px-2 py-0.5 rounded">"JS Popup Sales Widget"</code>
                      </span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-muted-foreground">1.4</span>
                      <span>
                        Select tag type: <strong>Custom HTML</strong>
                      </span>
                    </li>
                  </ol>
                </div>

                <div className="space-y-3">
                  <h3 className="text-base sm:text-lg font-semibold flex items-center gap-2">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm">
                      2
                    </span>
                    Setting Up HTML Code
                  </h3>
                  <div className="ml-8 space-y-3">
                    <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                      <p className="text-xs sm:text-sm font-semibold mb-2">
                        ✅ Recommended method for GTM (used in generated code above):
                      </p>
                      <p className="text-xs text-muted-foreground mb-2">
                        Use <code className="bg-muted px-1 py-0.5 rounded">window.JSPopupSalesConfig</code> - this
                        ensures all parameters are passed correctly:
                      </p>
                      <pre className="text-xs bg-muted rounded p-2 overflow-x-auto">
                        <code>{`<script>
  window.JSPopupSalesConfig = {
    trigger: "delay",
    delay: 3000,
    dismissDays: 0,
    title: "Don't lose customers! 🚀",
    subtitle: "**AIbizMate** helps you find leads",
    features: ["✅ Feature 1", "🤖 Feature 2"],
    ctaText: "Try it",
    ctaUrl: "https://example.com",
    image: "https://example.com/image.png",
    theme: "light",
    position: "bottom-left",
    layout: "horizontal",
    inheritFont: false,
    buttonColor: "#f97316",
    enableTracking: true,
    popupId: "my_promo_popup"
  };
</script>
<script src="https://js-popup-sales.pages.dev/js-popup-sales.js"></script>`}</code>
                      </pre>
                    </div>

                    <div className="p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                      <p className="text-xs sm:text-sm font-semibold mb-2">
                        ⚠️ Why data-* attributes don't work in GTM?
                      </p>
                      <p className="text-xs text-muted-foreground mb-2">
                        GTM dynamically creates <code className="bg-muted px-1 py-0.5 rounded">&lt;script&gt;</code>{" "}
                        elements and <strong>ignores all data-* attributes</strong>. Therefore, using{" "}
                        <code className="bg-muted px-1 py-0.5 rounded">window.JSPopupSalesConfig</code> is the only
                        reliable way for GTM.
                      </p>
                    </div>

                    <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                      <p className="text-xs sm:text-sm font-semibold mb-2">
                        💡 Alternative method (for direct embedding only, NOT for GTM):
                      </p>
                      <p className="text-xs text-muted-foreground mb-2">
                        If you're embedding code directly in your website HTML (not via GTM), you can use data-*
                        attributes:
                      </p>
                      <pre className="text-xs bg-muted rounded p-2 overflow-x-auto">
                        <code>{`<script 
  src="https://js-popup-sales.pages.dev/js-popup-sales.js"
  data-js-popup-sales
  data-trigger="delay"
  data-image="https://example.com/image.png"
  data-title="Title"
  data-enable-tracking="true"
  data-popup-id="my_popup"
></script>`}</code>
                      </pre>
                      <p className="text-xs text-muted-foreground mt-2">
                        <strong>But this will NOT work in GTM!</strong> Use window.JSPopupSalesConfig instead.
                      </p>
                    </div>
                    <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                      <p className="text-xs sm:text-sm">
                        <strong>💡 Programmatic call via GTM:</strong>
                      </p>
                      <p className="text-xs sm:text-sm mt-1">
                        If you need to show the popup on click or event, add a Custom HTML tag in GTM:
                      </p>
                      <pre className="text-xs bg-muted rounded p-2 mt-2 overflow-x-auto">
                        <code>{`<script>
  // Show popup
  if (typeof showJSPopupSales === 'function') {
    showJSPopupSales();
  }
</script>`}</code>
                      </pre>
                      <p className="text-xs text-muted-foreground mt-2">Or create new with custom config:</p>
                      <pre className="text-xs bg-muted rounded p-2 mt-1 overflow-x-auto">
                        <code>{`<script>
  if (typeof showJSPopupSales === 'function') {
    showJSPopupSales({
      title: 'Special offer!',
      ctaUrl: 'https://example.com/special'
    });
  }
</script>`}</code>
                      </pre>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="text-base sm:text-lg font-semibold flex items-center gap-2">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm">
                      3
                    </span>
                    Using GTM Variables (optional)
                  </h3>
                  <p className="ml-8 text-xs sm:text-sm text-muted-foreground mb-2">
                    For dynamic content management, create variables in GTM:
                  </p>
                  <div className="ml-8 space-y-2">
                    <div className="text-xs sm:text-sm">
                      <strong>Creating a variable:</strong> Variables → New → Variable Type → Constant
                    </div>
                    <div className="bg-muted rounded-lg p-3 sm:p-4 overflow-x-auto">
                      <pre className="text-xs">
                        <code>{`<!-- Example using GTM variables -->
<script 
  src="https://js-popup-sales.pages.dev/js-popup-sales.js"
  data-js-popup-sales
  data-trigger="{{PopupTrigger}}"
  data-delay="{{PopupDelay}}"
  data-title="{{PopupTitle}}"
  data-subtitle="{{PopupSubtitle}}"
  data-cta-text="{{PopupCTA}}"
  data-cta-url="{{PopupURL}}"
  data-theme="{{PopupTheme}}"
></script>`}</code>
                      </pre>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      This allows quick settings changes without editing the tag code
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="text-base sm:text-lg font-semibold flex items-center gap-2">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm">
                      4
                    </span>
                    Setting Up Triggers
                  </h3>
                  <div className="ml-8 space-y-3">
                    <div className="text-xs sm:text-sm">
                      <p className="mb-2">Trigger options:</p>
                      <ul className="space-y-1 list-disc list-inside">
                        <li>
                          <strong>All Pages</strong> — widget on all pages
                        </li>
                        <li>
                          <strong>Page View</strong> with condition — only on specific pages
                        </li>
                        <li>
                          <strong>Custom Event</strong> — launch on event
                        </li>
                      </ul>
                    </div>
                    <div className="bg-muted rounded-lg p-3 sm:p-4">
                      <p className="text-xs sm:text-sm font-semibold mb-2">Example: Launch only on homepage:</p>
                      <ul className="text-xs space-y-1">
                        <li>Trigger Type: Page View</li>
                        <li>Fires on: Some Page Views</li>
                        <li>
                          Condition: <code>Page Path</code> equals <code>/</code>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="text-base sm:text-lg font-semibold flex items-center gap-2">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm">
                      5
                    </span>
                    Testing
                  </h3>
                  <div className="ml-8 space-y-2 text-xs sm:text-sm">
                    <p>
                      Use GTM <strong>Preview</strong> mode:
                    </p>
                    <ol className="list-decimal list-inside space-y-1">
                      <li>Click "Preview" in GTM</li>
                      <li>Open website in new tab</li>
                      <li>Check Debug panel for tag firing</li>
                      <li>Verify popup appears with correct parameters</li>
                    </ol>
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="text-base sm:text-lg font-semibold flex items-center gap-2">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm">
                      6
                    </span>
                    Publishing
                  </h3>
                  <div className="ml-8 space-y-2 text-xs sm:text-sm text-muted-foreground">
                    <p>After successful testing:</p>
                    <ol className="list-decimal list-inside space-y-1">
                      <li>Click "Submit" in GTM</li>
                      <li>Add version name and description</li>
                      <li>Click "Publish"</li>
                    </ol>
                    <p className="text-xs mt-2">
                      <strong>Note:</strong> Changes are live after publishing!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Troubleshooting */}
          <Card className="p-4 sm:p-6 mt-6 lg:mt-8">
            <h2 className="text-xl sm:text-2xl font-bold mb-4">🔧 Troubleshooting</h2>
            <div className="space-y-4">
              <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                <h3 className="font-semibold mb-2 text-sm sm:text-base">Popup doesn't appear?</h3>
                <ul className="text-xs sm:text-sm text-muted-foreground space-y-1 list-disc list-inside">
                  <li>Check browser console for errors</li>
                  <li>
                    Enable <code>debug: true</code> to see detailed logs
                  </li>
                  <li>
                    Reset dismiss: <code>localStorage.removeItem('js_popup_sales_dismissed')</code>
                  </li>
                  <li>Verify script URL is accessible (no 404)</li>
                  <li>Check if ad blockers are interfering</li>
                </ul>
              </div>

              <div className="p-3 bg-orange-500/10 border border-orange-500/20 rounded-lg">
                <h3 className="font-semibold mb-2 text-sm sm:text-base">Styles look wrong?</h3>
                <ul className="text-xs sm:text-sm text-muted-foreground space-y-1 list-disc list-inside">
                  <li>Widget uses Shadow DOM — external CSS cannot affect it</li>
                  <li>
                    Check if <code>inheritFont: true</code> is causing font issues
                  </li>
                  <li>Verify custom colors are valid CSS colors (HEX, RGB, HSL)</li>
                </ul>
              </div>

              <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                <h3 className="font-semibold mb-2 text-sm sm:text-base">GTM not working?</h3>
                <ul className="text-xs sm:text-sm text-muted-foreground space-y-1 list-disc list-inside">
                  <li>
                    Data-* attributes <strong>don't work</strong> in GTM — use <code>window.JSPopupSalesConfig</code>
                  </li>
                  <li>Ensure script loads AFTER config is set</li>
                  <li>Use GTM Preview mode to debug tag firing</li>
                  <li>Check if tag trigger conditions are met</li>
                </ul>
              </div>
            </div>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default JsPopupSaleDemo;
