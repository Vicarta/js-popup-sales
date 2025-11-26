import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTranslation } from '@/lib/i18n';
import { ArrowRight, ArrowLeft, Mail, Loader2, CheckCircle2, ExternalLink } from 'lucide-react';

export const AuditWizard = () => {
  const { language } = useLanguage();
  const t = useTranslation(language);
  const [currentStep, setCurrentStep] = useState(1);
  const [dealValue, setDealValue] = useState('');
  const [email, setEmail] = useState('');
  const [appPassword, setAppPassword] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [foundLeads] = useState(12);
  const [missedRevenue, setMissedRevenue] = useState(0);
  const [selectedEmail, setSelectedEmail] = useState<number | null>(null);

  const emailProviders = [
    { name: 'Gmail', url: 'https://support.google.com/accounts/answer/185833' },
    { name: 'Outlook', url: 'https://support.microsoft.com/account-billing/using-app-passwords-with-apps-that-don-t-support-two-step-verification-5896ed9b-4263-e681-128a-a6f2979a7944' },
    { name: 'Yahoo', url: 'https://help.yahoo.com/kb/generate-manage-third-party-passwords-sln15241.html' },
    { name: 'Hotmail', url: 'https://support.microsoft.com/account-billing/using-app-passwords-with-apps-that-don-t-support-two-step-verification-5896ed9b-4263-e681-128a-a6f2979a7944' },
    { name: 'AOL', url: 'https://help.aol.com/articles/Create-and-manage-app-password' },
    { name: 'Other', url: '#' },
  ];

  const mockEmails = Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    from: `lead${i + 1}@potential-client.com`,
    subject: `Business inquiry ${i + 1} - Partnership opportunity`,
    date: new Date(2025, 10, 20 - i).toLocaleDateString(),
    preview: 'Hi, I came across your services and I am interested in discussing a potential partnership...',
    fullText: `Hi, I came across your services and I am interested in discussing a potential partnership. We are a growing company looking for solutions in your area of expertise. Could we schedule a call to discuss this further? Looking forward to hearing from you. Best regards, Potential Client ${i + 1}`,
  }));

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
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {emailProviders.map((provider) => (
                <Card key={provider.name} className="p-4 hover:shadow-md transition-shadow border-2 hover:border-primary">
                  <div className="flex flex-col items-center gap-2 text-center">
                    <Mail className="w-6 h-6 text-primary" />
                    <h3 className="font-semibold text-sm">{provider.name}</h3>
                    {provider.url !== '#' && (
                      <a
                        href={provider.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-primary flex items-center gap-1 hover:underline"
                      >
                        {t.wizard[`step2${provider.name}` as keyof typeof t.wizard]} <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </Card>
              ))}
            </div>

            <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
              <p className="text-sm font-semibold text-destructive">{t.wizard.step2Warning}</p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">{t.wizard.step2EmailLabel}</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder={t.wizard.step2EmailPlaceholder}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="appPassword">{t.wizard.step2PasswordLabel}</Label>
                <Input
                  id="appPassword"
                  type="password"
                  placeholder={t.wizard.step2PasswordPlaceholder}
                  value={appPassword}
                  onChange={(e) => setAppPassword(e.target.value)}
                  className="h-12"
                />
              </div>
            </div>

            <div className="flex gap-4">
              <Button onClick={handlePreviousStep} variant="outline" className="flex-1 h-12">
                <ArrowLeft className="mr-2 w-5 h-5" /> {t.wizard.previousStep}
              </Button>
              <Button onClick={handleNextStep} disabled={!email || !appPassword} className="flex-1 h-12">
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
              <div className="space-y-4">
                <Button onClick={handleNextStep} className="w-full h-12 text-lg">
                  {t.wizard.step3SeeResults} <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Button onClick={handlePreviousStep} variant="outline" className="w-full h-12">
                  <ArrowLeft className="mr-2 w-5 h-5" /> {t.wizard.previousStep}
                </Button>
              </div>
            )}
          </div>
        )}

        {/* Step 4: Results */}
        {currentStep === 4 && (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-2">{t.wizard.step4Title}</h2>
              <p className="text-muted-foreground mb-4">{t.wizard.step4Scanned}</p>
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

            <div className="space-y-4">
              <h3 className="text-xl font-semibold">{t.wizard.step4EmailPreview}</h3>
              <div className="grid md:grid-cols-2 gap-3 max-h-[500px] overflow-y-auto pr-2">
                {mockEmails.map((email) => (
                  <Card 
                    key={email.id} 
                    className="p-4 hover:shadow-md transition-shadow cursor-pointer border hover:border-primary"
                    onClick={() => setSelectedEmail(email.id)}
                  >
                    <div className="space-y-2">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <p className="text-xs text-muted-foreground">{t.wizard.step4EmailFrom}</p>
                          <p className="text-sm font-semibold truncate">{email.from}</p>
                        </div>
                        <span className="text-xs text-muted-foreground whitespace-nowrap">{email.date}</span>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">{t.wizard.step4EmailSubject}</p>
                        <p className="text-sm font-medium line-clamp-1">{email.subject}</p>
                      </div>
                      <p className="text-xs text-muted-foreground line-clamp-2">{email.preview}</p>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            <div className="bg-accent/10 border border-accent/20 rounded-lg p-6">
              <p className="text-sm leading-relaxed">{t.wizard.step4BottomText}</p>
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

      {/* Email Detail Dialog */}
      <Dialog open={selectedEmail !== null} onOpenChange={() => setSelectedEmail(null)}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{t.wizard.step4ViewFull}</DialogTitle>
          </DialogHeader>
          {selectedEmail && mockEmails[selectedEmail - 1] && (
            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">{t.wizard.step4EmailFrom}</p>
                <p className="font-semibold">{mockEmails[selectedEmail - 1].from}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{t.wizard.step4EmailSubject}</p>
                <p className="font-semibold">{mockEmails[selectedEmail - 1].subject}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{t.wizard.step4EmailDate}</p>
                <p>{mockEmails[selectedEmail - 1].date}</p>
              </div>
              <div className="pt-4 border-t">
                <p className="text-sm leading-relaxed">{mockEmails[selectedEmail - 1].fullText}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};
