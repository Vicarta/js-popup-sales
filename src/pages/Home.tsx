import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { AuditWizard } from '@/components/AuditWizard';
import { FAQ } from '@/components/FAQ';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTranslation } from '@/lib/i18n';
import { Mail, Shield, Zap } from 'lucide-react';
const Home = () => {
  const {
    language
  } = useLanguage();
  const t = useTranslation(language);
  return <div className="min-h-screen flex flex-col">
      <Navigation />
      
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight whitespace-pre-line">
            {t.hero.headline}
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            {t.hero.subheadline}
          </p>
          <a href="#audit-wizard">
            <Button size="lg" className="text-lg px-8 py-6 h-auto">
              {t.hero.cta}
            </Button>
          </a>
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
              <h3 className="text-xl font-semibold mb-3">{t.howItWorks.step1.title}</h3>
              <p className="text-muted-foreground">{t.howItWorks.step1.description}</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{t.howItWorks.step2.title}</h3>
              <p className="text-muted-foreground">{t.howItWorks.step2.description}</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{t.howItWorks.step3.title}</h3>
              <p className="text-muted-foreground">{t.howItWorks.step3.description}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Audit Wizard Section */}
      <section id="audit-wizard" className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">
            {t.auditSection.title}
          </h2>
          <AuditWizard />
        </div>
      </section>

      {/* Why it is important Section */}
      <section className="py-20 px-4 bg-card">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl font-bold text-center mb-12">
            {t.whyImportant.title}
          </h2>
          <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
            {t.whyImportant.content.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
          </div>
          <div className="text-center mt-12">
            <a href="/pricing">
              <Button size="lg" className="text-lg px-8 py-6 h-auto">
                {t.whyImportant.cta}
              </Button>
            </a>
          </div>
        </div>
      </section>

      <FAQ />

      <Footer />
    </div>;
};
export default Home;