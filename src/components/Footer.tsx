import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTranslation } from '@/lib/i18n';

export const Footer = () => {
  const { language } = useLanguage();
  const t = useTranslation(language);

  return (
    <footer className="bg-card border-t border-border py-8 mt-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-muted-foreground text-sm">
            © 2025 AIbizMate. All rights reserved.
          </div>
          <div className="flex space-x-6">
            <Link
              to="/terms"
              className="text-muted-foreground hover:text-foreground text-sm transition-colors"
            >
              {t.footer.terms}
            </Link>
            <Link
              to="/privacy"
              className="text-muted-foreground hover:text-foreground text-sm transition-colors"
            >
              {t.footer.privacy}
            </Link>
            <Link
              to="/support"
              className="text-muted-foreground hover:text-foreground text-sm transition-colors"
            >
              {t.footer.support}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
