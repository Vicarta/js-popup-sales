import { useState } from 'react';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Copy, Check, Eye } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const JsPopupSaleDemo = () => {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  
  const [config, setConfig] = useState({
    trigger: 'delay',
    delay: '3000',
    scrollPercent: '50',
    dismissDays: '7',
    title: "Don't lose customers! 🚀",
    subtitle: '**AIbizMate** helps you find _missed leads_ in your inbox',
    features: '✅ Automatic scanning\n🤖 AI-powered analysis\n📧 Instant notifications',
    ctaText: 'Try for free',
    ctaUrl: 'https://aibizmate.com',
    image: '',
    theme: 'light',
    position: 'center',
    layout: 'vertical',
    inheritFont: 'false',
    primaryColor: '#f97316',
    backgroundColor: '',
    textColor: '',
    buttonRadius: '10',
    contentAlign: 'left',
    // GTM tracking
    enableTracking: false,
    popupId: 'js_popup_sale',
  });

  const generateCode = () => {
    const featuresArray = config.features.split('\n').filter(f => f.trim());
    
    // Generate config for window.JSPopupSaleConfig (for GTM)
    const configObj: any = {
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
      inheritFont: config.inheritFont === 'true',
    };
    
    if (config.image) configObj.image = config.image;
    if (config.primaryColor) configObj.primaryColor = config.primaryColor;
    if (config.backgroundColor) configObj.backgroundColor = config.backgroundColor;
    if (config.textColor) configObj.textColor = config.textColor;
    configObj.buttonRadius = parseInt(config.buttonRadius);
    configObj.contentAlign = config.contentAlign;
    
    // GTM tracking parameters
    if (config.enableTracking) {
      configObj.enableTracking = true;
      configObj.popupId = config.popupId;
    }
    
    // Format JSON for readability
    const configJson = JSON.stringify(configObj, null, 2)
      .split('\n')
      .map((line, i) => i === 0 ? line : '  ' + line)
      .join('\n');
    
    // Generate code with window.JSPopupSaleConfig (recommended method for GTM)
    let code = `<!-- JS Popup Sale - GTM Recommended Method -->
<script>
  window.JSPopupSaleConfig = ${configJson};
</script>
<script src="https://yourdomain.com/js-popup-sale.js"></script>`;
    
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
    const existing = document.getElementById('js-popup-sale-container');
    if (existing) existing.remove();
    
    // Import and show widget
    import('@/js-popup-sale/popup-sale').then(({ JSPopupSale }) => {
      const widget = new JSPopupSale({
        trigger: 'manual',
        dismissDays: parseInt(config.dismissDays),
        title: config.title,
        subtitle: config.subtitle,
        features: config.features.split('\n').filter(f => f.trim()),
        ctaText: config.ctaText,
        ctaUrl: config.ctaUrl,
        image: config.image || undefined,
        theme: config.theme as 'light' | 'dark',
        position: config.position as 'center' | 'top-left' | 'top-center' | 'top-right' | 'center-left' | 'center-right' | 'bottom-left' | 'bottom-center' | 'bottom-right',
        layout: config.layout as 'vertical' | 'horizontal',
        inheritFont: config.inheritFont === 'true',
        primaryColor: config.primaryColor || undefined,
        backgroundColor: config.backgroundColor || undefined,
        textColor: config.textColor || undefined,
        buttonRadius: parseInt(config.buttonRadius),
        contentAlign: config.contentAlign as 'left' | 'center' | 'right',
        enableTracking: config.enableTracking,
        popupId: config.popupId,
      });
      widget.init();
      widget.show();
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-24">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">JS Popup Sale Configurator</h1>
            <p className="text-muted-foreground text-lg">
              Configure widget parameters and get the code to embed on your website
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Configuration */}
            <Card className="p-6 space-y-6">
              <div>
                <h2 className="text-xl font-semibold mb-4">Configuration</h2>
              </div>

              <div className="space-y-4">
                <div>
                  <Label>Display Trigger</Label>
                  <Select value={config.trigger} onValueChange={(v) => setConfig({...config, trigger: v})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="delay">Delay</SelectItem>
                      <SelectItem value="scroll">Scroll</SelectItem>
                      <SelectItem value="exit-intent">Exit Intent</SelectItem>
                      <SelectItem value="manual">Manual</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {config.trigger === 'delay' && (
                  <div>
                    <Label>Delay (ms)</Label>
                    <Input 
                      type="number" 
                      value={config.delay}
                      onChange={(e) => setConfig({...config, delay: e.target.value})}
                    />
                  </div>
                )}

                {config.trigger === 'scroll' && (
                  <div>
                    <Label>Page Scroll (%)</Label>
                    <Input 
                      type="number" 
                      value={config.scrollPercent}
                      onChange={(e) => setConfig({...config, scrollPercent: e.target.value})}
                    />
                  </div>
                )}

                <div>
                  <Label>Hide after dismiss (days)</Label>
                  <Input 
                    type="number" 
                    value={config.dismissDays}
                    onChange={(e) => setConfig({...config, dismissDays: e.target.value})}
                  />
                  <p className="text-xs text-muted-foreground mt-1">0 = always show</p>
                </div>

                <div>
                  <Label>Title (supports markdown and emoji)</Label>
                  <Input 
                    value={config.title}
                    onChange={(e) => setConfig({...config, title: e.target.value})}
                    placeholder="**Bold** _italic_ and emoji 🚀"
                  />
                </div>

                <div>
                  <Label>Subtitle</Label>
                  <Textarea 
                    value={config.subtitle}
                    onChange={(e) => setConfig({...config, subtitle: e.target.value})}
                    rows={2}
                  />
                </div>

                <div>
                  <Label>Features (one per line)</Label>
                  <Textarea 
                    value={config.features}
                    onChange={(e) => setConfig({...config, features: e.target.value})}
                    rows={4}
                  />
                </div>

                <div>
                  <Label>Button Text</Label>
                  <Input 
                    value={config.ctaText}
                    onChange={(e) => setConfig({...config, ctaText: e.target.value})}
                  />
                </div>

                <div>
                  <Label>Button URL</Label>
                  <Input 
                    value={config.ctaUrl}
                    onChange={(e) => setConfig({...config, ctaUrl: e.target.value})}
                  />
                </div>

                <div>
                  <Label>Image URL (optional)</Label>
                  <Input 
                    value={config.image}
                    onChange={(e) => setConfig({...config, image: e.target.value})}
                    placeholder="https://..."
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    {config.layout === 'vertical' 
                      ? 'Horizontal image (480×200 px, 2.4:1)' 
                      : 'Vertical image (150×350 px, 1:2.3)'}
                  </p>
                </div>

                <div>
                  <Label>Layout</Label>
                  <Select value={config.layout} onValueChange={(v) => setConfig({...config, layout: v})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="vertical">Vertical (image on top)</SelectItem>
                      <SelectItem value="horizontal">Horizontal (image on left)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Theme</Label>
                    <Select value={config.theme} onValueChange={(v) => setConfig({...config, theme: v})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="light">Light</SelectItem>
                        <SelectItem value="dark">Dark</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Position</Label>
                    <Select value={config.position} onValueChange={(v) => setConfig({...config, position: v})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="center">Center</SelectItem>
                        <SelectItem value="top-left">Top Left</SelectItem>
                        <SelectItem value="top-center">Top Center</SelectItem>
                        <SelectItem value="top-right">Top Right</SelectItem>
                        <SelectItem value="center-left">Center Left</SelectItem>
                        <SelectItem value="center-right">Center Right</SelectItem>
                        <SelectItem value="bottom-left">Bottom Left</SelectItem>
                        <SelectItem value="bottom-center">Bottom Center</SelectItem>
                        <SelectItem value="bottom-right">Bottom Right</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label>Use Website Font</Label>
                  <Select value={config.inheritFont} onValueChange={(v) => setConfig({...config, inheritFont: v})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="false">No (Inter)</SelectItem>
                      <SelectItem value="true">Yes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Button Color (HEX)</Label>
                  <Input 
                    value={config.primaryColor}
                    onChange={(e) => setConfig({...config, primaryColor: e.target.value})}
                    placeholder="#f97316"
                  />
                </div>

                <div>
                  <Label>Background Color (HEX, optional)</Label>
                  <Input 
                    value={config.backgroundColor}
                    onChange={(e) => setConfig({...config, backgroundColor: e.target.value})}
                    placeholder="#ffffff"
                  />
                </div>

                <div>
                  <Label>Text Color (HEX, optional)</Label>
                  <Input 
                    value={config.textColor}
                    onChange={(e) => setConfig({...config, textColor: e.target.value})}
                    placeholder="#000000"
                  />
                </div>

                <div>
                  <Label>Button Radius (px)</Label>
                  <Input 
                    type="number" 
                    value={config.buttonRadius}
                    onChange={(e) => setConfig({...config, buttonRadius: e.target.value})}
                    placeholder="10"
                  />
                </div>

                <div>
                  <Label>Content Alignment</Label>
                  <Select value={config.contentAlign} onValueChange={(v) => setConfig({...config, contentAlign: v})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="left">Left</SelectItem>
                      <SelectItem value="center">Center</SelectItem>
                      <SelectItem value="right">Right</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* GTM Tracking Section */}
                <div className="pt-4 border-t">
                  <h3 className="font-semibold mb-3">GTM Tracking</h3>
                  
                  <div className="flex items-center space-x-2 mb-3">
                    <Checkbox 
                      id="enableTracking"
                      checked={config.enableTracking}
                      onCheckedChange={(checked) => setConfig({...config, enableTracking: checked as boolean})}
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
                        onChange={(e) => setConfig({...config, popupId: e.target.value})}
                        placeholder="js_popup_sale"
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
                    localStorage.removeItem('js_popup_sale_dismissed');
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
            <Card className="p-6">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-xl font-semibold">Generated Code</h2>
                <Button 
                  onClick={handleCopy}
                  variant="outline"
                  size="sm"
                >
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

              <div className="bg-muted rounded-lg p-4 overflow-x-auto">
                <pre className="text-sm">
                  <code>{generateCode()}</code>
                </pre>
              </div>

              <div className="mt-6 space-y-4">
                <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
                  <h3 className="font-semibold mb-2 flex items-center gap-2">
                    📦 Building the Widget
                  </h3>
                  <div className="bg-background rounded p-3 mb-2">
                    <code className="text-sm font-mono">npm run build:popup-sale</code>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    First, add this script to <code>package.json</code>:
                  </p>
                  <div className="bg-background rounded p-3 mt-2 mb-2">
                    <code className="text-xs font-mono">
                      "build:popup-sale": "vite build --config vite.js-popup-sale.config.ts"
                    </code>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Output: <code className="font-mono">dist-js-popup-sale/js-popup-sale.js</code>
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Markdown Support</h3>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li><code>**text**</code> — bold text</li>
                    <li><code>_text_</code> — italic</li>
                    <li><code>~~text~~</code> — strikethrough</li>
                    <li><code>[text](url)</code> — link</li>
                    <li>Emoji supported natively 🚀✨🎉</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Programmatic Control</h3>
                  <div className="bg-muted rounded p-3 space-y-2">
                    <div className="text-xs font-medium text-muted-foreground mb-1">Via global functions (recommended):</div>
                    <div><code className="text-sm">showJSPopupSale()</code> — show popup</div>
                    <div><code className="text-sm">hideJSPopupSale()</code> — hide popup</div>
                    <div><code className="text-sm">dismissJSPopupSale()</code> — dismiss forever</div>
                    <div className="text-xs font-medium text-muted-foreground mt-3 mb-1">Via instance (if autoInit worked):</div>
                    <div><code className="text-sm">jsPopupSaleInstance.show()</code></div>
                    <div><code className="text-sm">jsPopupSaleInstance.hide()</code></div>
                    <div className="text-xs text-muted-foreground mt-2">Or create new: <code>new JSPopupSale(config).init()</code></div>
                  </div>
                </div>

                {/* dataLayer Events Documentation */}
                <div className="p-4 bg-purple-500/10 border border-purple-500/20 rounded-lg">
                  <h3 className="font-semibold mb-2 flex items-center gap-2">
                    📊 dataLayer Events
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    When tracking is enabled, the following events are pushed to <code className="bg-muted px-1 py-0.5 rounded">window.dataLayer</code>:
                  </p>
                  <div className="space-y-3 text-sm">
                    <div className="bg-background rounded p-2">
                      <code className="text-green-600 font-semibold">js_popup_sale_shown</code>
                      <p className="text-xs text-muted-foreground mt-1">Fired when popup is displayed</p>
                    </div>
                    <div className="bg-background rounded p-2">
                      <code className="text-blue-600 font-semibold">js_popup_sale_primary_click</code>
                      <p className="text-xs text-muted-foreground mt-1">Fired when user clicks the CTA button</p>
                    </div>
                    <div className="bg-background rounded p-2">
                      <code className="text-orange-600 font-semibold">js_popup_sale_closed</code>
                      <p className="text-xs text-muted-foreground mt-1">
                        Fired when popup is closed. Includes <code className="bg-muted px-1 rounded">close_type</code>: 
                        <span className="ml-1">"cross" (X button) or "outside" (click outside)</span>
                      </p>
                    </div>
                    <div className="bg-background rounded p-2">
                      <code className="text-red-600 font-semibold">js_popup_sale_error</code>
                      <p className="text-xs text-muted-foreground mt-1">
                        Fired on error. Includes <code className="bg-muted px-1 rounded">error_type</code> and <code className="bg-muted px-1 rounded">error_message</code>
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
          <Card className="p-6 mt-8">
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-2">📊 Google Tag Manager Integration</h2>
                <p className="text-muted-foreground">
                  Detailed instructions for setting up the widget via GTM for dynamic management without changing website code
                </p>
              </div>

              <div className="space-y-6">
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm">1</span>
                    Creating a Tag in GTM
                  </h3>
                  <ol className="space-y-2 ml-8 text-sm">
                    <li className="flex gap-2">
                      <span className="text-muted-foreground">1.1</span>
                      <span>Open your container in Google Tag Manager</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-muted-foreground">1.2</span>
                      <span>Go to <strong>Tags</strong> → <strong>New</strong></span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-muted-foreground">1.3</span>
                      <span>Name the tag, e.g.: <code className="bg-muted px-2 py-0.5 rounded">"JS Popup Sale Widget"</code></span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-muted-foreground">1.4</span>
                      <span>Select tag type: <strong>Custom HTML</strong></span>
                    </li>
                  </ol>
                </div>

                <div className="space-y-3">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm">2</span>
                    Setting Up HTML Code
                  </h3>
                  <div className="ml-8 space-y-3">
                    <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                      <p className="text-sm font-semibold mb-2">✅ Recommended method for GTM (used in generated code above):</p>
                      <p className="text-xs text-muted-foreground mb-2">Use <code className="bg-muted px-1 py-0.5 rounded">window.JSPopupSaleConfig</code> - this ensures all parameters are passed correctly:</p>
                      <pre className="text-xs bg-muted rounded p-2 overflow-x-auto"><code>{`<script>
  window.JSPopupSaleConfig = {
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
    primaryColor: "#f97316",
    enableTracking: true,
    popupId: "my_promo_popup"
  };
</script>
<script src="https://yourdomain.com/js-popup-sale.js"></script>`}</code></pre>
                    </div>
                    
                    <div className="p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                      <p className="text-sm font-semibold mb-2">⚠️ Why data-* attributes don't work in GTM?</p>
                      <p className="text-xs text-muted-foreground mb-2">GTM dynamically creates <code className="bg-muted px-1 py-0.5 rounded">&lt;script&gt;</code> elements and <strong>ignores all data-* attributes</strong>. Therefore, using <code className="bg-muted px-1 py-0.5 rounded">window.JSPopupSaleConfig</code> is the only reliable way for GTM.</p>
                    </div>
                    
                    <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                      <p className="text-sm font-semibold mb-2">💡 Alternative method (for direct embedding only, NOT for GTM):</p>
                      <p className="text-xs text-muted-foreground mb-2">If you're embedding code directly in your website HTML (not via GTM), you can use data-* attributes:</p>
                      <pre className="text-xs bg-muted rounded p-2 overflow-x-auto"><code>{`<script 
  src="https://yourdomain.com/js-popup-sale.js"
  data-js-popup-sale
  data-trigger="delay"
  data-image="https://example.com/image.png"
  data-title="Title"
  data-enable-tracking="true"
  data-popup-id="my_popup"
></script>`}</code></pre>
                      <p className="text-xs text-muted-foreground mt-2"><strong>But this will NOT work in GTM!</strong> Use window.JSPopupSaleConfig instead.</p>
                    </div>
                    <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                      <p className="text-sm"><strong>💡 Programmatic call via GTM:</strong></p>
                      <p className="text-sm mt-1">If you need to show the popup on click or event, add a Custom HTML tag in GTM:</p>
                      <pre className="text-xs bg-muted rounded p-2 mt-2 overflow-x-auto"><code>{`<script>
  // Show popup
  if (typeof showJSPopupSale === 'function') {
    showJSPopupSale();
  }
</script>`}</code></pre>
                      <p className="text-xs text-muted-foreground mt-2">Or create new with custom config:</p>
                      <pre className="text-xs bg-muted rounded p-2 mt-1 overflow-x-auto"><code>{`<script>
  if (typeof showJSPopupSale === 'function') {
    showJSPopupSale({
      title: 'Special offer!',
      ctaUrl: 'https://example.com/special'
    });
  }
</script>`}</code></pre>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm">3</span>
                    Using GTM Variables (optional)
                  </h3>
                  <p className="ml-8 text-sm text-muted-foreground mb-2">
                    For dynamic content management, create variables in GTM:
                  </p>
                  <div className="ml-8 space-y-2">
                    <div className="text-sm">
                      <strong>Creating a variable:</strong> Variables → New → Variable Type → Constant
                    </div>
                    <div className="bg-muted rounded-lg p-4 overflow-x-auto">
                      <pre className="text-xs">
                        <code>{`<!-- Example using GTM variables -->
<script 
  src="https://yourdomain.com/js-popup-sale.js"
  data-js-popup-sale
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
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm">4</span>
                    Setting Up Triggers
                  </h3>
                  <p className="ml-8 text-sm text-muted-foreground mb-2">
                    Choose widget display conditions:
                  </p>
                  <div className="ml-8 space-y-3">
                    <div className="space-y-2">
                      <div className="flex items-start gap-2">
                        <div className="w-2 h-2 rounded-full bg-primary mt-1.5"></div>
                        <div className="flex-1">
                          <strong className="text-sm">All pages:</strong>
                          <p className="text-xs text-muted-foreground">Trigger Type: <code className="bg-muted px-1 py-0.5 rounded">All Pages</code></p>
                          <p className="text-xs text-muted-foreground mt-1">Widget will load on every page</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-2">
                        <div className="w-2 h-2 rounded-full bg-primary mt-1.5"></div>
                        <div className="flex-1">
                          <strong className="text-sm">Specific pages:</strong>
                          <p className="text-xs text-muted-foreground">Trigger Type: <code className="bg-muted px-1 py-0.5 rounded">Page View</code></p>
                          <p className="text-xs text-muted-foreground mt-1">Add condition: <code className="bg-muted px-1 py-0.5 rounded">Page URL contains /checkout</code></p>
                          <p className="text-xs text-muted-foreground mt-1">Show only on checkout pages</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-2">
                        <div className="w-2 h-2 rounded-full bg-primary mt-1.5"></div>
                        <div className="flex-1">
                          <strong className="text-sm">With delay:</strong>
                          <p className="text-xs text-muted-foreground">Trigger Type: <code className="bg-muted px-1 py-0.5 rounded">Timer</code></p>
                          <p className="text-xs text-muted-foreground mt-1">Interval: 5000ms, Limit: 1</p>
                          <p className="text-xs text-muted-foreground mt-1">Show 5 seconds after page load</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-2">
                        <div className="w-2 h-2 rounded-full bg-primary mt-1.5"></div>
                        <div className="flex-1">
                          <strong className="text-sm">On scroll:</strong>
                          <p className="text-xs text-muted-foreground">Trigger Type: <code className="bg-muted px-1 py-0.5 rounded">Scroll Depth</code></p>
                          <p className="text-xs text-muted-foreground mt-1">Vertical Scroll Depth: 50%</p>
                          <p className="text-xs text-muted-foreground mt-1">Show after scrolling 50% of the page</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm">5</span>
                    Setting Up dataLayer Event Triggers in GA4
                  </h3>
                  <p className="ml-8 text-sm text-muted-foreground mb-2">
                    To track popup events in Google Analytics 4, create these triggers in GTM:
                  </p>
                  <div className="ml-8 space-y-3">
                    <div className="p-3 bg-purple-500/10 border border-purple-500/20 rounded-lg">
                      <p className="text-sm font-semibold mb-2">Step 1: Create Custom Event Triggers</p>
                      <ol className="text-xs space-y-1 text-muted-foreground">
                        <li>1. Go to <strong>Triggers</strong> → <strong>New</strong></li>
                        <li>2. Choose <strong>Custom Event</strong></li>
                        <li>3. Event name: <code className="bg-muted px-1 rounded">js_popup_sale_shown</code> (or other event name)</li>
                        <li>4. Save and repeat for each event you want to track</li>
                      </ol>
                    </div>
                    <div className="p-3 bg-purple-500/10 border border-purple-500/20 rounded-lg">
                      <p className="text-sm font-semibold mb-2">Step 2: Create GA4 Event Tag</p>
                      <ol className="text-xs space-y-1 text-muted-foreground">
                        <li>1. Go to <strong>Tags</strong> → <strong>New</strong></li>
                        <li>2. Choose <strong>Google Analytics: GA4 Event</strong></li>
                        <li>3. Add event parameters: <code className="bg-muted px-1 rounded">popup_id</code>, <code className="bg-muted px-1 rounded">close_type</code></li>
                        <li>4. Link to your Custom Event trigger</li>
                      </ol>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm">6</span>
                    Testing and Publishing
                  </h3>
                  <ol className="space-y-2 ml-8 text-sm">
                    <li className="flex gap-2">
                      <span className="text-muted-foreground">6.1</span>
                      <span>Save the tag: <strong>Save</strong></span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-muted-foreground">6.2</span>
                      <span>Enable preview mode: <strong>Preview</strong> in the top right corner</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-muted-foreground">6.3</span>
                      <span>Open your website in a new tab and test the widget</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-muted-foreground">6.4</span>
                      <span>In the GTM Debug window, verify the tag fired (<code className="bg-muted px-1 py-0.5 rounded text-xs">Tags Fired</code>)</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-muted-foreground">6.5</span>
                      <span>Check browser console for <code className="bg-muted px-1 py-0.5 rounded text-xs">[JS Popup Sale] Tracked:</code> messages</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-muted-foreground">6.6</span>
                      <span>If everything works: <strong>Submit</strong> → <strong>Publish</strong></span>
                    </li>
                  </ol>
                </div>

                <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                  <h3 className="font-semibold mb-2 flex items-center gap-2">
                    ✅ GTM Approach Benefits
                  </h3>
                  <ul className="text-sm space-y-1 ml-4">
                    <li>• <strong>No code changes</strong> — manage widget via GTM interface</li>
                    <li>• <strong>A/B testing</strong> — easily create multiple versions with different settings</li>
                    <li>• <strong>Audience segmentation</strong> — show different content to different users</li>
                    <li>• <strong>Quick updates</strong> — change text and settings without code releases</li>
                    <li>• <strong>Version history</strong> — GTM saves all changes with rollback capability</li>
                    <li>• <strong>Built-in analytics</strong> — track popup events directly in GA4</li>
                  </ul>
                </div>

                <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                  <h3 className="font-semibold mb-2 flex items-center gap-2">
                    💡 Configuration Tips
                  </h3>
                  <ul className="text-sm space-y-2 ml-4">
                    <li>• Use <code className="bg-muted px-1 py-0.5 rounded text-xs">dismissDays: 0</code> during testing so the popup always shows</li>
                    <li>• For production, set an optimal value (7-14 days) to avoid annoying users</li>
                    <li>• Enable <code className="bg-muted px-1 py-0.5 rounded text-xs">enableTracking: true</code> to track popup performance</li>
                    <li>• Use unique <code className="bg-muted px-1 py-0.5 rounded text-xs">popupId</code> for each popup variant in A/B tests</li>
                    <li>• Test the widget on different devices (desktop, mobile, tablets)</li>
                    <li>• Create a backup of your GTM container before publishing changes</li>
                  </ul>
                </div>

                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                  <h3 className="font-semibold mb-2 flex items-center gap-2">
                    ⚠️ Troubleshooting
                  </h3>
                  <ul className="text-sm space-y-2 ml-4">
                    <li>• <strong>🔍 Configuration check:</strong> Open browser console and look for <code className="bg-muted px-1 py-0.5 rounded text-xs">[JS Popup Sale] Found config via window.JSPopupSaleConfig</code> or <code className="bg-muted px-1 py-0.5 rounded text-xs">[JS Popup Sale] Initializing with config:</code> — this shows if config was loaded</li>
                    <li>• <strong>📊 Tracking check:</strong> Look for <code className="bg-muted px-1 py-0.5 rounded text-xs">[JS Popup Sale] Tracked:</code> messages in console to verify events are firing</li>
                    <li>• <strong>🖼️ Image not showing:</strong> Make sure the <code className="bg-muted px-1 py-0.5 rounded text-xs">image</code> parameter is present in <code className="bg-muted px-1 py-0.5 rounded text-xs">window.JSPopupSaleConfig</code> and URL is correct (HTTPS)</li>
                    <li>• <strong>❌ Config not applied:</strong> For GTM, <strong>you must use window.JSPopupSaleConfig</strong>, not data-* attributes - GTM ignores data-* attributes!</li>
                    <li>• <strong>📝 JSON error:</strong> Check JSON syntax in window.JSPopupSaleConfig - use double quotes for keys and string values</li>
                    <li>• <strong>🔒 CSP blocking:</strong> Add widget domain to Content Security Policy settings</li>
                    <li>• <strong>🎯 Trigger not firing:</strong> Check trigger conditions in GTM Debug mode and verify tag is in "Tags Fired" list</li>
                  </ul>
                </div>

                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                  <h3 className="font-semibold mb-2 flex items-center gap-2">
                    ⚠️ Common Errors and Solutions
                  </h3>
                  <ul className="text-sm space-y-3 ml-4">
                    <li>
                      <div className="font-medium">❌ <code className="bg-muted px-1 py-0.5 rounded text-xs">Uncaught TypeError: window.JSPopupSale.show is not a function</code></div>
                      <div className="text-muted-foreground mt-1">
                        <strong>Cause:</strong> Attempting to call method on class instead of instance<br/>
                        <strong>Solution:</strong> Use <code className="bg-muted px-1 py-0.5 rounded text-xs">showJSPopupSale()</code> instead of <code className="bg-muted px-1 py-0.5 rounded text-xs">window.JSPopupSale.show()</code>
                      </div>
                    </li>
                    <li>
                      <div className="font-medium">❌ Popup not showing automatically</div>
                      <div className="text-muted-foreground mt-1">
                        <strong>Diagnostics:</strong>
                        <ol className="ml-4 mt-1 space-y-1">
                          <li>1. Open browser console (F12)</li>
                          <li>2. Look for <code className="bg-muted px-1 py-0.5 rounded text-xs">[JS Popup Sale] Initializing with config:</code></li>
                          <li>3. If no log or config is empty — data attributes were not loaded</li>
                        </ol>
                        <strong className="block mt-2">Solution:</strong>
                        <ul className="ml-4 mt-1">
                          <li>• <strong>MUST add</strong> the <code className="bg-muted px-1 py-0.5 rounded text-xs">data-js-popup-sale</code> attribute to the &lt;script&gt; tag</li>
                          <li>• Ensure all data attributes (data-trigger, data-title, data-cta-text, data-cta-url) are present</li>
                          <li>• If popup was dismissed — clear localStorage or set <code className="bg-muted px-1 py-0.5 rounded text-xs">dismissDays: 0</code></li>
                          <li>• Wrong trigger — check <code className="bg-muted px-1 py-0.5 rounded text-xs">trigger</code> and related parameters</li>
                          <li>• Script not loaded — check URL in Developer Tools → Network</li>
                        </ul>
                      </div>
                    </li>
                    <li>
                      <div className="font-medium">❌ Image not displaying in popup</div>
                      <div className="text-muted-foreground mt-1">
                        <strong>Causes:</strong>
                        <ul className="ml-4 mt-1">
                          <li>• Missing <code className="bg-muted px-1 py-0.5 rounded text-xs">image</code> parameter — add it to config</li>
                          <li>• Invalid image URL or image unavailable (404)</li>
                          <li>• CORS error — check if image is accessible from your domain</li>
                          <li>• Config not loaded (see console log)</li>
                        </ul>
                        <strong className="block mt-2">Solution:</strong>
                        <ul className="ml-4 mt-1">
                          <li>• Add <code className="bg-muted px-1 py-0.5 rounded text-xs">image: "https://yoursite.com/image.png"</code> to config</li>
                          <li>• Test image URL in browser — it should open</li>
                          <li>• Use HTTPS URL for image</li>
                        </ul>
                      </div>
                    </li>
                    <li>
                      <div className="font-medium">❌ Popup showing multiple times</div>
                      <div className="text-muted-foreground mt-1">
                        <strong>Cause:</strong> Duplicate tags in GTM or on page<br/>
                        <strong>Solution:</strong> Ensure tag is included only once
                      </div>
                    </li>
                    <li>
                      <div className="font-medium">❌ dataLayer events not appearing</div>
                      <div className="text-muted-foreground mt-1">
                        <strong>Cause:</strong> Tracking is disabled<br/>
                        <strong>Solution:</strong> Add <code className="bg-muted px-1 py-0.5 rounded text-xs">enableTracking: true</code> to your config
                      </div>
                    </li>
                    <li>
                      <div className="font-medium">💡 <strong>Console verification:</strong></div>
                      <div className="bg-muted rounded p-2 mt-1 font-mono text-xs">
                        <div>// Check function availability:</div>
                        <div className="text-green-600">console.log(typeof showJSPopupSale); // "function"</div>
                        <div className="text-green-600">console.log(typeof JSPopupSale); // "function"</div>
                        <div className="mt-2">// Check dataLayer:</div>
                        <div className="text-blue-600">console.log(window.dataLayer);</div>
                        <div className="mt-2">// Show popup manually:</div>
                        <div className="text-blue-600">showJSPopupSale();</div>
                      </div>
                    </li>
                  </ul>
                </div>
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
