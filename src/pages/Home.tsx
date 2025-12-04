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
      <section className="py-16 sm:py-24 md:py-32 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 pointer-events-none"></div>
        <div className="container mx-auto text-center max-w-5xl relative z-10 px-2 sm:px-4">
          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-4 sm:mb-6 md:mb-8 leading-tight gradient-text">
            {t.hero.headline}
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground mb-6 sm:mb-8 md:mb-12 max-w-3xl mx-auto leading-relaxed px-2">
            {t.hero.subheadline}
          </p>
          <a href="#audit-wizard">
            <Button size="lg" className="text-sm sm:text-base md:text-lg px-6 sm:px-8 md:px-12 py-4 sm:py-5 md:py-7 h-auto shadow-2xl hover:shadow-primary/25 transition-all duration-300 hover:scale-105">
              {t.hero.cta}
            </Button>
          </a>
        </div>
      </section>

      {/* How it works section */}
      <section id="how-it-works" className="py-16 sm:py-24 md:py-32 px-4 relative">
        <div className="container mx-auto max-w-7xl">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-10 sm:mb-14 md:mb-20 gradient-text">
            {t.nav.howItWorks}
          </h2>
          <div className="grid md:grid-cols-3 gap-6 sm:gap-8 lg:gap-12">
            <div className="glass-card rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 text-center hover:scale-105 transition-all duration-300 hover:shadow-2xl">
              <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-gradient-to-br from-primary to-accent rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-lg">
                <Mail className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 text-white" />
              </div>
              <h3 className="text-lg sm:text-xl md:text-2xl font-semibold mb-3 sm:mb-4">{t.howItWorks.step1.title}</h3>
              <p className="text-muted-foreground text-sm sm:text-base md:text-lg leading-relaxed">{t.howItWorks.step1.description}</p>
            </div>
            <div className="glass-card rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 text-center hover:scale-105 transition-all duration-300 hover:shadow-2xl">
              <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-gradient-to-br from-accent to-primary rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-lg">
                <Zap className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 text-white" />
              </div>
              <h3 className="text-lg sm:text-xl md:text-2xl font-semibold mb-3 sm:mb-4">{t.howItWorks.step2.title}</h3>
              <p className="text-muted-foreground text-sm sm:text-base md:text-lg leading-relaxed">{t.howItWorks.step2.description}</p>
            </div>
            <div className="glass-card rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 text-center hover:scale-105 transition-all duration-300 hover:shadow-2xl">
              <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-gradient-to-br from-primary via-accent to-primary rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-lg">
                <Shield className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 text-white" />
              </div>
              <h3 className="text-lg sm:text-xl md:text-2xl font-semibold mb-3 sm:mb-4">{t.howItWorks.step3.title}</h3>
              <p className="text-muted-foreground text-sm sm:text-base md:text-lg leading-relaxed">{t.howItWorks.step3.description}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Audit Wizard Section */}
      <section id="audit-wizard" className="py-16 sm:py-24 md:py-32 px-4 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-primary/5 pointer-events-none"></div>
        <div className="container mx-auto relative z-10">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-8 sm:mb-12 md:mb-16 gradient-text">
            {t.auditSection.title}
          </h2>
          <AuditWizard />
        </div>
      </section>

      {/* Why it is important Section */}
      <section className="py-16 sm:py-24 md:py-32 px-4 relative">
        <div className="container mx-auto max-w-5xl">
          <div className="glass-card rounded-2xl sm:rounded-3xl p-6 sm:p-10 md:p-12 lg:p-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-8 sm:mb-12 md:mb-16 gradient-text">
              {t.whyImportant.title}
            </h2>
            <div className="space-y-4 sm:space-y-6 md:space-y-8 text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground leading-relaxed">
              {t.whyImportant.content.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
            </div>
            <div className="text-center mt-8 sm:mt-12 md:mt-16">
              <a href="/pricing">
                <Button size="lg" className="text-sm sm:text-base md:text-lg px-6 sm:px-8 md:px-12 py-4 sm:py-5 md:py-7 h-auto shadow-xl hover:shadow-accent/25 transition-all duration-300 hover:scale-105 whitespace-normal">
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