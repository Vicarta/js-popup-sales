import { useState } from 'react';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
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
    title: 'Не втрачайте клієнтів! 🚀',
    subtitle: '**AIbizMate** допоможе знайти _пропущені ліди_ у вашій пошті',
    features: '✅ Автоматичне сканування\n🤖 AI-аналіз листів\n📧 Миттєві сповіщення',
    ctaText: 'Спробувати безкоштовно',
    ctaUrl: 'https://aibizmate.com',
    image: '',
    theme: 'light',
    position: 'center',
    layout: 'vertical',
    inheritFont: 'false',
    primaryColor: '#f97316',
    backgroundColor: '',
    textColor: '',
  });

  const generateCode = () => {
    const featuresArray = config.features.split('\n').filter(f => f.trim());
    
    // Генеруємо конфігурацію для window.JSPopupSaleConfig (для GTM)
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
    
    // Форматуємо JSON для зручного читання
    const configJson = JSON.stringify(configObj, null, 2)
      .split('\n')
      .map((line, i) => i === 0 ? line : '  ' + line)
      .join('\n');
    
    // Генеруємо код з window.JSPopupSaleConfig (рекомендований метод для GTM)
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
      title: "Код скопійовано!",
      description: "Тепер ви можете вставити його на свій сайт",
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
              Налаштуйте параметри віджету та отримайте код для вставки на ваш сайт
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Configuration */}
            <Card className="p-6 space-y-6">
              <div>
                <h2 className="text-xl font-semibold mb-4">Налаштування</h2>
              </div>

              <div className="space-y-4">
                <div>
                  <Label>Тригер показу</Label>
                  <Select value={config.trigger} onValueChange={(v) => setConfig({...config, trigger: v})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="delay">Затримка</SelectItem>
                      <SelectItem value="scroll">Скрол</SelectItem>
                      <SelectItem value="exit-intent">Exit Intent</SelectItem>
                      <SelectItem value="manual">Вручну</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {config.trigger === 'delay' && (
                  <div>
                    <Label>Затримка (мс)</Label>
                    <Input 
                      type="number" 
                      value={config.delay}
                      onChange={(e) => setConfig({...config, delay: e.target.value})}
                    />
                  </div>
                )}

                {config.trigger === 'scroll' && (
                  <div>
                    <Label>Скрол сторінки (%)</Label>
                    <Input 
                      type="number" 
                      value={config.scrollPercent}
                      onChange={(e) => setConfig({...config, scrollPercent: e.target.value})}
                    />
                  </div>
                )}

                <div>
                  <Label>Не показувати після закриття (днів)</Label>
                  <Input 
                    type="number" 
                    value={config.dismissDays}
                    onChange={(e) => setConfig({...config, dismissDays: e.target.value})}
                  />
                  <p className="text-xs text-muted-foreground mt-1">0 = завжди показувати</p>
                </div>

                <div>
                  <Label>Заголовок (підтримує markdown та emoji)</Label>
                  <Input 
                    value={config.title}
                    onChange={(e) => setConfig({...config, title: e.target.value})}
                    placeholder="**Bold** _italic_ та emoji 🚀"
                  />
                </div>

                <div>
                  <Label>Підзаголовок</Label>
                  <Textarea 
                    value={config.subtitle}
                    onChange={(e) => setConfig({...config, subtitle: e.target.value})}
                    rows={2}
                  />
                </div>

                <div>
                  <Label>Переваги (кожна з нового рядка)</Label>
                  <Textarea 
                    value={config.features}
                    onChange={(e) => setConfig({...config, features: e.target.value})}
                    rows={4}
                  />
                </div>

                <div>
                  <Label>Текст кнопки</Label>
                  <Input 
                    value={config.ctaText}
                    onChange={(e) => setConfig({...config, ctaText: e.target.value})}
                  />
                </div>

                <div>
                  <Label>URL кнопки</Label>
                  <Input 
                    value={config.ctaUrl}
                    onChange={(e) => setConfig({...config, ctaUrl: e.target.value})}
                  />
                </div>

                <div>
                  <Label>URL зображення (опціонально)</Label>
                  <Input 
                    value={config.image}
                    onChange={(e) => setConfig({...config, image: e.target.value})}
                    placeholder="https://..."
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    {config.layout === 'vertical' 
                      ? 'Горизонтальне зображення (480×200 px, 2.4:1)' 
                      : 'Вертикальне зображення (150×350 px, 1:2.3)'}
                  </p>
                </div>

                <div>
                  <Label>Лейаут</Label>
                  <Select value={config.layout} onValueChange={(v) => setConfig({...config, layout: v})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="vertical">Вертикальний (зображення зверху)</SelectItem>
                      <SelectItem value="horizontal">Горизонтальний (зображення зліва)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Тема</Label>
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
                    <Label>Позиція</Label>
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
                  <Label>Використовувати шрифт сайту</Label>
                  <Select value={config.inheritFont} onValueChange={(v) => setConfig({...config, inheritFont: v})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="false">Ні (Inter)</SelectItem>
                      <SelectItem value="true">Так</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Колір кнопки (HEX)</Label>
                  <Input 
                    value={config.primaryColor}
                    onChange={(e) => setConfig({...config, primaryColor: e.target.value})}
                    placeholder="#f97316"
                  />
                </div>

                <div>
                  <Label>Колір фону (HEX, опціонально)</Label>
                  <Input 
                    value={config.backgroundColor}
                    onChange={(e) => setConfig({...config, backgroundColor: e.target.value})}
                    placeholder="#ffffff"
                  />
                </div>

                <div>
                  <Label>Колір тексту (HEX, опціонально)</Label>
                  <Input 
                    value={config.textColor}
                    onChange={(e) => setConfig({...config, textColor: e.target.value})}
                    placeholder="#000000"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Button onClick={handlePreview} className="w-full" size="lg">
                  <Eye className="w-4 h-4 mr-2" />
                  Попередній перегляд
                </Button>
                <Button 
                  onClick={() => {
                    localStorage.removeItem('js_popup_sale_dismissed');
                    toast({
                      title: "Dismiss скинуто",
                      description: "Тепер віджет знову буде показуватись",
                    });
                  }}
                  variant="outline"
                  className="w-full"
                  size="lg"
                >
                  Скинути dismiss
                </Button>
              </div>
            </Card>

            {/* Generated Code */}
            <Card className="p-6">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-xl font-semibold">Згенерований код</h2>
                <Button 
                  onClick={handleCopy}
                  variant="outline"
                  size="sm"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 mr-2" />
                      Скопійовано
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 mr-2" />
                      Копіювати
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
                    📦 Збірка віджету
                  </h3>
                  <div className="bg-background rounded p-3 mb-2">
                    <code className="text-sm font-mono">npm run build:popup-sale</code>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Перед цим додайте скрипт у <code>package.json</code>:
                  </p>
                  <div className="bg-background rounded p-3 mt-2 mb-2">
                    <code className="text-xs font-mono">
                      "build:popup-sale": "vite build --config vite.js-popup-sale.config.ts"
                    </code>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Результат: <code className="font-mono">dist-js-popup-sale/js-popup-sale.js</code>
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Markdown підтримка</h3>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li><code>**text**</code> — жирний текст</li>
                    <li><code>_text_</code> — курсив</li>
                    <li><code>~~text~~</code> — закреслений текст</li>
                    <li><code>[text](url)</code> — посилання</li>
                    <li>Emoji підтримуються нативно 🚀✨🎉</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Програмне керування</h3>
                  <div className="bg-muted rounded p-3 space-y-2">
                    <div className="text-xs font-medium text-muted-foreground mb-1">Через глобальні функції (рекомендовано):</div>
                    <div><code className="text-sm">showJSPopupSale()</code> — показати попап</div>
                    <div><code className="text-sm">hideJSPopupSale()</code> — сховати попап</div>
                    <div><code className="text-sm">dismissJSPopupSale()</code> — закрити назавжди</div>
                    <div className="text-xs font-medium text-muted-foreground mt-3 mb-1">Через інстанс (якщо autoInit спрацював):</div>
                    <div><code className="text-sm">jsPopupSaleInstance.show()</code></div>
                    <div><code className="text-sm">jsPopupSaleInstance.hide()</code></div>
                    <div className="text-xs text-muted-foreground mt-2">Або створити новий: <code>new JSPopupSale(config).init()</code></div>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* GTM Instructions */}
          <Card className="p-6 mt-8">
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-2">📊 Підключення через Google Tag Manager</h2>
                <p className="text-muted-foreground">
                  Детальна інструкція з налаштування віджету через GTM для динамічного керування без зміни коду сайту
                </p>
              </div>

              <div className="space-y-6">
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm">1</span>
                    Створення тега в GTM
                  </h3>
                  <ol className="space-y-2 ml-8 text-sm">
                    <li className="flex gap-2">
                      <span className="text-muted-foreground">1.1</span>
                      <span>Відкрийте ваш контейнер у Google Tag Manager</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-muted-foreground">1.2</span>
                      <span>Перейдіть у розділ <strong>Tags</strong> → <strong>New</strong></span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-muted-foreground">1.3</span>
                      <span>Назвіть тег, наприклад: <code className="bg-muted px-2 py-0.5 rounded">"JS Popup Sale Widget"</code></span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-muted-foreground">1.4</span>
                      <span>Оберіть тип тега: <strong>Custom HTML</strong></span>
                    </li>
                  </ol>
                </div>

                <div className="space-y-3">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm">2</span>
                    Налаштування HTML коду
                  </h3>
                  <div className="ml-8 space-y-3">
                    <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                      <p className="text-sm font-semibold mb-2">✅ Рекомендований метод для GTM (використовується у згенерованому коді вище):</p>
                      <p className="text-xs text-muted-foreground mb-2">Використовуйте <code className="bg-muted px-1 py-0.5 rounded">window.JSPopupSaleConfig</code> - це гарантує, що всі параметри передадуться коректно:</p>
                      <pre className="text-xs bg-muted rounded p-2 overflow-x-auto"><code>{`<script>
  window.JSPopupSaleConfig = {
    trigger: "delay",
    delay: 3000,
    dismissDays: 0,
    title: "Не втрачайте клієнтів! 🚀",
    subtitle: "**AIbizMate** допоможе знайти ліди",
    features: ["✅ Перевага 1", "🤖 Перевага 2"],
    ctaText: "Спробувати",
    ctaUrl: "https://example.com",
    image: "https://example.com/image.png",
    theme: "light",
    position: "bottom-left",
    layout: "horizontal",
    inheritFont: false,
    primaryColor: "#f97316"
  };
</script>
<script src="https://yourdomain.com/js-popup-sale.js"></script>`}</code></pre>
                    </div>
                    
                    <div className="p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                      <p className="text-sm font-semibold mb-2">⚠️ Чому data-* атрибути не працюють в GTM?</p>
                      <p className="text-xs text-muted-foreground mb-2">GTM динамічно створює <code className="bg-muted px-1 py-0.5 rounded">&lt;script&gt;</code> елементи і при цьому <strong>ігнорує всі data-* атрибути</strong>. Тому використання <code className="bg-muted px-1 py-0.5 rounded">window.JSPopupSaleConfig</code> є єдиним надійним способом для GTM.</p>
                    </div>
                    
                    <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                      <p className="text-sm font-semibold mb-2">💡 Альтернативний метод (тільки для прямого підключення, НЕ для GTM):</p>
                      <p className="text-xs text-muted-foreground mb-2">Якщо ви вставляєте код безпосередньо в HTML сайту (не через GTM), можете використовувати data-* атрибути:</p>
                      <pre className="text-xs bg-muted rounded p-2 overflow-x-auto"><code>{`<script 
  src="https://yourdomain.com/js-popup-sale.js"
  data-js-popup-sale
  data-trigger="delay"
  data-image="https://example.com/image.png"
  data-title="Заголовок"
></script>`}</code></pre>
                      <p className="text-xs text-muted-foreground mt-2"><strong>Але для GTM це НЕ спрацює!</strong> Використовуйте window.JSPopupSaleConfig.</p>
                    </div>
                    <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                      <p className="text-sm"><strong>💡 Програмний виклик через GTM:</strong></p>
                      <p className="text-sm mt-1">Якщо потрібно показати попап по кліку або події, додайте в GTM Custom HTML тег:</p>
                      <pre className="text-xs bg-muted rounded p-2 mt-2 overflow-x-auto"><code>{`<script>
  // Показати попап
  if (typeof showJSPopupSale === 'function') {
    showJSPopupSale();
  }
</script>`}</code></pre>
                      <p className="text-xs text-muted-foreground mt-2">Або створіть новий з власною конфігурацією:</p>
                      <pre className="text-xs bg-muted rounded p-2 mt-1 overflow-x-auto"><code>{`<script>
  if (typeof showJSPopupSale === 'function') {
    showJSPopupSale({
      title: 'Спеціальна пропозиція!',
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
                    Використання GTM змінних (опціонально)
                  </h3>
                  <p className="ml-8 text-sm text-muted-foreground mb-2">
                    Для динамічного керування контентом створіть змінні в GTM:
                  </p>
                  <div className="ml-8 space-y-2">
                    <div className="text-sm">
                      <strong>Створення змінної:</strong> Variables → New → Variable Type → Constant
                    </div>
                    <div className="bg-muted rounded-lg p-4 overflow-x-auto">
                      <pre className="text-xs">
                        <code>{`<!-- Приклад використання змінних GTM -->
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
                      Це дозволить швидко змінювати налаштування без редагування коду тега
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm">4</span>
                    Налаштування тригера
                  </h3>
                  <p className="ml-8 text-sm text-muted-foreground mb-2">
                    Оберіть умови показу віджету:
                  </p>
                  <div className="ml-8 space-y-3">
                    <div className="space-y-2">
                      <div className="flex items-start gap-2">
                        <div className="w-2 h-2 rounded-full bg-primary mt-1.5"></div>
                        <div className="flex-1">
                          <strong className="text-sm">Всі сторінки:</strong>
                          <p className="text-xs text-muted-foreground">Trigger Type: <code className="bg-muted px-1 py-0.5 rounded">All Pages</code></p>
                          <p className="text-xs text-muted-foreground mt-1">Віджет завантажиться на кожній сторінці сайту</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-2">
                        <div className="w-2 h-2 rounded-full bg-primary mt-1.5"></div>
                        <div className="flex-1">
                          <strong className="text-sm">Конкретні сторінки:</strong>
                          <p className="text-xs text-muted-foreground">Trigger Type: <code className="bg-muted px-1 py-0.5 rounded">Page View</code></p>
                          <p className="text-xs text-muted-foreground mt-1">Додайте умову: <code className="bg-muted px-1 py-0.5 rounded">Page URL contains /checkout</code></p>
                          <p className="text-xs text-muted-foreground mt-1">Показувати тільки на сторінках оформлення замовлення</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-2">
                        <div className="w-2 h-2 rounded-full bg-primary mt-1.5"></div>
                        <div className="flex-1">
                          <strong className="text-sm">З затримкою:</strong>
                          <p className="text-xs text-muted-foreground">Trigger Type: <code className="bg-muted px-1 py-0.5 rounded">Timer</code></p>
                          <p className="text-xs text-muted-foreground mt-1">Interval: 5000ms, Limit: 1</p>
                          <p className="text-xs text-muted-foreground mt-1">Показувати через 5 секунд після завантаження</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-2">
                        <div className="w-2 h-2 rounded-full bg-primary mt-1.5"></div>
                        <div className="flex-1">
                          <strong className="text-sm">За скролом:</strong>
                          <p className="text-xs text-muted-foreground">Trigger Type: <code className="bg-muted px-1 py-0.5 rounded">Scroll Depth</code></p>
                          <p className="text-xs text-muted-foreground mt-1">Vertical Scroll Depth: 50%</p>
                          <p className="text-xs text-muted-foreground mt-1">Показувати після прокрутки 50% сторінки</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm">5</span>
                    Тестування та публікація
                  </h3>
                  <ol className="space-y-2 ml-8 text-sm">
                    <li className="flex gap-2">
                      <span className="text-muted-foreground">5.1</span>
                      <span>Збережіть тег: <strong>Save</strong></span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-muted-foreground">5.2</span>
                      <span>Активуйте режим попереднього перегляду: <strong>Preview</strong> у правому верхньому куті</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-muted-foreground">5.3</span>
                      <span>Відкрийте ваш сайт у новій вкладці та перевірте роботу віджету</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-muted-foreground">5.4</span>
                      <span>У GTM Debug вікні переконайтесь, що тег спрацював (<code className="bg-muted px-1 py-0.5 rounded text-xs">Tags Fired</code>)</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-muted-foreground">5.5</span>
                      <span>Якщо все працює коректно: <strong>Submit</strong> → <strong>Publish</strong></span>
                    </li>
                  </ol>
                </div>

                <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                  <h3 className="font-semibold mb-2 flex items-center gap-2">
                    ✅ Переваги GTM підходу
                  </h3>
                  <ul className="text-sm space-y-1 ml-4">
                    <li>• <strong>Без зміни коду сайту</strong> — керування віджетом через GTM інтерфейс</li>
                    <li>• <strong>A/B тестування</strong> — легко створити кілька версій з різними налаштуваннями</li>
                    <li>• <strong>Сегментація аудиторії</strong> — показувати різний контент різним користувачам</li>
                    <li>• <strong>Швидке оновлення</strong> — зміна тексту та налаштувань без релізу коду</li>
                    <li>• <strong>Історія версій</strong> — GTM зберігає всі зміни з можливістю відкату</li>
                  </ul>
                </div>

                <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                  <h3 className="font-semibold mb-2 flex items-center gap-2">
                    💡 Поради з налаштування
                  </h3>
                  <ul className="text-sm space-y-2 ml-4">
                    <li>• Використовуйте <code className="bg-muted px-1 py-0.5 rounded text-xs">data-dismiss-days="0"</code> під час тестування, щоб попап завжди показувався</li>
                    <li>• Для продакшену встановіть оптимальне значення (7-14 днів) щоб не дратувати користувачів</li>
                    <li>• Тестуйте віджет на різних пристроях (десктоп, мобільні, планшети)</li>
                    <li>• Відстежуйте кліки через GTM Events для аналізу ефективності</li>
                    <li>• Створіть резервну копію контейнера GTM перед публікацією змін</li>
                  </ul>
                </div>

                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                  <h3 className="font-semibold mb-2 flex items-center gap-2">
                    ⚠️ Діагностика проблем
                  </h3>
                  <ul className="text-sm space-y-2 ml-4">
                    <li>• <strong>🔍 Перевірка конфігурації:</strong> Відкрийте консоль браузера та знайдіть лог <code className="bg-muted px-1 py-0.5 rounded text-xs">[JS Popup Sale] Found config via window.JSPopupSaleConfig</code> або <code className="bg-muted px-1 py-0.5 rounded text-xs">[JS Popup Sale] Initializing with config:</code> — він покаже чи підтягнулась конфігурація</li>
                    <li>• <strong>🖼️ Зображення не показується:</strong> Переконайтеся, що параметр <code className="bg-muted px-1 py-0.5 rounded text-xs">image</code> присутній у <code className="bg-muted px-1 py-0.5 rounded text-xs">window.JSPopupSaleConfig</code> і URL коректний (HTTPS)</li>
                    <li>• <strong>❌ Конфігурація не застосовується:</strong> Для GTM <strong>обов'язково використовуйте window.JSPopupSaleConfig</strong>, а не data-* атрибути - GTM ігнорує data-* атрибути!</li>
                    <li>• <strong>📝 Помилка в JSON:</strong> Перевірте синтаксис JSON у window.JSPopupSaleConfig - використовуйте подвійні лапки для ключів та рядкових значень</li>
                    <li>• <strong>🔒 Блокування CSP:</strong> Додайте домен віджету до Content Security Policy налаштувань</li>
                    <li>• <strong>🎯 Тригер не спрацьовує:</strong> Перевірте умови тригера в GTM Debug режимі та переконайтесь що тег у списку "Tags Fired"</li>
                  </ul>
                </div>

                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                  <h3 className="font-semibold mb-2 flex items-center gap-2">
                    ⚠️ Типові помилки та рішення
                  </h3>
                  <ul className="text-sm space-y-3 ml-4">
                    <li>
                      <div className="font-medium">❌ <code className="bg-muted px-1 py-0.5 rounded text-xs">Uncaught TypeError: window.JSPopupSale.show is not a function</code></div>
                      <div className="text-muted-foreground mt-1">
                        <strong>Причина:</strong> Спроба викликати метод на класі замість інстансу<br/>
                        <strong>Рішення:</strong> Використовуйте <code className="bg-muted px-1 py-0.5 rounded text-xs">showJSPopupSale()</code> замість <code className="bg-muted px-1 py-0.5 rounded text-xs">window.JSPopupSale.show()</code>
                      </div>
                    </li>
                    <li>
                      <div className="font-medium">❌ Попап не показується автоматично</div>
                      <div className="text-muted-foreground mt-1">
                        <strong>Діагностика:</strong>
                        <ol className="ml-4 mt-1 space-y-1">
                          <li>1. Відкрийте консоль браузера (F12)</li>
                          <li>2. Шукайте лог <code className="bg-muted px-1 py-0.5 rounded text-xs">[JS Popup Sale] Initializing with config:</code></li>
                          <li>3. Якщо логу немає або конфігурація порожня — data-атрибути не підтягнулись</li>
                        </ol>
                        <strong className="block mt-2">Рішення:</strong>
                        <ul className="ml-4 mt-1">
                          <li>• <strong>ОБОВ'ЯЗКОВО додайте</strong> атрибут <code className="bg-muted px-1 py-0.5 rounded text-xs">data-js-popup-sale</code> до тега &lt;script&gt;</li>
                          <li>• Переконайтесь що всі data-атрибути (data-trigger, data-title, data-cta-text, data-cta-url) присутні в тезі</li>
                          <li>• Якщо попап вже був dismissed — очистіть localStorage або встановіть <code className="bg-muted px-1 py-0.5 rounded text-xs">data-dismiss-days="0"</code></li>
                          <li>• Неправильний тригер — перевірте <code className="bg-muted px-1 py-0.5 rounded text-xs">data-trigger</code> та відповідні параметри</li>
                          <li>• Скрипт не завантажився — перевірте URL у Developer Tools → Network</li>
                        </ul>
                      </div>
                    </li>
                    <li>
                      <div className="font-medium">❌ Зображення не відображається в попапі</div>
                      <div className="text-muted-foreground mt-1">
                        <strong>Причини:</strong>
                        <ul className="ml-4 mt-1">
                          <li>• Відсутній атрибут <code className="bg-muted px-1 py-0.5 rounded text-xs">data-image</code> у script тезі — додайте його</li>
                          <li>• Неправильний URL зображення або зображення недоступне (404)</li>
                          <li>• CORS помилка — перевірте що зображення доступне з вашого домену</li>
                          <li>• Конфігурація не підтягнулась (див. лог в консолі)</li>
                        </ul>
                        <strong className="block mt-2">Рішення:</strong>
                        <ul className="ml-4 mt-1">
                          <li>• Додайте <code className="bg-muted px-1 py-0.5 rounded text-xs">data-image="https://yoursite.com/image.png"</code> до script тега</li>
                          <li>• Перевірте URL зображення в браузері — воно має відкриватись</li>
                          <li>• Використовуйте HTTPS URL для зображення</li>
                        </ul>
                      </div>
                    </li>
                    <li>
                      <div className="font-medium">❌ Попап показується кілька разів</div>
                      <div className="text-muted-foreground mt-1">
                        <strong>Причина:</strong> Дублювання тегів у GTM або на сторінці<br/>
                        <strong>Рішення:</strong> Переконайтесь, що тег підключено лише один раз
                      </div>
                    </li>
                    <li>
                      <div className="font-medium">💡 <strong>Перевірка в консолі:</strong></div>
                      <div className="bg-muted rounded p-2 mt-1 font-mono text-xs">
                        <div>// Перевірити доступність функцій:</div>
                        <div className="text-green-600">console.log(typeof showJSPopupSale); // "function"</div>
                        <div className="text-green-600">console.log(typeof JSPopupSale); // "function"</div>
                        <div className="mt-2">// Показати попап вручну:</div>
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
