import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTranslation } from '@/lib/i18n';

const Privacy = () => {
  const { language } = useLanguage();
  const t = useTranslation(language);

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-1 py-12 sm:py-16 md:py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-3 sm:mb-4">{t.privacy.title}</h1>
          <p className="text-center text-sm sm:text-base text-muted-foreground mb-8 sm:mb-12">{t.privacy.lastUpdated}</p>
          
          <div className="space-y-6 sm:space-y-8">
            {Object.values(t.privacy.sections).map((section, index) => (
              <section key={index} className="space-y-2 sm:space-y-3">
                <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-foreground">{section.title}</h2>
                <p className="text-sm sm:text-base md:text-lg leading-relaxed text-muted-foreground">{section.content}</p>
              </section>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Privacy;
