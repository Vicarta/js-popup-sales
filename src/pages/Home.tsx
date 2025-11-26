import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { AuditWizard } from '@/components/AuditWizard';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTranslation } from '@/lib/i18n';
import { Mail, Shield, Zap } from 'lucide-react';

const Home = () => {
  const { language } = useLanguage();
  const t = useTranslation(language);

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            {t.hero.headline}
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            {t.hero.subheadline}
          </p>
          <Button size="lg" className="text-lg px-8 py-6 h-auto">
            {t.hero.cta}
          </Button>
        </div>
      </section>

      {/* How it works section */}
      <section id="how-it-works" className="py-20 px-4 bg-card">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">
            {t.nav.howItWorks}
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Connect Your Inbox</h3>
              <p className="text-muted-foreground">
                Simple setup in minutes. Connect Gmail or Outlook and start monitoring.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">AI Scans Your Email</h3>
              <p className="text-muted-foreground">
                Our AI works 24/7 to identify missed leads in spam and inbox.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Get Instant Alerts</h3>
              <p className="text-muted-foreground">
                Receive notifications via Telegram, Viber, SMS, or even voice calls.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Audit Wizard Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <AuditWizard />
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
