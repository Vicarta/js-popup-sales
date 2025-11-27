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
      <section className="py-32 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 pointer-events-none"></div>
        <div className="container mx-auto text-center max-w-5xl relative z-10">
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight whitespace-pre-line gradient-text">
            {t.hero.headline}
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
            {t.hero.subheadline}
          </p>
          <a href="#audit-wizard">
            <Button size="lg" className="text-lg px-12 py-7 h-auto shadow-2xl hover:shadow-primary/25 transition-all duration-300 hover:scale-105">
              {t.hero.cta}
            </Button>
          </a>
        </div>
      </section>

      {/* How it works section */}
      <section id="how-it-works" className="py-32 px-4 relative">
        <div className="container mx-auto max-w-7xl">
          <h2 className="text-5xl md:text-6xl font-bold text-center mb-20 gradient-text">
            {t.nav.howItWorks}
          </h2>
          <div className="grid md:grid-cols-3 gap-10 lg:gap-12">
            <div className="glass-card rounded-3xl p-10 text-center hover:scale-105 transition-all duration-300 hover:shadow-2xl">
              <div className="w-20 h-20 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Mail className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">{t.howItWorks.step1.title}</h3>
              <p className="text-muted-foreground text-lg leading-relaxed">{t.howItWorks.step1.description}</p>
            </div>
            <div className="glass-card rounded-3xl p-10 text-center hover:scale-105 transition-all duration-300 hover:shadow-2xl">
              <div className="w-20 h-20 bg-gradient-to-br from-accent to-primary rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Zap className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">{t.howItWorks.step2.title}</h3>
              <p className="text-muted-foreground text-lg leading-relaxed">{t.howItWorks.step2.description}</p>
            </div>
            <div className="glass-card rounded-3xl p-10 text-center hover:scale-105 transition-all duration-300 hover:shadow-2xl">
              <div className="w-20 h-20 bg-gradient-to-br from-primary via-accent to-primary rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Shield className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">{t.howItWorks.step3.title}</h3>
              <p className="text-muted-foreground text-lg leading-relaxed">{t.howItWorks.step3.description}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Audit Wizard Section */}
      <section id="audit-wizard" className="py-32 px-4 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-primary/5 pointer-events-none"></div>
        <div className="container mx-auto relative z-10">
          <h2 className="text-5xl md:text-6xl font-bold text-center mb-16 gradient-text">
            {t.auditSection.title}
          </h2>
          <AuditWizard />
        </div>
      </section>

      {/* Why it is important Section */}
      <section className="py-32 px-4 relative">
        <div className="container mx-auto max-w-5xl">
          <div className="glass-card rounded-3xl p-12 md:p-16">
            <h2 className="text-5xl md:text-6xl font-bold text-center mb-16 gradient-text">
              {t.whyImportant.title}
            </h2>
            <div className="space-y-8 text-lg md:text-xl text-muted-foreground leading-relaxed">
              {t.whyImportant.content.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
            </div>
            <div className="text-center mt-16">
              <a href="/pricing">
                <Button size="lg" className="text-lg px-12 py-7 h-auto shadow-xl hover:shadow-accent/25 transition-all duration-300 hover:scale-105">
                  {t.whyImportant.cta}
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      <FAQ />

      <Footer />
    </div>;
};
export default Home;