import { useLanguage } from '@/contexts/LanguageContext';
import { useTranslation } from '@/lib/i18n';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const FAQ = () => {
  const { language } = useLanguage();
  const t = useTranslation(language);

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-4xl font-bold text-center mb-12">
          {t.faq.title}
        </h2>
        
        {/* Security & Privacy */}
        <div className="mb-12">
          <h3 className="text-2xl font-semibold mb-6">{t.faq.securityTitle}</h3>
          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="app-password">
              <AccordionTrigger className="text-left">
                {t.faq.security.appPassword.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                <p className="mb-4">{t.faq.security.appPassword.answer}</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>{t.faq.security.appPassword.safer.title}</strong> {t.faq.security.appPassword.safer.text}</li>
                  <li><strong>{t.faq.security.appPassword.limited.title}</strong> {t.faq.security.appPassword.limited.text}</li>
                  <li><strong>{t.faq.security.appPassword.revocable.title}</strong> {t.faq.security.appPassword.revocable.text}</li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="read-emails">
              <AccordionTrigger className="text-left">
                {t.faq.security.readEmails.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {t.faq.security.readEmails.answer}
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="store-emails">
              <AccordionTrigger className="text-left">
                {t.faq.security.storeEmails.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {t.faq.security.storeEmails.answer}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        {/* How It Works */}
        <div className="mb-12">
          <h3 className="text-2xl font-semibold mb-6">{t.faq.howItWorksTitle}</h3>
          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="different-spam">
              <AccordionTrigger className="text-left">
                {t.faq.howItWorks.differentSpam.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                <p className="mb-4">{t.faq.howItWorks.differentSpam.answer1}</p>
                <p>{t.faq.howItWorks.differentSpam.answer2}</p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="2fa">
              <AccordionTrigger className="text-left">
                {t.faq.howItWorks.twoFA.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {t.faq.howItWorks.twoFA.answer}
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="accuracy">
              <AccordionTrigger className="text-left">
                {t.faq.howItWorks.accuracy.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {t.faq.howItWorks.accuracy.answer}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        {/* Billing & Setup */}
        <div>
          <h3 className="text-2xl font-semibold mb-6">{t.faq.billingTitle}</h3>
          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="cancel">
              <AccordionTrigger className="text-left">
                {t.faq.billing.cancel.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {t.faq.billing.cancel.answer}
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="multiple-accounts">
              <AccordionTrigger className="text-left">
                {t.faq.billing.multipleAccounts.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {t.faq.billing.multipleAccounts.answer}
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="technical-help">
              <AccordionTrigger className="text-left">
                {t.faq.billing.technicalHelp.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {t.faq.billing.technicalHelp.answer}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </section>
  );
};
