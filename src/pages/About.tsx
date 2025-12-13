import { Footer } from '@/components/Footer';
import { Link } from 'react-router-dom';
import founderImage from '@/assets/founder-color.jpg';

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-border py-4 px-4">
        <div className="container mx-auto">
          <Link to="/" className="text-xl font-bold hover:text-primary transition-colors">
            JS Popup Sale
          </Link>
        </div>
      </header>
      
      <section className="flex-1 py-12 sm:py-16 md:py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-8 sm:mb-12">About</h1>
          
          <div className="mb-12 flex justify-center">
            <div className="relative w-full max-w-2xl aspect-[16/10] overflow-hidden rounded-lg shadow-xl">
              <img 
                src={founderImage} 
                alt="Viktor Karpenko - Creator"
                className="w-full h-full object-cover transition-all duration-500 grayscale hover:grayscale-0"
              />
            </div>
          </div>
          
          <div className="prose prose-lg max-w-none space-y-6">
            <p className="text-lg leading-relaxed text-muted-foreground">
              JS Popup Sale is a lightweight, customizable popup widget designed to help website owners increase conversions without the complexity of heavy marketing tools.
            </p>
            <p className="text-lg leading-relaxed text-muted-foreground">
              Built with simplicity in mind, it requires no dependencies and works seamlessly with any website. Whether you're promoting a product, collecting leads, or announcing a sale — this widget has you covered.
            </p>
            <p className="text-lg leading-relaxed text-muted-foreground">
              The project is open-source and free to use. Contributions and feedback are always welcome on GitHub.
            </p>
            
            <div className="mt-12 pt-8 border-t border-border">
              <p className="text-xl font-semibold text-foreground">
                Viktor Karpenko — Creator
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
