import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTranslation } from '@/lib/i18n';
import founderImage from '@/assets/founder-color.jpg';

const About = () => {
  const { language } = useLanguage();
  const t = useTranslation(language);

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <section className="py-12 sm:py-16 md:py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-8 sm:mb-12">{t.about.title}</h1>
          
          {/* Founder Image */}
          <div className="mb-12 flex justify-center">
            <div className="relative w-full max-w-2xl aspect-[16/10] overflow-hidden rounded-lg shadow-xl">
              <img 
                src={founderImage} 
                alt={t.about.founder}
                className="w-full h-full object-cover transition-all duration-500 grayscale hover:grayscale-0"
              />
            </div>
          </div>
          
          <div className="prose prose-lg max-w-none space-y-6">
            {t.about.story.map((paragraph, index) => (
              <p key={index} className="text-lg leading-relaxed text-muted-foreground">
                {paragraph}
              </p>
            ))}
            
            <div className="mt-12 pt-8 border-t border-border">
              <p className="text-xl font-semibold text-foreground">
                {t.about.founder}
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
