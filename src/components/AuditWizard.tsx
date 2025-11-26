import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTranslation } from '@/lib/i18n';
import { ArrowRight, ArrowLeft, Mail, Loader2, CheckCircle2, ExternalLink } from 'lucide-react';

export const AuditWizard = () => {
  const { language } = useLanguage();
  const t = useTranslation(language);
  const [currentStep, setCurrentStep] = useState(1);
  const [dealValue, setDealValue] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [foundLeads] = useState(12);
  const [missedRevenue, setMissedRevenue] = useState(0);

  const handleNextStep = () => {
    if (currentStep === 1 && dealValue) {
      const revenue = parseInt(dealValue) * foundLeads;
      setMissedRevenue(revenue);
    }
    if (currentStep === 3) {
      setIsScanning(true);
      setTimeout(() => {
        setIsScanning(false);
        setCurrentStep(4);
      }, 3000);
    } else if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      {/* Progress indicator */}
      <div className="flex justify-center mb-8">
        <div className="flex space-x-2">
          {[1, 2, 3, 4, 5].map((step) => (
            <div
              key={step}
              className={`w-10 h-2 rounded-full transition-all ${
                step <= currentStep ? 'bg-primary' : 'bg-muted'
              }`}
            />
          ))}
        </div>
      </div>

      <Card className="p-8 bg-card shadow-lg">
        {/* Step 1: Deal Value */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl font-bold mb-2">{t.wizard.step1Title}</h2>
              <p className="text-muted-foreground">
                This helps us calculate your potential missed revenue
              </p>
            </div>
            <div className="space-y-4">
              <Input
                type="number"
                placeholder={t.wizard.step1Placeholder}
                value={dealValue}
                onChange={(e) => setDealValue(e.target.value)}
                className="text-lg h-12"
              />
              <Button
                onClick={handleNextStep}
                disabled={!dealValue}
                className="w-full h-12 text-lg"
              >
                {t.wizard.nextStep} <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
          </div>
        )}

        {/* Step 2: Connect Inbox */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl font-bold mb-2">{t.wizard.step2Title}</h2>
              <p className="text-muted-foreground">
                Connect your email to start the audit
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <Card className="p-6 hover:shadow-md transition-shadow cursor-pointer border-2 hover:border-primary">
                <div className="flex items-center gap-4">
                  <Mail className="w-8 h-8 text-primary" />
                  <div>
                    <h3 className="font-semibold mb-1">Gmail</h3>
                    <a
                      href="#"
                      target="_blank"
                      className="text-sm text-primary flex items-center gap-1"
                    >
                      {t.wizard.step2Gmail} <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </Card>
              <Card className="p-6 hover:shadow-md transition-shadow cursor-pointer border-2 hover:border-primary">
                <div className="flex items-center gap-4">
                  <Mail className="w-8 h-8 text-primary" />
                  <div>
                    <h3 className="font-semibold mb-1">Outlook</h3>
                    <a
                      href="#"
                      target="_blank"
                      className="text-sm text-primary flex items-center gap-1"
                    >
                      {t.wizard.step2Outlook} <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </Card>
            </div>
            <div className="flex gap-4">
              <Button onClick={handlePreviousStep} variant="outline" className="flex-1 h-12">
                <ArrowLeft className="mr-2 w-5 h-5" /> {t.wizard.previousStep}
              </Button>
              <Button onClick={handleNextStep} className="flex-1 h-12">
                {t.wizard.nextStep} <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: Scanning */}
        {currentStep === 3 && (
          <div className="space-y-6 text-center py-8">
            <div>
              <h2 className="text-3xl font-bold mb-2">{t.wizard.step3Title}</h2>
              <p className="text-muted-foreground">{t.wizard.step3Scanning}</p>
            </div>
            {isScanning ? (
              <div className="flex justify-center py-12">
                <Loader2 className="w-16 h-16 text-primary animate-spin" />
              </div>
            ) : (
              <Button onClick={handleNextStep} className="w-full h-12">
                {t.wizard.nextStep} <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            )}
          </div>
        )}

        {/* Step 4: Results */}
        {currentStep === 4 && (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-2">{t.wizard.step4Title}</h2>
              <CheckCircle2 className="w-16 h-16 text-accent mx-auto mb-6" />
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="p-6 bg-accent/10 border-accent">
                <div className="text-center">
                  <div className="text-5xl font-bold text-accent mb-2">{foundLeads}</div>
                  <p className="text-muted-foreground">{t.wizard.step4Found}</p>
                </div>
              </Card>
              <Card className="p-6 bg-destructive/10 border-destructive">
                <div className="text-center">
                  <div className="text-5xl font-bold text-destructive mb-2">
                    ${missedRevenue.toLocaleString()}
                  </div>
                  <p className="text-muted-foreground">{t.wizard.step4Loss}</p>
                </div>
              </Card>
            </div>
            <div className="flex gap-4">
              <Button onClick={handlePreviousStep} variant="outline" className="flex-1 h-12">
                <ArrowLeft className="mr-2 w-5 h-5" /> {t.wizard.previousStep}
              </Button>
              <Button onClick={handleNextStep} className="flex-1 h-12">
                {t.wizard.nextStep} <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
          </div>
        )}

        {/* Step 5: CTA */}
        {currentStep === 5 && (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-2">{t.wizard.step5Title}</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <Card className="p-6 hover:shadow-lg transition-shadow border-2 hover:border-primary cursor-pointer">
                <div className="text-center space-y-4">
                  <div className="text-3xl font-bold text-primary">$19</div>
                  <p className="text-muted-foreground">{t.wizard.step5Report}</p>
                  <Button className="w-full">
                    {t.wizard.step5Report}
                  </Button>
                </div>
              </Card>
              <Card className="p-6 hover:shadow-lg transition-shadow border-2 border-primary cursor-pointer bg-primary/5">
                <div className="text-center space-y-4">
                  <div className="text-3xl font-bold text-primary">Full Protection</div>
                  <p className="text-muted-foreground">{t.wizard.step5Protection}</p>
                  <Button className="w-full">
                    {t.wizard.step5Protection}
                  </Button>
                </div>
              </Card>
            </div>
            <Button onClick={handlePreviousStep} variant="outline" className="w-full h-12">
              <ArrowLeft className="mr-2 w-5 h-5" /> {t.wizard.previousStep}
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
};
