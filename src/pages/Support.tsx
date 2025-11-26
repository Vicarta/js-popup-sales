import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTranslation } from '@/lib/i18n';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Clock, MessageSquare, CreditCard, Lightbulb, Calendar } from 'lucide-react';

const Support = () => {
  const { language } = useLanguage();
  const t = useTranslation(language);

  const icons = [Mail, MessageSquare, MessageSquare, CreditCard, Lightbulb, Clock];

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-1 py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <h1 className="text-5xl font-bold text-center mb-4">{t.support.title}</h1>
          <p className="text-center text-xl text-muted-foreground mb-16">{t.support.subtitle}</p>
          
          <div className="grid md:grid-cols-2 gap-6">
            {Object.values(t.support.sections).map((section: any, index) => {
              const Icon = icons[index];
              return (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <Icon className="w-6 h-6 text-primary" />
                      <CardTitle className="text-xl">{section.title}</CardTitle>
                    </div>
                    {section.email && (
                      <CardDescription className="text-base font-medium">{section.email}</CardDescription>
                    )}
                    {section.response && (
                      <CardDescription className="text-base">{section.response}</CardDescription>
                    )}
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">{section.description}</p>
                    {section.weekend && (
                      <p className="text-muted-foreground leading-relaxed mt-2">{section.weekend}</p>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Support;
