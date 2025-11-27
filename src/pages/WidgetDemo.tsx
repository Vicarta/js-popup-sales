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

const WidgetDemo = () => {
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
    inheritFont: 'false',
  });

  const generateCode = () => {
    const featuresArray = config.features.split('\n').filter(f => f.trim());
    const featuresJson = JSON.stringify(featuresArray);
    
    return `<!-- AIbizMate Popup Widget -->
<script 
  src="https://yourdomain.com/widget.js"
  data-trigger="${config.trigger}"
  data-delay="${config.delay}"
  data-scroll-percent="${config.scrollPercent}"
  data-dismiss-days="${config.dismissDays}"
  data-title="${config.title}"
  data-subtitle="${config.subtitle}"
  data-features='${featuresJson}'
  data-cta-text="${config.ctaText}"
  data-cta-url="${config.ctaUrl}"${config.image ? `\n  data-image="${config.image}"` : ''}
  data-theme="${config.theme}"
  data-position="${config.position}"
  data-inherit-font="${config.inheritFont}"
></script>`;
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
    const existing = document.getElementById('aibizmate-popup-widget');
    if (existing) existing.remove();
    
    // Import and show widget
    import('@/widget/popup-widget').then(({ PopupWidget }) => {
      const widget = new PopupWidget({
        trigger: 'manual',
        dismissDays: parseInt(config.dismissDays),
        title: config.title,
        subtitle: config.subtitle,
        features: config.features.split('\n').filter(f => f.trim()),
        ctaText: config.ctaText,
        ctaUrl: config.ctaUrl,
        image: config.image || undefined,
        theme: config.theme as 'light' | 'dark',
        position: config.position as 'center' | 'bottom-right',
        inheritFont: config.inheritFont === 'true',
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
            <h1 className="text-4xl font-bold mb-4">Popup Widget Configurator</h1>
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
              </div>

              <Button onClick={handlePreview} className="w-full" size="lg">
                <Eye className="w-4 h-4 mr-2" />
                Попередній перегляд
              </Button>
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
                <div>
                  <h3 className="font-semibold mb-2">Збірка віджету</h3>
                  <div className="bg-muted rounded p-3">
                    <code className="text-sm">npm run build:widget</code>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    Віджет буде зібраний в папку <code>dist-widget/widget.js</code>
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Markdown підтримка</h3>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li><code>**text**</code> — жирний текст</li>
                    <li><code>_text_</code> — курсив</li>
                    <li><code>[text](url)</code> — посилання</li>
                    <li>Emoji підтримуються нативно 🚀✨🎉</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Програмне керування</h3>
                  <div className="bg-muted rounded p-3 space-y-2">
                    <div><code className="text-sm">AIbizMatePopup.show()</code></div>
                    <div><code className="text-sm">AIbizMatePopup.hide()</code></div>
                    <div><code className="text-sm">AIbizMatePopup.dismiss()</code></div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default WidgetDemo;
