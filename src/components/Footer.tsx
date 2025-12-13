import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="bg-card border-t border-border py-6 sm:py-8 mt-12 sm:mt-16 md:mt-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col space-y-4">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-3 md:space-y-0">
            <div className="text-muted-foreground text-xs sm:text-sm">
              © 2025 AIbizMate. All rights reserved.
            </div>
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
              <Link
                to="/terms"
                className="text-muted-foreground hover:text-foreground text-sm transition-colors"
              >
                Terms of Use
              </Link>
              <a
                href="https://github.com/Vicarta/js-popup-sale/issues"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground text-sm transition-colors"
              >
                Support
              </a>
              <Link
                to="/about"
                className="text-muted-foreground hover:text-foreground text-sm transition-colors"
              >
                About
              </Link>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0 pt-3 border-t border-border/50">
            <a
              href="https://github.com/Vicarta/js-popup-sale/blob/main/LICENSE"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground text-xs transition-colors"
            >
              Released under the Modified MIT License
            </a>
            <p className="text-muted-foreground text-xs text-center md:text-right">
              This demo is provided "as is" for testing purposes only. No cookies collected.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
