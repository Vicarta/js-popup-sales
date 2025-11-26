import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTranslation } from '@/lib/i18n';
import { Check } from 'lucide-react';
import { useState } from 'react';

const Pricing = () => {
  const { language } = useLanguage();
  const t = useTranslation(language);
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);

  const toggleAddon = (addon: string) => {
    setSelectedAddons((prev) =>
      prev.includes(addon) ? prev.filter((a) => a !== addon) : [...prev, addon]
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold mb-4">{t.pricing.title}</h1>
            <p className="text-xl text-muted-foreground">{t.pricing.subtitle}</p>
          </div>

          {/* Main Pricing Tiers */}
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-20">
            {/* Tier 1 */}
            <Card className="p-8 hover:shadow-lg transition-shadow">
              <div className="mb-6">
                <h3 className="text-2xl font-bold mb-2">{t.pricing.tier1.name}</h3>
                <div className="text-4xl font-bold text-primary mb-2">
                  {t.pricing.tier1.price}
                  <span className="text-lg text-muted-foreground">{t.pricing.monthly}</span>
                </div>
                <p className="text-muted-foreground">{t.pricing.tier1.description}</p>
              </div>
              <ul className="space-y-3 mb-8">
                {t.pricing.tier1.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Button className="w-full">{t.pricing.selectPlan}</Button>
            </Card>

            {/* Tier 2 - Featured */}
            <Card className="p-8 border-2 border-primary shadow-lg relative">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-semibold">
                Popular
              </div>
              <div className="mb-6">
                <h3 className="text-2xl font-bold mb-2">{t.pricing.tier2.name}</h3>
                <div className="text-4xl font-bold text-primary mb-2">
                  {t.pricing.tier2.price}
                  <span className="text-lg text-muted-foreground">{t.pricing.monthly}</span>
                </div>
                <p className="text-muted-foreground">{t.pricing.tier2.description}</p>
              </div>
              <ul className="space-y-3 mb-8">
                {t.pricing.tier2.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Button className="w-full">{t.pricing.selectPlan}</Button>
            </Card>

            {/* Tier 3 */}
            <Card className="p-8 hover:shadow-lg transition-shadow bg-muted/30">
              <div className="mb-6">
                <h3 className="text-2xl font-bold mb-2">{t.pricing.tier3.name}</h3>
                <div className="text-4xl font-bold text-primary mb-2">
                  {t.pricing.tier3.price}
                </div>
                <p className="text-muted-foreground">{t.pricing.tier3.description}</p>
              </div>
              <ul className="space-y-3 mb-8">
                {t.pricing.tier3.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Button variant="secondary" className="w-full">{t.pricing.contactSales}</Button>
            </Card>
          </div>

          {/* Add-ons Section */}
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">{t.pricing.addons.title}</h2>
              <p className="text-xl text-muted-foreground">{t.pricing.addons.subtitle}</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {/* Viber Addon */}
              <Card
                className={`p-6 cursor-pointer transition-all ${
                  selectedAddons.includes('viber')
                    ? 'border-2 border-primary shadow-md'
                    : 'hover:shadow-md'
                }`}
                onClick={() => toggleAddon('viber')}
              >
                <div className="flex items-start gap-3 mb-4">
                  <Checkbox
                    checked={selectedAddons.includes('viber')}
                    onCheckedChange={() => toggleAddon('viber')}
                  />
                  <div>
                    <h3 className="text-xl font-semibold mb-1">
                      {t.pricing.addons.viber.name}
                    </h3>
                    <div className="text-2xl font-bold text-primary mb-2">
                      {t.pricing.addons.viber.price}
                    </div>
                  </div>
                </div>
                <p className="text-muted-foreground">{t.pricing.addons.viber.description}</p>
              </Card>

              {/* SMS Addon */}
              <Card
                className={`p-6 cursor-pointer transition-all ${
                  selectedAddons.includes('sms')
                    ? 'border-2 border-primary shadow-md'
                    : 'hover:shadow-md'
                }`}
                onClick={() => toggleAddon('sms')}
              >
                <div className="flex items-start gap-3 mb-4">
                  <Checkbox
                    checked={selectedAddons.includes('sms')}
                    onCheckedChange={() => toggleAddon('sms')}
                  />
                  <div>
                    <h3 className="text-xl font-semibold mb-1">
                      {t.pricing.addons.sms.name}
                    </h3>
                    <div className="text-2xl font-bold text-primary mb-2">
                      {t.pricing.addons.sms.price}
                    </div>
                  </div>
                </div>
                <p className="text-muted-foreground">{t.pricing.addons.sms.description}</p>
              </Card>

              {/* Voice Addon */}
              <Card
                className={`p-6 cursor-pointer transition-all ${
                  selectedAddons.includes('voice')
                    ? 'border-2 border-primary shadow-md'
                    : 'hover:shadow-md'
                }`}
                onClick={() => toggleAddon('voice')}
              >
                <div className="flex items-start gap-3 mb-4">
                  <Checkbox
                    checked={selectedAddons.includes('voice')}
                    onCheckedChange={() => toggleAddon('voice')}
                  />
                  <div>
                    <h3 className="text-xl font-semibold mb-1">
                      {t.pricing.addons.voice.name}
                    </h3>
                    <div className="text-2xl font-bold text-primary mb-2">
                      {t.pricing.addons.voice.price}
                    </div>
                  </div>
                </div>
                <p className="text-muted-foreground">{t.pricing.addons.voice.description}</p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Pricing;
