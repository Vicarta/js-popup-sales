import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTranslation } from '@/lib/i18n';
import { Menu, X, Globe } from 'lucide-react';

export const Navigation = () => {
  const { language, setLanguage } = useLanguage();
  const t = useTranslation(language);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'uk' : 'en');
  };

  return (
    <nav className="sticky top-0 z-50 bg-card border-b border-border shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-foreground">
            AIbizMate
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/#how-it-works"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              {t.nav.howItWorks}
            </Link>
            <Link
              to="/pricing"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              {t.nav.pricing}
            </Link>
            <Link
              to="/about"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              {t.nav.aboutUs}
            </Link>
            <Link
              to="/support"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              {t.nav.support}
            </Link>
          </div>

          {/* Right side actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleLanguage}
              className="gap-2"
            >
              <Globe className="w-4 h-4" />
              {language === 'en' ? 'EN' : 'UK'}
            </Button>
            <Button variant="ghost" size="sm">
              {t.nav.login}
            </Button>
            <Link to="/#audit-wizard">
              <Button size="sm" className="bg-primary hover:bg-primary/90">
                {t.nav.findLeads}
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-4">
            <Link
              to="/#how-it-works"
              className="block text-muted-foreground hover:text-foreground transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t.nav.howItWorks}
            </Link>
            <Link
              to="/pricing"
              className="block text-muted-foreground hover:text-foreground transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t.nav.pricing}
            </Link>
            <Link
              to="/about"
              className="block text-muted-foreground hover:text-foreground transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t.nav.aboutUs}
            </Link>
            <Link
              to="/support"
              className="block text-muted-foreground hover:text-foreground transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t.nav.support}
            </Link>
            <div className="flex flex-col space-y-2 pt-4 border-t border-border">
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleLanguage}
                className="justify-start gap-2"
              >
                <Globe className="w-4 h-4" />
                {language === 'en' ? 'English' : 'Українська'}
              </Button>
              <Button variant="ghost" size="sm" className="justify-start">
                {t.nav.login}
              </Button>
              <Link to="/#audit-wizard" onClick={() => setMobileMenuOpen(false)}>
                <Button size="sm" className="bg-primary hover:bg-primary/90 w-full">
                  {t.nav.findLeads}
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
